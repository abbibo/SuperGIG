"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const IMAGES = [
  "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&auto=format&fit=crop&q=60"
];

export function ImageCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleDragEnd = (event: any, info: any) => {
    if (info.offset.x < -50) {
       // Swipe Left
       setCurrentIndex((prev) => (prev + 1) % IMAGES.length);
    } else if (info.offset.x > 50) {
       // Swipe Right
       setCurrentIndex((prev) => (prev - 1 + IMAGES.length) % IMAGES.length);
    }
  };

  return (
    <div className="w-full flex flex-col items-center gap-4">
      {/* Carousel Container */}
      <div className="relative w-full aspect-[4/3] max-h-[300px] overflow-hidden rounded-3xl bg-gray-100 shadow-sm">
        <AnimatePresence initial={false} mode="wait">
             <motion.img
                key={currentIndex}
                src={IMAGES[currentIndex]}
                alt={`Slide ${currentIndex}`}
                className="absolute inset-0 w-full h-full object-cover"
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.3 }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                onDragEnd={handleDragEnd}
             />
        </AnimatePresence>
      </div>

      {/* Pagination Indicators */}
      <div className="flex items-center gap-1.5">
         {IMAGES.map((_, idx) => (
             <div 
               key={idx}
               className={`h-1.5 rounded-full transition-all duration-300 ${
                  idx === currentIndex ? 'w-8 bg-blue-500' : 'w-1.5 bg-blue-200'
               }`}
             />
         ))}
      </div>
    </div>
  );
}
