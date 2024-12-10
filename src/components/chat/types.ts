// Common types used across chat components
export interface Message {
  content: string;
  type: 'user' | 'bot';
  id: string;
  image?: string;
  status?: 'sending' | 'processing' | 'complete';
  isEditing?: boolean;
  isTyping?: boolean;
}

export interface ChatProps {
  message: Message;
  onEdit?: (messageId: string, content: string) => void;
  onSave?: (messageId: string, content: string) => void;
  onCancel?: (messageId: string) => void;
}