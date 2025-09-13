
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
  createdAt: any; // Allow string for mock, and Timestamp for Firestore
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
  timestamp: any; // Firestore serverTimestamp is tricky to type
  isRead?: boolean;
};

export type Conversation = {
  id: string;
  participantIds: string[];
  userName?: string; // Other user's name
  userAvatar?: string; // Other user's avatar
  lastMessage: string;
  lastMessageTimestamp: any; // Firestore serverTimestamp
  unreadCount: number;
  requestId?: string; // To link conversation to a specific request
};
