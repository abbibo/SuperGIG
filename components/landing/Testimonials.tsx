"use client";

import { motion } from "framer-motion";

const testimonials = [
  {
    id: 1,
    name: "Sarah Chen",
    role: "Software Engineer",
    company: "TechCorp",
    image: "👩‍💻",
    quote: "JobLink helped me find my dream role in just 2 weeks. The platform is intuitive and the job matches are spot-on!",
    rating: 5,
  },
  {
    id: 2,
    name: "Michael Rodriguez",
    role: "Product Designer",
    company: "DesignStudio",
    image: "👨‍🎨",
    quote: "As a designer, I was looking for the right creative opportunity. JobLink connected me with amazing companies that value design.",
    rating: 5,
  },
  {
    id: 3,
    name: "Emily Johnson",
    role: "Marketing Manager",
    company: "GrowthCo",
    image: "👩‍💼",
    quote: "The application process was seamless. I landed multiple interviews and found the perfect fit for my career goals.",
    rating: 5,
  },
];

export const Testimonials = () => {
  return (
    <section className="px-4 max-w-6xl mx-auto mb-24">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <div className="inline-flex items-center gap-2 bg-primary/10 dark:bg-primary/20 text-primary px-4 py-1.5 rounded-full text-sm font-semibold mb-4 border border-primary/20">
          <span className="material-icons text-base">favorite</span>
          <span>Trusted by Professionals</span>
        </div>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
          What People Say
        </h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Join thousands of professionals who found their perfect match
        </p>
      </motion.div>

      {/* Testimonials Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={testimonial.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
            whileHover={{ y: -5, scale: 1.02 }}
            className="group bg-card border border-border rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-xl hover:shadow-primary/5 hover:border-primary/30 transition-all duration-300 relative overflow-hidden"
          >
            {/* Background gradient */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary-start/5 to-primary-end/5 rounded-full blur-2xl group-hover:opacity-100 transition-opacity" />
            
            <div className="relative z-10">
              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="material-icons text-yellow-400 text-lg">star</span>
                ))}
              </div>
              
              {/* Quote */}
              <p className="text-foreground mb-6 leading-relaxed text-base">
                "{testimonial.quote}"
              </p>
              
              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-start to-primary-end flex items-center justify-center text-2xl shadow-lg">
                  {testimonial.image}
                </div>
                <div>
                  <div className="font-semibold text-foreground">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {testimonial.role} at {testimonial.company}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

