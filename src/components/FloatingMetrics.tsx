'use client';

import { motion } from "framer-motion";
import { Star, Users, Clock, Trophy } from "lucide-react";
import { useState, useEffect } from "react";

interface FloatingMetricProps {
  className?: string;
  delay?: number;
}

export function HolesRatedMetric({ className = "", delay = 0 }: FloatingMetricProps) {
  return (
    <motion.div
      className={`absolute glass-strong rounded-2xl p-4 backdrop-blur-sm border border-primary-500/20 ${className}`}
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ 
        opacity: 1, 
        y: [0, -8, 0], 
        scale: 1,
        rotate: [0, 1, 0],
      }}
      transition={{ 
        opacity: { duration: 0.6, delay },
        scale: { duration: 0.6, delay },
        y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
        rotate: { duration: 4, repeat: Infinity, ease: "easeInOut" },
      }}
    >
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 flex items-center justify-center shadow-lg">
          <Trophy className="w-5 h-5 text-white" />
        </div>
        <div>
          <div className="text-lg font-bold text-gray-900 dark:text-white">50K+</div>
          <div className="text-sm text-gray-600 dark:text-gray-300 font-medium">Holes Rated</div>
        </div>
      </div>
    </motion.div>
  );
}

export function AverageRatingMetric({ className = "", delay = 0 }: FloatingMetricProps) {
  return (
    <motion.div
      className={`absolute glass-strong rounded-2xl p-4 backdrop-blur-sm border border-yellow-400/20 ${className}`}
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ 
        opacity: 1, 
        y: [0, -6, 0], 
        scale: 1,
        rotate: [0, -1, 0],
      }}
      transition={{ 
        opacity: { duration: 0.6, delay },
        scale: { duration: 0.6, delay },
        y: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 },
        rotate: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 },
      }}
    >
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-yellow-400 to-yellow-600 flex items-center justify-center shadow-lg">
          <Star className="w-5 h-5 text-white fill-current" />
        </div>
        <div>
          <div className="text-lg font-bold text-gray-900 dark:text-white">4.8★</div>
          <div className="text-sm text-gray-600 dark:text-gray-300 font-medium">Average Rating</div>
        </div>
      </div>
    </motion.div>
  );
}

export function BetaSpotsMetric({ className = "", delay = 0 }: FloatingMetricProps) {
  const [spots, setSpots] = useState(247);

  useEffect(() => {
    const interval = setInterval(() => {
      setSpots(prev => {
        const newSpots = prev - 1;
        return newSpots <= 200 ? 247 : newSpots;
      });
    }, 30000); // Decrease every 30 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className={`absolute glass-strong rounded-2xl p-4 backdrop-blur-sm border border-red-400/20 shadow-red-500/10 ${className}`}
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ 
        opacity: 1, 
        y: [0, -10, 0],
        scale: [1, 1.02, 1],
        rotate: [0, 2, 0],
      }}
      transition={{ 
        opacity: { duration: 0.6, delay },
        y: { duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 2 },
        rotate: { duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 2 },
        scale: { duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 2 },
      }}
    >
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-red-500 to-red-600 flex items-center justify-center shadow-lg">
          <Clock className="w-5 h-5 text-white" />
        </div>
        <div>
          <div className="text-lg font-bold text-red-600 dark:text-red-400">{spots}</div>
          <div className="text-sm text-gray-600 dark:text-gray-300 font-medium">Beta Spots Left</div>
        </div>
      </div>
      {/* Urgency pulse effect */}
      <motion.div
        className="absolute inset-0 rounded-2xl border-2 border-red-400/30"
        animate={{
          scale: [1, 1.05, 1],
          opacity: [0.7, 0.3, 0.7],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </motion.div>
  );
}

export function LiveUserCountMetric({ className = "", delay = 0 }: FloatingMetricProps) {
  const [userCount, setUserCount] = useState(23);

  useEffect(() => {
    const interval = setInterval(() => {
      setUserCount(prev => {
        const change = Math.random() > 0.5 ? 1 : -1;
        const newCount = prev + change;
        return Math.max(15, Math.min(35, newCount));
      });
    }, 8000); // Update every 8 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className={`absolute glass-strong rounded-2xl p-4 backdrop-blur-sm border border-blue-400/20 ${className}`}
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ 
        opacity: 1, 
        y: [0, -7, 0], 
        scale: 1,
        rotate: [0, -0.5, 0],
      }}
      transition={{ 
        opacity: { duration: 0.6, delay },
        scale: { duration: 0.6, delay },
        y: { duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 3 },
        rotate: { duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 3 },
      }}
    >
      <div className="flex items-center space-x-3">
        <div className="relative">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center shadow-lg">
            <Users className="w-5 h-5 text-white" />
          </div>
          {/* Live indicator */}
          <div className="absolute -top-1 -right-1">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse border-2 border-white"></div>
            <div className="absolute inset-0 w-3 h-3 bg-green-400 rounded-full animate-ping opacity-75"></div>
          </div>
        </div>
        <div>
          <div className="text-lg font-bold text-gray-900 dark:text-white">{userCount}</div>
          <div className="text-sm text-gray-600 dark:text-gray-300 font-medium">Online Now</div>
        </div>
      </div>
    </motion.div>
  );
}