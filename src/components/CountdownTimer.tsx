'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Zap } from 'lucide-react';

interface CountdownTimerProps {
  targetDate: Date;
  className?: string;
  variant?: 'default' | 'neon' | 'minimal';
  showIcon?: boolean;
  showLabels?: boolean;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export function CountdownTimer({ 
  targetDate, 
  className = '', 
  variant = 'default',
  showIcon = true,
  showLabels = true 
}: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const calculateTimeLeft = (): TimeLeft => {
      const now = new Date().getTime();
      const target = targetDate.getTime();
      const difference = target - now;

      if (difference > 0) {
        return {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        };
      }

      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    };

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    // Calculate initial time
    setTimeLeft(calculateTimeLeft());

    return () => clearInterval(timer);
  }, [targetDate, mounted]);

  if (!mounted) {
    return (
      <div className={`${getVariantStyles().container} ${className}`}>
        <div className="animate-pulse">
          <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded mb-4"></div>
          <div className="flex space-x-4">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="flex-1">
                <div className="h-12 bg-gray-300 dark:bg-gray-600 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  function getVariantStyles() {
    switch (variant) {
      case 'neon':
        return {
          container: 'glass-strong p-6 rounded-2xl border border-cyan-500/30 bg-gradient-to-br from-cyan-900/20 to-blue-900/20 backdrop-blur-xl shadow-2xl shadow-cyan-500/10',
          header: 'text-2xl font-bold text-cyan-300 mb-6 text-center flex items-center justify-center space-x-2',
          timeContainer: 'grid grid-cols-2 md:grid-cols-4 gap-4',
          timeBlock: 'text-center p-4 rounded-xl bg-gradient-to-br from-cyan-400/10 to-blue-400/10 border border-cyan-400/20 backdrop-blur-sm',
          timeNumber: 'text-3xl md:text-4xl font-black text-cyan-300 font-mono tracking-tighter drop-shadow-glow',
          timeLabel: 'text-sm font-semibold text-cyan-400/80 uppercase tracking-wider mt-2',
        };
      case 'minimal':
        return {
          container: 'p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50',
          header: 'text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4 text-center flex items-center justify-center space-x-2',
          timeContainer: 'flex justify-center space-x-6',
          timeBlock: 'text-center',
          timeNumber: 'text-2xl font-bold text-gray-900 dark:text-white font-mono',
          timeLabel: 'text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mt-1',
        };
      default:
        return {
          container: 'glass-strong p-6 rounded-2xl border border-emerald-500/20 bg-gradient-to-br from-emerald-900/10 to-green-900/10 backdrop-blur-xl shadow-xl',
          header: 'text-xl font-bold text-emerald-300 mb-6 text-center flex items-center justify-center space-x-2',
          timeContainer: 'grid grid-cols-2 md:grid-cols-4 gap-4',
          timeBlock: 'text-center p-4 rounded-xl bg-gradient-to-br from-emerald-400/10 to-green-400/10 border border-emerald-400/20 backdrop-blur-sm hover:bg-emerald-400/20 transition-all duration-300',
          timeNumber: 'text-3xl md:text-4xl font-black text-emerald-300 font-mono tracking-tighter',
          timeLabel: 'text-sm font-semibold text-emerald-400/80 uppercase tracking-wider mt-2',
        };
    }
  }

  const styles = getVariantStyles();

  const isExpired = timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0;

  const timeUnits = [
    { value: timeLeft.days, label: 'Days', key: 'days' },
    { value: timeLeft.hours, label: 'Hours', key: 'hours' },
    { value: timeLeft.minutes, label: 'Minutes', key: 'minutes' },
    { value: timeLeft.seconds, label: 'Seconds', key: 'seconds' },
  ];

  return (
    <motion.div
      className={`${styles.container} ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {isExpired ? (
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center py-8"
        >
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-emerald-400 to-green-500 rounded-full flex items-center justify-center"
          >
            <Zap className="w-8 h-8 text-white" />
          </motion.div>
          <h3 className="text-2xl font-bold text-emerald-300 mb-2">Launch Time!</h3>
          <p className="text-emerald-400/80">TeeRank is now live. Start rating holes!</p>
        </motion.div>
      ) : (
        <>
          {showIcon && (
            <div className={styles.header}>
              {variant === 'neon' ? (
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Zap className="w-6 h-6" />
                </motion.div>
              ) : (
                <Clock className="w-6 h-6" />
              )}
              <span>Beta Launch Countdown</span>
            </div>
          )}

          <div className={styles.timeContainer}>
            {timeUnits.map((unit) => (
              <motion.div
                key={unit.key}
                className={styles.timeBlock}
                whileHover={{ scale: 1.05, y: -2 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={unit.value}
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 20, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className={styles.timeNumber}
                  >
                    {String(unit.value).padStart(2, '0')}
                  </motion.div>
                </AnimatePresence>
                {showLabels && (
                  <div className={styles.timeLabel}>
                    {unit.label}
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Pulsing indicator */}
          {variant === 'neon' && (
            <motion.div
              className="flex justify-center mt-6"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div className="flex space-x-1">
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-2 h-2 rounded-full bg-cyan-400"
                    animate={{ scale: [0.8, 1.2, 0.8] }}
                    transition={{ duration: 1, delay: i * 0.2, repeat: Infinity }}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </>
      )}
    </motion.div>
  );
}

// Helper component for different preset target dates
interface LaunchCountdownProps {
  className?: string;
  variant?: 'default' | 'neon' | 'minimal';
}

export function LaunchCountdown({ className, variant }: LaunchCountdownProps) {
  // Set target date to March 1, 2025
  const targetDate = new Date('2025-03-01T00:00:00');
  
  return (
    <CountdownTimer 
      targetDate={targetDate}
      className={className}
      variant={variant}
      showIcon={true}
      showLabels={true}
    />
  );
}

// Compact version for CTAs
export function CompactCountdown({ className }: { className?: string }) {
  const targetDate = new Date('2025-03-01T00:00:00');
  
  return (
    <CountdownTimer 
      targetDate={targetDate}
      className={className}
      variant="minimal"
      showIcon={false}
      showLabels={false}
    />
  );
}