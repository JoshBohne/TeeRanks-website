'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, ArrowRight, X } from 'lucide-react';
import { WaitlistForm } from './WaitlistForm';

interface WaitlistButtonProps {
  className?: string;
  variant?: 'primary' | 'secondary';
  children?: React.ReactNode;
}

export function WaitlistButton({ 
  className = '', 
  variant = 'secondary',
  children 
}: WaitlistButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const baseStyles = variant === 'primary' 
    ? "group relative px-8 py-4 bg-gradient-to-r from-emerald-500 to-green-600 text-white font-semibold text-lg rounded-2xl flex items-center justify-center space-x-3 shadow-xl overflow-hidden"
    : "group px-8 py-4 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white font-semibold text-lg rounded-2xl flex items-center justify-center space-x-3 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-emerald-500/40 transition-all duration-300";

  return (
    <>
      <motion.button
        onClick={openModal}
        className={`${baseStyles} ${className}`}
        whileHover={{ scale: 1.02, y: -2 }}
        whileTap={{ scale: 0.98 }}
      >
        <Users className="w-5 h-5" />
        <span>{children || "Join Beta Waitlist"}</span>
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </motion.button>

      {/* Modal Overlay */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={closeModal}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="relative max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={closeModal}
                className="absolute -top-2 -right-2 z-10 w-8 h-8 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center shadow-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <X className="w-4 h-4 text-gray-600 dark:text-gray-400" />
              </button>

              {/* Waitlist Form */}
              <WaitlistForm variant="cta" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}