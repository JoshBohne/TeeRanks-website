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
            <div className="absolute top-4 left-8 right-8 flex justify-between items-center text-gray-900 dark:text-white text-sm font-semibold z-10">
              <span>9:41</span>
              <div className="flex items-center space-x-1">
                <div className="w-4 h-2 border border-white rounded-sm">
                  <div className="w-3 h-1 bg-white rounded-sm"></div>
                </div>
              </div>
            </div>

            {/* App Content */}
            <div className="pt-16 pb-8 px-6 h-full flex flex-col bg-gray-50 dark:bg-gray-800">
              {/* App Header */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-green-500 to-green-600 flex items-center justify-center shadow-md">
                    <span className="text-white font-bold text-lg">T</span>
                  </div>
                  <span className="text-gray-900 dark:text-white font-bold text-xl">TeeRank</span>
                </div>
                <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center">
                  <div className="w-4 h-4 rounded-full bg-gray-400 dark:bg-gray-300"></div>
                </div>
              </div>

              {/* Golf Hole Card */}
              <div 
                className="bg-white dark:bg-gray-700 rounded-2xl p-4 mb-6 relative overflow-hidden shadow-lg"
              >
                <div className="aspect-video rounded-xl overflow-hidden mb-4 relative">
                  <div 
                    className="w-full h-full bg-gradient-to-br from-emerald-400 to-green-600 relative"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'%3E%3Cdefs%3E%3ClinearGradient id='g1' x1='0' y1='0' x2='1' y2='1'%3E%3Cstop offset='0%25' stop-color='%2334d399'/%3E%3Cstop offset='100%25' stop-color='%2310b981'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='400' height='300' fill='url(%23g1)'/%3E%3Cellipse cx='350' cy='50' rx='20' ry='8' fill='%23059669'/%3E%3Cellipse cx='100' cy='200' rx='30' ry='12' fill='%23047857'/%3E%3Cpath d='M0,250 Q200,200 400,260 L400,300 L0,300 Z' fill='%23065f46'/%3E%3C/svg%3E")`,
                      backgroundSize: 'cover'
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    <div className="absolute bottom-2 left-2 text-white font-bold text-sm drop-shadow-lg">
                      Pebble Beach #7
                    </div>
                  </div>
                </div>
                <h3 className="text-gray-900 dark:text-white font-bold text-lg mb-2">Pebble Beach Golf Links</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">Hole #7 • Par 3 • 106 yards • Monterey, CA</p>
                
                {/* Rating Display */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="w-5 h-5">
                        <svg viewBox="0 0 20 20" fill={i < 4 ? "#FFD700" : "#E5E7EB"}>
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                        </svg>
                      </div>
                    ))}
                    <span className="text-gray-600 dark:text-gray-300 text-sm ml-2">8.2/10</span>
                  </div>
                  <span className="text-gray-500 dark:text-gray-400 text-xs">124 ratings</span>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2">
                  <button className="flex-1 py-3 px-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl font-semibold text-sm shadow-md">
                    Rate This Hole
                  </button>
                  <button className="flex-1 py-3 px-4 bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-xl font-semibold text-sm border border-gray-200 dark:border-gray-500">
                    Add to List
                  </button>
                </div>
              </div>

              {/* Bottom Navigation */}
              <div className="mt-auto">
                <div className="bg-white dark:bg-gray-700 rounded-2xl p-3 flex justify-around items-center shadow-lg border border-gray-100 dark:border-gray-600">
                  {[
                    { name: 'Home', icon: '🏠' },
                    { name: 'Discover', icon: '⭐' },
                    { name: 'Lists', icon: '📋' },
                    { name: 'Profile', icon: '👤' }
                  ].map((tab, i) => (
                    <div key={tab.name} className="flex flex-col items-center space-y-1">
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                        i === 1 ? 'bg-green-500' : 'bg-transparent'
                      }`}>
                        <span className="text-sm">{i === 1 ? '⭐' : tab.icon}</span>
                      </div>
                      <span className={`text-xs font-medium ${
                        i === 1 ? 'text-green-500' : 'text-gray-400 dark:text-gray-300'
                      }`}>
                        {tab.name}
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