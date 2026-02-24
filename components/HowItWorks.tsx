import React, { useRef, useState } from 'react';
import { Users, UserPlus, TrendingUp, BarChart } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { AnimatedText } from './Shared/AnimatedText';

const steps = [
  {
    id: "01",
    icon: Users,
    title: "Join the Group",
    description: "Join our free Titan Trades group to see how our traders and bots are performing"
  },
  {
    id: "02",
    icon: UserPlus,
    title: "Sign Up",
    description: "Set up your trading account and join our VIP channel for free"
  },
  {
    id: "03",
    icon: TrendingUp,
    title: "Trade",
    description: "Follow our signals manually or through our automated trading bots"
  },
  {
    id: "04",
    icon: BarChart,
    title: "Grow",
    description: "Learn to execute with speed, discipline, and zero emotions."
  }
];

const HowItWorks: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "center center"]
  });

  return (
    <motion.section
      id="how-it-works"
      ref={sectionRef}
      className="py-24 bg-transparent relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          {/* ... existing badge */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-semibold text-white mb-6 flex flex-col items-center"
          >
            <AnimatedText
              text="From Account to Profit"
              progress={scrollYProgress}
              range={[0.1, 0.4]}
            />
            <AnimatedText
              text="Seamlessly and at Scale"
              progress={scrollYProgress}
              range={[0.3, 0.6]}
              className="text-slate-500"
            />
          </motion.h2>
        </div>

        {/* Timeline Visual for Desktop */}
        <div className="hidden lg:flex items-center justify-between relative mb-12 px-12">
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-white/5 -z-10"></div>
          {steps.map((_, i) => (
            <div key={i} className={`w-4 h-4 rounded-full border-2 transition-all duration-300 ${i === activeStep ? 'bg-blue-500 border-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)] scale-125' : 'bg-cosmic-950 border-slate-700'}`}></div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + (index * 0.1) }}
              className="glass-card p-8 rounded-2xl hover:-translate-y-2 transition-transform duration-300 relative group overflow-hidden"
              onMouseEnter={() => setActiveStep(index)}
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>

              <div className="flex items-center justify-between mb-6">
                <div className="p-3 bg-white/5 rounded-lg border border-white/5 group-hover:border-white/20 transition-colors">
                  <step.icon className="w-6 h-6 text-white" />
                </div>
                <span className="text-xs font-mono text-blue-400 bg-white/5 px-2 py-1 rounded">Step {step.id}</span>
              </div>

              <h3 className="text-lg font-bold text-white mb-3">{step.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default HowItWorks;