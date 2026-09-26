import { Warning } from '@phosphor-icons/react';

export default function FormError({ message }: { message: string }) {
  return (
    <div className="mb-6 flex items-start gap-2 rounded-xl border border-red-100 bg-red-50 p-4 text-sm text-red-600" role="alert">
      <Warning size={20} weight="fill" className="shrink-0" aria-hidden="true" />
      <p>{message}</p>
    </div>
  );
}
