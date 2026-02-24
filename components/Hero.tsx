import React from 'react';
import { ChevronRight, ArrowDown } from 'lucide-react';
import heroVideo from './Assets/hf_20260224_142203_b813b95e-7151-4234-9772-c0b9988f2ca9.mp4';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center pt-24 pb-12 overflow-hidden bg-transparent">

      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-blue-500/30 backdrop-blur-sm mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse"></span>
          <span className="text-blue-200 text-xs font-medium tracking-wide">Automated Precision Trading</span>
        </div>

        {/* Headline */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-semibold text-white tracking-tight leading-[1.1] mb-8 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100">
          <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60">
            Become a Titan.
          </span>
          <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-blue-200 to-white">
            Unleash Precision.
          </span>
        </h1>

        <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
          Follow our dedicated traders and powerful automated bots that trade Gold, Silver, BTC and more — 24/7, with speed, discipline, and zero hesitation.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-20 animate-in fade-in slide-in-from-bottom-10 duration-700 delay-300">
          <a
            href="#join"
            className="group relative px-8 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-full shadow-[0_0_20px_-5px_rgba(37,99,235,0.5)] hover:shadow-[0_0_30px_-5px_rgba(37,99,235,0.6)] transition-all"
          >
            Start Trading Now
          </a>
          <a
            href="#how-it-works"
            className="px-8 py-3.5 bg-white/5 border border-white/10 hover:bg-white/10 text-white font-medium rounded-full backdrop-blur-sm transition-all flex items-center gap-2"
          >
            Learn More <ChevronRight className="w-4 h-4 opacity-70" />
          </a>
        </div>
      </div>

      <div className="absolute bottom-10 animate-bounce opacity-30 text-white">
        <ArrowDown className="w-6 h-6" />
      </div>

    </section>
  );
};

export default Hero;