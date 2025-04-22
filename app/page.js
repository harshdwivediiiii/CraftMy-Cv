'use client';

import { motion } from 'framer-motion';
import { UserPlus, FileText, Pencil, ChevronRight } from 'lucide-react';
import { Typewriter } from 'react-simple-typewriter';  // Import Typewriter
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import InteractiveBackground from '@/components/InteractiveBackground';

const AuthHero = () => {
  const { isSignedIn } = useUser();
  const [isMounted, setIsMounted] = useState(false); // No need for type annotations in JSX
  const [isDarkMode, setIsDarkMode] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);

    if (typeof window !== 'undefined') {
      const darkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setIsDarkMode(darkMode);
    }
  }, []);

  if (!isMounted || typeof isSignedIn === 'undefined') return null;

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  const stagger = {
    animate: {
      transition: { staggerChildren: 0.1 },
    },
  };

  const handleClick = (path) => {
    if (isSignedIn) {
      router.push(path);
    } else {
      router.push('/sign-in');
    }
  };

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Interactive Background with isDarkMode prop */}
      {isMounted && <InteractiveBackground isDarkMode={isDarkMode} />}

      {/* Content over the Interactive Background */}
      <div className="relative mx-auto max-w-screen-xl px-4 pt-20 lg:pt-32">
        <motion.div
          initial="initial"
          animate="animate"
          variants={stagger}
          className="mx-auto max-w-2xl text-center relative z-10"
        >
          <motion.div
            variants={fadeIn}
            className="inline-flex items-center rounded-full bg-gray-300 px-4 py-1 text-gray-800 mb-8 dark:bg-gray-700 dark:text-gray-300"
          >
            <FileText className="h-4 w-4 mr-2" />
            <span className="text-sm font-medium">AI-Powered Resume Builder</span>
          </motion.div>

          <motion.h1
            variants={fadeIn}
            className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl dark:text-gray-100"
          >
            Build Your Perfect Resume with
            <span className="relative whitespace-nowrap text-black block mt-2 dark:text-white">
              <Typewriter
                words={['AI Assistance', 'Tailored Templates', 'Instant Export', 'Professional Design']}
                loop={0}
                cursor
                cursorStyle="|"
                typeSpeed={100}
                deleteSpeed={50}
                delaySpeed={1500}
              />
            </span>
          </motion.h1>

          <motion.p
            variants={fadeIn}
            className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300"
          >
            Create a standout resume with personalized suggestions powered by AI. Get the perfect layout in minutes.
          </motion.p>

          <motion.div
            variants={fadeIn}
            className="mt-10 flex items-center justify-center gap-x-6"
          >
            <Button
              onClick={() => handleClick('/dashboard')}
              className="group relative inline-flex items-center gap-x-2 rounded-full bg-gray-800 px-8 py-4 text-white hover:bg-gray-500 transition dark:bg-gray-600 dark:hover:bg-gray-500"
            >
              Start Building Your Resume
              <ChevronRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </Button>
            <Button
              onClick={() => router.push('/sign-up')}
              className="text-sm font-semibold leading-6 text-gray-900 hover:text-gray-800 transition dark:text-black dark:hover:text-white dark:hover:bg-black" 
            >
              Sign Up <span aria-hidden="true">→</span>
            </Button>
          </motion.div>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-20 relative z-10"
        >
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[{
              Icon: Pencil,
              title: 'Easy Editing',
              desc: 'Make real-time changes with an easy-to-use editor for a polished resume.',
            },
            {
              Icon: FileText,
              title: 'Custom Templates',
              desc: 'Choose from a variety of professional templates tailored to your industry.',
            },
            {
              Icon: UserPlus,
              title: 'AI-Powered Suggestions',
              desc: 'Get AI-driven content suggestions to improve your resume quality and readability.',
            }].map(({ Icon, title, desc }, i) => (
              <div key={i} className="relative group">
                <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-gray-600 to-gray-800 opacity-25 blur transition group-hover:opacity-75 dark:opacity-50" />
                <div className="relative rounded-lg bg-white p-8 shadow-xl dark:bg-black">
                  <Icon className="h-10 w-10 text-gray-800 dark:text-gray-400" />
                  <h3 className="mt-4 text-xl font-bold text-gray-900 dark:text-gray-100">{title}</h3>
                  <p className="mt-2 text-gray-600 dark:text-gray-300">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Social Proof */}
        <motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ delay: 0.8, duration: 0.6 }}
  className="mt-20 text-center relative z-10"
>
  <p className="text-sm font-semibold text-gray-500 dark:text-gray-400">
    Empowering you to create the perfect resume
  </p>
</motion.div>
      </div>
    </section>
  );
};

export default AuthHero;
