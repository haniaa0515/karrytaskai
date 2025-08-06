import React, { useState } from "react";
import KarryTaskNavbar from "@/components/KarryTaskNavbar";
import KarryTaskHero from "@/components/KarryTaskHero";
import KarryTaskFeatures from "@/components/KarryTaskFeatures";
import Footer from "@/components/Footer";
import ProductivityHubScreen from "@/components/screens/ProductivityHubScreen";
import WhiteboardScreen from "@/components/screens/WhiteboardScreen";
import MrKarryScreen from "@/components/screens/MrKarryScreen";
import ReportsScreen from "@/components/screens/ReportsScreen";
import AccountScreen from "@/components/screens/AccountScreen";

const KarryTask = () => {
  const [currentScreen, setCurrentScreen] = useState("dashboard");

  const handleNavigation = (screen: string) => {
    setCurrentScreen(screen);
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case "productivity":
        return <ProductivityHubScreen />;
      case "whiteboard":
        return <WhiteboardScreen />;
      case "ai-agent":
        return <MrKarryScreen />;
      case "report":
        return <ReportsScreen />;
      case "account":
        return <AccountScreen />;
      default:
        return (
          <main className="space-y-4 sm:space-y-8">
            <KarryTaskHero />
            <KarryTaskFeatures />
          </main>
        );
    }
  };

  return (
    <div className="min-h-screen">
      <KarryTaskNavbar onNavigate={handleNavigation} currentScreen={currentScreen} />
      {renderScreen()}
      <Footer />
    </div>
  );
};

export default KarryTask;