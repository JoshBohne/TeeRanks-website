'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Menu, X, Download, Smartphone, Star, ArrowRight, Sun, Moon } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

interface ModernNavigationProps {
  className?: string;
}

export function ModernNavigation({ className = '' }: ModernNavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Features', href: '#features' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Why TeeRank', href: '#why' },
    { label: 'Download', href: '#download' },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-glass-dark backdrop-blur-xl border-b border-white/10 shadow-soft-lg' 
            : 'bg-transparent'
        } ${className}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 lg:h-20">
            
            {/* Logo */}
            <motion.div 
              className="flex items-center space-x-3"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="relative">
                <Image
                  src="/TeeRankLogo2.png"
                  alt="TeeRank Logo"
                  width={48}
                  height={48}
                  className="rounded-xl shadow-glow"
                />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary-400/20 to-primary-600/20 animate-pulse-glow" />
              </div>
              <span className="text-xl lg:text-2xl font-bold text-white">
                TeeRank
              </span>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  className="text-gray-300 hover:text-white font-medium transition-colors duration-200 relative group"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -2 }}
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary-400 to-primary-600 transition-all duration-300 group-hover:w-full" />
                </motion.a>
              ))}
            </div>

            {/* Desktop Download Buttons */}
            <div className="hidden lg:flex items-center space-x-3">
              {/* Theme Toggle */}
              {mounted && (
                <motion.button
                  onClick={toggleTheme}
                  className="p-2 text-gray-300 hover:text-white transition-colors duration-200 relative group"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
                >
                  <AnimatePresence mode="wait">
                    {theme === 'light' ? (
                      <motion.div
                        key="moon"
                        initial={{ rotate: -90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: 90, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Moon className="w-5 h-5" />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="sun"
                        initial={{ rotate: 90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: -90, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Sun className="w-5 h-5" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>
              )}
              <motion.a
                href="#"
                className="px-4 py-2 text-sm font-semibold text-white bg-glass border border-white/20 rounded-xl hover:bg-white/10 transition-all duration-200 flex items-center space-x-2 group"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Smartphone className="w-4 h-4" />
                <span>iOS</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
              </motion.a>
              
              <motion.a
                href="#"
                className="px-6 py-2 text-sm font-semibold text-black bg-gradient-to-r from-primary-400 to-primary-600 rounded-xl hover:from-primary-500 hover:to-primary-700 transition-all duration-200 flex items-center space-x-2 group btn-shimmer shadow-glow"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Download className="w-4 h-4" />
                <span>Download</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
              </motion.a>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              onClick={toggleMobileMenu}
              className="lg:hidden p-2 text-white hover:text-primary-400 transition-colors duration-200"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <AnimatePresence mode="wait">
                {isMobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="w-6 h-6" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="w-6 h-6" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

        {/* Progress Bar */}
        <motion.div
          className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-primary-400 to-primary-600"
          initial={{ width: '0%' }}
          animate={{ width: isScrolled ? '100%' : '0%' }}
          transition={{ duration: 0.3 }}
        />
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
              onClick={toggleMobileMenu}
            />

            {/* Mobile Menu */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 w-80 h-full bg-glass-dark backdrop-blur-xl border-l border-white/10 z-50 lg:hidden"
            >
              <div className="flex flex-col h-full">
                {/* Mobile Header */}
                <div className="flex items-center justify-between p-6 border-b border-white/10">
                  <div className="flex items-center space-x-3">
                    <Image
                      src="/TeeRankLogo2.png"
                      alt="TeeRank Logo"
                      width={32}
                      height={32}
                      className="rounded-lg"
                    />
                    <span className="text-lg font-bold text-white">TeeRank</span>
                  </div>
                  <motion.button
                    onClick={toggleMobileMenu}
                    className="p-2 text-white hover:text-primary-400 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <X className="w-5 h-5" />
                  </motion.button>
                </div>

                {/* Mobile Navigation Links */}
                <div className="flex-1 px-6 py-8 space-y-6">
                  {/* Mobile Theme Toggle */}
                  {mounted && (
                    <motion.button
                      onClick={toggleTheme}
                      className="w-full flex items-center justify-between p-3 text-gray-300 hover:text-white bg-glass border border-white/20 rounded-xl transition-all duration-200"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className="font-medium">
                        {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
                      </span>
                      <AnimatePresence mode="wait">
                        {theme === 'light' ? (
                          <motion.div
                            key="moon-mobile"
                            initial={{ rotate: -90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: 90, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <Moon className="w-5 h-5" />
                          </motion.div>
                        ) : (
                          <motion.div
                            key="sun-mobile"
                            initial={{ rotate: 90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: -90, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <Sun className="w-5 h-5" />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.button>
                  )}
                  {navItems.map((item, index) => (
                    <motion.a
                      key={item.href}
                      href={item.href}
                      onClick={toggleMobileMenu}
                      className="block text-lg font-medium text-gray-300 hover:text-white transition-colors duration-200"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ x: 4 }}
                    >
                      {item.label}
                    </motion.a>
                  ))}
                </div>

                {/* Mobile Download Buttons */}
                <div className="p-6 space-y-3 border-t border-white/10">
                  <motion.a
                    href="#"
                    className="w-full px-6 py-3 text-sm font-semibold text-white bg-glass border border-white/20 rounded-xl hover:bg-white/10 transition-all duration-200 flex items-center justify-center space-x-2 group"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Smartphone className="w-4 h-4" />
                    <span>Download for iOS</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </motion.a>
                  
                  <motion.a
                    href="#"
                    className="w-full px-6 py-3 text-sm font-semibold text-black bg-gradient-to-r from-primary-400 to-primary-600 rounded-xl hover:from-primary-500 hover:to-primary-700 transition-all duration-200 flex items-center justify-center space-x-2 group shadow-glow"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Download className="w-4 h-4" />
                    <span>Get on Android</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </motion.a>

                  {/* App Info */}
                  <motion.div
                    className="flex items-center justify-center space-x-2 text-xs text-gray-400 pt-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                  >
                    <Star className="w-3 h-3 fill-primary-400 text-primary-400" />
                    <span>4.8 • 10K+ downloads</span>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}