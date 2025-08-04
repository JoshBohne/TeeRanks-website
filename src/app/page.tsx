'use client';

import Image from "next/image";
import { motion } from "framer-motion";
import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { 
  Star, 
  MapPin, 
  Trophy, 
  Users, 
  Mail, 
  ArrowRight, 
  CheckCircle,
  Instagram,
  X,
  Facebook,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { BucketIcon } from "../components/BucketIcon";

// Import Swiper React components and modules
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, EffectCoverflow } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';

const waitlistSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  firstName: z.string().min(2, "First name must be at least 2 characters"),
});

type WaitlistForm = z.infer<typeof waitlistSchema>;

export default function Home() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentHoleIndex, setCurrentHoleIndex] = useState(0);
  const swiperRef = useRef<SwiperType | null>(null);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<WaitlistForm>({
    resolver: zodResolver(waitlistSchema),
  });

  const onSubmit = async (data: WaitlistForm) => {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setIsSubmitted(true);
        reset();
      } else {
        throw new Error('Failed to submit');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      // You could add error state handling here
    } finally {
      setIsSubmitting(false);
    }
  };

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
      title: "Rate & Review",
      description: "Swipe through famous golf holes and courses. Rate them 0-10 and discover hidden gems.",
      colorVar: "--feature-gold",
      colorDarkVar: "--feature-gold-dark"
    },
    {
      icon: BucketIcon,
      title: "Bucket List",
      description: "Track your must-play courses worldwide. Mark them as played and build your golf journey.",
      colorVar: "--feature-blue",
      colorDarkVar: "--feature-blue-dark"
    },
    {
      icon: Trophy,
      title: "Rankings",
      description: "Discover the world's top-rated holes and courses based on community votes.",
      colorVar: "--feature-orange",
      colorDarkVar: "--feature-orange-dark"
    },
    {
      icon: Users,
      title: "Social",
      description: "Follow friends, share your golf experiences, and see what others are playing.",
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
      <div className="min-h-screen" style={{ background: 'var(--gradient-hero)' }}>
      {/* Navigation */}
      <nav className="fixed top-0 w-full glass-dark border-b border-white/10 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-4">
              <Image
                src="/TeeRankLogo2.png"
                alt="TeeRank Logo"
                width={48}
                height={48}
                className="rounded-xl"
                style={{ boxShadow: 'var(--shadow-soft)' }}
              />
              <span className="text-2xl font-bold" style={{ color: 'var(--foreground)' }}>TeeRank</span>
            </div>
            <a 
              href="#waitlist" 
              className="btn-premium text-black px-6 py-3 font-semibold text-lg"
            >
              Join Waitlist
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 relative">
        
        <div className="max-w-7xl mx-auto relative">
          <motion.div 
            className="text-center max-w-5xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1 
              className="text-6xl sm:text-7xl lg:text-8xl font-black mb-8 leading-tight"
              style={{ color: 'var(--foreground)' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              Welcome to
              <span className="block" style={{ 
                background: 'var(--gradient-green)', 
                WebkitBackgroundClip: 'text', 
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                filter: 'drop-shadow(0 0 10px var(--primary-green-glow))'
              }}>TeeRank</span>
            </motion.h1>
            
            <motion.p 
              className="text-2xl sm:text-3xl mb-12 leading-relaxed font-light"
              style={{ color: 'var(--foreground-soft)' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Discover and rate famous golf holes and courses worldwide. 
              <br className="hidden sm:block" />
              Build your bucket list, track your journey, and connect with fellow golf enthusiasts.
            </motion.p>
            
            <motion.div
              className="flex justify-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <a 
                href="#waitlist"
                className="btn-premium text-black px-12 py-6 font-semibold text-xl flex items-center justify-center space-x-3 group"
              >
                <Mail className="w-6 h-6" />
                <span>Join the Waitlist</span>
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </a>
            </motion.div>

            <motion.div
              className="glass-strong px-8 py-4 rounded-full inline-block"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              style={{ boxShadow: 'var(--shadow-soft)' }}
            >
              <p className="text-lg font-medium" style={{ color: 'var(--primary-green)' }}>
                ⛳ The &ldquo;Letterboxd for golf&rdquo;
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Golf Course Gallery */}
      <section className="py-20 relative" style={{ background: 'var(--gradient-dark)' }}>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div 
            className="text-center mb-16"
            {...fadeInUp}
          >
            <h2 className="text-5xl sm:text-6xl font-bold mb-6" style={{ color: 'var(--foreground)' }}>
              Iconic Holes Coming to TeeRank
            </h2>
            <p className="text-2xl font-light" style={{ color: 'var(--foreground-soft)' }}>
              Rate and review the world&apos;s most famous golf holes
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
      <section className="py-20 relative" style={{ background: 'var(--background)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-20"
            {...fadeInUp}
          >
            <h2 className="text-5xl sm:text-6xl font-bold mb-6" style={{ color: 'var(--foreground)' }}>
              Everything You Need to Track Your Golf Journey
            </h2>
            <p className="text-2xl font-light max-w-4xl mx-auto leading-relaxed" style={{ color: 'var(--foreground-soft)' }}>
              TeeRank combines the best of social rating platforms with golf-specific features 
              to help you discover, rate, and track the world&apos;s greatest golf experiences.
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
                  className="text-center p-8 glass-strong relative overflow-hidden group"
                  style={{ 
                    borderRadius: 'var(--radius-lg)',
                    boxShadow: 'var(--shadow-medium)'
                  }}
                  variants={fadeInUp}
                  whileHover={{ y: -8, scale: 1.02, boxShadow: `0 0 30px var(${feature.colorVar})40` }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  {/* Background gradient */}
                  <div 
                    className="absolute inset-0 opacity-5 group-hover:opacity-15 transition-opacity duration-300"
                    style={{ 
                      background: `linear-gradient(135deg, var(${feature.colorVar}) 0%, transparent 100%)`
                    }}
                  />
                  
                  <div 
                    className="w-32 h-32 rounded-full flex items-center justify-center mb-8 mx-auto relative"
                    style={{ 
                      background: `linear-gradient(135deg, var(${feature.colorVar}) 0%, var(${feature.colorDarkVar}) 100%)`,
                      boxShadow: `0 0 30px var(${feature.colorVar})40, 0 8px 16px rgba(0,0,0,0.15)`
                    }}
                  >
                    <feature.icon className="w-12 h-12 text-white" fill="currentColor" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4" style={{ color: 'var(--foreground)' }}>{feature.title}</h3>
                  <p className="leading-relaxed text-lg" style={{ color: 'var(--gray-600)' }}>{feature.description}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Why TeeRank Section */}
      <section className="py-20 relative" style={{ background: 'var(--gradient-surface)' }}>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div {...fadeInUp}>
              <h2 className="text-5xl sm:text-6xl font-bold mb-10" style={{ color: 'var(--foreground)' }}>
                Why TeeRank?
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
                    <h3 className="font-bold text-2xl mb-3" style={{ color: 'var(--foreground)' }}>Discover Hidden Gems</h3>
                    <p className="text-xl leading-relaxed" style={{ color: 'var(--foreground-soft)' }}>Find amazing golf courses you never knew existed through community recommendations and expert insights.</p>
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
                    <h3 className="font-bold text-2xl mb-3" style={{ color: 'var(--foreground)' }}>Track Your Journey</h3>
                    <p className="text-xl leading-relaxed" style={{ color: 'var(--foreground-soft)' }}>Keep a digital record of every course you&apos;ve played and want to play, with detailed statistics and memories.</p>
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

      {/* Waitlist Section */}
      <section id="waitlist" className="py-24 relative" style={{ background: 'var(--background)' }}>
        
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <motion.div {...fadeInUp}>
            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-8" style={{ color: 'var(--foreground)' }}>
              Be the First to Experience TeeRank
            </h2>
            <p className="text-2xl sm:text-3xl font-light max-w-4xl mx-auto leading-relaxed mb-12" style={{ color: 'var(--foreground-soft)' }}>
              Join our waitlist and get early access when we launch. Plus, get exclusive updates on new features and golf content.
            </p>
          </motion.div>

          {isSubmitted ? (
            <motion.div 
              className="glass-strong p-12 max-w-lg mx-auto relative overflow-hidden"
              style={{ 
                borderRadius: 'var(--radius-xl)',
                boxShadow: 'var(--shadow-green-strong)'
              }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              {/* Success background glow */}
              <div className="absolute inset-0 opacity-10" style={{ background: 'var(--gradient-green)' }}></div>
              
              <div className="relative">
                <div 
                  className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6"
                  style={{ 
                    background: 'var(--gradient-green)',
                    boxShadow: 'var(--shadow-green)'
                  }}
                >
                  <CheckCircle className="w-12 h-12 text-black" />
                </div>
                <h3 className="text-3xl font-bold mb-4" style={{ color: 'var(--foreground)' }}>You&apos;re on the list!</h3>
                <p className="text-xl" style={{ color: 'var(--foreground-soft)' }}>We&apos;ll notify you as soon as TeeRank is available.</p>
              </div>
            </motion.div>
          ) : (
            <motion.form 
              onSubmit={handleSubmit(onSubmit)}
              className="glass-strong p-12 max-w-lg mx-auto relative"
              style={{ 
                borderRadius: 'var(--radius-xl)',
                boxShadow: 'var(--shadow-large)'
              }}
              {...fadeInUp}
            >
              
              <div className="space-y-6 relative">
                <div>
                  <input
                    {...register("firstName")}
                    type="text"
                    placeholder="First Name"
                    className="w-full px-6 py-4 text-lg font-medium outline-none transition-all duration-300"
                    style={{
                      background: 'var(--surface-soft)',
                      color: 'var(--foreground)',
                      border: `2px solid var(--gray-200)`,
                      borderRadius: 'var(--radius-md)',
                      boxShadow: 'var(--shadow-soft)'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = 'var(--primary-green)';
                      e.target.style.boxShadow = 'var(--shadow-green)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = 'var(--gray-200)';
                      e.target.style.boxShadow = 'var(--shadow-soft)';
                    }}
                  />
                  {errors.firstName && (
                    <p className="text-red-500 text-base mt-2 font-medium">{errors.firstName.message}</p>
                  )}
                </div>
                
                <div>
                  <input
                    {...register("email")}
                    type="email"
                    placeholder="Email Address"
                    className="w-full px-6 py-4 text-lg font-medium outline-none transition-all duration-300"
                    style={{
                      background: 'var(--surface-soft)',
                      color: 'var(--foreground)',
                      border: `2px solid var(--gray-200)`,
                      borderRadius: 'var(--radius-md)',
                      boxShadow: 'var(--shadow-soft)'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = 'var(--primary-green)';
                      e.target.style.boxShadow = 'var(--shadow-green)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = 'var(--gray-200)';
                      e.target.style.boxShadow = 'var(--shadow-soft)';
                    }}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-base mt-2 font-medium">{errors.email.message}</p>
                  )}
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-premium text-black py-5 font-bold text-xl flex items-center justify-center space-x-3 group"
                >
                  {isSubmitting ? (
                    <div className="w-6 h-6 border-3 border-black border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <Mail className="w-6 h-6" />
                      <span>Join Waitlist</span>
                      <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </div>
              
              <p className="text-base mt-6 font-medium" style={{ color: 'var(--primary-green)' }}>
                ⛳ We&apos;ll never spam you. Unsubscribe at any time.
              </p>
            </motion.form>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 relative overflow-hidden" style={{ background: 'var(--gradient-surface)' }}>
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