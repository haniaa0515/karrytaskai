import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import LottieAnimation from "./LottieAnimation";
const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const [lottieData, setLottieData] = useState<any>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  useEffect(() => {
    // Check if mobile on mount and when window resizes
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  useEffect(() => {
    fetch('/loop-header.lottie').then(response => response.json()).then(data => setLottieData(data)).catch(error => console.error("Error loading Lottie animation:", error));
  }, []);
  useEffect(() => {
    // Skip effect on mobile
    if (isMobile) return;
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current || !imageRef.current) return;
      const {
        left,
        top,
        width,
        height
      } = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - left) / width - 0.5;
      const y = (e.clientY - top) / height - 0.5;
      imageRef.current.style.transform = `perspective(1000px) rotateY(${x * 2.5}deg) rotateX(${-y * 2.5}deg) scale3d(1.02, 1.02, 1.02)`;
    };
    const handleMouseLeave = () => {
      if (!imageRef.current) return;
      imageRef.current.style.transform = `perspective(1000px) rotateY(0deg) rotateX(0deg) scale3d(1, 1, 1)`;
    };
    const container = containerRef.current;
    if (container) {
      container.addEventListener("mousemove", handleMouseMove);
      container.addEventListener("mouseleave", handleMouseLeave);
    }
    return () => {
      if (container) {
        container.removeEventListener("mousemove", handleMouseMove);
        container.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, [isMobile]);
  useEffect(() => {
    // Skip parallax on mobile
    if (isMobile) return;
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const elements = document.querySelectorAll('.parallax');
      elements.forEach(el => {
        const element = el as HTMLElement;
        const speed = parseFloat(element.dataset.speed || '0.1');
        const yPos = -scrollY * speed;
        element.style.setProperty('--parallax-y', `${yPos}px`);
      });
    };
    window.addEventListener('scroll', handleScroll, {
      passive: true
    });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobile]);

  // Mouse tracking for torch effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        setMousePos({
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100
        });
      }
    };

    const heroElement = heroRef.current;
    if (heroElement) {
      heroElement.addEventListener('mousemove', handleMouseMove);
      return () => heroElement.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);
  return <section ref={heroRef} className="overflow-hidden relative" id="hero" style={{
    backgroundImage: 'linear-gradient(135deg, #111827 0%, #1e3a8a 50%, #000000 100%)',
    padding: isMobile ? '100px 12px 40px' : '120px 20px 60px'
  }}>
      <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/5 to-white/10 opacity-40"></div>
      <div className="absolute inset-0 shadow-inner" style={{ backdropFilter: "blur(1px)" }}></div>
      <div 
        className="absolute inset-0 opacity-70 pointer-events-none transition-all duration-200"
        style={{
          background: `radial-gradient(400px circle at ${mousePos.x}% ${mousePos.y}%, rgba(59, 130, 246, 0.6) 0%, rgba(30, 58, 138, 0.4) 30%, rgba(17, 24, 39, 0.2) 60%, transparent 80%)`
        }}
      ></div>
      <div className="absolute top-1/2 left-0 right-0 h-px bg-pulse-500 opacity-20 z-10"></div>
      
      <div className="container px-4 sm:px-6 lg:px-8 relative z-10" ref={containerRef}>
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-12 items-center">
          <div className="w-full lg:w-1/2">
            <div className="pulse-chip mb-3 sm:mb-6 opacity-0 animate-fade-in" style={{
            animationDelay: "0.1s"
          }}>
              <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-pulse-500 text-white mr-2">AI</span>
              <span>Smart Productivity</span>
            </div>
            
            <h1 className="section-title text-3xl sm:text-4xl lg:text-5xl xl:text-6xl leading-tight opacity-0 animate-fade-in text-white drop-shadow-lg" style={{
            animationDelay: "0.3s"
          }}>
              KarryTask: Your AI<br className="hidden sm:inline" />Productivity Partner
            </h1>
            
            <p style={{
            animationDelay: "0.5s"
          }} className="section-subtitle mt-3 sm:mt-6 mb-4 sm:mb-8 leading-relaxed opacity-0 animate-fade-in text-white/90 font-normal text-base sm:text-lg text-left drop-shadow">
              Connect your tools. Spawn intelligent agents. Build a custom productivity system that learns from your habits and automates your workflow.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 opacity-0 animate-fade-in" style={{
            animationDelay: "0.7s"
          }}>
              <a href="/login" className="flex items-center justify-center group w-full sm:w-auto text-center relative overflow-hidden" style={{
              background: 'linear-gradient(135deg, #111827 0%, #1e3a8a 50%, #000000 100%)',
              borderRadius: '1440px',
              boxSizing: 'border-box',
              color: '#FFFFFF',
              cursor: 'pointer',
              fontSize: '14px',
              lineHeight: '20px',
              padding: '16px 24px',
              backdropFilter: 'blur(1px)',
              boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.1)'
            }}>
                <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/5 to-white/10 opacity-40 rounded-full"></div>
                <span className="relative z-10">Start Now</span>
                <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1 relative z-10" />
              </a>
            </div>
          </div>
          
          
        </div>
      </div>
      
      <div className="hidden lg:block absolute bottom-0 left-1/4 w-64 h-64 bg-pulse-100/30 rounded-full blur-3xl -z-10 parallax" data-speed="0.05"></div>
    </section>;
};
export default Hero;