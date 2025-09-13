import type { HelpRequest, HelpOffer, Resource, User, Conversation } from '@/lib/types';
import { PlaceHolderImages } from './placeholder-images';

const avatar = (id: number) => PlaceHolderImages.find(img => img.id === `avatar-${id}`)?.imageUrl || '';

export const users: User[] = [
  { id: 'user-1', name: 'Alice Johnson', avatarUrl: avatar(1) },
  { id: 'user-2', name: 'Bob Williams', avatarUrl: avatar(2) },
  { id: 'user-3', name: 'Charlie Brown', avatarUrl: avatar(3) },
  { id: 'user-4', name: 'Diana Miller', avatarUrl: avatar(4) },
  { id: 'user-5', name: 'Eve Davis', avatarUrl: avatar(5) },
  { id: 'user-6', name: 'Frank White', avatarUrl: avatar(6) },
];

export const requests: HelpRequest[] = [
  { id: 'req-1', userId: 'user-2', type: 'Groceries', description: 'Need help picking up some essential groceries. I am elderly and cannot leave my house.', status: 'open', createdAt: '2024-07-20T10:00:00Z' },
  { id: 'req-2', userId: 'user-4', type: 'Errands', description: 'Can someone help me post a package? The post office is a bit far for me to walk.', status: 'open', createdAt: '2024-07-21T11:30:00Z' },
  { id: 'req-3', userId: 'user-5', type: 'Medical Aid', description: 'I need someone to pick up my prescription from the pharmacy.', status: 'in-progress', createdAt: '2024-07-21T14:00:00Z' },
  { id: 'req-4', userId: 'user-2', type: 'Gardening', description: 'My garden is overgrown, would appreciate some help with weeding.', status: 'closed', createdAt: '2024-07-19T09:00:00Z' },
  { id: 'req-5', userId: 'user-6', type: 'Groceries', description: 'Just need a few items from the local store - milk, bread, and eggs.', status: 'open', createdAt: '2024-07-22T08:00:00Z' },
];

export const recentRequests: HelpRequest[] = requests.filter(r => r.status !== 'closed');

export const offers: HelpOffer[] = [
    { id: 'offer-1', userId: 'user-1', type: 'Groceries', description: 'I can do grocery runs on weekday evenings.', availability: 'Mon-Fri 6pm-8pm', createdAt: '2024-07-18T18:00:00Z' },
    { id: 'offer-2', userId: 'user-3', type: 'Errands', description: 'Happy to help with small errands around town on weekends.', availability: 'Sat-Sun 10am-4pm', createdAt: '2024-07-20T12:00:00Z' },
    { id: 'offer-3', userId: 'user-1', type: 'Medical Aid', description: 'I have a car and can help with pickups from pharmacies or clinics.', availability: 'Flexible', createdAt: '2024-07-21T16:00:00Z' },
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
        userId: 'user-1',
        userName: 'Alice Johnson',
        userAvatar: avatar(1),
        lastMessage: "I can pick them up around 5 PM today. Does that work for you?",
        lastMessageTimestamp: "2024-07-21T14:30:00Z",
        unreadCount: 0,
        messages: [
            { id: 'msg-1-1', senderId: 'user-2', text: 'I need someone to pick up my prescription from the pharmacy.', timestamp: '2024-07-21T14:00:00Z', isRead: true },
            { id: 'msg-1-2', senderId: 'user-1', text: "I can help with that! Which pharmacy is it?", timestamp: '2024-07-21T14:05:00Z', isRead: true },
            { id: 'msg-1-3', senderId: 'user-2', text: "It's the one on Main Street. The prescription is under Bob Williams.", timestamp: '2024-07-21T14:10:00Z', isRead: true },
            { id: 'msg-1-4', senderId: 'user-1', text: "I can pick them up around 5 PM today. Does that work for you?", timestamp: '2024-07-21T14:30:00Z', isRead: true },
        ],
    },
    {
        id: 'convo-2',
        userId: 'user-3',
        userName: 'Charlie Brown',
        userAvatar: avatar(3),
        lastMessage: "You're welcome! Glad I could assist.",
        lastMessageTimestamp: "2024-07-19T11:00:00Z",
        unreadCount: 2,
        messages: [
            { id: 'msg-2-1', senderId: 'user-4', text: 'Thank you so much for helping with the package!', timestamp: '2024-07-19T10:00:00Z', isRead: true },
            { id: 'msg-2-2', senderId: 'user-3', text: "You're welcome! Glad I could assist.", timestamp: '2024-07-19T11:00:00Z', isRead: false },
             { id: 'msg-2-3', senderId: 'user-3', text: "Let me know if you need anything else.", timestamp: '2024-07-19T11:01:00Z', isRead: false },
        ],
    },
    {
        id: 'convo-3',
        userId: 'user-4',
        userName: 'Diana Miller',
        userAvatar: avatar(4),
        lastMessage: "Sure thing! See you then.",
        lastMessageTimestamp: "2024-07-22T09:00:00Z",
        unreadCount: 0,
        messages: [
            { id: 'msg-3-1', senderId: 'user-4', text: 'I saw your offer to help with errands. Could you help me tomorrow?', timestamp: '2024-07-22T08:30:00Z', isRead: true },
            { id: 'msg-3-2', senderId: 'user-3', text: 'Yes, I can. What time works for you?', timestamp: '2024-07-22T08:45:00Z', isRead: true },
            { id: 'msg-3-3', senderId: 'user-4', text: 'Around 2pm?', timestamp: '2024-07-22T08:50:00Z', isRead: true },
            { id: 'msg-3-4', senderId: 'user-3', text: 'Sure thing! See you then.', timestamp: '2024-07-22T09:00:00Z', isRead: true },
        ],
    },
]
