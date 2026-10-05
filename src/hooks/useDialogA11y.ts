import { useEffect, useRef } from 'react';

const FOCUSABLE = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled]):not([type="hidden"])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',');

// Reference count so stacking overlays can't unlock scrolling early.
let lockCount = 0;
let savedOverflow = '';

/**
 * Modal accessibility: Escape to close, focus trap, focus restore, and
 * background scroll lock.
 *
 * Without these, keyboard and screen-reader users can end up stranded behind
 * an overlay with no way to dismiss it (WCAG 2.1.2 / 4.1.2).
 *
 * @param isOpen  whether the dialog is currently mounted and visible
 * @param onClose invoked on Escape or backdrop activation
 * @returns a ref to attach to the dialog container
 */
export const useDialogA11y = (
  isOpen: boolean,
  onClose: () => void
) => {
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);

  // Keep the latest onClose without re-running the effect on every render.
  const onCloseRef = useRef(onClose);
  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    if (!isOpen) return;

    previouslyFocused.current = document.activeElement as HTMLElement | null;

    if (lockCount === 0) {
      savedOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
    }
    lockCount += 1;

    // Defer so the dialog contents are mounted before we move focus.
    // Focusing the dialog container itself (it carries aria-labelledby) makes
    // screen readers announce the dialog name on open. A child marked
    // data-autofocus overrides this when a specific control is better.
    const focusFrame = window.requestAnimationFrame(() => {
      const node = dialogRef.current;
      if (!node) return;
      const preferred = node.querySelector<HTMLElement>('[data-autofocus]');
      (preferred ?? node).focus({ preventScroll: true });
    });

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.stopPropagation();
        onCloseRef.current();
        return;
      }

      if (event.key !== 'Tab') return;

      const node = dialogRef.current;
      if (!node) return;

      const focusables: HTMLElement[] = [];
      node.querySelectorAll<HTMLElement>(FOCUSABLE).forEach((el) => {
        const isVisible = el.offsetParent !== null || el === document.activeElement;
        if (isVisible) focusables.push(el);
      });

      if (focusables.length === 0) {
        event.preventDefault();
        return;
      }

      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement as HTMLElement | null;

      if (event.shiftKey && (active === first || !node.contains(active))) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown, true);

    return () => {
      window.cancelAnimationFrame(focusFrame);
      document.removeEventListener('keydown', handleKeyDown, true);

      lockCount = Math.max(0, lockCount - 1);
      if (lockCount === 0) {
        document.body.style.overflow = savedOverflow;
      }

      previouslyFocused.current?.focus?.({ preventScroll: true });
    };
  }, [isOpen]);

  return dialogRef;
};