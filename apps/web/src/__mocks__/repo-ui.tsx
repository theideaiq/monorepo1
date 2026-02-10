// biome-ignore lint/correctness/noUnusedImports: Needed for React.createElement implicit usage in some setups or tests
import React from 'react';

// biome-ignore lint/suspicious/noExplicitAny: Mock component props are flexible
export const Button = ({ children, isLoading, ...props }: any) => (
  <button {...props} disabled={isLoading}>
    {isLoading ? 'Loading...' : children}
  </button>
);

// biome-ignore lint/suspicious/noExplicitAny: Mock component props are flexible
export const Card = ({ children, className }: any) => (
  <div className={className}>{children}</div>
);

// biome-ignore lint/suspicious/noExplicitAny: Mock component props are flexible
export const Input = ({ label, ...props }: any) => (
  <label>
    {label}
    <input {...props} />
  </label>
);

// biome-ignore lint/suspicious/noExplicitAny: Mock component props are flexible
export const Sheet = ({ children }: any) => <div>{children}</div>;
// biome-ignore lint/suspicious/noExplicitAny: Mock component props are flexible
export const SheetContent = ({ children }: any) => <div>{children}</div>;
// biome-ignore lint/suspicious/noExplicitAny: Mock component props are flexible
export const SheetTrigger = ({ children }: any) => <div>{children}</div>;
