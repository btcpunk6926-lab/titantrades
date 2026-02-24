import React, { useRef } from 'react';
import { Send, ChevronRight } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { AnimatedText } from './Shared/AnimatedText';
import footerVideo from './Assets/hf_20260224_152112_7042c344-7f7b-40d3-b404-939078d201f8.mp4';

const XIcon = ({ size = 20 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
  </svg>
);


const JoinNow: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end end"]
  });

  // Fade in the footer video as the user scrolls through this final section
  const videoOpacity = useTransform(scrollYProgress, [0, 0.7, 1], [0, 0, 0.4]);

  return (
    <section id="join" ref={sectionRef} className="pt-32 pb-12 bg-cosmic-950 relative overflow-hidden border-t border-white/5">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <motion.video
          autoPlay
          loop
          muted
          playsInline
          style={{ opacity: videoOpacity }}
          className="w-full h-full object-cover object-top"
        >
          <source src={footerVideo} type="video/mp4" />
        </motion.video>
        {/* Subtle overlay to enhance readability */}
        <div className="absolute inset-0 bg-cosmic-950/40"></div>
      </div>

      <div className="max-w-4xl mx-auto px-4 relative z-10 text-center mb-24">
        <h2 className="text-5xl md:text-6xl font-semibold text-white mb-8 tracking-tight flex flex-col items-center leading-[1.2]">
          <AnimatedText
            text="Ready to level up"
            progress={scrollYProgress}
            range={[0.1, 0.4]}
            className="py-1"
          />
          <AnimatedText
            text="your trading?"
            progress={scrollYProgress}
            range={[0.3, 0.6]}
            className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-white py-2"
          />
        </h2>
        <p className="text-slate-200 text-lg mb-12 max-w-xl mx-auto drop-shadow-sm font-medium">
          <AnimatedText
            text="See how Titan’s professional traders guide intelligent, emotion-free strategies. Join the community for free today!"
            progress={scrollYProgress}
            range={[0.4, 0.9]}
          />
        </p>

        <a href="https://t.me/titantradesHQ" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-white text-cosmic-950 font-semibold px-8 py-4 rounded-full hover:scale-105 transition-transform shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)]">
          Join our Channel
        </a>
      </div>

      {/* Footer Links */}
      <div className="max-w-7xl mx-auto px-6 pt-12 mt-12 flex flex-col items-center relative z-10">
        <div className="flex flex-col items-center text-center max-w-3xl">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xl font-bold text-white">TITAN TRADES</span>
          </div>
          <p className="text-slate-200 text-sm mb-6 drop-shadow-sm font-medium">
            Our traders provide trading ideas and educational insights only. Their guidance should not be considered financial advice, and all trading decisions remain your responsibility.
          </p>
          <div className="flex gap-4">
            <a href="#" className="text-white hover:text-blue-400 transition-colors bg-white/10 p-2 rounded-full"><XIcon size={20} /></a>
            <a href="https://t.me/titantradesHQ" target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-400 transition-colors bg-white/10 p-2 rounded-full"><Send size={20} /></a>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 w-full text-center text-xs text-slate-300">
          <p>TITAN TRADES © {new Date().getFullYear()}. All rights reserved.</p>
        </div>
      </div>
    </section>
  );
};

export default JoinNow;