import React from 'react';

type BadgeVariant = 'success' | 'warning' | 'danger' | 'neutral' | 'brand';

export function Badge({ children, variant = 'neutral' }: { children: React.ReactNode, variant?: BadgeVariant }) {
  const styles = {
    success: "bg-green-100 text-green-800 border-green-200", // Delivered
    warning: "bg-yellow-100 text-yellow-800 border-yellow-200", // Active
    danger: "bg-red-100 text-red-800 border-red-200", // Overdue
    neutral: "bg-slate-100 text-slate-600 border-slate-200", // Default
    brand: "bg-pink-50 text-brand-pink border-pink-100", // Special
  };

  return (
    <span className={`
      inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold border
      ${styles[variant]}
    `}>
      {children}
    </span>
  );
}
