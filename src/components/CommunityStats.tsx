'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Trophy, 
  Users, 
  MapPin, 
  Star, 
  Target, 
  Globe,
  TrendingUp,
  Award
} from 'lucide-react';

interface Stat {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: number;
  target: number;
  suffix: string;
  color: string;
  bgColor: string;
  delay: number;
}

const communityStats: Stat[] = [
  {
    id: 'holes-rated',
    icon: Trophy,
    label: 'Holes Rated',
    value: 0,
    target: 127543,
    suffix: '+',
    color: 'text-yellow-500',
    bgColor: 'from-yellow-500/10 to-yellow-600/10 border-yellow-500/20',
    delay: 0
  },
  {
    id: 'active-golfers',
    icon: Users,
    label: 'Active Golfers',
    value: 0,
    target: 15847,
    suffix: '+',
    color: 'text-blue-500',
    bgColor: 'from-blue-500/10 to-blue-600/10 border-blue-500/20',
    delay: 0.2
  },
  {
    id: 'courses-discovered',
    icon: MapPin,
    label: 'Courses Discovered',
    value: 0,
    target: 3294,
    suffix: '',
    color: 'text-emerald-500',
    bgColor: 'from-emerald-500/10 to-emerald-600/10 border-emerald-500/20',
    delay: 0.4
  },
  {
    id: 'average-rating',
    icon: Star,
    label: 'Average Rating',
    value: 0,
    target: 4.8,
    suffix: '/5',
    color: 'text-purple-500',
    bgColor: 'from-purple-500/10 to-purple-600/10 border-purple-500/20',
    delay: 0.6
  },
  {
    id: 'bucket-lists',
    icon: Target,
    label: 'Bucket List Goals',
    value: 0,
    target: 89156,
    suffix: '+',
    color: 'text-red-500',
    bgColor: 'from-red-500/10 to-red-600/10 border-red-500/20',
    delay: 0.8
  },
  {
    id: 'countries',
    icon: Globe,
    label: 'Countries Covered',
    value: 0,
    target: 67,
    suffix: '',
    color: 'text-indigo-500',
    bgColor: 'from-indigo-500/10 to-indigo-600/10 border-indigo-500/20',
    delay: 1.0
  }
];

function useCountUp(target: number, duration: number = 2000, delay: number = 0) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    if (!hasStarted) return;

    const startTime = Date.now() + delay;

    const timer = setInterval(() => {
      const now = Date.now();
      
      if (now < startTime) return;
      
      const progress = Math.min((now - startTime) / duration, 1);
      
      // Use easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentCount = Math.floor(easeOutQuart * target);
      
      setCount(currentCount);
      
      if (progress >= 1) {
        clearInterval(timer);
        setCount(target);
      }
    }, 16); // ~60fps

    return () => clearInterval(timer);
  }, [target, duration, delay, hasStarted]);

  const startCounting = () => setHasStarted(true);

  return { count, startCounting };
}

function StatCard({ stat, isInView }: { stat: Stat; isInView: boolean }) {
  const { count, startCounting } = useCountUp(stat.target, 2000, stat.delay * 1000);
  const Icon = stat.icon;

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(startCounting, stat.delay * 1000);
      return () => clearTimeout(timer);
    }
  }, [isInView, startCounting, stat.delay]);

  const formatNumber = (num: number) => {
    if (stat.id === 'average-rating') {
      return num.toFixed(1);
    }
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(0) + 'K';
    }
    return num.toString();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ 
        duration: 0.6, 
        delay: stat.delay,
        type: "spring",
        stiffness: 100
      }}
      whileHover={{ 
        y: -8, 
        scale: 1.05,
        transition: { duration: 0.2 }
      }}
      className={`glass-strong p-6 rounded-2xl border bg-gradient-to-br ${stat.bgColor} group relative overflow-hidden gpu-accelerated`}
    >
      {/* Animated background glow */}
      <motion.div
        className={`absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500`}
        style={{
          background: `radial-gradient(circle at center, ${stat.color.replace('text-', '').replace('-500', '')}, transparent)`
        }}
        animate={{
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <div className="relative z-10">
        {/* Icon */}
        <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${stat.bgColor.replace('/10', '/20')} flex items-center justify-center mb-4 mx-auto`}>
          <Icon className={`w-8 h-8 ${stat.color}`} />
        </div>

        {/* Number */}
        <div className="text-center mb-2">
          <motion.span 
            className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white block counter-animate"
            animate={{ 
              scale: isInView ? [1, 1.05, 1] : 1
            }}
            transition={{ 
              duration: 0.5,
              delay: stat.delay + 0.5
            }}
          >
            {formatNumber(count)}{stat.suffix}
          </motion.span>
        </div>

        {/* Label */}
        <div className="text-center">
          <span className="text-sm md:text-base font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
            {stat.label}
          </span>
        </div>

        {/* Progress indicator for visual appeal */}
        {isInView && (
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-current to-transparent opacity-20"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ 
              duration: 2, 
              delay: stat.delay,
              ease: "easeOut"
            }}
            style={{ color: stat.color.replace('text-', '') }}
          />
        )}
      </div>
    </motion.div>
  );
}

export function CommunityStats() {
  const [isInView, setIsInView] = useState(false);

  return (
    <section className="py-20 relative bg-white dark:bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          onViewportEnter={() => setIsInView(true)}
        >
          <motion.div
            className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-primary-500/10 to-emerald-600/10 border border-primary-500/20 rounded-full text-primary-500 font-semibold mb-6"
            whileHover={{ scale: 1.05, y: -2 }}
          >
            <TrendingUp className="w-4 h-4" />
            <span>Growing Community</span>
          </motion.div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-gray-900 dark:text-white">
            The numbers speak for themselves
          </h2>
          <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Join a thriving community of golf enthusiasts who are actively rating, discovering, and sharing their golf experiences
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-16">
          {communityStats.map((stat) => (
            <StatCard key={stat.id} stat={stat} isInView={isInView} />
          ))}
        </div>

        {/* Additional Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto"
        >
          {/* Growth Highlight */}
          <div className="text-center glass-strong p-6 rounded-2xl border border-emerald-500/20">
            <motion.div
              className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-green-600 rounded-xl flex items-center justify-center mx-auto mb-4"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <TrendingUp className="w-6 h-6 text-white" />
            </motion.div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Rapid Growth</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Growing by <span className="text-emerald-500 font-bold">500+ users</span> every week
            </p>
          </div>

          {/* Quality Highlight */}
          <div className="text-center glass-strong p-6 rounded-2xl border border-yellow-500/20">
            <motion.div
              className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-xl flex items-center justify-center mx-auto mb-4"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Award className="w-6 h-6 text-white" />
            </motion.div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Quality First</h3>
            <p className="text-gray-600 dark:text-gray-300">
              <span className="text-yellow-500 font-bold">98% satisfaction</span> rate among beta users
            </p>
          </div>

          {/* Global Reach */}
          <div className="text-center glass-strong p-6 rounded-2xl border border-blue-500/20">
            <motion.div
              className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4"
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <Globe className="w-6 h-6 text-white" />
            </motion.div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Global Reach</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Active in <span className="text-blue-500 font-bold">67 countries</span> worldwide
            </p>
          </div>
        </motion.div>

        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-r from-primary-500/5 to-emerald-500/5 rounded-full blur-3xl"
            animate={{
              x: [0, 30, 0],
              y: [0, -20, 0],
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-full blur-3xl"
            animate={{
              x: [0, -40, 0],
              y: [0, 30, 0],
            }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </div>
    </section>
  );
}