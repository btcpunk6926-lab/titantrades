import React from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import About from './components/About';
import HowItWorks from './components/HowItWorks';
import JoinNow from './components/JoinNow';
import { motion, useScroll, useTransform } from 'framer-motion';
import heroVideo from './components/Assets/hf_20260224_142203_b813b95e-7151-4234-9772-c0b9988f2ca9.mp4';

const App: React.FC = () => {
  const { scrollYProgress } = useScroll();

  // Video opacity stays subtle throughout About section and hits 0 near the end of HowItWorks
  // Range expanded from [0.4, 0.7] to [0.6, 0.9] to push the fade-out to the bottom of the page
  const videoOpacity = useTransform(scrollYProgress, [0, 0.6, 0.9, 1], [0.6, 0.2, 0, 0]);
  // Dark overlay intensification follows the same expanded range
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.6, 0.9, 1], [0.7, 0.85, 1, 1]);

  // Ensure video is absolutely hidden when opacity is 0 to prevent "ghosting" or reappearance
  const isVideoVisible = useTransform(videoOpacity, (v) => (v > 0 ? "visible" : "hidden"));

  return (
    <div className="bg-cosmic-950 min-h-screen text-slate-200 selection:bg-blue-500 selection:text-white font-sans overflow-x-hidden relative">
      {/* Global Sticky Video Background */}
      <motion.div
        className="fixed inset-0 z-0 pointer-events-none"
        style={{ visibility: isVideoVisible as any }}
      >
        <motion.video
          autoPlay
          loop
          muted
          playsInline
          style={{ opacity: videoOpacity }}
          className="w-full h-full object-cover"
        >
          <source src={heroVideo} type="video/mp4" />
        </motion.video>
        {/* Gradients to blend and ensure readability */}
        <motion.div
          style={{ opacity: overlayOpacity }}
          className="absolute inset-0 bg-gradient-to-b from-cosmic-950 via-transparent to-cosmic-950"
        ></motion.div>
        <div className="absolute inset-0 bg-cosmic-950/10"></div>
      </motion.div>

      <div className="relative z-10">
        <Navigation />
        <main>
          <Hero />
          <About />
          <HowItWorks />
          <JoinNow />
        </main>
      </div>
    </div>
  );
};

export default App;