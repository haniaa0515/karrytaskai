import React from "react";
import { 
  CheckSquare, 
  FileText, 
  PenTool, 
  MessageCircle, 
  BarChart, 
  User,
  Calendar,
  Mail,
  Slack,
  Brain,
  Clock,
  Target
} from "lucide-react";

const KarryTaskFeatures = () => {
  const mainFeatures = [
    {
      icon: CheckSquare,
      title: "Productivity Hub",
      description: "Your central workspace with intelligent to-do lists, notepad, and task management that adapts to your workflow patterns.",
      features: ["Smart Task Prioritization", "Auto-generated To-dos", "Context-aware Notes"]
    },
    {
      icon: PenTool,
      title: "AI Whiteboard",
      description: "Mind-mapping interface that visualizes your ideas and connects related concepts automatically using AI insights.",
      features: ["Visual Mind Maps", "Auto-connecting Ideas", "Collaborative Spaces"]
    },
    {
      icon: MessageCircle,
      title: "Mr. Karry AI Agent",
      description: "Your personal AI assistant that listens, schedules, writes emails, and completes tasks through voice or text commands.",
      features: ["Voice & Text Chat", "Email Automation", "Smart Scheduling"]
    },
    {
      icon: BarChart,
      title: "Analytics & Reports",
      description: "Deep insights into your productivity patterns, procrastination habits, and performance metrics to optimize your workflow.",
      features: ["Productivity Analytics", "Habit Tracking", "Performance Insights"]
    }
  ];

  const integrations = [
    { name: "Gmail", icon: Mail, description: "Send emails automatically" },
    { name: "Calendar", icon: Calendar, description: "Smart scheduling system" },
    { name: "Slack", icon: Slack, description: "Team communication" },
    { name: "Notion", icon: FileText, description: "Knowledge management" }
  ];

  return (
    <section className="py-16 sm:py-24 bg-gray-50">
      <div className="container px-4 sm:px-6 lg:px-8">
        {/* Main Features */}
        <div className="text-center mb-16">
          <h2 className="section-title mb-4">Intelligent Features</h2>
          <p className="section-subtitle">
            KarryTask connects to your tools and spawns AI agents that learn your patterns to build a personalized productivity system.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-20">
          {mainFeatures.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div 
                key={feature.title}
                className="feature-card bg-white border border-gray-200 animate-on-scroll"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-pulse-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <IconComponent className="w-6 h-6 text-pulse-500" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                    <p className="text-gray-600 mb-4">{feature.description}</p>
                    <ul className="space-y-2">
                      {feature.features.map((item, idx) => (
                        <li key={idx} className="flex items-center space-x-2">
                          <CheckSquare className="w-4 h-4 text-pulse-500" />
                          <span className="text-sm text-gray-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* How It Works */}
        <div className="text-center mb-16">
          <h2 className="section-title mb-4">How KarryTask Works</h2>
          <p className="section-subtitle">
            Three simple steps to transform your productivity with AI-powered automation.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {[
            {
              step: "01",
              icon: User,
              title: "Connect Your Tools",
              description: "Link Gmail, Slack, Notion, Calendar, and other productivity tools to KarryTask."
            },
            {
              step: "02", 
              icon: Brain,
              title: "AI Learns Your Patterns",
              description: "Our AI agents analyze your behavior, priorities, and time patterns across all connected tools."
            },
            {
              step: "03",
              icon: Target,
              title: "Automate & Optimize",
              description: "KarryTask builds a custom productivity system that schedules, prioritizes, and completes tasks for you."
            }
          ].map((step, index) => {
            const IconComponent = step.icon;
            return (
              <div 
                key={step.step}
                className="text-center animate-on-scroll"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="relative mb-6">
                  <div className="w-16 h-16 bg-pulse-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-pulse-100 rounded-full flex items-center justify-center">
                    <span className="text-xs font-bold text-pulse-500">{step.step}</span>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            );
          })}
        </div>

        {/* Integrations */}
        <div className="text-center mb-12">
          <h2 className="section-title mb-4">Seamless Integrations</h2>
          <p className="section-subtitle">
            Connect with your favorite productivity tools and let AI agents work across all platforms.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {integrations.map((integration, index) => {
            const IconComponent = integration.icon;
            return (
              <div 
                key={integration.name}
                className="text-center p-6 bg-white rounded-xl border border-gray-200 hover:shadow-elegant transition-all duration-300 animate-on-scroll"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-12 h-12 bg-pulse-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <IconComponent className="w-6 h-6 text-pulse-500" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-1">{integration.name}</h4>
                <p className="text-xs text-gray-600">{integration.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default KarryTaskFeatures;