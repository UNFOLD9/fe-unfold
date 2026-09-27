"use client";

interface IntensityStepperProps {
  value: number;
  onChange: (val: number) => void;
  disabled?: boolean;
}

export default function IntensityStepper({
  value,
  onChange,
  disabled = false,
}: IntensityStepperProps) {
  const steps = [1, 2, 3, 4, 5];
  // Calculate percentage for progress fill: (value - 1) / (5 - 1) * 100
  const progressPercent = ((value - 1) / 4) * 100;

  return (
    <div className="space-y-3 select-none">
      <label className="block text-sm sm:text-base font-bold text-[#25233A]">
        Seberapa kuat perasaan ini?
      </label>

      <div className="relative px-3 pt-2 pb-6">
        {/* Row Wadah Lingkaran & Garis (Tinggi 32px / h-8) */}
        <div className="relative h-8 flex items-center">
          {/* Garis Horizontal (Tepat di tengah vertikal: top-1/2 -translate-y-1/2) */}
          <div className="absolute top-1/2 left-2 right-2 -translate-y-1/2 h-1.5 bg-[#EDE9FA] rounded-full pointer-events-none">
            {/* Warna garis aktif */}
            <div
              className="h-full bg-[#5B8DEF] rounded-full transition-all duration-200"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          {/* 5 Lingkaran Node */}
          <div className="relative w-full flex justify-between items-center">
            {steps.map((step) => {
              const isSelected = step === value;
              const isPassed = step <= value;

              return (
                <button
                  key={step}
                  type="button"
                  disabled={disabled}
                  onClick={() => onChange(step)}
                  className="group relative flex flex-col items-center justify-center focus:outline-none cursor-pointer"
                  aria-label={`Pilih intensitas ${step}`}
                >
                  {/* Lingkaran Node */}
                  <div
                    className={`rounded-full flex items-center justify-center transition-all duration-200 ${
                      isSelected
                        ? "w-7 h-7 bg-[#A78BFA] border-2 border-white ring-4 ring-[#5B8DEF]/30 shadow-sm"
                        : isPassed
                        ? "w-6 h-6 bg-white border-2 border-[#5B8DEF] group-hover:scale-110"
                        : "w-6 h-6 bg-white border-2 border-[#C4B5FD] group-hover:border-[#5B8DEF] group-hover:scale-110"
                    }`}
                  >
                    {isSelected && (
                      <div className="w-2.5 h-2.5 rounded-full bg-white" />
                    )}
                  </div>

                  {/* Angka Label di bawah lingkaran */}
                  <span
                    className={`absolute top-9 text-xs transition-colors ${
                      isSelected
                        ? "font-extrabold text-[#25233A] scale-110"
                        : "font-medium text-[#6F6B80] group-hover:text-[#25233A]"
                    }`}
                  >
                    {step}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
