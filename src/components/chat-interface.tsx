
'use client';

import { useEffect, useState, useRef, useTransition } from 'react';
import { useSearchParams } from 'next/navigation';
import type { Conversation, Message, User } from '@/lib/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { Loader2, Send, Sparkles } from 'lucide-react';
import { useAuth } from '@/contexts/auth-context';
import { Card } from '@/components/ui/card';
import {
  collection,
  query,
  where,
  onSnapshot,
  addDoc,
  serverTimestamp,
  orderBy,
  getDocs,
  doc,
  getDoc,
  updateDoc,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { getChatSuggestions } from '@/app/actions';

export function ChatInterface() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isAiPending, startAiTransition] = useTransition();

  const searchParams = useSearchParams();
  const { user: currentUser } = useAuth();
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const canOfferHelp = currentUser?.role === 'helper' || currentUser?.role === 'both';

  // Effect for fetching conversations
  useEffect(() => {
    if (!currentUser) return;
    setLoading(true);

    const q = query(
      collection(db, 'conversations'),
      where('participantIds', 'array-contains', currentUser.id)
    );

    const unsubscribe = onSnapshot(q, async (querySnapshot) => {
      const convos: Conversation[] = await Promise.all(
        querySnapshot.docs.map(async (docSnap) => {
          const convoData = docSnap.data();
          const otherParticipantId = convoData.participantIds.find((id: string) => id !== currentUser.id);
          let otherUser: User | null = null;
          if (otherParticipantId) {
            const userSnap = await getDoc(doc(db, 'users', otherParticipantId));
            if (userSnap.exists()) {
              otherUser = userSnap.data() as User;
            }
          }

          return {
            ...convoData,
            id: docSnap.id,
            userName: otherUser?.name || 'User',
            userAvatar: otherUser?.avatarUrl || `https://picsum.photos/seed/${otherParticipantId}/100/100`,
          } as Conversation;
        })
      );
      setConversations(convos.sort((a, b) => (b.lastMessageTimestamp?.toMillis() || 0) - (a.lastMessageTimestamp?.toMillis() || 0)));
      setLoading(false);
    });

    return () => unsubscribe();
  }, [currentUser]);

  // Effect for handling URL-based conversation creation/selection
  useEffect(() => {
    if (loading || !currentUser) return; // Wait for initial conversation load

    const requestId = searchParams.get('requestId');
    const seekerId = searchParams.get('seekerId');
    const helperId = currentUser?.id;

    if (requestId && seekerId && helperId) {
      const findOrCreateConversation = async () => {
        const existingConvoQuery = query(
          collection(db, 'conversations'),
          where('requestId', '==', requestId),
          where('participantIds', 'array-contains-all', [seekerId, helperId])
        );

        const querySnapshot = await getDocs(existingConvoQuery);

        if (!querySnapshot.empty) {
          const convoDoc = querySnapshot.docs[0];
          const convoData = conversations.find(c => c.id === convoDoc.id);
          if (convoData) {
            selectConversation(convoData);
          } else {
            // If convo exists in DB but not in local state yet, create a temporary local version
            const remoteConvoData = convoDoc.data() as Conversation;
            const otherUserSnap = await getDoc(doc(db, 'users', seekerId));
            const otherUser = otherUserSnap.data() as User;
             selectConversation({
                ...remoteConvoData,
                id: convoDoc.id,
                userName: otherUser?.name || 'User',
                userAvatar: otherUser?.avatarUrl || `https://picsum.photos/seed/${seekerId}/100/100`,
             });
          }
        } else {
          const seekerName = searchParams.get('seekerName') || 'User';
          const requestDescription = searchParams.get('requestDescription') || 'this request';
          const initialMessageText = `You have connected to discuss the request: "${requestDescription.substring(0, 50)}..."`;

          const newConvoData = {
            participantIds: [seekerId, helperId],
            requestId: requestId,
            lastMessage: initialMessageText,
            lastMessageTimestamp: serverTimestamp(),
            unreadCount: 0, // Placeholder
          };

          const newConvoRef = await addDoc(collection(db, 'conversations'), newConvoData);

          // Add the initial system message
          await addDoc(collection(newConvoRef, 'messages'), {
            senderId: 'system',
            text: initialMessageText,
            timestamp: serverTimestamp(),
          });
          
          // The conversation listener will pick this up, but we can pre-emptively select it.
          selectConversation({
            id: newConvoRef.id,
            ...newConvoData,
            userName: seekerName,
            userAvatar: searchParams.get('seekerAvatar') || `https://picsum.photos/seed/${seekerId}/100/100`,
            lastMessageTimestamp: new Date(), // temp
          });
        }
      };
      findOrCreateConversation();
    } else if (!selectedConversation && conversations.length > 0) {
      selectConversation(conversations[0]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams, currentUser, loading, conversations]);

  // Effect for fetching messages of the selected conversation
  useEffect(() => {
    if (!selectedConversation) return;
    setLoadingMessages(true);
    setSuggestions([]); // Clear suggestions when changing conversations

    const q = query(collection(db, 'conversations', selectedConversation.id, 'messages'), orderBy('timestamp', 'asc'));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const msgs = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Message));
      setMessages(msgs);
      setLoadingMessages(false);
      setTimeout(() => {
        if (scrollAreaRef.current) {
          scrollAreaRef.current.scrollTo(0, scrollAreaRef.current.scrollHeight);
        }
      }, 0);
    });

    return () => unsubscribe();
  }, [selectedConversation]);


  if (!currentUser) return <Loader2 className="h-8 w-8 animate-spin mx-auto mt-10" />;

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() === '' || !selectedConversation) return;

    const convoRef = doc(db, 'conversations', selectedConversation.id);

    await addDoc(collection(convoRef, 'messages'), {
      text: newMessage,
      senderId: currentUser.id,
      timestamp: serverTimestamp(),
      isRead: false,
    });
    
    await updateDoc(convoRef, {
        lastMessage: newMessage,
        lastMessageTimestamp: serverTimestamp(),
    });

    setNewMessage('');
    setSuggestions([]);
  };

  const selectConversation = (convo: Conversation | null) => {
    setSelectedConversation(convo);
  }
  
  const handleFetchSuggestions = () => {
    if (!selectedConversation || !canOfferHelp) return;

    startAiTransition(async () => {
        const history = messages
            .filter(m => m.senderId !== 'system')
            .map(m => ({
                role: m.senderId === currentUser.id ? 'model' : 'user' as 'model' | 'user',
                content: [{ text: m.text }]
            }));
        
        // Don't fetch if the helper was the last one to speak
        if (history.length > 0 && history[history.length - 1].role === 'model') {
            setSuggestions([]);
            return;
        }

        const result = await getChatSuggestions({ history });
        if (result.suggestions) {
            setSuggestions(result.suggestions);
        }
    });
  }

  const getTimestamp = (timestamp: any) => {
    if (!timestamp) return '';
    if (timestamp?.toDate) {
      return timestamp.toDate().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
    return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  return (
    <Card className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 h-[calc(100vh-12rem)] w-full rounded-lg border">
      <div className="md:col-span-1 lg:col-span-1 border-r flex flex-col">
        <div className="p-4 border-b">
          <h2 className="text-xl font-semibold">Messages</h2>
        </div>
        <ScrollArea className="flex-1">
          <div className="p-2">
            {conversations.length === 0 && !loading && (
                <div className="text-center text-muted-foreground p-4">No conversations yet.</div>
            )}
            {conversations.map(convo => (
              <button
                key={convo.id}
                className={cn(
                  'flex w-full items-start gap-3 rounded-lg p-3 text-left transition-colors hover:bg-accent',
                  selectedConversation?.id === convo.id && 'bg-accent'
                )}
                onClick={() => selectConversation(convo)}
              >
                <Avatar className="relative">
                  <AvatarImage src={convo.userAvatar} data-ai-hint="person portrait" />
                  <AvatarFallback>{convo.userName?.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1 overflow-hidden">
                  <div className="flex justify-between items-center">
                    <p className="font-semibold truncate">{convo.userName}</p>
                    <p className="text-xs text-muted-foreground whitespace-nowrap">
                      {getTimestamp(convo.lastMessageTimestamp)}
                    </p>
                  </div>
                  <p className={cn("text-sm truncate", convo.unreadCount > 0 ? "text-foreground font-medium" : "text-muted-foreground")}>{convo.lastMessage}</p>
                </div>
              </button>
            ))}
          </div>
        </ScrollArea>
      </div>
      <div className="md:col-span-2 lg:col-span-3 flex flex-col h-full">
        {selectedConversation ? (
          <>
            <div className="flex items-center gap-3 p-3 border-b">
              <Avatar>
                <AvatarImage src={selectedConversation.userAvatar} data-ai-hint="person portrait" />
                <AvatarFallback>
                  {selectedConversation.userName?.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <h2 className="font-semibold text-lg">{selectedConversation.userName}</h2>
            </div>
            <ScrollArea className="flex-1 p-4 bg-muted/30" ref={scrollAreaRef}>
              {loadingMessages ? (
                <div className="flex justify-center items-center h-full">
                  <Loader2 className="h-6 w-6 animate-spin" />
                </div>
              ) : (
                <div className="space-y-4">
                  {messages.map(message => {
                    if (message.senderId === 'system') {
                      return (
                        <div key={message.id} className="text-center text-xs text-muted-foreground italic my-4">
                          <p>{message.text}</p>
                        </div>
                      )
                    }
                    return (
                      <div
                        key={message.id}
                        className={cn(
                          'flex items-end gap-2',
                          message.senderId === currentUser.id ? 'justify-end' : 'justify-start'
                        )}
                      >
                        {message.senderId !== currentUser.id && (
                          <Avatar className="size-8">
                            <AvatarImage src={selectedConversation.userAvatar} data-ai-hint="person portrait" />
                            <AvatarFallback>
                              {selectedConversation.userName?.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                        )}
                        <div
                          className={cn(
                            'max-w-xs rounded-lg p-3 text-sm lg:max-w-md shadow-sm',
                            message.senderId === currentUser.id
                              ? 'bg-primary text-primary-foreground rounded-br-none'
                              : 'bg-card text-card-foreground rounded-bl-none'
                          )}
                        >
                          <p>{message.text}</p>
                          <p className={cn("text-xs mt-1 opacity-70", message.senderId === currentUser.id ? 'text-right' : 'text-left')}>
                            {getTimestamp(message.timestamp)}
                          </p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </ScrollArea>
            <div className="p-4 border-t bg-card">
              {canOfferHelp && (
                 <div className="flex items-center gap-2 mb-2">
                    {isAiPending ? (
                       <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Loader2 className="size-4 animate-spin"/>
                        <span>Getting suggestions...</span>
                       </div>
                    ) : (
                        <>
                         <Button variant="ghost" size="icon" onClick={handleFetchSuggestions} className="shrink-0">
                            <Sparkles className="size-5 text-muted-foreground" />
                         </Button>
                         <div className="flex gap-2 overflow-x-auto pb-2">
                         {suggestions.map((s, i) => (
                           <Button key={i} variant="outline" size="sm" className="text-xs h-7" onClick={() => setNewMessage(s)}>
                             {s}
                           </Button>
                         ))}
                         </div>
                        </>
                    )}
                 </div>
              )}
              <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                <Input
                  placeholder="Type a message..."
                  value={newMessage}
                  onChange={e => setNewMessage(e.target.value)}
                  className="bg-muted"
                />
                <Button type="submit" size="icon">
                  <Send className="size-4" />
                </Button>
              </form>
            </div>
          </>
        ) : (
          <div className="flex flex-1 items-center justify-center text-muted-foreground bg-muted/30">
            <p>Select a conversation to start chatting</p>
          </div>
        )}
      </div>
    </Card>
  );
}

    