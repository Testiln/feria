import React, { useEffect, useRef, useState } from 'react';
import { ShoppingCart } from 'lucide-react';

export default function MobileCartButton({ cartItemsCount, setIsMobileCartOpen }) {
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

    setIsMobileCartOpen(true);
  };

  return (
    <button 
      className="lg:hidden fixed bottom-6 right-6 w-16 h-16 bg-[#C62828] text-white rounded-full shadow-2xl flex items-center justify-center z-40 hover:scale-105 touch-none select-none"
      style={{ transform: `translateY(${offsetY}px)`, transition: dragState.current.isDragging ? 'none' : 'transform 120ms ease-out' }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={stopDragging}
      onPointerCancel={stopDragging}
      onClick={handleClick}
    >
      <div className="relative">
        <ShoppingCart size={28} />
        {cartItemsCount > 0 && (
          <span className="absolute -top-3 -right-3 bg-white text-[#C62828] font-bold text-xs w-6 h-6 rounded-full flex items-center justify-center border-2 border-[#C62828]">
            {cartItemsCount}
          </span>
        )}
      </div>
    </button>
  );
}