export interface CheckInItem {
  id: string;
  userId?: string;
  mood: string;
  energyLevel?: number;
  feelings?: string[];
  emotions?: string[];
  notes?: string;
  note?: string;
  summary?: string;
  reflection?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface LatestCheckInResponse {
  success: boolean;
  message?: string;
  data: CheckInItem | null;
}
