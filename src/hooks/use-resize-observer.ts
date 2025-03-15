import { useState, useCallback } from 'react';

export function useResizeObserver(onResize: (width: number) => void) {
  const [width, setWidth] = useState(0);

  const ref = useCallback((node: HTMLElement | null) => {
    if (!node) return; // unmount case, nothing to do

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (entry) {
        setWidth(entry.contentRect.width);
        onResize(entry.contentRect.width);
      }
    });

    observer.observe(node);

    // Cleanup when node changes or unmounts
    return () => {
      observer.disconnect();
    };
  }, [onResize]);

  return { ref, width };
}