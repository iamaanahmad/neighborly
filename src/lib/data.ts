
import type { HelpRequest, HelpOffer, Resource, User, Conversation } from '@/lib/types';

const avatar = (id: number | string) => `https://picsum.photos/seed/${id}/100/100`;

export const users: User[] = [
  { id: 'hJ8kL2nPf9aV3gH7jF5t', name: 'Alice Johnson', avatarUrl: avatar('alice'), email: 'alice@example.com', role: 'helper' },
  { id: 'pZ6xW8yB4qC9sE1dG3fH', name: 'Bob Williams', avatarUrl: avatar('bob'), email: 'bob@example.com', role: 'seeker' },
  { id: 'mN5bV2cX1zLp9kR8tY7u', name: 'Charlie Brown', avatarUrl: avatar('charlie'), email: 'charlie@example.com', role: 'both' },
  { id: 'aQ4sD7fG9hJ2kL5mN1bV', name: 'Diana Miller', avatarUrl: avatar('diana'), email: 'diana@example.com', role: 'seeker' },
  { id: 'eR8tY2uI4oP6aF1sD3gH', name: 'Eve Davis', avatarUrl: avatar('eve'), email: 'eve@example.com', role: 'helper' },
  { id: 'fG9hJ2kL5mN1bV4sD7aQ', name: 'Frank White', avatarUrl: avatar('frank'), email: 'frank@example.com', role: 'seeker' },
  { id: 'demouser', name: 'Demo User', avatarUrl: avatar('demouser'), email: 'demo@neighborly.app', role: 'both' },
];

// Dynamically generate recent dates for mock data
const now = new Date();
const recentDates = [
    new Date(now.getTime() - 10 * 60 * 1000).toISOString(), // 10 minutes ago
    new Date(now.getTime() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
    new Date(now.getTime() - 22 * 60 * 60 * 1000).toISOString(), // 22 hours ago
    new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
    new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000).toISOString() // 5 days ago
];


export const requests: HelpRequest[] = [
  { id: 'req-1', userId: 'pZ6xW8yB4qC9sE1dG3fH', type: 'Groceries', description: 'Need help picking up some essential groceries. I am elderly and cannot leave my house.', status: 'open', createdAt: recentDates[0] },
  { id: 'req-2', userId: 'aQ4sD7fG9hJ2kL5mN1bV', type: 'Errands', description: 'Can someone help me post a package? The post office is a bit far for me to walk.', status: 'open', createdAt: recentDates[1] },
  { id: 'req-3', userId: 'mN5bV2cX1zLp9kR8tY7u', type: 'Medical Aid', description: 'I need someone to pick up my prescription from the pharmacy.', status: 'in-progress', createdAt: recentDates[2] },
  { id: 'req-4', userId: 'pZ6xW8yB4qC9sE1dG3fH', type: 'Gardening', description: 'My garden is overgrown, would appreciate some help with weeding.', status: 'closed', createdAt: recentDates[3] },
  { id: 'req-5', userId: 'fG9hJ2kL5mN1bV4sD7aQ', type: 'Groceries', description: 'Just need a few items from the local store - milk, bread, and eggs.', status: 'open', createdAt: recentDates[4] },
];

export const recentRequests: HelpRequest[] = requests.filter(r => r.status !== 'closed');

export const offers: HelpOffer[] = [
    { id: 'offer-1', userId: 'hJ8kL2nPf9aV3gH7jF5t', type: 'Groceries', description: 'I can do grocery runs on weekday evenings.', availability: 'Mon-Fri 6pm-8pm', createdAt: '2024-07-18T18:00:00Z' },
    { id: 'offer-2', userId: 'mN5bV2cX1zLp9kR8tY7u', type: 'Errands', description: 'Happy to help with small errands around town on weekends.', availability: 'Sat-Sun 10am-4pm', createdAt: '2024-07-20T12:00:00Z' },
    { id: 'offer-3', userId: 'hJ8kL2nPf9aV3gH7jF5t', type: 'Medical Aid', description: 'I have a car and can help with pickups from pharmacies or clinics.', availability: 'Flexible', createdAt: '2024-07-21T16:00:00Z' },
];

export const recentOffers: HelpOffer[] = offers;

export const resources: Resource[] = [
    { id: 'res-1', name: 'Community Food Bank', category: 'Food', description: 'Provides free food supplies to families in need.', contact: '555-0101', location: '123 Charity St' },
    { id: 'res-2', name: 'City General Hospital', category: 'Medical Aid', description: '24/7 emergency medical services.', contact: '555-0102', location: '456 Health Ave' },
    { id: 'res-3', name: 'Neighborhood Watch', category: 'Safety', description: 'Community-led safety and security program.', contact: '555-0103', location: 'Community Center' },
    { id: 'res-4', name: 'Public Library', category: 'Community', description: 'Offers free access to books, internet, and community programs.', contact: '555-0104', location: '789 Knowledge Rd' },
    { id: 'res-5', name: 'Senior Support Services', category: 'Seniors', description: 'Assistance and programs for senior citizens.', contact: '555-0105', location: '101 Golden Age Blvd' },
];

export const conversations: Conversation[] = [
    {
        id: 'convo-1',
        participantIds: ['hJ8kL2nPf9aV3gH7jF5t', 'pZ6xW8yB4qC9sE1dG3fH'],
        userName: 'Alice Johnson',
        userAvatar: avatar('alice'),
        lastMessage: "I can pick them up around 5 PM today. Does that work for you?",
        lastMessageTimestamp: "2024-07-21T14:30:00Z",
        unreadCount: 0,
    },
    {
        id: 'convo-2',
        participantIds: ['mN5bV2cX1zLp9kR8tY7u', 'aQ4sD7fG9hJ2kL5mN1bV'],
        userName: 'Charlie Brown',
        userAvatar: avatar('charlie'),
        lastMessage: "You're welcome! Glad I could assist.",
        lastMessageTimestamp: "2024-07-19T11:00:00Z",
        unreadCount: 2,
    },
    {
        id: 'convo-3',
        participantIds: ['aQ4sD7fG9hJ2kL5mN1bV', 'mN5bV2cX1zLp9kR8tY7u'],
        userName: 'Diana Miller',
        userAvatar: avatar('diana'),
        lastMessage: "Sure thing! See you then.",
        lastMessageTimestamp: "2024-07-22T09:00:00Z",
        unreadCount: 0,
    },
]

    