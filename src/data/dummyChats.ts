import { MessageType } from '../types';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  tags: string[];
  isVIP?: boolean;
  lastSeen?: string;
  company?: string;
}

export interface Chat {
  id: string;
  userId: string;
  messages: MessageType[];
  lastMessageTime: string;
  status: 'active' | 'resolved' | 'pending';
  unread?: boolean;
  subject?: string;
}

export const users: User[] = [
  {
    id: 'user1',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@example.com',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    tags: ['Premium', 'Enterprise'],
    isVIP: true,
    lastSeen: '2 mins ago',
    company: 'Acme Corp'
  },
  {
    id: 'user2',
    name: 'Michael Chen',
    email: 'michael.chen@example.com',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    tags: ['Free Trial', 'Lead'],
    lastSeen: '10 mins ago',
    company: 'Tech Innovators'
  },
  {
    id: 'user3',
    name: 'Alex Rodriguez',
    email: 'alex.r@example.com',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    tags: ['Pro Plan', 'Technical'],
    lastSeen: '1 hour ago'
  },
  {
    id: 'user4',
    name: 'Emily Watson',
    email: 'e.watson@example.com',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    tags: ['Basic', 'New User'],
    lastSeen: '3 hours ago',
    company: 'Watson Enterprises'
  },
  {
    id: 'user5',
    name: 'Jordan Smith',
    email: 'j.smith@example.com',
    avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    tags: ['Enterprise'],
    lastSeen: 'yesterday',
    company: 'Global Solutions Inc.'
  }
];

export const chats: Chat[] = [
  {
    id: 'chat1',
    userId: 'user1',
    subject: 'API Integration Issue',
    messages: [
      {
        id: '1',
        senderId: 'user1',
        content: 'Hi there, I\'m having trouble with the API integration. The webhook callbacks are not coming through.',
        timestamp: '2023-07-12T09:30:00',
        type: 'user'
      },
      {
        id: '2',
        senderId: 'agent',
        content: 'Hello Sarah, I\'m sorry to hear you\'re experiencing issues. Could you provide your API key (just the first 4 characters for verification)?',
        timestamp: '2023-07-12T09:35:00',
        type: 'agent'
      },
      {
        id: '3',
        senderId: 'user1',
        content: 'Sure, it starts with "XB7K"',
        timestamp: '2023-07-12T09:38:00',
        type: 'user'
      },
      {
        id: '4',
        senderId: 'agent',
        content: 'Thanks for providing that. I can see your account. It looks like your webhook URL might have a typo. Could you confirm the URL you\'re using?',
        timestamp: '2023-07-12T09:42:00',
        type: 'agent'
      },
      {
        id: '5',
        senderId: 'user1',
        content: 'I\'m using https://api.ourcompany.com/webooks/beyondchats',
        timestamp: '2023-07-12T09:45:00',
        type: 'user'
      },
      {
        id: '6',
        senderId: 'agent',
        content: 'I see the issue! There\'s a typo in your URL. It should be "webhooks" not "webooks". Can you update that and try again?',
        timestamp: '2023-07-12T09:48:00',
        type: 'agent'
      },
      {
        id: '7',
        senderId: 'user1',
        content: 'Oh! That was silly of me. Let me try changing that right away.',
        timestamp: '2023-07-12T09:52:00',
        type: 'user'
      }
    ],
    lastMessageTime: '5 minutes ago',
    status: 'active',
    unread: true
  },
  {
    id: 'chat2',
    userId: 'user2',
    subject: 'Subscription Upgrade Question',
    messages: [
      {
        id: '1',
        senderId: 'user2',
        content: 'Hello, I\'m interested in upgrading to the enterprise plan. Can you tell me more about the features?',
        timestamp: '2023-07-12T08:20:00',
        type: 'user'
      },
      {
        id: '2',
        senderId: 'agent',
        content: 'Hi Michael, thanks for your interest! The enterprise plan includes unlimited users, priority support, and advanced analytics. Would you like me to send over a detailed comparison?',
        timestamp: '2023-07-12T08:25:00',
        type: 'agent'
      },
      {
        id: '3',
        senderId: 'user2',
        content: 'That would be great. Also, does it include the new AI features I saw announced last week?',
        timestamp: '2023-07-12T08:30:00',
        type: 'user'
      }
    ],
    lastMessageTime: '30 minutes ago',
    status: 'pending'
  },
  {
    id: 'chat3',
    userId: 'user3',
    subject: 'Technical Support',
    messages: [
      {
        id: '1',
        senderId: 'user3',
        content: 'I\'m getting an error when trying to import contacts: "Invalid format". What format should I be using?',
        timestamp: '2023-07-11T15:10:00',
        type: 'user'
      },
      {
        id: '2',
        senderId: 'agent',
        content: 'Hello Alex, for contact imports we support CSV and XLSX formats. Could you tell me which one you\'re using?',
        timestamp: '2023-07-11T15:15:00',
        type: 'agent'
      },
      {
        id: '3',
        senderId: 'user3',
        content: 'I\'m using CSV. Here\'s a screenshot of the error.',
        timestamp: '2023-07-11T15:20:00',
        type: 'user'
      },
      {
        id: '4',
        senderId: 'agent',
        content: 'Thanks for the screenshot. It looks like your CSV is missing the required "email" column. Can you add that and try again?',
        timestamp: '2023-07-11T15:25:00',
        type: 'agent'
      },
    ],
    lastMessageTime: 'Yesterday',
    status: 'resolved'
  },
  {
    id: 'chat4',
    userId: 'user4',
    subject: 'Getting Started Help',
    messages: [
      {
        id: '1',
        senderId: 'user4',
        content: 'Hi, I just signed up and I\'m not sure where to begin. Is there a tutorial or guide?',
        timestamp: '2023-07-12T10:05:00',
        type: 'user'
      },
      {
        id: '2',
        senderId: 'agent',
        content: 'Welcome to BeyondChats, Emily! We do have several resources to help you get started. I\'d recommend starting with our interactive tutorial which you can access from your dashboard. Would you like me to guide you through it?',
        timestamp: '2023-07-12T10:10:00',
        type: 'agent'
      },
    ],
    lastMessageTime: '3 hours ago',
    status: 'active'
  },
  {
    id: 'chat5',
    userId: 'user5',
    subject: 'Billing Question',
    messages: [
      {
        id: '1',
        senderId: 'user5',
        content: 'I noticed an extra charge on my last invoice. Can someone explain this?',
        timestamp: '2023-07-10T11:30:00',
        type: 'user'
      },
      {
        id: '2',
        senderId: 'agent',
        content: 'Hi Jordan, I\'d be happy to look into this for you. Could you provide your account number or the invoice number so I can check the details?',
        timestamp: '2023-07-10T11:35:00',
        type: 'agent'
      },
      {
        id: '3',
        senderId: 'user5',
        content: 'The invoice number is INV-2023-06798',
        timestamp: '2023-07-10T11:40:00',
        type: 'user'
      },
      {
        id: '4',
        senderId: 'agent',
        content: 'Thank you. I\'m checking your invoice now...',
        timestamp: '2023-07-10T11:45:00',
        type: 'agent'
      },
      {
        id: '5',
        senderId: 'agent',
        content: 'I found the issue. The extra charge was for exceeding your monthly message limit by 2,500 messages. According to your plan, there\'s a $0.01 charge per message over the limit. Would you like me to explain how you can monitor your usage to avoid this in the future?',
        timestamp: '2023-07-10T11:50:00',
        type: 'agent'
      },
    ],
    lastMessageTime: '2 days ago',
    status: 'pending'
  }
];

export const findChatById = (chatId: string): Chat | undefined => {
  return chats.find(chat => chat.id === chatId);
};

export const findUserById = (userId: string): User | undefined => {
  return users.find(user => user.id === userId);
};

export const findUserForChat = (chatId: string): User | undefined => {
  const chat = findChatById(chatId);
  if (chat) {
    return findUserById(chat.userId);
  }
  return undefined;
};