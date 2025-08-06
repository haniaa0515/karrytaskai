import React, { useEffect, useState } from "react";
import { Bot, Calendar, Mail, MapPin, MessageSquare, Brain, Clock } from "lucide-react";

const KarryTaskHero = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <section 
      className="overflow-hidden relative pt-24" 
      id="hero" 
      style={{
        background: 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 25%, #1e293b 75%, #0f172a 100%)',
        backgroundAttachment: 'fixed',
        padding: isMobile ? '100px 12px 60px' : '140px 20px 80px'
      }}
    >
      <div className="absolute -top-[10%] -right-[5%] w-1/2 h-[70%] bg-pulse-gradient opacity-20 blur-3xl rounded-full"></div>
      
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-12 items-center">
          <div className="w-full lg:w-1/2">
            <div 
              className="pulse-chip mb-3 sm:mb-6 opacity-0 animate-fade-in" 
              style={{ animationDelay: "0.1s" }}
            >
              <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-pulse-500 text-white mr-2">
                <Bot className="w-3 h-3 text-white" />
              </span>
              <span>Smart Productivity AI</span>
            </div>
            
            <h1 
              className="section-title text-3xl sm:text-4xl lg:text-5xl xl:text-6xl leading-tight opacity-0 animate-fade-in text-white" 
              style={{ animationDelay: "0.3s" }}
            >
              KarryTask: Your AI<br className="hidden sm:inline" />Productivity Partner
            </h1>
            
            <p 
              style={{ animationDelay: "0.5s" }} 
              className="section-subtitle mt-3 sm:mt-6 mb-6 sm:mb-8 leading-relaxed opacity-0 animate-fade-in text-white font-normal text-base sm:text-lg text-left"
            >
              Connect your tools. Spawn intelligent agents. Build a custom productivity system that learns from your habits and automates your workflow.
            </p>

            {/* Features Grid */}
            <div 
              className="grid grid-cols-2 gap-4 mb-6 sm:mb-8 opacity-0 animate-fade-in"
              style={{ animationDelay: "0.6s" }}
            >
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-pulse-500" />
                <span className="text-sm text-gray-200">Email Integration</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-pulse-500" />
                <span className="text-sm text-gray-200">Smart Scheduling</span>
              </div>
              <div className="flex items-center space-x-2">
                <Brain className="w-4 h-4 text-pulse-500" />
                <span className="text-sm text-gray-200">Learns Your Habits</span>
              </div>
              <div className="flex items-center space-x-2">
                <MessageSquare className="w-4 h-4 text-pulse-500" />
                <span className="text-sm text-gray-200">Voice & Text Chat</span>
              </div>
            </div>
            
            <div 
              className="flex flex-col sm:flex-row gap-4 opacity-0 animate-fade-in" 
              style={{ animationDelay: "0.7s" }}
            >
              <button 
                className="flex items-center justify-center group w-full sm:w-auto text-center px-8 py-4 rounded-full text-white font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl"
                style={{
                  background: 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 25%, #1e293b 75%, #0f172a 100%)',
                  boxShadow: '0 8px 25px rgba(30, 58, 138, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                }}
              >
                Watch Demo
              </button>
            </div>
          </div>
          
          <div className="w-full lg:w-1/2 relative mt-6 lg:mt-0">
            <div className="relative z-10 animate-fade-in" style={{ animationDelay: "0.9s" }}>
              <div className="glass-card p-6 max-w-lg mx-auto">
                <div className="space-y-4">
                  {/* AI Agent Card */}
                  <div className="flex items-center space-x-3 p-3 bg-pulse-50 rounded-lg">
                    <div className="w-10 h-10 bg-pulse-500 rounded-full flex items-center justify-center">
                      <Bot className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Mr. Karry</p>
                      <p className="text-sm text-gray-600">Ready to help you today!</p>
                    </div>
                  </div>
                  
                  {/* Quick Actions */}
                  <div className="grid grid-cols-2 gap-2">
                    <div className="p-3 bg-white rounded-lg border border-gray-200 text-center">
                      <Calendar className="w-6 h-6 mx-auto mb-1 text-pulse-500" />
                      <p className="text-xs text-gray-700">Schedule</p>
                    </div>
                    <div className="p-3 bg-white rounded-lg border border-gray-200 text-center">
                      <Mail className="w-6 h-6 mx-auto mb-1 text-pulse-500" />
                      <p className="text-xs text-gray-700">Email</p>
                    </div>
                  </div>
                  
                  {/* Stats */}
                  <div className="flex justify-between text-center">
                    <div>
                      <p className="text-2xl font-bold text-pulse-500">24</p>
                      <p className="text-xs text-gray-600">Tasks Today</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-pulse-500">87%</p>
                      <p className="text-xs text-gray-600">Efficiency</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-pulse-500">3.2h</p>
                      <p className="text-xs text-gray-600">Time Saved</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="hidden lg:block absolute bottom-0 left-1/4 w-64 h-64 bg-pulse-100/30 rounded-full blur-3xl -z-10 parallax" data-speed="0.05"></div>
    </section>
  );
};

export default KarryTaskHero;