'use client';

import { motion } from "framer-motion";
import Image from "next/image";

interface IPhoneFrameProps {
  className?: string;
}

export function IPhoneFrame({ className = "" }: IPhoneFrameProps) {
  return (
    <motion.div
      className={`relative ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.4 }}
    >
      {/* iPhone Device Frame */}
      <motion.div
        className="relative w-72 h-[580px] sm:w-80 sm:h-[640px] lg:w-80 lg:h-[640px] mx-auto"
        animate={{ 
          y: [0, -10, 0],
          rotateY: [0, 2, 0]
        }}
        transition={{ 
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        {/* Phone Frame */}
        <div 
          className="absolute inset-0 rounded-[3rem] p-3"
          style={{
            background: 'linear-gradient(145deg, #1a1a1a, #0a0a0a)',
            boxShadow: `
              var(--shadow-large),
              inset 0 1px 0 rgba(255, 255, 255, 0.1),
              0 0 30px var(--primary-green-glow)
            `
          }}
        >
          {/* Screen */}
          <div 
            className="relative w-full h-full rounded-[2.5rem] overflow-hidden"
            style={{
              background: 'var(--surface)',
              boxShadow: 'inset 0 0 20px rgba(0, 0, 0, 0.3)'
            }}
          >
            {/* Dynamic Island */}
            <div 
              className="absolute top-6 left-1/2 transform -translate-x-1/2 w-24 h-6 rounded-full z-20"
              style={{ background: '#000000' }}
            />
            
            {/* Status Bar */}
            <div className="absolute top-4 left-8 right-8 flex justify-between items-center text-white text-sm font-semibold z-10">
              <span>9:41</span>
              <div className="flex items-center space-x-1">
                <div className="w-4 h-2 border border-white rounded-sm">
                  <div className="w-3 h-1 bg-white rounded-sm"></div>
                </div>
              </div>
            </div>

            {/* App Content */}
            <div className="pt-16 pb-8 px-6 h-full flex flex-col" style={{ background: 'var(--gradient-hero)' }}>
              {/* App Header */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-3">
                  <div 
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: 'var(--gradient-green)' }}
                  >
                    <span className="text-black font-bold text-lg">T</span>
                  </div>
                  <span className="text-white font-bold text-xl">TeeRank</span>
                </div>
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                  <div className="w-4 h-4 rounded-full bg-white/40"></div>
                </div>
              </div>

              {/* Golf Hole Card */}
              <div 
                className="glass-strong rounded-2xl p-4 mb-6 relative overflow-hidden"
                style={{ boxShadow: 'var(--shadow-medium)' }}
              >
                <div className="aspect-video rounded-xl overflow-hidden mb-4 relative">
                  <div 
                    className="w-full h-full bg-gradient-to-br from-green-600 to-green-800 flex items-center justify-center"
                  >
                    <span className="text-white font-semibold">Pebble Beach #7</span>
                  </div>
                </div>
                <h3 className="text-white font-bold text-lg mb-2">Pebble Beach Golf Links</h3>
                <p className="text-white/70 text-sm mb-3">Hole #7 • Par 3 • 106 yards</p>
                
                {/* Rating Stars */}
                <div className="flex items-center space-x-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <div 
                      key={i}
                      className="w-6 h-6 rounded-full flex items-center justify-center"
                      style={{ 
                        background: i < 4 ? 'var(--feature-gold)' : 'var(--gray-400)',
                        color: i < 4 ? '#000' : 'var(--gray-600)'
                      }}
                    >
                      ★
                    </div>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2">
                  <button 
                    className="flex-1 py-2 px-4 rounded-xl font-semibold text-sm"
                    style={{ 
                      background: 'var(--gradient-green)',
                      color: '#000'
                    }}
                  >
                    Rate Hole
                  </button>
                  <button 
                    className="flex-1 py-2 px-4 rounded-xl font-semibold text-sm text-white border"
                    style={{ borderColor: 'var(--gray-400)' }}
                  >
                    Add to Bucket List
                  </button>
                </div>
              </div>

              {/* Bottom Navigation */}
              <div className="mt-auto">
                <div className="glass-strong rounded-2xl p-3 flex justify-around items-center">
                  {['Home', 'Discover', 'Lists', 'Profile'].map((tab, i) => (
                    <div key={tab} className="flex flex-col items-center space-y-1">
                      <div 
                        className="w-6 h-6 rounded-lg flex items-center justify-center"
                        style={{ 
                          background: i === 0 ? 'var(--primary-green)' : 'transparent',
                          color: i === 0 ? '#000' : 'var(--gray-400)'
                        }}
                      >
                        <div className="w-4 h-4 bg-current rounded-sm"></div>
                      </div>
                      <span 
                        className="text-xs font-medium"
                        style={{ color: i === 0 ? 'var(--primary-green)' : 'var(--gray-400)' }}
                      >
                        {tab}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Screen reflection effect */}
            <div 
              className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent pointer-events-none"
              style={{ borderRadius: '2.5rem' }}
            />
          </div>
        </div>

        {/* Phone buttons */}
        <div className="absolute right-0 top-20 w-1 h-12 bg-gray-800 rounded-l-lg"></div>
        <div className="absolute right-0 top-36 w-1 h-8 bg-gray-800 rounded-l-lg"></div>
        <div className="absolute right-0 top-48 w-1 h-8 bg-gray-800 rounded-l-lg"></div>
        <div className="absolute left-0 top-32 w-1 h-20 bg-gray-800 rounded-r-lg"></div>
      </motion.div>

      {/* Glow effect */}
      <div 
        className="absolute inset-0 rounded-[3rem] opacity-30 blur-xl"
        style={{
          background: 'radial-gradient(circle at center, var(--primary-green-glow) 0%, transparent 70%)',
          transform: 'scale(1.1)',
          zIndex: -1
        }}
      />
    </motion.div>
  );
}