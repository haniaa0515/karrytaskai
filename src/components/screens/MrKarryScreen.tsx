import React, { useState, useRef, useEffect } from "react";
import { 
  Send, 
  Mic, 
  MicOff, 
  Bot, 
  User, 
  Volume2, 
  VolumeX,
  MessageSquare,
  Sparkles,
  Phone,
  PhoneOff
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { toast } from "sonner";

interface Message {
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: Date;
  type?: "text" | "voice";
}

const MrKarryScreen = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hey there! 👋 I'm Mr. Karry, your friendly AI productivity assistant. I'm here to help you organize your tasks, boost your productivity, and make your day more efficient. What can I help you with today?",
      sender: "ai",
      timestamp: new Date(),
      type: "text"
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isConnected, setIsConnected] = useState(true); // Always connected for better UX
  const [isTyping, setIsTyping] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (content: string, type: "text" | "voice" = "text") => {
    if (!content.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      sender: "user",
      timestamp: new Date(),
      type
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);

    // Simulate realistic typing delay and friendly AI response
    const typingDelay = Math.random() * 1000 + 500; // 500-1500ms for more natural feel
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: getAIResponse(content),
        sender: "ai",
        timestamp: new Date(),
        type: "text"
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
      
      // Simulate text-to-speech feedback
      if (!isMuted) {
        toast.success("🗣️ Mr. Karry is speaking...", { duration: 2000 });
      }
    }, typingDelay);
  };

  const getAIResponse = (userInput: string): string => {
    const lowerInput = userInput.toLowerCase();
    
    // Context-aware friendly responses
    if (lowerInput.includes('hello') || lowerInput.includes('hi') || lowerInput.includes('hey')) {
      return "Hello! 😊 Great to chat with you! I'm excited to help you be more productive today. What's on your mind?";
    }
    
    if (lowerInput.includes('task') || lowerInput.includes('todo') || lowerInput.includes('organize')) {
      return "Perfect! 📋 I love helping with task management! Here are some quick tips: Start by prioritizing your most important tasks, break large projects into smaller steps, and set realistic deadlines. Want me to help you create a specific task plan?";
    }
    
    if (lowerInput.includes('schedule') || lowerInput.includes('time') || lowerInput.includes('calendar')) {
      return "Time management is my specialty! ⏰ I recommend time-blocking your calendar, setting aside focused work periods, and including breaks. Would you like me to suggest a daily schedule template that works for your goals?";
    }
    
    if (lowerInput.includes('stress') || lowerInput.includes('overwhelm') || lowerInput.includes('busy')) {
      return "I understand that feeling! 🤗 When things get overwhelming, try the 'brain dump' technique - write everything down, then prioritize just 3 main things for today. Remember, progress over perfection! How can I help you feel more in control?";
    }
    
    if (lowerInput.includes('focus') || lowerInput.includes('distraction') || lowerInput.includes('concentrate')) {
      return "Great question! 🎯 For better focus, try the Pomodoro technique (25 min focused work + 5 min break), eliminate digital distractions, and create a dedicated workspace. What's your biggest distraction right now?";
    }
    
    if (lowerInput.includes('goal') || lowerInput.includes('achieve') || lowerInput.includes('success')) {
      return "I love goal-oriented thinking! 🎯 The key is making goals SMART: Specific, Measurable, Achievable, Relevant, and Time-bound. Break big goals into weekly milestones. What goal are you working towards?";
    }
    
    if (lowerInput.includes('thank') || lowerInput.includes('awesome') || lowerInput.includes('great')) {
      return "Aww, thank you! 😊 That really makes my day! I'm here whenever you need productivity support, motivation, or just someone to brainstorm with. Keep being amazing!";
    }
    
    // Default friendly responses
    const defaultResponses = [
      "That's a fantastic question! 🌟 Let me help you tackle that challenge. Based on what you've shared, I'd recommend starting with small, manageable steps that build momentum.",
      "I love your thinking! 💡 Here's my take: productivity isn't about doing more, it's about doing what matters most. Let's find the best approach for your unique situation.",
      "Great point! 🚀 I've helped many people with similar challenges. The key is finding systems that work with your natural habits, not against them. What's your current workflow like?",
      "You're asking all the right questions! 🎯 Success comes from consistent small actions. I'd suggest we break this down into actionable steps you can start today.",
      "I'm excited to help with this! ⚡ From my experience, the most effective approach combines smart planning with flexible execution. What's your biggest challenge right now?",
      "This is exactly the kind of productivity puzzle I love solving! 🧩 Let's create a personalized strategy that fits your lifestyle and goals. Tell me more about what you're working on!"
    ];
    
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(inputMessage);
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/wav" });
        // Simulate speech-to-text with encouraging message
        const voiceMessages = [
          "Hey Mr. Karry, can you help me organize my day?",
          "I need some productivity tips for tomorrow",
          "What's the best way to manage my tasks?",
          "How can I stay focused while working?"
        ];
        handleSendMessage(voiceMessages[Math.floor(Math.random() * voiceMessages.length)], "voice");
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
      toast.success("🎤 Listening... speak naturally!", { duration: 1000 });
    } catch (error) {
      toast.error("🎤 Microphone access needed for voice chat");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      toast.success("✅ Got it! Processing your message...", { duration: 1500 });
    }
  };

  const toggleConnection = () => {
    // Remove connection toggle - always connected for better UX
    toast.success("🚀 Mr. Karry is always ready to help!", { duration: 2000 });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 pt-16">
      <div className="max-w-6xl mx-auto p-6">
        {/* Header */}
        <div className="mb-6 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="relative">
              <Avatar className="w-16 h-16 border-4 border-blue-200">
                <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600">
                  <Bot className="w-8 h-8 text-white" />
                </AvatarFallback>
              </Avatar>
              {isConnected && (
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 border-2 border-white rounded-full animate-pulse" />
              )}
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
                Mr. Karry
                <Sparkles className="w-6 h-6 text-yellow-500" />
              </h1>
              <p className="text-gray-600">Your friendly AI productivity companion - always ready to help! 🚀</p>
            </div>
          </div>
          
          <div className="flex items-center justify-center gap-4">
            <Badge variant="default" className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              Always Ready
            </Badge>
            <Badge variant="secondary" className="flex items-center gap-1">
              ⚡ Real-time Chat
            </Badge>
          </div>
        </div>

        {/* Chat Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <Card className="lg:col-span-1 bg-gradient-to-b from-gray-900 via-black to-gray-900 relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-b before:from-white/10 before:via-transparent before:to-transparent before:rounded-lg shadow-inner border border-gray-700"style={{ backdropFilter: 'blur(1px)' }}>
            <CardHeader className="relative z-10">
              <CardTitle className="flex items-center gap-2 text-white">
                <MessageSquare className="w-5 h-5" />
                Chat Controls
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 relative z-10">
              <div className="space-y-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsMuted(!isMuted)}
                  className="w-full justify-start bg-gray-800/80 border-gray-600 text-white hover:bg-gray-700"
                >
                  {isMuted ? <VolumeX className="w-4 h-4 mr-2" /> : <Volume2 className="w-4 h-4 mr-2" />}
                  {isMuted ? "Unmute" : "Mute"} Audio
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setMessages([messages[0]])}
                  className="w-full justify-start bg-gray-800/80 border-gray-600 text-white hover:bg-gray-700"
                >
                  Clear Chat
                </Button>
              </div>

              <div className="border-t pt-4 border-gray-600">
                <h4 className="font-medium mb-2 text-sm text-white">Quick Starters</h4>
                <div className="space-y-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleSendMessage("Help me organize my tasks for today")}
                    className="w-full justify-start text-xs text-gray-300 hover:text-white hover:bg-gray-700"
                  >
                    Organize My Tasks
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleSendMessage("I need motivation to stay productive")}
                    className="w-full justify-start text-xs text-gray-300 hover:text-white hover:bg-gray-700"
                  >
                    Productivity Boost
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleSendMessage("How can I manage my time better?")}
                    className="w-full justify-start text-xs text-gray-300 hover:text-white hover:bg-gray-700"
                  >
                    Time Management
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleSendMessage("I'm feeling overwhelmed, can you help?")}
                    className="w-full justify-start text-xs text-gray-300 hover:text-white hover:bg-gray-700"
                  >
                    Stress Relief
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Main Chat Area */}
          <Card className="lg:col-span-3 flex flex-col h-[600px]">
            <CardHeader className="border-b bg-gradient-to-b from-gray-900 via-black to-gray-900 rounded-t-lg relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-b before:from-white/10 before:via-transparent before:to-transparent before:rounded-t-lg shadow-inner border border-gray-700"style={{ backdropFilter: 'blur(1px)' }}>
              <CardTitle className="flex items-center justify-between text-white relative z-10">
                <span>Conversation with Mr. Karry</span>
                {isTyping && (
                  <Badge variant="secondary" className="animate-pulse bg-white/20 text-white border-white/30">
                    Mr. Karry is typing...
                  </Badge>
                )}
              </CardTitle>
            </CardHeader>
            
            {/* Messages Area */}
            <CardContent className="flex-1 p-0 bg-gradient-to-b from-gray-900 via-black to-gray-900 relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-b before:from-white/10 before:via-transparent before:to-transparent shadow-inner border-x border-gray-700"style={{ backdropFilter: 'blur(1px)' }}>
              <ScrollArea className="h-[400px] p-4 bg-gradient-to-b from-gray-900 via-black to-gray-900 rounded-lg relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-b before:from-white/10 before:via-transparent before:to-transparent before:rounded-lg shadow-inner border border-gray-700"style={{ backdropFilter: 'blur(1px)' }}>
                <div className="space-y-4 relative z-10">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[80%] flex gap-3 ${
                          message.sender === "user" ? "flex-row-reverse" : "flex-row"
                        }`}
                      >
                        <Avatar className="w-8 h-8 flex-shrink-0 ring-2 ring-white/20">
                          <AvatarFallback className={`${message.sender === "user" ? "bg-blue-600" : "bg-purple-600"} text-white shadow-lg`}>
                            {message.sender === "user" ? <User className="w-4 h-4 text-white" /> : <Bot className="w-4 h-4 text-white" />}
                          </AvatarFallback>
                        </Avatar>
                        
                        <div className={`rounded-2xl p-4 shadow-lg backdrop-blur-sm border ${
                          message.sender === "user" 
                            ? "bg-gradient-to-br from-blue-600 to-blue-700 text-white border-blue-500/30 shadow-blue-500/20" 
                            : "bg-gradient-to-br from-gray-800 to-black text-white border-gray-600/50 shadow-gray-900/20"
                        }`}>
                          <p className="text-sm font-medium leading-relaxed">{message.content}</p>
                          <div className="flex items-center gap-2 mt-2 opacity-75">
                            <span className="text-xs">
                              {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                            {message.type === "voice" && (
                              <Badge variant="outline" className="text-xs bg-white/10 border-white/20 text-current">Voice</Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>
            </CardContent>

            {/* Input Area */}
            <div className="border-t p-4 bg-gradient-to-b from-gray-900 via-black to-gray-900 rounded-b-lg relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-b before:from-white/10 before:via-transparent before:to-transparent before:rounded-b-lg shadow-inner border border-gray-700"style={{ backdropFilter: 'blur(1px)' }}>
              <div className="flex gap-2 relative z-10">
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message to Mr. Karry..."
                  className="flex-1 bg-gray-800/80 border-gray-600 text-white placeholder:text-gray-400"
                  disabled={false} // Always enabled for better UX
                />
                
                <Button
                  onClick={isRecording ? stopRecording : startRecording}
                  variant="outline"
                  size="icon"
                  className={isRecording ? "bg-red-500 text-white hover:bg-red-600 animate-pulse" : ""}
                  disabled={false} // Always enabled for better UX
                >
                  {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                </Button>
                
                <Button
                  onClick={() => handleSendMessage(inputMessage)}
                  disabled={!inputMessage.trim()} // Only disabled if no message
                  className="px-6 bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
              
              <p className="text-sm text-gray-300 mt-2 text-center font-medium relative z-10">
                Just start typing - Mr. Karry is always listening and ready to help!
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MrKarryScreen;