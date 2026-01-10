"use client";

import { motion } from "framer-motion";

const steps = [
  {
    id: 1,
    title: "Create Profile",
    description: "Build your professional profile to stand out to employers. Highlight your skills, experience, and achievements in one place.",
    icon: "person_add",
    color: "from-primary-start to-primary-end",
    duration: "2 minutes",
  },
  {
    id: 2,
    title: "Discover Jobs",
    description: "Search and filter through hundreds of curated job listings tailored to your super skills. Get personalized recommendations.",
    icon: "search",
    color: "from-primary-start to-primary-end",
    duration: "Instant",
  },
  {
    id: 3,
    title: "Get Hired",
    description: "Connect directly with recruiters, nail the interview, and land your dream supergig. We support you every step of the way.",
    icon: "celebration",
    color: "from-primary-start to-primary-end",
    duration: "Fast track",
  },
];

export const HowItWorks = () => {
  return (
    <section id="how-it-works" className="px-4 max-w-6xl mx-auto mb-24">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-semibold mb-4 border border-primary/20">
          <span className="material-icons text-base">auto_awesome</span>
          <span>Simple Process</span>
        </div>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
          How it Works
        </h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Get started in three simple steps and land your next opportunity
        </p>
      </motion.div>
      
      {/* Steps with Connecting Flow */}
      <div className="relative">
        {/* Connecting Line (Desktop) */}
        <div className="hidden md:block absolute top-20 left-0 right-0 h-0.5 bg-gradient-to-r from-primary-start via-primary to-primary-end opacity-20" />
        <div className="hidden md:block absolute top-20 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary-start to-transparent opacity-40" style={{ width: '33.33%' }} />
        <div className="hidden md:block absolute top-20 left-1/3 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent opacity-40" style={{ width: '33.33%' }} />
        <div className="hidden md:block absolute top-20 left-2/3 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary-end to-transparent opacity-40" style={{ width: '33.33%' }} />
        
        <div className="grid md:grid-cols-3 gap-6 md:gap-8 relative">
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.6 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group relative"
            >
              {/* Step Card */}
              <div className="bg-card border-2 border-border rounded-3xl p-8 shadow-sm hover:shadow-2xl hover:shadow-primary/10 hover:border-primary/40 transition-all duration-300 relative overflow-hidden h-full flex flex-col">
                {/* Background Pattern */}
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${step.color} opacity-5 group-hover:opacity-10 rounded-full blur-3xl transition-opacity duration-500`} />
                
                <div className="relative z-10 flex flex-col h-full">
                  {/* Duration Badge */}
                  <div className="flex items-center justify-end mb-6">
                    <div className="text-xs font-semibold text-muted-foreground bg-card px-3 py-1.5 rounded-full border border-border">
                      {step.duration}
                    </div>
                  </div>
                  
                  {/* Icon */}
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center mb-6 shadow-lg group-hover:rotate-6 transition-transform duration-300`}>
                    <span className="material-icons text-white text-3xl">{step.icon}</span>
                  </div>
                  
                  {/* Title */}
                  <h3 className="font-bold text-2xl text-foreground mb-4 group-hover:text-primary transition-colors">
                    {step.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-base text-muted-foreground leading-relaxed flex-grow">
                    {step.description}
                  </p>
                  
                  {/* Arrow Indicator (Desktop) */}
                  {index < steps.length - 1 && (
                    <div className="hidden md:block absolute top-20 -right-4 text-primary opacity-30 group-hover:opacity-60 transition-opacity z-20">
                      <span className="material-icons text-3xl">arrow_forward</span>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="text-center mt-12"
      >
        <button className="bg-primary text-white font-semibold py-4 px-8 rounded-xl shadow-lg shadow-primary/25 hover:bg-primary-hover hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 mx-auto group">
          <span>Get Started Now</span>
          <span className="material-icons text-xl group-hover:translate-x-1 transition-transform">arrow_forward</span>
        </button>
      </motion.div>
    </section>
  );
};
