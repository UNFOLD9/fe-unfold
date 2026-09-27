import { BackendEmotion } from "@/types/checkin";

export type EmotionType = BackendEmotion;

export interface EmotionData {
  id: BackendEmotion;
  label: string;
  color: string;
  bgColor: string;
}

export const EMOTIONS: EmotionData[] = [
  { id: "happy", label: "Senang", color: "#FCD34D", bgColor: "bg-[#FEF9C3]" },
  { id: "calm", label: "Tenang", color: "#7DD3B0", bgColor: "bg-[#DCFCE7]" },
  { id: "anxious", label: "Cemas", color: "#FDBA74", bgColor: "bg-[#FFEDD5]" },
  { id: "tired", label: "Lelah", color: "#C4B5FD", bgColor: "bg-[#EDE9FE]" },
  { id: "sad", label: "Sedih", color: "#93C5FD", bgColor: "bg-[#DBEAFE]" },
  { id: "empty", label: "Hampa", color: "#CBD5E1", bgColor: "bg-[#F1F5F9]" },
  { id: "angry", label: "Marah", color: "#FCA5A5", bgColor: "bg-[#FEE2E2]" },
  { id: "overwhelmed", label: "Kewalahan", color: "#F9A8D4", bgColor: "bg-[#FCE7F3]" },
];

export function EmotionFace({
  type,
  size = 48,
}: {
  type: BackendEmotion | string;
  size?: number;
}) {
  switch (type) {
    case "happy":
    case "senang":
      return (
        <svg width={size} height={size} viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="28" cy="28" r="26" fill="#FCD34D" />
          <circle cx="20" cy="22" r="3" fill="#25233A" />
          <circle cx="36" cy="22" r="3" fill="#25233A" />
          <path d="M19 32C19 32 22 38 28 38C34 38 37 32 37 32" stroke="#25233A" strokeWidth="3" strokeLinecap="round" />
        </svg>
      );
    case "calm":
    case "tenang":
      return (
        <svg width={size} height={size} viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="28" cy="28" r="26" fill="#7DD3B0" />
          <circle cx="20" cy="23" r="3" fill="#25233A" />
          <circle cx="36" cy="23" r="3" fill="#25233A" />
          <path d="M21 34H35" stroke="#25233A" strokeWidth="3.5" strokeLinecap="round" />
        </svg>
      );
    case "anxious":
    case "cemas":
      return (
        <svg width={size} height={size} viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="28" cy="28" r="26" fill="#FDBA74" />
          <circle cx="20" cy="22" r="3" fill="#25233A" />
          <circle cx="36" cy="22" r="3" fill="#25233A" />
          <path d="M20 36C20 36 23 32 28 32C33 32 36 36 36 36" stroke="#25233A" strokeWidth="3" strokeLinecap="round" />
        </svg>
      );
    case "tired":
    case "lelah":
      return (
        <svg width={size} height={size} viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="28" cy="28" r="26" fill="#C4B5FD" />
          <circle cx="20" cy="23" r="3" fill="#25233A" />
          <circle cx="36" cy="23" r="3" fill="#25233A" />
          <path d="M21 35H35" stroke="#25233A" strokeWidth="3.5" strokeLinecap="round" />
        </svg>
      );
    case "sad":
    case "sedih":
      return (
        <svg width={size} height={size} viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="28" cy="28" r="26" fill="#93C5FD" />
          <circle cx="20" cy="22" r="3" fill="#25233A" />
          <circle cx="36" cy="22" r="3" fill="#25233A" />
          <path d="M19 37C19 37 22 31 28 31C34 31 37 37 37 37" stroke="#25233A" strokeWidth="3" strokeLinecap="round" />
        </svg>
      );
    case "empty":
    case "hampa":
      return (
        <svg width={size} height={size} viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="28" cy="28" r="26" fill="#CBD5E1" />
          <circle cx="20" cy="23" r="3" fill="#25233A" />
          <circle cx="36" cy="23" r="3" fill="#25233A" />
          <path d="M22 35H34" stroke="#25233A" strokeWidth="3.5" strokeLinecap="round" />
        </svg>
      );
    case "angry":
    case "marah":
      return (
        <svg width={size} height={size} viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="28" cy="28" r="26" fill="#FCA5A5" />
          <path d="M17 18L24 21" stroke="#25233A" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M39 18L32 21" stroke="#25233A" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="20" cy="24" r="2.8" fill="#25233A" />
          <circle cx="36" cy="24" r="2.8" fill="#25233A" />
          <path d="M19 36C19 36 22 31 28 31C34 31 37 36 37 36" stroke="#25233A" strokeWidth="3" strokeLinecap="round" />
        </svg>
      );
    case "overwhelmed":
    case "kewalahan":
      return (
        <svg width={size} height={size} viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="28" cy="28" r="26" fill="#F9A8D4" />
          <circle cx="20" cy="22" r="3" fill="#25233A" />
          <circle cx="36" cy="22" r="3" fill="#25233A" />
          <path d="M19 36C19 36 22 31 28 31C34 31 37 36 37 36" stroke="#25233A" strokeWidth="3" strokeLinecap="round" />
        </svg>
      );
    default:
      return (
        <svg width={size} height={size} viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="28" cy="28" r="26" fill="#7DD3B0" />
          <circle cx="20" cy="23" r="3" fill="#25233A" />
          <circle cx="36" cy="23" r="3" fill="#25233A" />
          <path d="M21 34H35" stroke="#25233A" strokeWidth="3.5" strokeLinecap="round" />
        </svg>
      );
  }
}
