
'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { conversations as mockConversations } from '@/lib/data';
import type { Conversation, Message } from '@/lib/types';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { ScrollArea } from './ui/scroll-area';
import { cn } from '@/lib/utils';
import { Send } from 'lucide-react';
import { useAuth } from '@/contexts/auth-context';
import { Card } from './ui/card';

export function ChatInterface() {
  const [conversations, setConversations] = useState<Conversation[]>(mockConversations);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const searchParams = useSearchParams();
  const { user: currentUser } = useAuth();

  useEffect(() => {
    if (!currentUser) return;

    const requestId = searchParams.get('requestId');
    const seekerId = searchParams.get('seekerId');

    if (requestId && seekerId) {
      // Find if a conversation already exists for this request/user
      const existingConvo = conversations.find(c => c.requestId === requestId && c.userId === seekerId);

      if (existingConvo) {
        selectConversation(existingConvo);
      } else {
        // Create a new conversation
        const seekerName = searchParams.get('seekerName') || 'User';
        const seekerAvatar = searchParams.get('seekerAvatar') || `https://picsum.photos/seed/${seekerId}/100/100`;
        const requestDescription = searchParams.get('requestDescription') || 'this request';
        
        const initialMessage: Message = {
          id: `msg-init-${Date.now()}`,
          senderId: 'system', // Differentiate system messages
          text: `You have connected to discuss the request: "${requestDescription.substring(0, 50)}..."`,
          timestamp: new Date().toISOString(),
          isRead: true,
        };

        const newConvo: Conversation = {
          id: `convo-${Date.now()}`,
          requestId: requestId,
          userId: seekerId,
          userName: seekerName,
          userAvatar: seekerAvatar,
          lastMessage: initialMessage.text,
          lastMessageTimestamp: initialMessage.timestamp,
          unreadCount: 0,
          messages: [initialMessage],
        };

        setConversations(prev => [newConvo, ...prev]);
        selectConversation(newConvo);
      }
    } else if (conversations.length > 0 && !selectedConversation) {
        // Default to selecting the first conversation if none is specified in URL
        selectConversation(conversations[0]);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams, currentUser, conversations]);


  if (!currentUser) return null;

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() === '' || !selectedConversation) return;

    const message: Message = {
      id: `msg-${Date.now()}`,
      senderId: currentUser.id,
      text: newMessage,
      timestamp: new Date().toISOString(),
      isRead: true,
    };

    const updatedConversation = {
      ...selectedConversation,
      messages: [...selectedConversation.messages, message],
      lastMessage: newMessage,
      lastMessageTimestamp: message.timestamp,
    };

    setSelectedConversation(updatedConversation);

    const updatedConversations = conversations.map(c =>
      c.id === updatedConversation.id ? updatedConversation : c
    );
    setConversations(updatedConversations);

    setNewMessage('');
  };
  
  const selectConversation = (convo: Conversation) => {
    const updatedConvo = { ...convo, unreadCount: 0 };
    setSelectedConversation(updatedConvo);
    setConversations(conversations.map(c => c.id === convo.id ? updatedConvo : c));
  }

  return (
    <Card className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 h-full w-full rounded-lg border">
      <div className="md:col-span-1 lg:col-span-1 border-r flex flex-col">
        <div className="p-4 border-b">
            <h2 className="text-xl font-semibold">Messages</h2>
        </div>
        <ScrollArea className="flex-1">
          <div className="p-2">
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
                  <AvatarFallback>{convo.userName.charAt(0)}</AvatarFallback>
                   {convo.unreadCount > 0 && (
                    <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-primary ring-2 ring-white" />
                  )}
                </Avatar>
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <p className="font-semibold">{convo.userName}</p>
                    <p className="text-xs text-muted-foreground">
                        {new Date(convo.lastMessageTimestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                  <p className={cn("text-sm truncate", convo.unreadCount > 0 ? "text-foreground font-medium" : "text-muted-foreground")}>{convo.lastMessage}</p>
                </div>
                 {convo.unreadCount > 0 && (
                  <div className="bg-primary text-primary-foreground text-xs rounded-full size-5 flex items-center justify-center font-semibold">
                    {convo.unreadCount}
                  </div>
                )}
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
                  {selectedConversation.userName.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <h2 className="font-semibold text-lg">{selectedConversation.userName}</h2>
            </div>
            <ScrollArea className="flex-1 p-4 bg-muted/30">
              <div className="space-y-4">
                {selectedConversation.messages.map(message => {
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
                             {selectedConversation.userName.charAt(0)}
                           </Fallback>
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
                         <p className={cn("text-xs mt-1 opacity-70", message.senderId === currentUser.id ? 'text-right' : 'text-left' )}>
                          {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </ScrollArea>
            <div className="p-4 border-t bg-card">
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
    </div>
  );
}
