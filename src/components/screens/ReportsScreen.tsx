import React, { useState } from "react";
import { 
  Calendar, 
  Clock, 
  TrendingUp, 
  Download, 
  Target, 
  CheckSquare, 
  Eye,
  Monitor,
  Smartphone,
  BarChart3,
  PieChart,
  Activity,
  Award,
  Zap,
  Coffee
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

const ReportsScreen = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("weekly");

  // Sample productivity data
  const productivityData = {
    daily: {
      tasksCompleted: 12,
      focusTime: "4h 32m",
      screenTime: "6h 15m",
      productivity: 78,
      breaks: 6,
      distractions: 3
    },
    weekly: {
      tasksCompleted: 84,
      focusTime: "28h 45m",
      screenTime: "42h 30m",
      productivity: 82,
      breaks: 35,
      distractions: 18
    },
    monthly: {
      tasksCompleted: 340,
      focusTime: "125h 20m",
      screenTime: "185h 45m",
      productivity: 85,
      breaks: 156,
      distractions: 67
    }
  };

  const screenTimeBreakdown = {
    productive: { hours: 28, color: "bg-green-500" },
    neutral: { hours: 10, color: "bg-yellow-500" },
    distracting: { hours: 4, color: "bg-red-500" }
  };

  const weeklyTrends = [
    { day: "Mon", productivity: 85, screenTime: 6.2, tasks: 14 },
    { day: "Tue", productivity: 78, screenTime: 7.1, tasks: 12 },
    { day: "Wed", productivity: 92, screenTime: 5.8, tasks: 16 },
    { day: "Thu", productivity: 88, screenTime: 6.5, tasks: 15 },
    { day: "Fri", productivity: 75, screenTime: 7.8, tasks: 11 },
    { day: "Sat", productivity: 65, screenTime: 4.2, tasks: 8 },
    { day: "Sun", productivity: 70, screenTime: 3.9, tasks: 8 }
  ];

  const productivityTips = [
    {
      icon: Target,
      title: "Set Clear Goals",
      tip: "Start each day by setting 3 specific, achievable goals to maintain focus and direction."
    },
    {
      icon: Clock,
      title: "Time Blocking",
      tip: "Schedule specific time blocks for different activities to maximize efficiency and reduce decision fatigue."
    },
    {
      icon: Coffee,
      title: "Strategic Breaks",
      tip: "Take a 5-10 minute break every hour to maintain peak mental performance throughout the day."
    },
    {
      icon: Eye,
      title: "Minimize Distractions",
      tip: "Use website blockers and put your phone in another room during focused work sessions."
    },
    {
      icon: Zap,
      title: "Energy Management",
      tip: "Schedule your most important tasks during your natural energy peaks, usually in the morning."
    },
    {
      icon: Award,
      title: "Celebrate Wins",
      tip: "Acknowledge and celebrate completing tasks to maintain motivation and positive momentum."
    }
  ];

  const handleDownloadPDF = async () => {
    try {
      // Dynamic import for better bundle size
      const jsPDF = (await import('jspdf')).default;
      const html2canvas = (await import('html2canvas')).default;

      const reportElement = document.getElementById('productivity-report');
      if (!reportElement) return;

      const canvas = await html2canvas(reportElement, {
        scale: 2,
        useCORS: true,
        allowTaint: true
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`productivity-report-${selectedPeriod}-${new Date().toISOString().split('T')[0]}.pdf`);
      
      toast.success("📄 PDF report downloaded successfully!");
    } catch (error) {
      toast.error("Failed to generate PDF. Please try again.");
      console.error('PDF generation error:', error);
    }
  };

  const currentData = productivityData[selectedPeriod as keyof typeof productivityData];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 pt-16">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-2">
                <BarChart3 className="w-8 h-8 text-blue-500" />
                Productivity Reports
              </h1>
              <p className="text-gray-600">Track your productivity, screen time, and performance insights</p>
            </div>
            <Button onClick={handleDownloadPDF} className="flex items-center gap-2">
              <Download className="w-4 h-4" />
              Download PDF Report
            </Button>
          </div>
        </div>

        {/* Report Content */}
        <div id="productivity-report" className="space-y-6">
          {/* Time Period Selection */}
          <Card>
            <CardContent className="pt-6">
              <Tabs value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="daily">Daily</TabsTrigger>
                  <TabsTrigger value="weekly">Weekly</TabsTrigger>
                  <TabsTrigger value="monthly">Monthly</TabsTrigger>
                </TabsList>
              </Tabs>
            </CardContent>
          </Card>

          {/* Key Metrics Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Tasks Completed</CardTitle>
                <CheckSquare className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{currentData.tasksCompleted}</div>
                <p className="text-xs text-green-600 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  +12% from last {selectedPeriod.slice(0, -2)}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Focus Time</CardTitle>
                <Clock className="h-4 w-4 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{currentData.focusTime}</div>
                <p className="text-xs text-blue-600 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  +8% from last {selectedPeriod.slice(0, -2)}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Screen Time</CardTitle>
                <Monitor className="h-4 w-4 text-purple-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{currentData.screenTime}</div>
                <p className="text-xs text-purple-600 flex items-center gap-1">
                  <Activity className="w-3 h-3" />
                  Digital wellness tracking
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Productivity Score</CardTitle>
                <Target className="h-4 w-4 text-orange-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{currentData.productivity}%</div>
                <Progress value={currentData.productivity} className="mt-2" />
              </CardContent>
            </Card>
          </div>

          {/* Detailed Analytics */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Screen Time Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="w-5 h-5" />
                  Screen Time Breakdown
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Object.entries(screenTimeBreakdown).map(([category, data]) => (
                    <div key={category} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${data.color}`} />
                        <span className="capitalize">{category} Apps</span>
                      </div>
                      <span className="font-medium">{data.hours}h</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Weekly Trends */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Weekly Trends
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {weeklyTrends.map((day) => (
                    <div key={day.day} className="flex items-center justify-between">
                      <span className="font-medium w-10">{day.day}</span>
                      <div className="flex items-center gap-4 flex-1">
                        <div className="flex items-center gap-2 flex-1">
                          <Progress value={day.productivity} className="flex-1" />
                          <span className="text-sm w-8">{day.productivity}%</span>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {day.tasks} tasks
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Additional Insights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Break Patterns</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-500 mb-2">{currentData.breaks}</div>
                <p className="text-sm text-gray-600">Strategic breaks taken</p>
                <p className="text-xs text-green-600 mt-1">Optimal for productivity!</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Distraction Control</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-blue-500 mb-2">{currentData.distractions}</div>
                <p className="text-sm text-gray-600">Distractions managed</p>
                <p className="text-xs text-blue-600 mt-1">Great focus discipline!</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Device Usage</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Monitor className="w-4 h-4" />
                      <span className="text-sm">Desktop</span>
                    </div>
                    <span className="text-sm font-medium">75%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Smartphone className="w-4 h-4" />
                      <span className="text-sm">Mobile</span>
                    </div>
                    <span className="text-sm font-medium">25%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Productivity Tips Section */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-yellow-500" />
              💡 Productivity Tips & Insights
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {productivityTips.map((tip, index) => {
                const IconComponent = tip.icon;
                return (
                  <div key={index} className="bg-gradient-to-br from-gray-50 to-gray-100 p-4 rounded-lg">
                    <div className="flex items-center gap-3 mb-2">
                      <IconComponent className="w-5 h-5 text-blue-500" />
                      <h4 className="font-semibold text-gray-900">{tip.title}</h4>
                    </div>
                    <p className="text-sm text-gray-600">{tip.tip}</p>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Footer with Extra Tips */}
        <div className="mt-8 p-6 bg-gradient-to-r from-blue-600 via-blue-800 to-black rounded-lg text-white shadow-2xl hover:shadow-blue-500/50 transition-all duration-500 ease-in-out hover:scale-[1.02] relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-b before:from-white/20 before:via-transparent before:to-transparent before:rounded-lg">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-3 text-white">Keep Growing Your Productivity!</h3>
            <p className="text-gray-200 mb-6 font-semibold text-lg">
              "Success is the sum of small efforts repeated day in and day out." - Robert Collier
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30 font-bold">
                Focus on progress, not perfection
              </Badge>
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30 font-bold">
                Consistency beats intensity
              </Badge>
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30 font-bold">
                Small improvements compound over time
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsScreen;