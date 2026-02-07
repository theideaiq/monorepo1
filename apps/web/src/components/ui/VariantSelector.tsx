'use client';

import { useId } from 'react';

interface VariantSelectorProps {
  label: string;
  options: string[];
  selected: string;
  onChange: (value: string) => void;
}

export function VariantSelector({
  label,
  options,
  selected,
  onChange,
}: VariantSelectorProps) {
  const id = useId();

  return (
    <div className="mb-4" role="radiogroup" aria-labelledby={id}>
      <h3
        id={id}
        className="text-sm font-medium text-slate-400 mb-3 uppercase tracking-wider"
      >
        {label}
      </h3>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const isActive = selected === option;
          return (
            // biome-ignore lint/a11y/useSemanticElements: Custom radio button implementation
            <button
              key={option}
              type="button"
              role="radio"
              aria-checked={isActive}
              onClick={() => onChange(option)}
              className={`
                px-4 py-2 rounded-full text-sm font-bold border transition-all duration-200
                ${
                  isActive
                    ? 'bg-brand-yellow text-brand-dark border-brand-yellow shadow-[0_0_15px_rgba(250,204,21,0.3)]'
                    : 'bg-white/5 border-white/10 text-slate-300 hover:border-white/30 hover:bg-white/10'
                }
              `}
            >
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
}
