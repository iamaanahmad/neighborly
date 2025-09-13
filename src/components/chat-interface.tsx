'use client';

import { useState } from 'react';
import { conversations as mockConversations, users } from '@/lib/data';
import type { Conversation, Message } from '@/lib/types';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { ScrollArea } from './ui/scroll-area';
import { cn } from '@/lib/utils';
import { Send } from 'lucide-react';

export function ChatInterface() {
  const [conversations, setConversations] = useState<Conversation[]>(mockConversations);
  const [selectedConversation, setSelectedConversation] = useState<Conversation>(conversations[0]);
  const [newMessage, setNewMessage] = useState('');

  const currentUser = users[0]; // Assuming current user is user-1

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() === '') return;

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

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 h-[calc(100vh-8rem)] border rounded-lg">
      <div className="md:col-span-1 lg:col-span-1 border-r">
        <ScrollArea className="h-full">
          <div className="p-2">
            {conversations.map(convo => (
              <button
                key={convo.id}
                className={cn(
                  'flex w-full items-start gap-3 rounded-lg p-3 text-left transition-colors hover:bg-accent',
                  selectedConversation.id === convo.id && 'bg-accent'
                )}
                onClick={() => setSelectedConversation(convo)}
              >
                <Avatar>
                  <AvatarImage src={convo.userAvatar} data-ai-hint="person portrait" />
                  <AvatarFallback>{convo.userName.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <p className="font-semibold">{convo.userName}</p>
                    <p className="text-xs text-muted-foreground">
                        {new Date(convo.lastMessageTimestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                  <p className="text-sm text-muted-foreground truncate">{convo.lastMessage}</p>
                </div>
                 {convo.unreadCount > 0 && (
                  <div className="bg-primary text-primary-foreground text-xs rounded-full size-5 flex items-center justify-center">
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
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {selectedConversation.messages.map(message => (
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
                         </AvatarFallback>
                       </Avatar>
                    )}
                    <div
                      className={cn(
                        'max-w-xs rounded-lg p-3 text-sm lg:max-w-md',
                        message.senderId === currentUser.id
                          ? 'bg-primary text-primary-foreground rounded-br-none'
                          : 'bg-secondary rounded-bl-none'
                      )}
                    >
                      <p>{message.text}</p>
                       <p className={cn("text-xs mt-1 opacity-70", message.senderId === currentUser.id ? 'text-right' : 'text-left' )}>
                        {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
            <div className="p-4 border-t">
              <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                <Input
                  placeholder="Type a message..."
                  value={newMessage}
                  onChange={e => setNewMessage(e.target.value)}
                />
                <Button type="submit" size="icon">
                  <Send className="size-4" />
                </Button>
              </form>
            </div>
          </>
        ) : (
          <div className="flex flex-1 items-center justify-center text-muted-foreground">
            <p>Select a conversation to start chatting</p>
          </div>
        )}
      </div>
    </div>
  );
}
