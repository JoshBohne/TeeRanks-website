'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { 
  Mail, 
  User, 
  ArrowRight, 
  CheckCircle, 
  Loader2,
  AlertCircle,
  Star,
  Users
} from 'lucide-react';

// Form validation schema
const WaitlistFormSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  firstName: z.string().min(1, 'First name is required').max(50, 'First name too long'),
});

type WaitlistFormData = z.infer<typeof WaitlistFormSchema>;

interface WaitlistFormProps {
  className?: string;
  variant?: 'default' | 'hero' | 'cta';
}

interface ApiResponse {
  success?: boolean;
  error?: string;
  position?: number;
  message?: string;
  totalUsers?: number;
  details?: Array<{ field: string; message: string }>;
}

export function WaitlistForm({ className = '', variant = 'default' }: WaitlistFormProps) {
  const [submissionState, setSubmissionState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [apiResponse, setApiResponse] = useState<ApiResponse | null>(null);
  const [waitlistPosition, setWaitlistPosition] = useState<number | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset
  } = useForm<WaitlistFormData>({
    resolver: zodResolver(WaitlistFormSchema),
    mode: 'onChange'
  });

  const onSubmit = async (data: WaitlistFormData) => {
    setSubmissionState('loading');
    
    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result: ApiResponse = await response.json();
      setApiResponse(result);

      if (response.ok && result.success) {
        setSubmissionState('success');
        setWaitlistPosition(result.position || null);
        reset();
        
        // Track conversion event (if analytics are set up)
        if (typeof window !== 'undefined' && (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag) {
          (window as unknown as { gtag: (...args: unknown[]) => void }).gtag('event', 'waitlist_signup', {
            event_category: 'engagement',
            event_label: variant,
            custom_parameters: {
              position: result.position
            }
          });
        }
      } else {
        setSubmissionState('error');
        if (response.status === 409) {
          // Email already exists
          setWaitlistPosition(result.position || null);
        }
      }
    } catch (error) {
      console.error('Waitlist submission error:', error);
      setSubmissionState('error');
      setApiResponse({ error: 'Network error. Please try again.' });
    }
  };

  const resetForm = () => {
    setSubmissionState('idle');
    setApiResponse(null);
    setWaitlistPosition(null);
    reset();
  };

  const getButtonText = () => {
    switch (submissionState) {
      case 'loading':
        return 'Joining...';
      case 'success':
        return 'Welcome to TeeRank!';
      default:
        return variant === 'hero' ? 'Skip the Line' : 'Join Waitlist';
    }
  };

  const getVariantStyles = () => {
    switch (variant) {
      case 'hero':
        return {
          container: 'glass-strong p-8 rounded-3xl border border-white/20 backdrop-blur-xl',
          title: 'text-3xl font-bold mb-2 text-white',
          subtitle: 'text-lg text-white/80 mb-6',
          input: 'w-full px-6 py-4 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-white/60 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent text-lg',
          button: 'w-full mt-6 px-8 py-4 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-black font-bold text-xl rounded-2xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 shimmer',
        };
      case 'cta':
        return {
          container: 'glass-strong p-6 rounded-2xl border border-emerald-500/20 backdrop-blur-xl',
          title: 'text-2xl font-bold mb-2 text-white',
          subtitle: 'text-base text-white/80 mb-4',
          input: 'w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/60 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-transparent',
          button: 'w-full mt-4 px-6 py-3 bg-gradient-to-r from-emerald-500 to-green-600 text-white font-semibold text-lg rounded-xl hover:shadow-xl hover:scale-[1.02] transition-all duration-300',
        };
      default:
        return {
          container: 'bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-lg',
          title: 'text-xl font-bold mb-2 text-gray-900 dark:text-white',
          subtitle: 'text-sm text-gray-600 dark:text-gray-400 mb-4',
          input: 'w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent',
          button: 'w-full mt-4 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg transition-colors duration-300',
        };
    }
  };

  const styles = getVariantStyles();

  return (
    <motion.div 
      className={`${styles.container} ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <AnimatePresence mode="wait">
        {submissionState === 'success' ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-emerald-400 to-green-500 rounded-full flex items-center justify-center"
            >
              <CheckCircle className="w-8 h-8 text-white" />
            </motion.div>
            
            <h3 className={styles.title}>Welcome to TeeRank!</h3>
            <p className={styles.subtitle}>
              {apiResponse?.message || 'You&apos;re on the waitlist!'}
            </p>
            
            {waitlistPosition && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-4 p-4 bg-gradient-to-r from-emerald-500/10 to-green-500/10 rounded-xl border border-emerald-500/20"
              >
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  <span className="font-bold text-lg">Position #{waitlistPosition}</span>
                </div>
                <p className="text-sm opacity-80">
                  You&apos;re in line for exclusive beta access
                </p>
              </motion.div>
            )}

            <button
              onClick={resetForm}
              className="mt-6 px-6 py-2 text-sm font-medium rounded-lg border border-white/20 hover:bg-white/10 transition-colors duration-300"
            >
              Add Another Person
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={handleSubmit(onSubmit)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="text-center mb-6">
              <h3 className={styles.title}>
                {variant === 'hero' ? 'Skip the 10,000 Person Waitlist' : 'Join the Beta Waitlist'}
              </h3>
              <p className={styles.subtitle}>
                {variant === 'hero' 
                  ? 'Get exclusive early access to TeeRank before everyone else'
                  : 'Be among the first to rate the world&apos;s greatest golf holes'
                }
              </p>
            </div>

            <div className="space-y-4">
              {/* First Name Field */}
              <div className="relative">
                <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/60" />
                <input
                  {...register('firstName')}
                  type="text"
                  placeholder="First name"
                  className={`${styles.input} pl-12`}
                  disabled={submissionState === 'loading'}
                />
                {errors.firstName && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-1 text-sm text-red-400 flex items-center space-x-1"
                  >
                    <AlertCircle className="w-4 h-4" />
                    <span>{errors.firstName.message}</span>
                  </motion.p>
                )}
              </div>

              {/* Email Field */}
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/60" />
                <input
                  {...register('email')}
                  type="email"
                  placeholder="Enter your email"
                  className={`${styles.input} pl-12`}
                  disabled={submissionState === 'loading'}
                />
                {errors.email && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-1 text-sm text-red-400 flex items-center space-x-1"
                  >
                    <AlertCircle className="w-4 h-4" />
                    <span>{errors.email.message}</span>
                  </motion.p>
                )}
              </div>
            </div>

            {/* Error Message */}
            {submissionState === 'error' && apiResponse?.error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg"
              >
                <div className="flex items-center space-x-2">
                  <AlertCircle className="w-5 h-5 text-red-400" />
                  <p className="text-sm text-red-400">
                    {apiResponse.error === 'Email already registered' 
                      ? `You&apos;re already on the waitlist! ${waitlistPosition ? `Position #${waitlistPosition}` : ''}` 
                      : apiResponse.error
                    }
                  </p>
                </div>
              </motion.div>
            )}

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={submissionState === 'loading' || !isValid}
              className={`${styles.button} disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 group`}
              whileHover={{ scale: submissionState === 'loading' ? 1 : 1.02 }}
              whileTap={{ scale: submissionState === 'loading' ? 1 : 0.98 }}
            >
              {submissionState === 'loading' ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  {variant === 'hero' && <Users className="w-5 h-5" />}
                  <span>{getButtonText()}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </motion.button>

            {/* Privacy Text */}
            <p className="mt-3 text-xs text-center opacity-60">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </motion.div>
  );
}