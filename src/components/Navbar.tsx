import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll, {
      passive: true
    });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    // Prevent background scrolling when menu is open
    document.body.style.overflow = !isMenuOpen ? 'hidden' : '';
  };
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });

    // Close mobile menu if open
    if (isMenuOpen) {
      setIsMenuOpen(false);
      document.body.style.overflow = '';
    }
  };
  return <header className="fixed top-0 left-0 right-0 z-50 py-2 sm:py-3 md:py-4 transition-all duration-300 bg-gradient-to-r from-gray-900 via-blue-950 to-black border-b border-white/10 relative overflow-hidden backdrop-blur-lg shadow-xl" style={{
    backdropFilter: "blur(20px)"
  }}>
      <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/8 to-white/12 opacity-60"></div>
      <div className="absolute inset-0 shadow-inner"></div>
      <div className="container flex items-center justify-between px-4 sm:px-6 lg:px-8 relative z-10">
        <a href="#" className="flex items-center space-x-2" onClick={e => {
        e.preventDefault();
        scrollToTop();
      }} aria-label="KarryTask">
          
          <span className="font-display font-bold text-xl text-white">KarryTask</span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          <a href="#" className="relative text-white hover:text-blue-300 py-2 transition-all duration-300 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-blue-400 after:transition-all hover:after:w-full transform hover:scale-105" onClick={e => {
          e.preventDefault();
          scrollToTop();
        }}>
            Home
          </a>
          
          
        </nav>

        {/* Mobile menu button - increased touch target */}
        <button className="md:hidden text-gray-700 p-3 focus:outline-none" onClick={toggleMenu} aria-label={isMenuOpen ? "Close menu" : "Open menu"}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation - improved for better touch experience */}
      <div className={cn("fixed inset-0 z-40 bg-white flex flex-col pt-16 px-6 md:hidden transition-all duration-300 ease-in-out", isMenuOpen ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full pointer-events-none")}>
        <nav className="flex flex-col space-y-8 items-center mt-8">
          <a href="#" className="text-xl font-medium py-3 px-6 w-full text-center rounded-lg hover:bg-gray-100" onClick={e => {
          e.preventDefault();
          scrollToTop();
          setIsMenuOpen(false);
          document.body.style.overflow = '';
        }}>
            Home
          </a>
          <a href="#features" className="text-xl font-medium py-3 px-6 w-full text-center rounded-lg hover:bg-gray-100" onClick={() => {
          setIsMenuOpen(false);
          document.body.style.overflow = '';
        }}>
            About
          </a>
          <a href="#details" className="text-xl font-medium py-3 px-6 w-full text-center rounded-lg hover:bg-gray-100" onClick={() => {
          setIsMenuOpen(false);
          document.body.style.overflow = '';
        }}>
            Contact
          </a>
        </nav>
      </div>
    </header>;
};
export default Navbar;