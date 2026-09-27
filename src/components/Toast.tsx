'use client';

import { useCallback, useState } from 'react';

type ToastKind = 'success' | 'error';
export type ToastItem = { id: string; kind: ToastKind; message: string };

export function useToast() {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((current) => current.filter((toast) => toast.id !== id));
  }, []);

  const addToast = useCallback((kind: ToastKind, message: string) => {
    const id = `${Date.now()}-${Math.random()}`;
    setToasts((current) => [...current, { id, kind, message }]);
    window.setTimeout(() => removeToast(id), 3500);
  }, [removeToast]);

  return { toasts, addToast, removeToast };
}

export function ToastContainer({ toasts, onClose }: { toasts: ToastItem[]; onClose: (id: string) => void }) {
  return (
    <div className="fixed right-4 top-4 z-50 flex w-[min( calc(100vw-2rem),22rem)] flex-col gap-2" aria-live="polite">
      {toasts.map((toast) => (
        <div key={toast.id} className={`flex items-center justify-between gap-3 rounded-xl border px-4 py-3 text-sm shadow-lg ${toast.kind === 'success' ? 'border-[#B9E5D5] bg-[#EEFBF5] text-[#28684E]' : 'border-[#F5C2C2] bg-[#FFF2F2] text-[#A83232]'}`}>
          <span>{toast.message}</span>
          <button type="button" onClick={() => onClose(toast.id)} className="min-h-8 min-w-8 rounded-lg text-lg leading-none" aria-label="Tutup notifikasi">×</button>
        </div>
      ))}
    </div>
  );
}
