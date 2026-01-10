"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export const Hero = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <section className="relative overflow-hidden pt-32 pb-48 px-4 sm:px-6 lg:px-8 text-center">
      {/* Enhanced Background Graphics */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-5xl -z-10 pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="absolute top-0 left-10 w-96 h-96 bg-gradient-to-br from-primary-start/20 to-primary-end/20 rounded-full blur-[100px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            x: [0, 50, 0],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            repeatType: "reverse",
            delay: 1,
          }}
          className="absolute bottom-0 right-10 w-72 h-72 bg-purple-400/20 rounded-full blur-[80px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            y: [0, -30, 0],
            opacity: [0.15, 0.3, 0.15],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            repeatType: "reverse",
            delay: 0.5,
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-pink-400/15 rounded-full blur-[120px]"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-5xl mx-auto"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="inline-flex items-center gap-2 bg-primary/10 dark:bg-primary/20 text-primary px-5 py-2 rounded-full text-sm font-semibold mb-8 border border-primary/20"
        >
          <span className="material-icons text-base">trending_up</span>
          <span>Join 10,000+ professionals finding their dream jobs</span>
        </motion.div>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.1] mb-8 text-foreground tracking-tight">
          Find Your Next <br />
          <span className="text-primary">
            Supergig
          </span>
        </h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-muted-foreground text-lg md:text-xl lg:text-2xl leading-relaxed mb-12 max-w-2xl mx-auto font-normal"
        >
          Connect with top employers and discover opportunities that match your super skills. Join thousands of professionals today.
        </motion.p>

        {/* Enhanced Search Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="max-w-4xl mx-auto mb-10"
        >
          <div className="relative bg-card rounded-2xl shadow-xl shadow-primary/5 border-2 border-border p-3 flex flex-col sm:flex-row gap-3">
            <div className="flex-1 flex items-center gap-3 px-5 py-4 bg-muted rounded-xl border border-border">
              <span className="material-icons text-muted-foreground text-xl">search</span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Q Search"
                className="flex-1 bg-transparent border-none outline-none text-foreground placeholder:text-muted-foreground text-base font-medium"
              />
              <button className="p-2 rounded-lg hover:bg-card transition-colors">
                <span className="material-icons text-muted-foreground text-xl">tune</span>
              </button>
            </div>
            <button className="bg-gradient-to-r from-primary-start to-primary-end text-white font-semibold py-4 px-8 rounded-xl hover:opacity-90 active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2 group shadow-md shadow-primary/20">
              <span className="material-icons text-xl">search</span>
              <span className="hidden sm:inline">Search</span>
            </button>
          </div>
          
          {/* Quick Filters */}
          <div className="flex flex-wrap justify-center gap-3 mt-6">
            <span className="text-sm text-subtext-light dark:text-subtext-dark font-medium">Popular:</span>
            {["Remote", "Full-time", "Developer", "Designer", "Marketing"].map((tag) => (
              <button
                key={tag}
                className="text-sm px-4 py-2 bg-card hover:bg-primary/10 text-muted-foreground hover:text-primary rounded-xl border border-border hover:border-primary/50 transition-all duration-200 font-medium"
              >
                {tag}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Enhanced CTAs */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <button className="w-full sm:w-auto bg-gradient-to-r from-primary-start to-primary-end text-white font-semibold py-4 px-8 rounded-xl shadow-md shadow-primary/20 hover:opacity-90 active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2">
            <span className="material-icons text-xl">explore</span>
            Browse All Jobs
          </button>
          <button className="w-full sm:w-auto bg-card text-foreground border-2 border-border font-semibold py-4 px-8 rounded-xl hover:border-primary/50 hover:shadow-md active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2">
            <span className="material-icons text-xl">add_circle_outline</span>
            Post a Job
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
};
