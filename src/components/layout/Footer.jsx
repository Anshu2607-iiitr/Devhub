import React from 'react';
import { Link } from 'react-router-dom';
import { Terminal, Github, Twitter, Disc as Discord, Heart, ArrowUpRight } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="border-t border-white/10 bg-[#070A12] text-slate-400 py-12 px-4 sm:px-6 lg:px-8 mt-auto">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
        <div className="space-y-4 md:col-span-1">
          <Link to="/" className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600 to-cyan-500 p-[1px]">
              <div className="w-full h-full bg-[#090D16] rounded-[7px] flex items-center justify-center">
                <Terminal className="w-4 h-4 text-purple-400" />
              </div>
            </div>
            <span className="text-base font-bold text-white tracking-tight">DevHub</span>
          </Link>
          <p className="text-xs text-slate-400 leading-relaxed">
            The modern interactive platform for learning Java, Spring Boot, Cloud DevOps, Kafka, and Spring AI through active recall and code diagnostics.
          </p>
        </div>

        <div>
          <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono mb-3">Core & Frameworks</h4>
          <ul className="space-y-2 text-xs">
            <li><Link to="/learn/lesson-1-1" className="hover:text-purple-300 transition">Core Java 21 LTS</Link></li>
            <li><Link to="/learn/lesson-6-1" className="hover:text-purple-300 transition">DSA in Java</Link></li>
            <li><Link to="/learn/lesson-12-1" className="hover:text-purple-300 transition">Spring Framework</Link></li>
            <li><Link to="/learn/lesson-13-1" className="hover:text-purple-300 transition">Spring Boot REST API</Link></li>
            <li><Link to="/learn/lesson-17-1" className="hover:text-purple-300 transition">Spring Security & JWT</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono mb-3">Cloud, DevOps & AI</h4>
          <ul className="space-y-2 text-xs">
            <li><Link to="/learn/lesson-22-1" className="hover:text-purple-300 transition">Docker for Java</Link></li>
            <li><Link to="/learn/lesson-24-1" className="hover:text-purple-300 transition">Spring AI & Vector RAG</Link></li>
            <li><Link to="/learn/lesson-25-1" className="hover:text-purple-300 transition">DeepSeek & Ollama</Link></li>
            <li><Link to="/learn/lesson-26-1" className="hover:text-purple-300 transition">Microservices</Link></li>
            <li><Link to="/learn/lesson-27-1" className="hover:text-purple-300 transition">Spring Boot + Kafka</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono mb-3">Platform Links</h4>
          <ul className="space-y-2 text-xs">
            <li><Link to="/course/java" className="hover:text-purple-300 transition">All 31 Modules</Link></li>
            <li><Link to="/practice" className="hover:text-purple-300 transition">Practice Arena</Link></li>
            <li><Link to="/progress" className="hover:text-purple-300 transition">Mastery Analytics</Link></li>
            <li><Link to="/settings" className="hover:text-purple-300 transition">Settings & Reset</Link></li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500">
        <div>
          &copy; 2026 DevHub Inc. Master Java by Doing, Not Just Watching.
        </div>
        <div className="mt-2 sm:mt-0 flex items-center space-x-1">
          <span>Crafted with</span>
          <Heart className="w-3 h-3 text-rose-500 fill-rose-500" />
          <span>for Java developers.</span>
        </div>
      </div>
    </footer>
  );
};
