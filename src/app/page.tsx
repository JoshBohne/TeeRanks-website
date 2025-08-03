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
  handicap: z.string().optional(),
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
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-sm border-b border-gray-100 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <Image
                src="/teerank-logo.png"
                alt="TeeRank Logo"
                width={40}
                height={40}
                className="rounded-lg"
              />
              <span className="text-xl font-bold text-gray-900">TeeRank</span>
            </div>
            <a 
              href="#waitlist" 
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              Join Waitlist
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1 
              className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              Rate the World&apos;s
              <span className="text-green-500 block">Greatest Golf Holes</span>
            </motion.h1>
            
            <motion.p 
              className="text-xl sm:text-2xl text-gray-600 mb-8 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Discover and rate famous golf holes and courses worldwide. 
              Build your bucket list, track your journey, and connect with fellow golf enthusiasts.
            </motion.p>
            
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <a 
                href="#waitlist"
                className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all hover:scale-105 hover:shadow-lg flex items-center justify-center space-x-2"
              >
                <Mail className="w-5 h-5" />
                <span>Join the Waitlist</span>
                <ArrowRight className="w-5 h-5" />
              </a>
              <button className="border-2 border-gray-300 hover:border-green-500 text-gray-700 hover:text-green-600 px-8 py-4 rounded-xl font-semibold text-lg transition-colors">
                Watch Demo
              </button>
            </motion.div>

            <motion.p 
              className="text-sm text-gray-500"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              The Letterboxd for golf is coming soon
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Golf Course Gallery */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-12"
            {...fadeInUp}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Iconic Holes Coming to TeeRank
            </h2>
            <p className="text-xl text-gray-600">
              Rate and review the world&apos;s most famous golf holes
            </p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={stagger}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {golfCourses.map((course) => (
              <motion.div
                key={course.name}
                className="relative group overflow-hidden rounded-2xl aspect-[4/3] bg-gray-200"
                variants={fadeInUp}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src={course.image}
                  alt={course.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-lg font-semibold mb-1">{course.name}</h3>
                  <p className="text-sm opacity-90">{course.location}</p>
                </div>
                <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  Coming Soon
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            {...fadeInUp}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to Track Your Golf Journey
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
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
            {features.map((feature) => (
              <motion.div
                key={feature.title}
                className="text-center p-6 rounded-2xl hover:shadow-lg transition-shadow duration-300"
                variants={fadeInUp}
              >
                <div className={`${feature.color} w-16 h-16 rounded-2xl flex items-center justify-center mb-4 mx-auto`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Why TeeRank Section */}
      <section className="py-16 bg-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div {...fadeInUp}>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                Why TeeRank?
              </h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-green-500 rounded-full p-2 mt-1">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Discover Hidden Gems</h3>
                    <p className="text-gray-600">Find amazing golf courses you never knew existed through community recommendations.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-green-500 rounded-full p-2 mt-1">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Track Your Journey</h3>
                    <p className="text-gray-600">Keep a digital record of every course you&apos;ve played and want to play.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-green-500 rounded-full p-2 mt-1">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Connect with Golfers</h3>
                    <p className="text-gray-600">Follow friends, share experiences, and get inspired by the golf community.</p>
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
              <div className="bg-white rounded-2xl p-8 shadow-xl">
                <div className="text-center mb-6">
                  <div className="bg-gray-100 rounded-xl p-4 mb-4">
                    <Star className="w-8 h-8 text-yellow-500 mx-auto" />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900">St. Andrews #18</h4>
                  <p className="text-gray-600">The Home of Golf</p>
                </div>
                <div className="flex justify-center space-x-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-sm text-gray-600 text-center italic">
                  &quot;An absolute must-play. The history and atmosphere make this hole unforgettable.&quot;
                </p>
                <div className="flex items-center justify-center mt-4 space-x-2">
                  <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                  <span className="text-sm text-gray-500">@golfpro23</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Waitlist Section */}
      <section id="waitlist" className="py-16 bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div {...fadeInUp}>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Be the First to Experience TeeRank
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Join our waitlist and get early access when we launch. Plus, get exclusive updates on new features and golf content.
            </p>
          </motion.div>

          {isSubmitted ? (
            <motion.div 
              className="bg-green-500 rounded-2xl p-8 max-w-md mx-auto"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <CheckCircle className="w-16 h-16 text-white mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white mb-2">You&apos;re on the list!</h3>
              <p className="text-green-100">We&apos;ll notify you as soon as TeeRank is available.</p>
            </motion.div>
          ) : (
            <motion.form 
              onSubmit={handleSubmit(onSubmit)}
              className="bg-white rounded-2xl p-8 max-w-md mx-auto"
              {...fadeInUp}
            >
              <div className="space-y-4">
                <div>
                  <input
                    {...register("firstName")}
                    type="text"
                    placeholder="First Name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                  />
                  {errors.firstName && (
                    <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>
                  )}
                </div>
                
                <div>
                  <input
                    {...register("email")}
                    type="email"
                    placeholder="Email Address"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                  )}
                </div>
                
                <div>
                  <input
                    {...register("handicap")}
                    type="text"
                    placeholder="Golf Handicap (Optional)"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-green-500 hover:bg-green-600 disabled:bg-green-400 text-white py-3 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2"
                >
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <Mail className="w-5 h-5" />
                      <span>Join Waitlist</span>
                    </>
                  )}
                </button>
              </div>
              
              <p className="text-xs text-gray-500 mt-4">
                We&apos;ll never spam you. Unsubscribe at any time.
              </p>
            </motion.form>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <Image
                src="/teerank-logo.png"
                alt="TeeRank Logo"
                width={40}
                height={40}
                className="rounded-lg"
              />
              <span className="text-xl font-bold text-gray-900">TeeRank</span>
            </div>
            
            <div className="flex items-center space-x-6 mb-4 md:mb-0">
              <a href="mailto:hello@teeranks.com" className="text-gray-600 hover:text-green-500 transition-colors">
                Contact
              </a>
              <a href="/privacy" className="text-gray-600 hover:text-green-500 transition-colors">
                Privacy
              </a>
              <a href="/terms" className="text-gray-600 hover:text-green-500 transition-colors">
                Terms
              </a>
            </div>
            
            <div className="flex items-center space-x-4">
              <a href="#" className="text-gray-600 hover:text-green-500 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-600 hover:text-green-500 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-600 hover:text-green-500 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div className="border-t border-gray-200 mt-8 pt-8 text-center">
            <p className="text-gray-500">
              © 2025 TeeRank. All rights reserved. Made with ⛳ for golf enthusiasts.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}