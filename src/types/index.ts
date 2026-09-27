export type { ApiResponse } from './auth';

export interface EmotionalCheckIn {
  id: string;
  userId: string;
  emotion: string;
  intensity: number;
  triggerNote: string | null;
  createdAt: string;
}

export interface MindEntry {
  id: string;
  userId: string;
  content: string;
  isSaved: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface SmallWin {
  id: string;
  userId: string;
  title: string;
  description: string | null;
  category: string | null;
  winDate: string;
  createdAt: string;
  updatedAt: string;
}
