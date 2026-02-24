import React, { useRef, useEffect, useState } from 'react';
import { Target, Zap, Lock, Cpu } from 'lucide-react';
import { motion, useScroll, useTransform, useInView, useMotionValue, animate } from 'framer-motion';

const CountUp: React.FC<{ value: string }> = ({ value }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const numMatch = value.match(/(\d+\.?\d*)/);
  const targetNumber = numMatch ? parseFloat(numMatch[0]) : 0;
  const parts = value.split(numMatch ? numMatch[0] : "");
  const prefix = parts[0];
  const suffix = parts[1];

  const count = useMotionValue(0);
  const [displayValue, setDisplayValue] = useState(prefix + "0" + suffix);

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, targetNumber, {
        duration: 2,
        ease: "easeOut",
        onUpdate: (latest) => {
          const formatted = value.includes(".")
            ? latest.toFixed(2)
            : Math.round(latest).toString();
          setDisplayValue(prefix + formatted + suffix);
        }
      });
      return controls.stop;
    }
  }, [isInView, targetNumber, count, prefix, suffix, value]);

  return <span ref={ref}>{displayValue}</span>;
};

import { AnimatedText } from './Shared/AnimatedText';

const About: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const headline_part1 = "Engineering the Future of";
  const headline_part2 = "Automated Trading";
  const main_desc = "Titan Trades is built for traders who want results without the noise. Our dedicated traders and automated trading bots execute with perfect discipline —no fear, no greed, no missed opportunities";

  const cards = [
    {
      icon: <Zap className="w-6 h-6 text-blue-400" />,
      title: "Zero Latency Engine",
      desc: "Execution speeds measured in milliseconds. We strike when the market moves, ensuring you never miss a tick.",
      bg_icon: <Zap className="w-32 h-32 text-blue-500" />
    },
    {
      icon: <Lock className="w-6 h-6 text-indigo-400" />,
      title: "Iron Discipline",
      desc: "Removing human emotion ensures every trade adheres strictly to the strategy. No FOMO.",
      bg_icon: null
    },
    {
      icon: <Target className="w-6 h-6 text-purple-400" />,
      title: "Precision Targeting",
      desc: "Focused exclusively on high-liquidity markets: Gold, Silver, and BTC.",
      bg_icon: null
    }
  ];

  return (
    <section id="about" ref={containerRef} className="py-24 bg-transparent relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {[
            { label: "Execution Speed", value: "< 20ms" },
            { label: "Uptime Guarantee", value: "99.99%" },
            { label: "Win Rate", value: "80%+" },
            { label: "Emotion", value: "0%" }
          ].map((stat, i) => (
            <div key={i} className="glass-card p-6 rounded-2xl text-center hover:bg-white/5 transition-colors group">
              <p className="text-3xl font-bold text-white mb-1 group-hover:text-blue-400 transition-colors">
                <CountUp value={stat.value} />
              </p>
              <p className="text-sm text-slate-500 font-medium uppercase tracking-wider">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-start">

          <div className="lg:col-span-4 sticky top-24">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-6">
              <span className="text-blue-400 text-xs font-medium uppercase tracking-wider">About Titan</span>
            </div>
            <h2 className="text-4xl font-semibold text-white mb-6 leading-tight flex flex-wrap">
              <AnimatedText text={headline_part1} progress={scrollYProgress} range={[0.1, 0.2]} />
              <span className="w-full"></span>
              <AnimatedText
                text={headline_part2}
                progress={scrollYProgress}
                range={[0.15, 0.3]}
                className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400"
              />
            </h2>
            <p className="text-slate-400 text-lg leading-relaxed mb-8">
              <AnimatedText text={main_desc} progress={scrollYProgress} range={[0.2, 0.5]} />
            </p>
            <a href="#join" className="text-blue-400 font-medium hover:text-blue-300 flex items-center gap-2 group">
              Start your journey <span className="group-hover:translate-x-1 transition-transform">→</span>
            </a>
          </div>

          <div className="lg:col-span-8 grid gap-6">
            <div className="glass-card p-8 rounded-2xl border border-white/5 relative overflow-hidden group">
              {cards[0].bg_icon && (
                <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:opacity-40 transition-opacity">
                  {cards[0].bg_icon}
                </div>
              )}
              <div className="relative z-10">
                <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center mb-6">
                  {cards[0].icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">
                  {cards[0].title}
                </h3>
                <p className="text-slate-400 max-w-md">
                  {cards[0].desc}
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {cards.slice(1).map((card, idx) => (
                <div key={idx} className="glass-card p-8 rounded-2xl border border-white/5 hover:border-blue-500/30 transition-colors group">
                  <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center mb-6">
                    {card.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">
                    {card.title}
                  </h3>
                  <p className="text-slate-400 text-sm">
                    {card.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;