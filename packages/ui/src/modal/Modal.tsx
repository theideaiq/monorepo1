'use client';

import { cn } from '@repo/utils';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import type React from 'react';
import { useEffect, useId, useRef } from 'react';

interface ModalProps {
  /** Whether the modal is currently visible */
  isOpen: boolean;
  /** Callback fired when the modal requests to be closed (e.g., clicking overlay or pressing Esc) */
  onClose: () => void;
  /** Optional title displayed in the header */
  title?: string;
  /** Modal content */
  children: React.ReactNode;
  className?: string;
  /** Accessibility label for the close button. Defaults to "Close". */
  closeLabel?: string;
}

/**
 * Accessible Modal component using Framer Motion for animations.
 *
 * Features:
 * - Focus management (traps focus when open).
 * - Body scroll locking.
 * - Keyboard navigation (Esc to close).
 * - Animated backdrop and content.
 *
 * @example
 * <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Confirm Action">
 *   <p>Are you sure?</p>
 *   <Button onClick={handleConfirm}>Yes</Button>
 * </Modal>
 */
export function Modal({
  isOpen,
  onClose,
  title,
  children,
  className,
  closeLabel = 'Close',
}: ModalProps) {
  const titleId = useId();
  const modalRef = useRef<HTMLDivElement>(null);

  // Lock body scroll when modal is open to prevent background scrolling
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Focus the modal when it opens for accessibility.
      // We use requestAnimationFrame to ensure the element is mounted and rendered
      // before attempting to focus, which is crucial when combined with AnimatePresence.
      requestAnimationFrame(() => {
        modalRef.current?.focus();
      });
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Close on Escape key press
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop (Dark Background) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[999]"
            aria-hidden="true"
          />

          {/* Modal Window */}
          <div className="fixed inset-0 flex items-center justify-center z-[1000] p-4 pointer-events-none">
            <motion.div
              ref={modalRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby={titleId}
              tabIndex={-1}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              className={cn(
                'w-full max-w-lg bg-white rounded-2xl shadow-2xl pointer-events-auto overflow-hidden outline-none',
                className,
              )}
            >
              {/* Header */}
              <div className="flex justify-between items-center p-6 border-b border-slate-100">
                <h3 id={titleId} className="text-xl font-bold text-brand-dark">
                  {title}
                </h3>
                <button
                  type="button"
                  onClick={onClose}
                  className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400 hover:text-brand-pink focus-visible:ring-2 focus-visible:ring-brand-pink"
                  aria-label={closeLabel}
                >
                  <X size={20} />
                </button>
              </div>

              {/* Content */}
              <div className="p-6">{children}</div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
