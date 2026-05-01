import React, { useEffect, useRef, useState } from 'react';
import { ArrowUp } from 'lucide-react';

export default function ScrollToTopButton({ show }) {
  const [offsetY, setOffsetY] = useState(0);
  const dragState = useRef({ isDragging: false, startY: 0, startOffsetY: 0, moved: false });

  useEffect(() => {
    const handleResize = () => {
      setOffsetY((currentOffset) => currentOffset);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handlePointerDown = (event) => {
    dragState.current = {
      isDragging: true,
      startY: event.clientY,
      startOffsetY: offsetY,
      moved: false,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event) => {
    if (!dragState.current.isDragging) return;

    const deltaY = event.clientY - dragState.current.startY;
    if (Math.abs(deltaY) > 4) {
      dragState.current.moved = true;
    }

    const rect = event.currentTarget.getBoundingClientRect();
    const padding = 12;
    const minOffset = -(rect.top - padding);
    const maxOffset = window.innerHeight - rect.bottom - padding;
    const nextOffset = dragState.current.startOffsetY + deltaY;
    const clampedOffset = Math.min(maxOffset, Math.max(minOffset, nextOffset));

    setOffsetY(clampedOffset);
  };

  const stopDragging = (event) => {
    if (!dragState.current.isDragging) return;
    dragState.current.isDragging = false;
    try {
      event.currentTarget.releasePointerCapture(event.pointerId);
    } catch {
      // ignore capture release errors
    }
  };

  const handleClick = (event) => {
    if (dragState.current.moved) {
      event.preventDefault();
      event.stopPropagation();
      dragState.current.moved = false;
      return;
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!show) return null;

  return (
    <button
      className="fixed bottom-8 left-6 md:bottom-12 md:left-6 md:right-auto z-40 w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#C62828] hover:bg-[#8E1C1C] text-white shadow-lg hover:shadow-xl transition-all flex items-center justify-center animate-fade-in touch-none select-none"
      style={{ transform: `translateY(${offsetY}px)`, transition: dragState.current.isDragging ? 'none' : 'transform 120ms ease-out' }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={stopDragging}
      onPointerCancel={stopDragging}
      onClick={handleClick}
      aria-label="Scroll to top"
    >
      <ArrowUp size={24} />
    </button>
  );
}
