'use client';

import Image from "next/image";
import { motion } from "framer-motion";
import { useState, useRef } from "react";
import { 
  Star, 
  MapPin, 
  Trophy, 
  Users, 
  Mail, 
  ArrowRight, 
  CheckCircle,
  Download,
  Smartphone,
  Instagram,
  X,
  Facebook,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { BucketIcon } from "../components/BucketIcon";
import { IPhoneFrame } from "../components/IPhoneFrame";
import { ModernNavigation } from "../components/ModernNavigation";

// Import Swiper React components and modules
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, EffectCoverflow } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';

export default function Home() {
  const [currentHoleIndex, setCurrentHoleIndex] = useState(0);
  const swiperRef = useRef<SwiperType | null>(null);

  const nextHole = () => {
    swiperRef.current?.slideNext();
  };

  const prevHole = () => {
    swiperRef.current?.slidePrev();
  };

  const handleSlideChange = (swiper: SwiperType) => {
    setCurrentHoleIndex(swiper.activeIndex);
  };

  const features = [
    {
      icon: Star,
      title: "Your Golf Memory Bank",
      description: "Never forget a great hole. Rate it, save it, share it with the golf community.",
      colorVar: "--feature-gold",
      colorDarkVar: "--feature-gold-dark"
    },
    {
      icon: MapPin,
      title: "Discover Hidden Gems",
      description: "Find your next favorite course based on real player ratings and honest reviews.",
      colorVar: "--feature-blue",
      colorDarkVar: "--feature-blue-dark"
    },
    {
      icon: Trophy,
      title: "Track Your Golf Journey",
      description: "See your progress, favorite courses, and playing stats all in one place.",
      colorVar: "--feature-orange",
      colorDarkVar: "--feature-orange-dark"
    },
    {
      icon: Users,
      title: "Join the Conversation",
      description: "Compare ratings, share tips, and connect with golfers who love the game as much as you do.",
      colorVar: "--feature-purple",
      colorDarkVar: "--feature-purple-dark"
    }
  ];

  const golfCourses = [
    { name: "Pebble Beach #7", image: "/images/PebbleBeach_7.png", location: "California, USA" },
    { name: "St. Andrews #18", image: "/images/StAndrews_18.png", location: "Scotland" },
    { name: "Augusta #12", image: "/images/Augusta_12.png", location: "Georgia, USA" },
    { name: "TPC Sawgrass #17", image: "/images/Sawgrass_17.png", location: "Florida, USA" },
    { name: "Pine Valley #5", image: "/images/PineValley_5.png", location: "New Jersey, USA" },
    { name: "Pacific Dunes #13", image: "/images/PacificDunes_13.png", location: "Oregon, USA" },
  ];

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
    <>
      <style jsx global>{`
        .hole-swiper .swiper-slide {
          transition: all 0.3s ease;
        }
        
        .hole-swiper .swiper-slide:not(.swiper-slide-active) {
          opacity: 0.7;
          transform: scale(0.95);
        }
        
        .hole-swiper .swiper-slide-active {
          opacity: 1;
          transform: scale(1);
        }
        
        .hole-swiper .swiper-wrapper {
          align-items: center;
        }
        
        .hole-swiper {
          overflow: visible !important;
        }
        
        .swiper-slide-shadow-left,
        .swiper-slide-shadow-right {
          background: linear-gradient(135deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.1)) !important;
        }
        
        @media (max-width: 1024px) {
          .hole-swiper .swiper-slide:not(.swiper-slide-active) {
            opacity: 0.8;
            transform: scale(0.98);
          }
        }
      `}</style>
      <div className="min-h-screen relative overflow-hidden bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-black">
        {/* Subtle Golf Pattern */}
        <div 
          className="absolute inset-0 opacity-30" 
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2300ff7f' fill-opacity='0.03'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3Ccircle cx='10' cy='10' r='1'/%3E%3Ccircle cx='50' cy='50' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}
        />
        
        {/* Green gradient accent */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-primary-500/10 via-transparent to-transparent rounded-full filter blur-3xl" />

        {/* Modern Navigation */}
        <ModernNavigation />

        {/* Hero Section */}
        <section className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-7xl mx-auto relative">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center min-h-[80vh]">
              
              {/* Left Column - Text Content */}
              <motion.div 
                className="text-center lg:text-left order-2 lg:order-1"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                {/* Floating Badge */}
                <motion.div
                  className="inline-flex items-center space-x-2 px-4 py-2 bg-primary-500/10 rounded-full text-sm text-primary-500 font-medium mb-6 border border-primary-500/20"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.6 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                >
                  <Star className="w-4 h-4 fill-current" />
                  <span>50,000+ holes rated • 10,000+ active golfers</span>
                </motion.div>

                <motion.h1 
                  className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black mb-6 leading-tight"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                >
                  <span className="text-gray-900 dark:text-white">Rate Every Hole</span>
                  <br />
                  <span className="text-gradient bg-gradient-to-r from-primary-400 via-primary-500 to-primary-600 bg-clip-text text-transparent animate-gradient-x filter drop-shadow-glow">
                    You Play
                  </span>
                </motion.h1>
                
                <motion.p 
                  className="text-lg sm:text-xl lg:text-2xl mb-8 leading-relaxed text-gray-600 dark:text-gray-300 max-w-2xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                >
                  Join thousands of golfers building the ultimate database of golf hole ratings. 
                  Swipe, rate, and discover your next must-play course.
                </motion.p>
                
                {/* Download Buttons */}
                <motion.div
                  className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                >
                  <motion.a 
                    href="#"
                    className="group relative px-8 py-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold text-lg rounded-2xl flex items-center justify-center space-x-3 shadow-glow-lg overflow-hidden btn-shimmer"
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Star className="w-5 h-5 relative z-10" />
                    <span className="relative z-10">Start Rating Courses</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform relative z-10" />
                  </motion.a>
                  
                  <motion.a 
                    href="#"
                    className="group px-8 py-4 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white font-semibold text-lg rounded-2xl flex items-center justify-center space-x-3 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-primary-500/40 transition-all duration-300"
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Users className="w-5 h-5" />
                    <span>Join the Community</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </motion.a>
                </motion.div>

                {/* Social Proof */}
                <motion.div 
                  className="flex items-center justify-center lg:justify-start space-x-6 text-sm text-gray-500 dark:text-gray-400"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8, duration: 0.8 }}
                >
                  <div className="flex items-center space-x-2">
                    <div className="flex -space-x-2">
                      {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 border-2 border-white flex items-center justify-center text-xs font-bold text-white">
                          G
                        </div>
                      ))}
                    </div>
                    <span>Join 10,000+ golfers tracking every round</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 fill-primary-500 text-primary-500" />
                    <span>50,000+ holes rated</span>
                  </div>
                </motion.div>
              </motion.div>

              {/* Right Column - iPhone Mockup */}
              <motion.div 
                className="flex justify-center lg:justify-end order-1 lg:order-2 relative"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                {/* Floating elements around iPhone */}
                <motion.div
                  className="absolute -top-4 -left-4 w-16 h-16 bg-primary-500/20 rounded-2xl backdrop-blur-sm border border-primary-500/30 flex items-center justify-center"
                  animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Star className="w-8 h-8 text-primary-400 fill-current" />
                </motion.div>
                
                <motion.div
                  className="absolute -bottom-4 -right-4 w-20 h-12 bg-glass-strong rounded-xl backdrop-blur-sm border border-white/20 flex items-center justify-center"
                  animate={{ y: [0, 10, 0], rotate: [0, -3, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                >
                  <span className="text-primary-400 font-bold text-sm">4.8★</span>
                </motion.div>

                <IPhoneFrame className="scale-75 sm:scale-90 lg:scale-100 relative z-10" />
              </motion.div>

            </div>
          </div>
        </section>

        {/* Golf Course Gallery */}
        <section id="gallery" className="py-20 relative bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div 
            className="text-center mb-16"
            {...fadeInUp}
          >
            <h2 className="text-5xl sm:text-6xl font-bold mb-6 text-gray-900 dark:text-white">
              Famous holes you need to play
            </h2>
            <p className="text-2xl font-light text-gray-600 dark:text-gray-300">
              Rate and review the golf world's most iconic holes
            </p>
          </motion.div>
          
          {/* Modern Swiper Carousel */}
          <div className="relative max-w-5xl mx-auto">
            {/* Navigation Buttons - Outside Container */}
            <button
              onClick={prevHole}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-20 glass-strong w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:bg-white/20 group"
              style={{ boxShadow: 'var(--shadow-large)', left: '-80px' }}
            >
              <ChevronLeft className="w-8 h-8 transition-colors group-hover:text-white" style={{ color: 'var(--primary-green)' }} />
            </button>
            
            <button
              onClick={nextHole}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-20 glass-strong w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:bg-white/20 group"
              style={{ boxShadow: 'var(--shadow-large)', right: '-80px' }}
            >
              <ChevronRight className="w-8 h-8 transition-colors group-hover:text-white" style={{ color: 'var(--primary-green)' }} />
            </button>

            <Swiper
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
              }}
              modules={[Navigation, Pagination, EffectCoverflow]}
              spaceBetween={30}
              slidesPerView={1}
              centeredSlides={true}
              loop={true}
              speed={600}
              effect="coverflow"
              coverflowEffect={{
                rotate: 15,
                stretch: 0,
                depth: 200,
                modifier: 1,
                slideShadows: true,
              }}
              breakpoints={{
                640: {
                  slidesPerView: 1.2,
                  spaceBetween: 20,
                },
                768: {
                  slidesPerView: 1.5,
                  spaceBetween: 30,
                },
                1024: {
                  slidesPerView: 1.8,
                  spaceBetween: 40,
                },
              }}
              onSlideChange={handleSlideChange}
              className="hole-swiper"
              style={{
                paddingTop: '20px',
                paddingBottom: '60px',
              }}
            >
              {golfCourses.map((course) => (
                <SwiperSlide key={course.name}>
                  <motion.div
                    className="relative overflow-hidden glass-strong cursor-grab active:cursor-grabbing group"
                    style={{ 
                      borderRadius: 'var(--radius-lg)',
                      boxShadow: 'var(--shadow-large)',
                      aspectRatio: '16/10',
                      height: '400px'
                    }}
                    whileHover={{ 
                      scale: 1.02,
                      boxShadow: 'var(--shadow-green-strong)',
                      transition: { duration: 0.3 }
                    }}
                  >
                    <Image
                      src={course.image}
                      alt={course.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 80vw, 60vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                    
                    {/* Content */}
                    <div className="absolute bottom-8 left-8 text-white z-10">
                      <h3 className="text-2xl font-bold mb-3 leading-tight">{course.name}</h3>
                      <p className="text-lg opacity-90 flex items-center font-medium">
                        <MapPin className="w-5 h-5 mr-3" />
                        {course.location}
                      </p>
                    </div>

                    {/* Hover Effect Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </motion.div>
                </SwiperSlide>
              ))}
            </Swiper>
            
            {/* Custom Pagination Dots */}
            <div className="flex justify-center space-x-4 mt-8">
              {golfCourses.map((_, index) => (
                <button
                  key={index}
                  onClick={() => swiperRef.current?.slideToLoop(index)}
                  className="relative transition-all duration-300 group"
                >
                  <div
                    className="w-4 h-4 rounded-full transition-all duration-300"
                    style={{
                      backgroundColor: index === currentHoleIndex ? 'var(--primary-green)' : 'var(--gray-400)',
                      boxShadow: index === currentHoleIndex ? 'var(--shadow-green)' : 'none',
                      transform: index === currentHoleIndex ? 'scale(1.2)' : 'scale(1)'
                    }}
                  />
                  {index === currentHoleIndex && (
                    <div
                      className="absolute inset-0 rounded-full animate-ping"
                      style={{ backgroundColor: 'var(--primary-green)', opacity: 0.3 }}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

        {/* Features Section */}
        <section id="features" className="py-20 relative bg-white dark:bg-black"
        >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-20"
            {...fadeInUp}
          >
            <h2 className="text-5xl sm:text-6xl font-bold mb-6 text-gray-900 dark:text-white">
              Everything you need to become a better golfer
            </h2>
            <p className="text-2xl font-light max-w-4xl mx-auto leading-relaxed text-gray-600 dark:text-gray-300">
              Join the golf community that's building the ultimate database of course ratings. 
              Track your progress, discover new courses, and never forget a great round.
            </p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={stagger}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {features.map((feature) => {
              return (
                <motion.div
                  key={feature.title}
                  className="text-center p-8 bg-white dark:bg-gray-800 relative overflow-hidden group rounded-2xl border border-gray-100 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300"
                  variants={fadeInUp}
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  {/* Background gradient */}
                  <div 
                    className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-300"
                    style={{ 
                      background: `linear-gradient(135deg, var(${feature.colorVar}) 0%, transparent 100%)`
                    }}
                  />
                  
                  <div 
                    className="w-24 h-24 rounded-2xl flex items-center justify-center mb-6 mx-auto relative"
                    style={{ 
                      background: `linear-gradient(135deg, var(${feature.colorVar}) 0%, var(${feature.colorDarkVar}) 100%)`,
                      boxShadow: `0 4px 20px var(${feature.colorVar})30`
                    }}
                  >
                    <feature.icon className="w-8 h-8 text-white" fill="currentColor" />
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">{feature.title}</h3>
                  <p className="leading-relaxed text-gray-600 dark:text-gray-300">{feature.description}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

        {/* Why TeeRank Section */}
        <section id="why" className="py-20 relative bg-gray-50 dark:bg-gray-900">
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div {...fadeInUp}>
              <h2 className="text-5xl sm:text-6xl font-bold mb-10 text-gray-900">
                Why golfers love TeeRank
              </h2>
              <div className="space-y-8">
                <div className="flex items-start space-x-6">
                  <div 
                    className="rounded-2xl p-3 mt-1 flex-shrink-0"
                    style={{ 
                      background: 'var(--gradient-green)',
                      boxShadow: 'var(--shadow-green)'
                    }}
                  >
                    <CheckCircle className="w-7 h-7 text-black" />
                  </div>
                  <div>
                    <h3 className="font-bold text-2xl mb-3" style={{ color: 'var(--foreground)' }}>Discover Golf's Greatest</h3>
                    <p className="text-xl leading-relaxed" style={{ color: 'var(--foreground-soft)' }}>Explore the world's most famous golf holes and courses through community ratings and expert insights.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-6">
                  <div 
                    className="rounded-2xl p-3 mt-1 flex-shrink-0"
                    style={{ 
                      background: 'var(--gradient-green-dark)',
                      boxShadow: 'var(--shadow-green)'
                    }}
                  >
                    <CheckCircle className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-2xl mb-3" style={{ color: 'var(--foreground)' }}>Track Your Golf Journey</h3>
                    <p className="text-xl leading-relaxed" style={{ color: 'var(--foreground-soft)' }}>Build your bucket list and keep a digital record of every course you've played and want to play, with detailed statistics and memories.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-6">
                  <div 
                    className="rounded-2xl p-3 mt-1 flex-shrink-0"
                    style={{ 
                      background: 'var(--primary-green)',
                      boxShadow: 'var(--shadow-green)'
                    }}
                  >
                    <CheckCircle className="w-7 h-7 text-black" />
                  </div>
                  <div>
                    <h3 className="font-bold text-2xl mb-3" style={{ color: 'var(--foreground)' }}>Connect with Golfers</h3>
                    <p className="text-xl leading-relaxed" style={{ color: 'var(--foreground-soft)' }}>Follow friends, share experiences, and get inspired by the passionate golf community worldwide.</p>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              className="relative"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div 
                className="glass-strong p-10 relative"
                style={{ 
                  borderRadius: 'var(--radius-xl)',
                  boxShadow: 'var(--shadow-large)'
                }}
              >
                
                <div className="text-center mb-8 relative">
                  <div 
                    className="rounded-2xl p-6 mb-6 inline-block"
                    style={{ 
                      background: 'linear-gradient(135deg, var(--feature-gold) 0%, var(--feature-gold-dark) 100%)',
                      boxShadow: '0 0 20px var(--feature-gold)40'
                    }}
                  >
                    <Star className="w-12 h-12 text-black mx-auto" />
                  </div>
                  <h4 className="text-2xl font-bold mb-2" style={{ color: 'var(--foreground)' }}>St. Andrews #18</h4>
                  <p className="text-xl" style={{ color: 'var(--foreground-soft)' }}>The Home of Golf</p>
                </div>
                <div className="flex justify-center space-x-2 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-8 h-8" style={{ fill: 'var(--feature-gold)', color: 'var(--feature-gold)' }} />
                  ))}
                </div>
                <p className="text-lg text-center italic mb-6 leading-relaxed" style={{ color: 'var(--foreground-soft)' }}>
                  &quot;An absolute must-play. The history and atmosphere make this hole unforgettable. Every golfer should experience this legendary finish.&quot;
                </p>
                <div className="flex items-center justify-center space-x-3">
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg"
                    style={{ 
                      background: 'var(--gradient-green-dark)',
                      color: 'var(--foreground)',
                      boxShadow: 'var(--shadow-green)'
                    }}
                  >
                    GP
                  </div>
                  <div>
                    <span className="font-semibold" style={{ color: 'var(--foreground)' }}>@golfpro23</span>
                    <p className="text-sm" style={{ color: 'var(--primary-green)' }}>Verified Golf Pro</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

        {/* Download Section */}
        <section id="download" className="py-24 relative bg-white dark:bg-black border-t border-gray-100 dark:border-gray-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <motion.div {...fadeInUp}>
            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-8 text-gray-900 dark:text-white">
              Ready to rate your first hole?
            </h2>
            <p className="text-2xl sm:text-3xl font-light max-w-4xl mx-auto leading-relaxed mb-12 text-gray-600 dark:text-gray-300">
              Join thousands of golfers who are building the ultimate course rating database. Get early access and help shape the future of golf.
            </p>
          </motion.div>

          <motion.div 
            className="flex flex-col sm:flex-row gap-6 justify-center items-center max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* iOS Download Button */}
            <a 
              href="#"
              className="flex items-center space-x-4 glass-strong p-6 rounded-2xl transition-all duration-300 hover:scale-105 group"
              style={{ 
                boxShadow: 'var(--shadow-medium)',
                minWidth: '200px'
              }}
            >
              <div 
                className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ background: 'var(--gradient-green)' }}
              >
                <Download className="w-6 h-6 text-black" />
              </div>
              <div className="text-left">
                <p className="text-sm font-medium opacity-75" style={{ color: 'var(--foreground-soft)' }}>
                  Download on the
                </p>
                <p className="text-lg font-bold" style={{ color: 'var(--foreground)' }}>
                  App Store
                </p>
              </div>
              <ArrowRight className="w-5 h-5 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all" style={{ color: 'var(--primary-green)' }} />
            </a>

            {/* Android Download Button */}
            <a 
              href="#"
              className="flex items-center space-x-4 glass-strong p-6 rounded-2xl transition-all duration-300 hover:scale-105 group"
              style={{ 
                boxShadow: 'var(--shadow-medium)',
                minWidth: '200px'
              }}
            >
              <div 
                className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ background: 'var(--gradient-green)' }}
              >
                <Smartphone className="w-6 h-6 text-black" />
              </div>
              <div className="text-left">
                <p className="text-sm font-medium opacity-75" style={{ color: 'var(--foreground-soft)' }}>
                  Get it on
                </p>
                <p className="text-lg font-bold" style={{ color: 'var(--foreground)' }}>
                  Google Play
                </p>
              </div>
              <ArrowRight className="w-5 h-5 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all" style={{ color: 'var(--primary-green)' }} />
            </a>
          </motion.div>

          <motion.p 
            className="text-lg font-medium mt-8"
            style={{ color: 'var(--primary-green)' }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            ⛳ Join thousands of golfers already using TeeRank
          </motion.p>
        </div>
      </section>

        {/* Footer */}
        <footer className="py-16 relative overflow-hidden bg-gray-900 dark:bg-black border-t border-gray-200 dark:border-white/10">
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center">
            <div className="flex items-center space-x-4">
              <Image
                src="/TeeRankLogo2.png"
                alt="TeeRank Logo"
                width={56}
                height={56}
                className="rounded-2xl"
                style={{ boxShadow: 'var(--shadow-soft)' }}
              />
              <div>
                <span className="text-3xl font-bold" style={{ color: 'var(--foreground)' }}>TeeRank</span>
                <p className="text-base font-medium" style={{ color: 'var(--primary-green)' }}>The future of golf discovery</p>
              </div>
            </div>
            
            <div className="flex items-center justify-center space-x-8">
              <a 
                href="mailto:hello@teeranks.com" 
                className="text-lg font-semibold transition-all duration-300 hover:scale-105 hover:text-[var(--primary-green)]"
                style={{ color: 'var(--foreground-soft)' }}
              >
                Contact
              </a>
              <a 
                href="/privacy" 
                className="text-lg font-semibold transition-all duration-300 hover:scale-105 hover:text-[var(--primary-green)]"
                style={{ color: 'var(--foreground-soft)' }}
              >
                Privacy
              </a>
              <a 
                href="/terms" 
                className="text-lg font-semibold transition-all duration-300 hover:scale-105 hover:text-[var(--primary-green)]"
                style={{ color: 'var(--foreground-soft)' }}
              >
                Terms
              </a>
            </div>
            
            <div className="flex items-center justify-end space-x-4">
              <a 
                href="#" 
                className="glass-strong w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 group"
                style={{ boxShadow: 'var(--shadow-soft)' }}
              >
                <Instagram className="w-6 h-6 transition-colors text-[var(--foreground-soft)] group-hover:text-[var(--primary-green)]" />
              </a>
              <a 
                href="https://x.com" 
                className="glass-strong w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 group"
                style={{ boxShadow: 'var(--shadow-soft)' }}
              >
                <X className="w-6 h-6 transition-colors text-[var(--foreground-soft)] group-hover:text-[var(--primary-green)]" />
              </a>
              <a 
                href="#" 
                className="glass-strong w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 group"
                style={{ boxShadow: 'var(--shadow-soft)' }}
              >
                <Facebook className="w-6 h-6 transition-colors text-[var(--foreground-soft)] group-hover:text-[var(--primary-green)]" />
              </a>
            </div>
          </div>
          
          <div className="mt-12 pt-8 text-center" style={{ borderTop: `1px solid var(--gray-200)` }}>
            <p className="text-lg font-medium" style={{ color: 'var(--foreground-soft)' }}>
              © 2025 TeeRank. All rights reserved. Made with 
              <span className="mx-2" style={{ color: 'var(--primary-green)' }}>⛳</span> 
              for golf enthusiasts worldwide.
            </p>
          </div>
        </div>
        </footer>
      </div>
    </>
  );
}