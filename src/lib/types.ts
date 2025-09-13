export type User = {
  id: string;
  name: string;
  avatarUrl: string;
  email: string;
  role: 'seeker' | 'helper' | 'both';
};

export type HelpRequest = {
  id: string;
  userId: string;
  type: string;
  description: string;
  status: 'open' | 'in-progress' | 'closed';
  createdAt: {
    seconds: number;
    nanoseconds: number;
  } | string;
};

export type HelpOffer = {
  id: string;
  userId: string;
  type: string;
  description: string;
  availability: string;
  createdAt: string;
};

export type Resource = {
  id: string;
  name: string;
  category: string;
  description: string;
  contact: string;
  location: string;
};

export type Message = {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
  isRead: boolean;
};

export type Conversation = {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  lastMessage: string;
  lastMessageTimestamp: string;
  unreadCount: number;
  messages: Message[];
};
