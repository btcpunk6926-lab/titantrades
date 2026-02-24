import React, { useState, useEffect, useRef } from 'react';
import { Terminal, Cpu, Activity, Send } from 'lucide-react';
import { getBotAnalysis } from '../services/geminiService';
import { BotLog } from '../types';

const BotTerminal: React.FC = () => {
  const [logs, setLogs] = useState<BotLog[]>([
    { timestamp: new Date().toLocaleTimeString(), message: 'System initialized. Connecting to global exchanges...', type: 'info' },
    { timestamp: new Date().toLocaleTimeString(), message: 'TITAN Core Online. v4.5.2', type: 'success' },
  ]);
  const [input, setInput] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const logsEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    logsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [logs]);

  const handleCommand = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isAnalyzing) return;

    const market = input.trim();
    setInput('');
    
    // Add user command log
    const userLog: BotLog = {
      timestamp: new Date().toLocaleTimeString(),
      message: `> RUN ANALYSIS: ${market.toUpperCase()}`,
      type: 'info'
    };
    setLogs(prev => [...prev, userLog]);
    setIsAnalyzing(true);

    // Simulate processing delay for effect
    setTimeout(async () => {
      const analysis = await getBotAnalysis(market);
      const botLog: BotLog = {
        timestamp: new Date().toLocaleTimeString(),
        message: analysis,
        type: 'analysis'
      };
      setLogs(prev => [...prev, botLog]);
      setIsAnalyzing(false);
    }, 1500);
  };

  return (
    <section id="terminal" className="py-20 bg-titan-dark relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-titan-gray via-black to-black opacity-50 z-0 pointer-events-none"></div>
      
      <div className="max-w-4xl mx-auto px-4 relative z-10">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tighter">
            LIVE <span className="text-titan-gold">INTELLIGENCE</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Experience the power of Titan's analysis engine. Enter a market ticker (e.g., BTC, XAU, TSLA) to trigger a live simulation of our bot's reasoning.
          </p>
        </div>

        <div className="bg-black border border-white/20 rounded-lg shadow-2xl overflow-hidden backdrop-blur-sm">
          {/* Terminal Header */}
          <div className="bg-gray-900 px-4 py-2 flex items-center justify-between border-b border-white/10">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-titan-gold" />
              <span className="text-xs font-mono text-gray-400">TITAN_OS_TERMINAL_V4</span>
            </div>
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/20"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500/20"></div>
              <div className="w-3 h-3 rounded-full bg-green-500/80 animate-pulse"></div>
            </div>
          </div>

          {/* Terminal Body */}
          <div className="h-80 overflow-y-auto p-4 font-mono text-sm space-y-3 bg-black/80 scrollbar-hide">
            {logs.map((log, index) => (
              <div key={index} className={`flex gap-3 ${log.type === 'analysis' ? 'text-titan-gold' : 'text-green-500'}`}>
                <span className="text-gray-600 shrink-0">[{log.timestamp}]</span>
                <span className={log.type === 'info' ? 'text-white' : ''}>{log.message}</span>
              </div>
            ))}
            {isAnalyzing && (
              <div className="flex gap-3 text-titan-gold animate-pulse">
                <span className="text-gray-600">[{new Date().toLocaleTimeString()}]</span>
                <span className="flex items-center gap-2">
                  <Activity className="w-4 h-4" /> CALCULATING PROBABILITIES...
                </span>
              </div>
            )}
            <div ref={logsEndRef} />
          </div>

          {/* Terminal Input */}
          <form onSubmit={handleCommand} className="bg-gray-900 p-4 border-t border-white/10 flex gap-4">
            <div className="relative flex-grow">
               <Cpu className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
               <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Enter Asset (e.g., BTC, Gold, ETH)..."
                className="w-full bg-black border border-gray-700 rounded px-10 py-2 text-white font-mono focus:outline-none focus:border-titan-gold focus:ring-1 focus:ring-titan-gold transition-all uppercase placeholder-gray-600"
              />
            </div>
            <button 
              type="submit" 
              disabled={isAnalyzing || !input.trim()}
              className="bg-titan-gold hover:bg-yellow-400 text-black font-bold px-6 py-2 rounded flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Send className="w-4 h-4" />
              RUN
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default BotTerminal;