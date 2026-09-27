export type BackendEmotion =
  | "happy"
  | "calm"
  | "anxious"
  | "tired"
  | "sad"
  | "empty"
  | "angry"
  | "overwhelmed";

export interface CreateEmotionalCheckInInput {
  emotion: BackendEmotion;
  intensity: number;
  triggerNote?: string;
}

export interface EmotionalCheckIn {
  id: string;
  userId: string;
  emotion: BackendEmotion | string;
  intensity: number;
  triggerNote: string | null;
  createdAt: string;
}

export interface EmotionalCheckInSuccess {
  success: boolean;
  message: string;
  data: EmotionalCheckIn;
}

export interface EmotionalCheckInListSuccess {
  success: boolean;
  message: string;
  data: EmotionalCheckIn[];
}
