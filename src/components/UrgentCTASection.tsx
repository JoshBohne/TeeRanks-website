'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Zap, 
  Users, 
  Clock, 
  Star,
  Trophy,
  Target,
  Flame
} from 'lucide-react';
import { WaitlistForm } from './WaitlistForm';
import { LaunchCountdown } from './CountdownTimer';

export function UrgentCTASection() {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const stagger = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Vibrant Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-emerald-900" />
      
      {/* Animated Background Pattern */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 opacity-20" 
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3Ccircle cx='10' cy='10' r='1'/%3E%3Ccircle cx='50' cy='50' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }} 
        />
        
        {/* Floating Gradient Orbs */}
        <motion.div
          className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-cyan-400/20 to-blue-500/20 rounded-full blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-emerald-400/20 to-green-500/20 rounded-full blur-3xl"
          animate={{
            x: [0, -40, 0],
            y: [0, 40, 0],
            scale: [1.2, 1, 1.2],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-r from-purple-400/15 to-pink-500/15 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, 180, 360],
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          {/* FOMO Badge */}
          <motion.div
            className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-red-500/20 to-orange-500/20 border border-red-500/30 rounded-full text-red-300 font-semibold mb-6"
            {...fadeInUp}
            whileHover={{ scale: 1.05, y: -2 }}
          >
            <Flame className="w-4 h-4" />
            <span>Limited Beta Access • Only 500 Spots Left</span>
            <Flame className="w-4 h-4" />
          </motion.div>

          {/* Main Headline */}
          <motion.h2 
            className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black mb-6 leading-tight"
            {...fadeInUp}
            transition={{ delay: 0.1, duration: 0.8 }}
          >
            <span className="text-white">Skip the</span>
            <br />
            <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent animate-gradient-x drop-shadow-glow">
              10,000 Person
            </span>
            <br />
            <span className="text-white">Waitlist</span>
          </motion.h2>

          <motion.p 
            className="text-xl sm:text-2xl text-white/80 mb-12 max-w-3xl mx-auto leading-relaxed"
            {...fadeInUp}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Get exclusive early access to TeeRank and start building your golf legacy before everyone else. Limited spots available.
          </motion.p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* Left Column - Countdown & Benefits */}
          <motion.div
            variants={stagger}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Countdown Timer */}
            <motion.div variants={fadeInUp}>
              <LaunchCountdown variant="neon" />
            </motion.div>

            {/* Urgency Stats */}
            <motion.div 
              variants={fadeInUp}
              className="grid grid-cols-2 gap-4"
            >
              <div className="glass-strong p-6 rounded-2xl border border-cyan-400/20 text-center">
                <motion.div
                  className="text-3xl font-black text-cyan-300 mb-2"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  9,432
                </motion.div>
                <div className="text-sm text-cyan-400/80 uppercase tracking-wider">On Waitlist</div>
              </div>
              <div className="glass-strong p-6 rounded-2xl border border-emerald-400/20 text-center">
                <motion.div
                  className="text-3xl font-black text-emerald-300 mb-2"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  568
                </motion.div>
                <div className="text-sm text-emerald-400/80 uppercase tracking-wider">Beta Spots Left</div>
              </div>
            </motion.div>

            {/* Exclusive Benefits */}
            <motion.div 
              variants={fadeInUp}
              className="glass-strong p-6 rounded-2xl border border-purple-400/20"
            >
              <h3 className="text-xl font-bold text-white mb-4 flex items-center space-x-2">
                <Trophy className="w-6 h-6 text-yellow-400" />
                <span>Exclusive Beta Perks</span>
              </h3>
              <div className="space-y-3">
                {[
                  { icon: Star, text: "Rate holes before anyone else", color: "text-yellow-400" },
                  { icon: Target, text: "Shape the future of TeeRank", color: "text-emerald-400" },
                  { icon: Users, text: "Exclusive beta community access", color: "text-cyan-400" },
                  { icon: Zap, text: "Priority customer support", color: "text-purple-400" }
                ].map((benefit, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center space-x-3"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <benefit.icon className={`w-5 h-5 ${benefit.color}`} />
                    <span className="text-white/80">{benefit.text}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Social Proof */}
            <motion.div
              variants={fadeInUp}
              className="flex items-center justify-center space-x-4 text-white/60"
            >
              <div className="flex -space-x-2">
                {[...Array(5)].map((_, i) => (
                  <motion.div 
                    key={i}
                    className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-green-600 border-2 border-white flex items-center justify-center text-xs font-bold text-white shadow-lg"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.2, ease: "easeInOut" }}
                  >
                    G
                  </motion.div>
                ))}
              </div>
              <span className="text-sm font-medium">Thousands already joined</span>
            </motion.div>
          </motion.div>

          {/* Right Column - Waitlist Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="sticky top-8"
          >
            <WaitlistForm variant="hero" />
          </motion.div>

        </div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <div className="flex items-center justify-center space-x-2 text-white/60">
            <Clock className="w-4 h-4" />
            <span className="text-sm">Beta access closes when countdown hits zero</span>
          </div>
        </motion.div>
      </div>

      {/* Shimmer Effect Overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12"
        animate={{
          x: ['-100%', '200%'],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatDelay: 5,
          ease: "easeInOut"
        }}
        style={{ width: '50%' }}
      />
    </section>
  );
}