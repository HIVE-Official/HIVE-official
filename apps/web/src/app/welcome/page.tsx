'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@hive/ui'
import { ArrowRight, Sparkles } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function WelcomePage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden relative">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Grain texture overlay */}
        <div className="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMjU2IDI1NiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZmlsdGVyIGlkPSJub2lzZUZpbHRlciI+PGZlVHVyYnVsZW5jZSB0eXBlPSJmcmFjdGFsTm9pc2UiIGJhc2VGcmVxdWVuY3k9IjAuOSIgbnVtT2N0YXZlcz0iNCIgc3RpdGNoVGlsZXM9InN0aXRjaCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNub2lzZUZpbHRlcikiIG9wYWNpdHk9IjAuNCIvPjwvc3ZnPg==')]" />
        
        {/* Subtle gold gradient orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-accent/10 rounded-full blur-3xl"
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ 
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-8">
        {/* Logo Animation */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
          className="text-center mb-12"
        >
          {/* HIVE Logo with subtle glow */}
          <motion.h1 
            className="text-8xl lg:text-9xl font-bold tracking-tight font-display mb-6 relative"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.6 }}
          >
            <span className="bg-gradient-to-r from-accent via-accent-600 to-accent bg-clip-text text-transparent relative">
              HIVE
              {/* Subtle glow effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-accent via-accent-600 to-accent bg-clip-text text-transparent blur-sm opacity-40"
                animate={{ opacity: [0.2, 0.6, 0.2] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                HIVE
              </motion.div>
            </span>
          </motion.h1>

          {/* Tagline with typing animation */}
          <motion.p
            className="text-2xl lg:text-3xl text-muted font-light tracking-wide"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            Where your campus comes alive
          </motion.p>
        </motion.div>

        {/* Hero Message */}
        <motion.div
          className="text-center max-w-2xl mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 1.5 }}
        >
          <h2 className="text-4xl lg:text-5xl font-bold leading-tight mb-6 font-display">
            Connect. Create.{' '}
            <span className="text-accent relative inline-block">
              Belong.
              {/* Animated underline */}
              <motion.div
                className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-accent/40 via-accent to-accent/40 rounded-full"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 2 }}
              />
            </span>
          </h2>
          <p className="text-xl lg:text-2xl text-foreground/80 leading-relaxed font-sans">
            The social platform built exclusively for college students.
          </p>
        </motion.div>

        {/* Single Primary CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 2.2 }}
          className="relative"
        >
          <Link href="/auth/choose">
            <Button
              size="lg"
              className="group relative bg-accent hover:bg-accent/90 text-background font-semibold px-12 py-6 text-xl transition-all duration-300 ease-out hover:scale-105 hover:shadow-2xl hover:shadow-accent/25 focus:ring-4 focus:ring-accent/30 focus:ring-offset-4 focus:ring-offset-background border-2 border-accent/20 hover:border-accent/40"
            >
              {/* Button background glow */}
              <div className="absolute inset-0 bg-accent rounded-lg blur opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
              
              <span className="relative z-10 flex items-center">
                Get Inside
                <motion.div
                  className="ml-3"
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  <ArrowRight className="w-6 h-6" />
                </motion.div>
              </span>
            </Button>
          </Link>

          {/* Floating sparkles around button */}
          <motion.div
            className="absolute -top-2 -right-2 text-accent/60"
            animate={{ 
              rotate: [0, 360],
              scale: [1, 1.2, 1]
            }}
            transition={{ 
              duration: 4,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            <Sparkles className="w-5 h-5" />
          </motion.div>
          <motion.div
            className="absolute -bottom-2 -left-2 text-accent/40"
            animate={{ 
              rotate: [360, 0],
              scale: [1.2, 1, 1.2]
            }}
            transition={{ 
              duration: 3,
              repeat: Infinity,
              ease: "linear",
              delay: 1
            }}
          >
            <Sparkles className="w-4 h-4" />
          </motion.div>
        </motion.div>

        {/* Bottom verification text */}
        <motion.p
          className="text-sm text-muted font-sans mt-8 opacity-80"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ duration: 0.6, delay: 2.8 }}
        >
          Exclusive to verified .edu students
        </motion.p>
      </div>

      {/* Subtle animated border */}
      <motion.div
        className="absolute inset-0 border border-accent/10 rounded-none pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 3 }}
      />
    </div>
  )
} 