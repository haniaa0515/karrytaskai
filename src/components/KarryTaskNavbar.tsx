import React, { useState } from "react";
import { Menu, X, CheckSquare, FileText, PenTool, MessageCircle, BarChart, User } from "lucide-react";
interface KarryTaskNavbarProps {
  onNavigate: (screen: string) => void;
  currentScreen: string;
}
const KarryTaskNavbar = ({
  onNavigate,
  currentScreen
}: KarryTaskNavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navItems = [{
    name: "Productivity Hub",
    icon: CheckSquare,
    screen: "productivity"
  }, {
    name: "Whiteboard",
    icon: PenTool,
    screen: "whiteboard"
  }, {
    name: "Mr. Karry",
    icon: MessageCircle,
    screen: "ai-agent"
  }, {
    name: "Report",
    icon: BarChart,
    screen: "report"
  }, {
    name: "Account",
    icon: User,
    screen: "account"
  }];
  return <nav className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-sm border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="/karrytask" className="flex items-center space-x-2">
              
              <span className="font-display font-bold text-xl text-gray-900">KarryTask</span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map(item => {
            const IconComponent = item.icon;
            return <button key={item.name} onClick={() => onNavigate(item.screen)} className={`flex items-center space-x-2 transition-colors duration-200 py-2 px-3 rounded-lg hover:bg-gray-50 ${currentScreen === item.screen ? "text-pulse-500 bg-pulse-50" : "text-gray-700 hover:text-pulse-500"}`}>
                  <IconComponent className="w-4 h-4" />
                  <span className="font-medium">{item.name}</span>
                </button>;
          })}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-700 hover:text-pulse-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-pulse-500 p-2">
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200">
              {navItems.map(item => {
            const IconComponent = item.icon;
            return <button key={item.name} onClick={() => {
              onNavigate(item.screen);
              setIsMenuOpen(false);
            }} className={`flex items-center space-x-3 w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${currentScreen === item.screen ? "text-pulse-500 bg-pulse-50" : "text-gray-700 hover:text-pulse-500 hover:bg-gray-50"}`}>
                    <IconComponent className="w-5 h-5" />
                    <span>{item.name}</span>
                  </button>;
          })}
            </div>
          </div>}
      </div>
    </nav>;
};
export default KarryTaskNavbar;