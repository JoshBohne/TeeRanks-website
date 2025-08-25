'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, MapPin, Target, Users, Clock } from 'lucide-react';

interface Activity {
  id: string;
  type: 'rating' | 'completion' | 'discovery' | 'milestone';
  username: string;
  action: string;
  course: string;
  hole?: string;
  rating?: number;
  timestamp: string;
  timeAgo: string;
}

const sampleActivities: Activity[] = [
  {
    id: '1',
    type: 'rating',
    username: 'tiger_woods_fan',
    action: 'just rated',
    course: 'Augusta National',
    hole: '#12',
    rating: 9.2,
    timestamp: '2024-01-25T10:30:00Z',
    timeAgo: '2 mins ago'
  },
  {
    id: '2',
    type: 'completion',
    username: 'scottish_golfer',
    action: 'completed their bucket list goal at',
    course: 'St. Andrews',
    hole: '#18',
    timestamp: '2024-01-25T10:25:00Z',
    timeAgo: '5 mins ago'
  },
  {
    id: '3',
    type: 'discovery',
    username: 'pebble_enthusiast',
    action: 'discovered',
    course: 'Pebble Beach',
    hole: '#7',
    timestamp: '2024-01-25T10:20:00Z',
    timeAgo: '8 mins ago'
  },
  {
    id: '4',
    type: 'rating',
    username: 'course_hunter',
    action: 'just rated',
    course: 'TPC Sawgrass',
    hole: '#17',
    rating: 8.8,
    timestamp: '2024-01-25T10:15:00Z',
    timeAgo: '12 mins ago'
  },
  {
    id: '5',
    type: 'milestone',
    username: 'golf_traveler',
    action: 'reached 100 courses played!',
    course: 'Pine Valley',
    timestamp: '2024-01-25T10:10:00Z',
    timeAgo: '15 mins ago'
  },
  {
    id: '6',
    type: 'rating',
    username: 'links_lover',
    action: 'just rated',
    course: 'Royal County Down',
    hole: '#9',
    rating: 9.5,
    timestamp: '2024-01-25T10:05:00Z',
    timeAgo: '18 mins ago'
  },
  {
    id: '7',
    type: 'discovery',
    username: 'desert_golfer',
    action: 'discovered',
    course: 'Shadow Creek',
    hole: '#13',
    timestamp: '2024-01-25T10:00:00Z',
    timeAgo: '22 mins ago'
  },
  {
    id: '8',
    type: 'rating',
    username: 'major_champion',
    action: 'just rated',
    course: 'Bethpage Black',
    hole: '#4',
    rating: 7.9,
    timestamp: '2024-01-25T09:55:00Z',
    timeAgo: '25 mins ago'
  }
];

const getActivityIcon = (type: string) => {
  switch (type) {
    case 'rating':
      return Star;
    case 'completion':
      return Target;
    case 'discovery':
      return MapPin;
    case 'milestone':
      return Users;
    default:
      return Star;
  }
};

const getActivityColor = (type: string) => {
  switch (type) {
    case 'rating':
      return 'text-yellow-500';
    case 'completion':
      return 'text-emerald-500';
    case 'discovery':
      return 'text-blue-500';
    case 'milestone':
      return 'text-purple-500';
    default:
      return 'text-gray-500';
  }
};

const getActivityBg = (type: string) => {
  switch (type) {
    case 'rating':
      return 'from-yellow-500/10 to-yellow-600/10 border-yellow-500/20';
    case 'completion':
      return 'from-emerald-500/10 to-emerald-600/10 border-emerald-500/20';
    case 'discovery':
      return 'from-blue-500/10 to-blue-600/10 border-blue-500/20';
    case 'milestone':
      return 'from-purple-500/10 to-purple-600/10 border-purple-500/20';
    default:
      return 'from-gray-500/10 to-gray-600/10 border-gray-500/20';
  }
};

export function LiveActivityFeed() {
  const [activities, setActivities] = useState<Activity[]>(sampleActivities.slice(0, 4));
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    
    const interval = setInterval(() => {
      // Rotate through activities to simulate live updates
      setActivities(prev => {
        const currentIndex = sampleActivities.findIndex(a => a.id === prev[0]?.id);
        const nextIndex = (currentIndex + 4) % sampleActivities.length;
        return sampleActivities.slice(nextIndex, nextIndex + 4);
      });
    }, 8000); // Update every 8 seconds

    return () => clearInterval(interval);
  }, []);

  if (!isVisible) return null;

  return (
    <section className="py-20 relative bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-emerald-500/10 to-green-600/10 border border-emerald-500/20 rounded-full text-emerald-600 dark:text-emerald-400 font-semibold mb-6"
            whileHover={{ scale: 1.05, y: -2 }}
          >
            <motion.div
              className="w-2 h-2 bg-emerald-500 rounded-full"
              animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span>Live Activity Feed</span>
          </motion.div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-gray-900 dark:text-white">
            See what golfers are discovering
          </h2>
          <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Real-time activity from our growing community of golf enthusiasts around the world
          </p>
        </motion.div>

        {/* Live Activity Cards */}
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="popLayout">
            {activities.map((activity, index) => {
              const Icon = getActivityIcon(activity.type);
              
              return (
                <motion.div
                  key={activity.id}
                  layout
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.95 }}
                  transition={{ 
                    duration: 0.5, 
                    delay: index * 0.1,
                    layout: { duration: 0.3 }
                  }}
                  className={`glass-strong p-6 rounded-2xl border bg-gradient-to-r ${getActivityBg(activity.type)} mb-4 group hover:scale-102 transition-all duration-300 activity-card gpu-accelerated`}
                  whileHover={{ y: -2, scale: 1.02 }}
                >
                  <div className="flex items-start space-x-4">
                    
                    {/* Activity Icon */}
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${getActivityBg(activity.type).replace('/10', '/20')} flex items-center justify-center flex-shrink-0`}>
                      <Icon className={`w-6 h-6 ${getActivityColor(activity.type)}`} />
                    </div>

                    {/* Activity Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <p className="text-gray-900 dark:text-white font-medium leading-relaxed">
                            <span className="font-bold text-primary-500">@{activity.username}</span>
                            {' '}{activity.action}{' '}
                            <span className="font-semibold">{activity.course}</span>
                            {activity.hole && (
                              <>
                                {' '}<span className="text-gray-600 dark:text-gray-400">{activity.hole}</span>
                              </>
                            )}
                            {activity.rating && (
                              <span className="inline-flex items-center ml-2 px-2 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400 rounded-lg text-sm font-bold">
                                <Star className="w-3 h-3 mr-1 fill-current" />
                                {activity.rating}
                              </span>
                            )}
                          </p>
                        </div>
                        
                        <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400 ml-4">
                          <Clock className="w-3 h-3" />
                          <span className="whitespace-nowrap">{activity.timeAgo}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {/* View More Button */}
          <motion.div
            className="text-center mt-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <motion.button
              className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-green-600 text-white font-semibold rounded-xl hover:from-emerald-600 hover:to-green-700 transition-all duration-300 flex items-center space-x-2 mx-auto"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Users className="w-5 h-5" />
              <span>Join the Community</span>
            </motion.button>
          </motion.div>
        </div>

        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%2300ff7f' fill-opacity='0.05'%3E%3Ccircle cx='20' cy='20' r='2'/%3E%3C/g%3E%3C/svg%3E")`
            }}
          />
        </div>
      </div>
    </section>
  );
}