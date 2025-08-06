import React, { useState } from "react";
import { 
  User, 
  Settings, 
  Calendar, 
  Mail, 
  FileText, 
  Smartphone, 
  Shield, 
  Bell, 
  Palette, 
  Globe, 
  Key, 
  Download, 
  Upload, 
  Trash2,
  Edit,
  Camera,
  Link,
  ExternalLink,
  Check,
  X,
  Plus,
  Sliders,
  Clock,
  Star,
  Crown,
  CreditCard,
  Zap
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

const AccountScreen = () => {
  const [profileData, setProfileData] = useState({
    name: "Alex Thompson",
    email: "alex.thompson@company.com",
    username: "alexthompson",
    title: "Senior Product Manager",
    company: "TechCorp Inc.",
    location: "San Francisco, CA",
    timezone: "PST (UTC-8)",
    bio: "Passionate about productivity and innovation. Love building products that make people's lives easier."
  });

  const [integrations, setIntegrations] = useState({
    google: { connected: true, email: "alex@gmail.com" },
    outlook: { connected: false, email: "" },
    notion: { connected: true, workspace: "Personal Workspace" },
    slack: { connected: true, workspace: "TechCorp" },
    trello: { connected: false, workspace: "" },
    github: { connected: true, username: "alexthompson" },
    zoom: { connected: false, email: "" },
    dropbox: { connected: true, email: "alex@dropbox.com" }
  });

  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      desktop: true,
      mobile: false,
      weekly_reports: true,
      task_reminders: true
    },
    privacy: {
      profile_visibility: "public",
      activity_tracking: true,
      data_analytics: true
    },
    preferences: {
      theme: "system",
      language: "English",
      timezone: "auto",
      date_format: "MM/DD/YYYY"
    }
  });

  const toggleIntegration = (service: string) => {
    setIntegrations(prev => ({
      ...prev,
      [service]: {
        ...prev[service as keyof typeof prev],
        connected: !prev[service as keyof typeof prev].connected
      }
    }));
    
    const isConnecting = !integrations[service as keyof typeof integrations].connected;
    toast.success(isConnecting ? `${service} connected successfully!` : `${service} disconnected`);
  };

  const handleSaveProfile = () => {
    toast.success("Profile updated successfully!");
  };

  const handleExportData = () => {
    toast.success("Data export started. You'll receive an email when ready.");
  };

  const integrationServices = [
    { 
      key: "google", 
      name: "Google Calendar", 
      icon: Calendar, 
      description: "Sync your calendar and tasks",
      color: "text-blue-500",
      premium: false
    },
    { 
      key: "outlook", 
      name: "Outlook", 
      icon: Mail, 
      description: "Connect your Outlook email and calendar",
      color: "text-blue-600",
      premium: false
    },
    { 
      key: "notion", 
      name: "Notion", 
      icon: FileText, 
      description: "Sync your Notion databases and pages",
      color: "text-gray-800",
      premium: false
    },
    { 
      key: "slack", 
      name: "Slack", 
      icon: Bell, 
      description: "Get productivity updates in Slack",
      color: "text-purple-500",
      premium: true
    },
    { 
      key: "trello", 
      name: "Trello", 
      icon: Sliders, 
      description: "Import and sync your Trello boards",
      color: "text-blue-400",
      premium: true
    },
    { 
      key: "github", 
      name: "GitHub", 
      icon: Settings, 
      description: "Track your development productivity",
      color: "text-gray-700",
      premium: true
    },
    { 
      key: "zoom", 
      name: "Zoom", 
      icon: Globe, 
      description: "Schedule and track meeting time",
      color: "text-blue-500",
      premium: true
    },
    { 
      key: "dropbox", 
      name: "Dropbox", 
      icon: Upload, 
      description: "Backup and sync your productivity data",
      color: "text-blue-600",
      premium: false
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 pt-16">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-2">
            <User className="w-8 h-8 text-blue-500" />
            Account & Settings
          </h1>
          <p className="text-gray-600">Manage your profile, integrations, and preferences</p>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="integrations">Integrations</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="billing">Billing</TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Profile Picture & Basic Info */}
              <Card className="lg:col-span-1">
                <CardHeader>
                  <CardTitle>Profile Picture</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-col items-center">
                    <Avatar className="w-32 h-32 mb-4">
                      <AvatarImage src="/placeholder-avatar.jpg" />
                      <AvatarFallback className="text-2xl">{profileData.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <Button variant="outline" size="sm" className="flex items-center gap-2">
                      <Camera className="w-4 h-4" />
                      Change Photo
                    </Button>
                  </div>
                  <div className="space-y-2">
                    <Badge variant="default" className="flex items-center gap-1 justify-center">
                      <Crown className="w-3 h-3" />
                      Premium Member
                    </Badge>
                    <Badge variant="secondary" className="flex items-center gap-1 justify-center">
                      <Star className="w-3 h-3" />
                      Top 5% Productive
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Personal Information */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={profileData.name}
                        onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        value={profileData.email}
                        onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="username">Username</Label>
                      <Input
                        id="username"
                        value={profileData.username}
                        onChange={(e) => setProfileData(prev => ({ ...prev, username: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="title">Job Title</Label>
                      <Input
                        id="title"
                        value={profileData.title}
                        onChange={(e) => setProfileData(prev => ({ ...prev, title: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="company">Company</Label>
                      <Input
                        id="company"
                        value={profileData.company}
                        onChange={(e) => setProfileData(prev => ({ ...prev, company: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        value={profileData.location}
                        onChange={(e) => setProfileData(prev => ({ ...prev, location: e.target.value }))}
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="bio">Bio</Label>
                    <textarea
                      id="bio"
                      className="w-full p-3 border border-gray-300 rounded-md resize-none"
                      rows={3}
                      value={profileData.bio}
                      onChange={(e) => setProfileData(prev => ({ ...prev, bio: e.target.value }))}
                    />
                  </div>
                  <Button onClick={handleSaveProfile} className="w-full">
                    Save Changes
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Integrations Tab */}
          <TabsContent value="integrations" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Link className="w-5 h-5" />
                  App Integrations
                </CardTitle>
                <p className="text-sm text-gray-600">
                  Connect your favorite productivity apps to streamline your workflow
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {integrationServices.map((service) => {
                    const IconComponent = service.icon;
                    const isConnected = integrations[service.key as keyof typeof integrations]?.connected;
                    
                    return (
                      <div
                        key={service.key}
                        className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <IconComponent className={`w-6 h-6 ${service.color}`} />
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="font-medium">{service.name}</h4>
                              {service.premium && (
                                <Badge variant="secondary" className="text-xs">
                                  <Crown className="w-3 h-3 mr-1" />
                                  Premium
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-gray-600">{service.description}</p>
                            {isConnected && (
                              <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
                                <Check className="w-3 h-3" />
                                Connected
                              </p>
                            )}
                          </div>
                        </div>
                        <Button
                          variant={isConnected ? "destructive" : "default"}
                          size="sm"
                          onClick={() => toggleIntegration(service.key)}
                          className="flex items-center gap-2"
                        >
                          {isConnected ? (
                            <>
                              <X className="w-4 h-4" />
                              Disconnect
                            </>
                          ) : (
                            <>
                              <Plus className="w-4 h-4" />
                              Connect
                            </>
                          )}
                        </Button>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="w-5 h-5" />
                  Notification Preferences
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h4 className="font-medium">Communication</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Email Notifications</Label>
                        <p className="text-sm text-gray-600">Receive updates via email</p>
                      </div>
                      <Switch
                        checked={settings.notifications.email}
                        onCheckedChange={(checked) =>
                          setSettings(prev => ({
                            ...prev,
                            notifications: { ...prev.notifications, email: checked }
                          }))
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Desktop Notifications</Label>
                        <p className="text-sm text-gray-600">Browser push notifications</p>
                      </div>
                      <Switch
                        checked={settings.notifications.desktop}
                        onCheckedChange={(checked) =>
                          setSettings(prev => ({
                            ...prev,
                            notifications: { ...prev.notifications, desktop: checked }
                          }))
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Mobile Notifications</Label>
                        <p className="text-sm text-gray-600">Push notifications on mobile</p>
                      </div>
                      <Switch
                        checked={settings.notifications.mobile}
                        onCheckedChange={(checked) =>
                          setSettings(prev => ({
                            ...prev,
                            notifications: { ...prev.notifications, mobile: checked }
                          }))
                        }
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h4 className="font-medium">Productivity Updates</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Weekly Reports</Label>
                        <p className="text-sm text-gray-600">Weekly productivity summaries</p>
                      </div>
                      <Switch
                        checked={settings.notifications.weekly_reports}
                        onCheckedChange={(checked) =>
                          setSettings(prev => ({
                            ...prev,
                            notifications: { ...prev.notifications, weekly_reports: checked }
                          }))
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Task Reminders</Label>
                        <p className="text-sm text-gray-600">Reminders for upcoming tasks</p>
                      </div>
                      <Switch
                        checked={settings.notifications.task_reminders}
                        onCheckedChange={(checked) =>
                          setSettings(prev => ({
                            ...prev,
                            notifications: { ...prev.notifications, task_reminders: checked }
                          }))
                        }
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    Security Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button variant="outline" className="w-full justify-start">
                    <Key className="w-4 h-4 mr-2" />
                    Change Password
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Smartphone className="w-4 h-4 mr-2" />
                    Two-Factor Authentication
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Clock className="w-4 h-4 mr-2" />
                    Active Sessions
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Download className="w-4 h-4 mr-2" />
                    Download Data
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Privacy Controls</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Activity Tracking</Label>
                      <p className="text-sm text-gray-600">Allow productivity analytics</p>
                    </div>
                    <Switch
                      checked={settings.privacy.activity_tracking}
                      onCheckedChange={(checked) =>
                        setSettings(prev => ({
                          ...prev,
                          privacy: { ...prev.privacy, activity_tracking: checked }
                        }))
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Data Analytics</Label>
                      <p className="text-sm text-gray-600">Help improve our services</p>
                    </div>
                    <Switch
                      checked={settings.privacy.data_analytics}
                      onCheckedChange={(checked) =>
                        setSettings(prev => ({
                          ...prev,
                          privacy: { ...prev.privacy, data_analytics: checked }
                        }))
                      }
                    />
                  </div>
                  <Button onClick={handleExportData} variant="outline" className="w-full">
                    Export My Data
                  </Button>
                  <Button variant="destructive" className="w-full">
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete Account
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Billing Tab */}
          <TabsContent value="billing" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Crown className="w-5 h-5 text-yellow-500" />
                    Current Plan
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center py-4">
                    <h3 className="text-2xl font-bold">Premium Plan</h3>
                    <p className="text-3xl font-bold text-blue-500">$19<span className="text-lg text-gray-600">/month</span></p>
                    <Badge variant="default" className="mt-2">Active</Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-500" />
                      <span className="text-sm">Unlimited integrations</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-500" />
                      <span className="text-sm">Advanced analytics</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-500" />
                      <span className="text-sm">Priority support</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-500" />
                      <span className="text-sm">Team collaboration</span>
                    </div>
                  </div>
                  <Button className="w-full">Manage Subscription</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="w-5 h-5" />
                    Payment Method
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-6 bg-blue-500 rounded flex items-center justify-center text-white text-xs font-bold">
                          VISA
                        </div>
                        <div>
                          <p className="font-medium">•••• •••• •••• 4242</p>
                          <p className="text-sm text-gray-600">Expires 12/25</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Payment Method
                  </Button>
                  <div className="space-y-2">
                    <h4 className="font-medium">Billing History</h4>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span>Jan 2024</span>
                        <span>$19.00</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Dec 2023</span>
                        <span>$19.00</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Nov 2023</span>
                        <span>$19.00</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AccountScreen;