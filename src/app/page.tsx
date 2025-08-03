'use client';

import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
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
  Twitter,
  Facebook
} from "lucide-react";

const waitlistSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  firstName: z.string().min(2, "First name must be at least 2 characters"),
});

type WaitlistForm = z.infer<typeof waitlistSchema>;

export default function Home() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const features = [
    {
      icon: Star,
      title: "Rate & Review",
      description: "Swipe through famous golf holes and courses. Rate them 0-10 and discover hidden gems.",
      color: "bg-yellow-500"
    },
    {
      icon: MapPin,
      title: "Bucket List",
      description: "Track your must-play courses worldwide. Mark them as played and build your golf journey.",
      color: "bg-blue-500"
    },
    {
      icon: Trophy,
      title: "Rankings",
      description: "Discover the world's top-rated holes and courses based on community votes.",
      color: "bg-green-500"
    },
    {
      icon: Users,
      title: "Social",
      description: "Follow friends, share your golf experiences, and see what others are playing.",
      color: "bg-purple-500"
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
    <div className="min-h-screen" style={{ background: 'var(--gradient-hero)' }}>
      {/* Navigation */}
      <nav className="fixed top-0 w-full glass-strong border-b border-white/20 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-4">
              <Image
                src="/teerank-logo.png"
                alt="TeeRank Logo"
                width={48}
                height={48}
                className="rounded-xl shadow-md"
              />
              <span className="text-2xl font-bold" style={{ color: 'var(--foreground)' }}>TeeRank</span>
            </div>
            <a 
              href="#waitlist" 
              className="btn-premium text-white px-6 py-3 font-semibold text-lg"
            >
              Join Waitlist
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full" style={{ background: 'var(--gradient-mocha)', opacity: 0.1 }}></div>
          <div className="absolute -bottom-20 -left-20 w-60 h-60 rounded-full" style={{ background: 'var(--gradient-gold)', opacity: 0.1 }}></div>
        </div>
        
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
              Rate the World&apos;s
              <span className="block" style={{ 
                background: 'var(--gradient-forest)', 
                WebkitBackgroundClip: 'text', 
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>Greatest Golf Holes</span>
            </motion.h1>
            
            <motion.p 
              className="text-2xl sm:text-3xl mb-12 leading-relaxed font-light"
              style={{ color: 'var(--gray-600)' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Discover and rate famous golf holes and courses worldwide. 
              <br className="hidden sm:block" />
              Build your bucket list, track your journey, and connect with fellow golf enthusiasts.
            </motion.p>
            
            <motion.div
              className="flex flex-col sm:flex-row gap-6 justify-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <a 
                href="#waitlist"
                className="btn-premium text-white px-10 py-5 font-semibold text-xl flex items-center justify-center space-x-3 group"
              >
                <Mail className="w-6 h-6" />
                <span>Join the Waitlist</span>
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </a>
              <button className="glass px-10 py-5 font-semibold text-xl transition-all hover:scale-105" style={{ 
                color: 'var(--primary-green)',
                boxShadow: 'var(--shadow-medium)'
              }}>
                Watch Demo
              </button>
            </motion.div>

            <motion.div
              className="glass-strong px-8 py-4 rounded-full inline-block"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              style={{ boxShadow: 'var(--shadow-soft)' }}
            >
              <p className="text-lg font-medium" style={{ color: 'var(--accent-mocha)' }}>
                ⛳ The Letterboxd for golf is coming soon
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Golf Course Gallery */}
      <section className="py-20 relative overflow-hidden" style={{ background: 'var(--gradient-mocha)' }}>
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 right-10 w-32 h-32 rounded-full floating" style={{ background: 'var(--gradient-gold)', opacity: 0.15 }}></div>
          <div className="absolute bottom-10 left-10 w-24 h-24 rounded-full floating" style={{ background: 'var(--gradient-forest)', opacity: 0.1, animationDelay: '2s' }}></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div 
            className="text-center mb-16"
            {...fadeInUp}
          >
            <h2 className="text-5xl sm:text-6xl font-bold mb-6" style={{ color: 'var(--surface)' }}>
              Iconic Holes Coming to TeeRank
            </h2>
            <p className="text-2xl font-light" style={{ color: 'var(--surface)', opacity: 0.9 }}>
              Rate and review the world&apos;s most famous golf holes
            </p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
            variants={stagger}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {golfCourses.map((course, index) => (
              <motion.div
                key={course.name}
                className="relative group overflow-hidden aspect-[4/3] glass-strong"
                style={{ 
                  borderRadius: 'var(--radius-lg)',
                  boxShadow: 'var(--shadow-large)'
                }}
                variants={fadeInUp}
                whileHover={{ scale: 1.03, y: -10 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <Image
                  src={course.image}
                  alt={course.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="absolute bottom-6 left-6 text-white">
                  <h3 className="text-xl font-bold mb-2">{course.name}</h3>
                  <p className="text-base opacity-90 flex items-center">
                    <MapPin className="w-4 h-4 mr-2" />
                    {course.location}
                  </p>
                </div>
                <div className="absolute top-6 right-6 glass px-4 py-2 text-sm font-semibold" style={{
                  color: 'var(--primary-green)',
                  borderRadius: 'var(--radius-md)'
                }}>
                  Coming Soon
                </div>
                
                {/* Floating badge */}
                <div className="absolute top-6 left-6 w-8 h-8 rounded-full glass flex items-center justify-center text-white font-bold">
                  {index + 1}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-20"
            {...fadeInUp}
          >
            <h2 className="text-5xl sm:text-6xl font-bold mb-6" style={{ color: 'var(--foreground)' }}>
              Everything You Need to Track Your Golf Journey
            </h2>
            <p className="text-2xl font-light max-w-4xl mx-auto leading-relaxed" style={{ color: 'var(--gray-600)' }}>
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
            {features.map((feature, index) => {
              const iconColors = [
                'var(--accent-gold)',
                'var(--primary-green)', 
                'var(--accent-mocha)',
                'var(--primary-green-light)'
              ];
              
              return (
                <motion.div
                  key={feature.title}
                  className="text-center p-8 glass-strong relative overflow-hidden group"
                  style={{ 
                    borderRadius: 'var(--radius-lg)',
                    boxShadow: 'var(--shadow-medium)'
                  }}
                  variants={fadeInUp}
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  {/* Background gradient */}
                  <div 
                    className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-300"
                    style={{ 
                      background: `linear-gradient(135deg, ${iconColors[index]} 0%, transparent 100%)`
                    }}
                  />
                  
                  <div 
                    className="w-20 h-20 rounded-3xl flex items-center justify-center mb-6 mx-auto relative"
                    style={{ 
                      background: `linear-gradient(135deg, ${iconColors[index]} 0%, ${iconColors[index]}CC 100%)`,
                      boxShadow: 'var(--shadow-soft)'
                    }}
                  >
                    <feature.icon className="w-10 h-10 text-white" />
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
      <section className="py-20 relative overflow-hidden" style={{ background: 'var(--surface)' }}>
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-40 h-40 rounded-full floating" style={{ background: 'var(--gradient-gold)', opacity: 0.08 }}></div>
          <div className="absolute bottom-20 right-10 w-32 h-32 rounded-full floating" style={{ background: 'var(--gradient-forest)', opacity: 0.06, animationDelay: '3s' }}></div>
        </div>
        
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
                      background: 'var(--gradient-forest)',
                      boxShadow: 'var(--shadow-soft)'
                    }}
                  >
                    <CheckCircle className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-2xl mb-3" style={{ color: 'var(--foreground)' }}>Discover Hidden Gems</h3>
                    <p className="text-xl leading-relaxed" style={{ color: 'var(--gray-600)' }}>Find amazing golf courses you never knew existed through community recommendations and expert insights.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-6">
                  <div 
                    className="rounded-2xl p-3 mt-1 flex-shrink-0"
                    style={{ 
                      background: 'var(--gradient-gold)',
                      boxShadow: 'var(--shadow-soft)'
                    }}
                  >
                    <CheckCircle className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-2xl mb-3" style={{ color: 'var(--foreground)' }}>Track Your Journey</h3>
                    <p className="text-xl leading-relaxed" style={{ color: 'var(--gray-600)' }}>Keep a digital record of every course you&apos;ve played and want to play, with detailed statistics and memories.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-6">
                  <div 
                    className="rounded-2xl p-3 mt-1 flex-shrink-0"
                    style={{ 
                      background: 'var(--gradient-mocha)',
                      boxShadow: 'var(--shadow-soft)'
                    }}
                  >
                    <CheckCircle className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-2xl mb-3" style={{ color: 'var(--foreground)' }}>Connect with Golfers</h3>
                    <p className="text-xl leading-relaxed" style={{ color: 'var(--gray-600)' }}>Follow friends, share experiences, and get inspired by the passionate golf community worldwide.</p>
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
                className="glass-strong p-10 relative overflow-hidden"
                style={{ 
                  borderRadius: 'var(--radius-xl)',
                  boxShadow: 'var(--shadow-large)'
                }}
              >
                {/* Floating elements */}
                <div className="absolute -top-4 -right-4 w-24 h-24 rounded-full floating" style={{ background: 'var(--gradient-gold)', opacity: 0.1 }}></div>
                <div className="absolute -bottom-4 -left-4 w-16 h-16 rounded-full floating" style={{ background: 'var(--gradient-forest)', opacity: 0.1, animationDelay: '2s' }}></div>
                
                <div className="text-center mb-8 relative">
                  <div 
                    className="rounded-2xl p-6 mb-6 inline-block"
                    style={{ 
                      background: 'var(--gradient-gold)',
                      boxShadow: 'var(--shadow-medium)'
                    }}
                  >
                    <Star className="w-12 h-12 text-white mx-auto" />
                  </div>
                  <h4 className="text-2xl font-bold mb-2" style={{ color: 'var(--foreground)' }}>St. Andrews #18</h4>
                  <p className="text-xl" style={{ color: 'var(--gray-600)' }}>The Home of Golf</p>
                </div>
                <div className="flex justify-center space-x-2 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-8 h-8 text-yellow-400" style={{ fill: 'var(--accent-gold)' }} />
                  ))}
                </div>
                <p className="text-lg text-center italic mb-6 leading-relaxed" style={{ color: 'var(--gray-700)' }}>
                  &quot;An absolute must-play. The history and atmosphere make this hole unforgettable. Every golfer should experience this legendary finish.&quot;
                </p>
                <div className="flex items-center justify-center space-x-3">
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg"
                    style={{ background: 'var(--gradient-forest)' }}
                  >
                    GP
                  </div>
                  <div>
                    <span className="font-semibold" style={{ color: 'var(--foreground)' }}>@golfpro23</span>
                    <p className="text-sm" style={{ color: 'var(--gray-600)' }}>Verified Golf Pro</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Waitlist Section */}
      <section id="waitlist" className="py-24 relative overflow-hidden" style={{ background: 'var(--gradient-mocha)' }}>
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 left-20 w-48 h-48 rounded-full floating" style={{ background: 'var(--gradient-gold)', opacity: 0.1 }}></div>
          <div className="absolute bottom-10 right-20 w-32 h-32 rounded-full floating" style={{ background: 'var(--gradient-forest)', opacity: 0.08, animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-10 w-24 h-24 rounded-full floating" style={{ background: 'var(--gradient-gold)', opacity: 0.06, animationDelay: '4s' }}></div>
        </div>
        
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <motion.div {...fadeInUp}>
            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-8" style={{ color: 'var(--surface)' }}>
              Be the First to Experience TeeRank
            </h2>
            <p className="text-2xl sm:text-3xl font-light max-w-4xl mx-auto leading-relaxed mb-12" style={{ color: 'var(--surface)', opacity: 0.95 }}>
              Join our waitlist and get early access when we launch. Plus, get exclusive updates on new features and golf content.
            </p>
          </motion.div>

          {isSubmitted ? (
            <motion.div 
              className="glass-strong p-12 max-w-lg mx-auto relative overflow-hidden"
              style={{ 
                borderRadius: 'var(--radius-xl)',
                boxShadow: 'var(--shadow-large)'
              }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              {/* Success background glow */}
              <div className="absolute inset-0 opacity-20" style={{ background: 'var(--gradient-forest)' }}></div>
              
              <div className="relative">
                <div 
                  className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6"
                  style={{ 
                    background: 'var(--gradient-forest)',
                    boxShadow: 'var(--shadow-medium)'
                  }}
                >
                  <CheckCircle className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-3xl font-bold mb-4" style={{ color: 'var(--surface)' }}>You&apos;re on the list!</h3>
                <p className="text-xl" style={{ color: 'var(--surface)', opacity: 0.9 }}>We&apos;ll notify you as soon as TeeRank is available.</p>
              </div>
            </motion.div>
          ) : (
            <motion.form 
              onSubmit={handleSubmit(onSubmit)}
              className="glass-strong p-12 max-w-lg mx-auto relative overflow-hidden"
              style={{ 
                borderRadius: 'var(--radius-xl)',
                boxShadow: 'var(--shadow-large)'
              }}
              {...fadeInUp}
            >
              {/* Form background elements */}
              <div className="absolute top-0 right-0 w-32 h-32 rounded-full" style={{ background: 'var(--gradient-gold)', opacity: 0.05 }}></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 rounded-full" style={{ background: 'var(--gradient-forest)', opacity: 0.05 }}></div>
              
              <div className="space-y-6 relative">
                <div>
                  <input
                    {...register("firstName")}
                    type="text"
                    placeholder="First Name"
                    className="w-full px-6 py-4 text-lg font-medium outline-none transition-all duration-300"
                    style={{
                      background: 'var(--surface)',
                      color: 'var(--foreground)',
                      border: `2px solid var(--gray-200)`,
                      borderRadius: 'var(--radius-md)',
                      boxShadow: 'var(--shadow-soft)'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = 'var(--primary-green)';
                      e.target.style.boxShadow = 'var(--shadow-medium)';
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
                      background: 'var(--surface)',
                      color: 'var(--foreground)',
                      border: `2px solid var(--gray-200)`,
                      borderRadius: 'var(--radius-md)',
                      boxShadow: 'var(--shadow-soft)'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = 'var(--primary-green)';
                      e.target.style.boxShadow = 'var(--shadow-medium)';
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
                  className="w-full btn-premium text-white py-5 font-bold text-xl flex items-center justify-center space-x-3 group"
                >
                  {isSubmitting ? (
                    <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <Mail className="w-6 h-6" />
                      <span>Join Waitlist</span>
                      <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </div>
              
              <p className="text-base mt-6 font-medium" style={{ color: 'var(--surface)', opacity: 0.8 }}>
                \u26f3 We&apos;ll never spam you. Unsubscribe at any time.
              </p>
            </motion.form>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 relative overflow-hidden" style={{ background: 'var(--surface-soft)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center">
            <div className="flex items-center space-x-4">
              <Image
                src="/teerank-logo.png"
                alt="TeeRank Logo"
                width={56}
                height={56}
                className="rounded-2xl"
                style={{ boxShadow: 'var(--shadow-soft)' }}
              />
              <div>
                <span className="text-3xl font-bold" style={{ color: 'var(--foreground)' }}>TeeRank</span>
                <p className="text-base font-medium" style={{ color: 'var(--gray-500)' }}>The future of golf discovery</p>
              </div>
            </div>
            
            <div className="flex items-center justify-center space-x-8">
              <a 
                href="mailto:hello@teeranks.com" 
                className="text-lg font-semibold transition-all duration-300 hover:scale-105 hover:text-[var(--primary-green)]"
                style={{ color: 'var(--gray-600)' }}
              >
                Contact
              </a>
              <a 
                href="/privacy" 
                className="text-lg font-semibold transition-all duration-300 hover:scale-105 hover:text-[var(--primary-green)]"
                style={{ color: 'var(--gray-600)' }}
              >
                Privacy
              </a>
              <a 
                href="/terms" 
                className="text-lg font-semibold transition-all duration-300 hover:scale-105 hover:text-[var(--primary-green)]"
                style={{ color: 'var(--gray-600)' }}
              >
                Terms
              </a>
            </div>
            
            <div className="flex items-center justify-end space-x-4">
              <a 
                href="#" 
                className="glass w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 group"
                style={{ boxShadow: 'var(--shadow-soft)' }}
              >
                <Instagram className="w-6 h-6 transition-colors text-[var(--gray-600)] group-hover:text-[var(--primary-green)]" />
              </a>
              <a 
                href="#" 
                className="glass w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 group"
                style={{ boxShadow: 'var(--shadow-soft)' }}
              >
                <Twitter className="w-6 h-6 transition-colors text-[var(--gray-600)] group-hover:text-[var(--primary-green)]" />
              </a>
              <a 
                href="#" 
                className="glass w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 group"
                style={{ boxShadow: 'var(--shadow-soft)' }}
              >
                <Facebook className="w-6 h-6 transition-colors text-[var(--gray-600)] group-hover:text-[var(--primary-green)]" />
              </a>
            </div>
          </div>
          
          <div className="mt-12 pt-8 text-center" style={{ borderTop: `1px solid var(--gray-200)` }}>
            <p className="text-lg font-medium" style={{ color: 'var(--gray-500)' }}>
              © 2025 TeeRank. All rights reserved. Made with 
              <span className="mx-2" style={{ color: 'var(--accent-gold)' }}>⛳</span> 
              for golf enthusiasts worldwide.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}