"use client";

import { motion } from "framer-motion";

const stats = [
  { 
    label: "Active Jobs", 
    value: "5k+", 
    icon: "work_outline",
    color: "from-primary-start to-primary-end",
    description: "New opportunities daily"
  },
  { 
    label: "Companies", 
    value: "2k+", 
    icon: "business",
    color: "from-primary-start to-primary-end",
    description: "Top employers hiring"
  },
  { 
    label: "Successful Hires", 
    value: "10k+", 
    icon: "celebration",
    color: "from-primary-start to-primary-end",
    description: "Professionals placed"
  },
];

export const Stats = () => {
  return (
    <section className="mb-24 px-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="group relative bg-card border border-border rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-xl hover:shadow-primary/5 hover:border-primary/30 transition-all duration-300 overflow-hidden"
            >
              {/* Background gradient on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
              
              <div className="relative z-10">
                {/* Icon */}
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <span className="material-icons text-white text-2xl">{stat.icon}</span>
                </div>
                
                {/* Value */}
                <div className="text-4xl md:text-5xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {stat.value}
                </div>
                
                {/* Label */}
                <div className="text-sm md:text-base text-muted-foreground font-semibold mb-1 uppercase tracking-wider">
                  {stat.label}
                </div>
                
                {/* Description */}
                <div className="text-xs text-muted-foreground mt-2">
                  {stat.description}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};
