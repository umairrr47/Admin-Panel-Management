export interface MessageType {
  id: string;
  senderId: string;
  content: string;
  timestamp: string;
  type: 'user' | 'agent' | 'system';
  status?: 'sent' | 'delivered' | 'read';
}