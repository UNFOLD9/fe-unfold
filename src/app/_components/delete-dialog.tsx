type DeleteDialogProps = {
  label: string;
  date: string;
  loading: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

export default function DeleteDialog({ label, date, loading, onConfirm, onCancel }: DeleteDialogProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <button className="absolute inset-0" aria-label="Tutup dialog" onClick={onCancel} style={{ backgroundColor: 'rgba(37,35,58,0.3)', backdropFilter: 'blur(4px)' }} />
      <div className="relative w-full max-w-xs rounded-2xl bg-white p-6 shadow-2xl" role="dialog" aria-modal="true" aria-labelledby="delete-dialog-title">
        <h3 id="delete-dialog-title" className="mb-1 text-base font-bold text-[#25233A]">Hapus {label}?</h3>
        <p className="mb-1 text-sm text-[#6F6B80]">{date} akan dihapus permanen dari My Space.</p>
        <p className="text-xs font-semibold text-[#F87171]">Tindakan permanen</p>
        <p className="mb-5 text-xs text-[#9CA3AF]">Sekali hapus tidak bisa diambil kembali.</p>
        <div className="flex gap-3">
          <button onClick={onCancel} className="flex-1 rounded-xl border border-[#E8E5F0] bg-[#F8F7FC] py-2.5 text-sm font-medium text-[#6F6B80]">Batal</button>
          <button onClick={onConfirm} disabled={loading} className="flex-1 rounded-xl bg-[#F87171] py-2.5 text-sm font-medium text-white disabled:opacity-60">
            {loading ? 'Menghapus...' : `Hapus ${label}`}
          </button>
        </div>
      </div>
    </div>
  );
}
