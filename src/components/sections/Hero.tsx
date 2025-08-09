"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { useScroll, useTransform } from "framer-motion";
import { AnimatedButton } from "@/components/ui/animated-button";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export function HeroSection() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-purple-900 via-indigo-900 to-black">
      {/* Animated Background Shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-purple-500/10 blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-emerald-500/10 blur-3xl"
          animate={{
            x: [0, -100, 0],
            y: [0, 50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      {/* Content Container */}
      <div className="container mx-auto px-4 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-screen">
          {/* Text Content */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="pt-20 lg:pt-0"
            style={{ y, opacity }}
          >
            <motion.div variants={item} className="space-y-6">
              <h1 className="text-5xl md:text-6xl font-bold text-white">
                Premium Events on{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-purple-500">
                  Solana
                </span>
              </h1>
              <p className="text-lg md:text-xl text-gray-300 max-w-lg">
                Experience the future of event ticketing with blockchain-powered NFT tickets.
                Secure, tradeable, and uniquely yours.
              </p>
            </motion.div>

            <motion.div variants={item} className="flex flex-col sm:flex-row gap-4 mt-8">
              <AnimatedButton
                size="lg"
                className="relative group"
              >
                Explore Events
                <motion.span
                  className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-emerald-400 opacity-0 group-hover:opacity-100 rounded-2xl"
                  style={{ mixBlendMode: "soft-light" }}
                  transition={{ duration: 0.2 }}
                />
              </AnimatedButton>
              <AnimatedButton
                size="lg"
                variant="outline"
                className="bg-white/10 border-white/20 backdrop-blur-sm hover:bg-white/20 text-white"
              >
                Auction Marketplace
              </AnimatedButton>
            </motion.div>
          </motion.div>

          {/* NFT Ticket Showcase */}
          <motion.div
            className="hidden lg:block relative"
            style={{ y: useTransform(scrollY, [0, 500], [0, 100]) }}
          >
            <motion.div
              className="relative w-full max-w-md mx-auto"
              whileHover={{ rotateY: 10, rotateX: 5 }}
              style={{ transformStyle: "preserve-3d", perspective: 1000 }}
            >
              <motion.div
                className="w-full aspect-[4/5] rounded-2xl bg-gradient-to-br from-purple-500 to-emerald-500 p-1"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              >
                <div className="w-full h-full rounded-xl bg-black/90 backdrop-blur-xl p-6">
                  <div className="space-y-4">
                    <div className="h-48 rounded-lg bg-gradient-to-br from-purple-400/20 to-emerald-400/20 animate-pulse" />
                    <div className="space-y-2">
                      <div className="h-6 w-3/4 rounded bg-white/10" />
                      <div className="h-4 w-1/2 rounded bg-white/5" />
                    </div>
                    <div className="pt-4 flex justify-between items-center">
                      <div className="h-10 w-24 rounded-lg bg-emerald-500/20" />
                      <div className="h-10 w-10 rounded-full bg-purple-500/20" />
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
