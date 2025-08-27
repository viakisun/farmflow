import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import {
  Activity,
  Zap,
  Bot,
  Play,
  Download,
  Thermometer,
  Wifi,
  AlertTriangle,
  CheckCircle,
  ChevronDown,
} from 'lucide-react';

const DashboardPage = () => {
  const [jsonPreview, setJsonPreview] = useState(false);

  // Sample data
  const efficiencyData = [
    { time: '00:00', efficiency: 85 },
    { time: '04:00', efficiency: 78 },
    { time: '08:00', efficiency: 92 },
    { time: '12:00', efficiency: 88 },
    { time: '16:00', efficiency: 94 },
    { time: '20:00', efficiency: 89 },
  ];

  const recentEvents = [
    { id: 1, type: 'success', icon: CheckCircle, message: 'Robot ARM-01 completed harvest cycle', time: '14:32', severity: 'info' },
    { id: 2, type: 'warning', icon: AlertTriangle, message: 'Temperature sensor drift detected in Zone C', time: '14:28', severity: 'warning' },
    { id: 3, type: 'info', icon: Activity, message: 'Workflow execution started: Morning Inspection', time: '14:25', severity: 'info' },
    { id: 4, type: 'success', icon: CheckCircle, message: 'Energy optimization cycle completed', time: '14:20', severity: 'info' },
  ];

  const systemStatus = {
    workflow: { status: 'running', progress: 75, name: 'Daily Maintenance' },
    greenhouse: {
      size: '80m × 30m',
      activeRobots: 3,
      totalRobots: 4,
      temperature: 22.5,
      humidity: 65,
      lastUpdate: '14:35'
    },
    notifications: [
      { id: 1, message: 'Simulation ready for execution', severity: 'info' },
      { id: 2, message: 'Robot ARM-02 requires calibration', severity: 'warning' },
      { id: 3, message: 'All systems operational', severity: 'info' }
    ]
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'error': return 'text-red-600 bg-red-50 dark:bg-red-900/20 dark:text-red-400';
      case 'warning': return 'text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'info': return 'text-blue-600 bg-blue-50 dark:bg-blue-900/20 dark:text-blue-400';
      default: return 'text-gray-600 bg-gray-50 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  return (
    <div className="flex h-full">
      {/* Content Area */}
      <div className="flex-1 p-4 md:p-8 overflow-y-auto">
        {/* Header */}
        <header className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
              Dashboard
            </h1>
            <p className="text-md text-gray-500 dark:text-gray-400">
              Smart Greenhouse Workflow Management
            </p>
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Last updated: {new Date().toLocaleTimeString('en-US', { hour12: false })}
          </div>
        </header>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">System Efficiency</CardTitle>
              <Activity className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">89.2%</div>
              <p className="text-xs text-green-600 dark:text-green-400">+2.1% vs last hour</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Energy Usage</CardTitle>
              <Zap className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">142.8 kWh</div>
              <p className="text-xs text-red-600 dark:text-red-400">-5.2% vs last hour</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Robot Uptime</CardTitle>
              <Bot className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">99.7%</div>
              <p className="text-xs text-green-600 dark:text-green-400">+0.3% vs last hour</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Efficiency Trend</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={efficiencyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="efficiency" stroke="hsl(var(--primary))" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            <div className="flex justify-center space-x-4">
              <Button>
                <Play className="w-4 h-4 mr-2" />
                Run Simulation
              </Button>
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Export Data
              </Button>
            </div>
          </div>

          {/* Right Column (Inspector) */}
          <aside className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Events</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentEvents.map((event) => {
                    const IconComponent = event.icon;
                    return (
                      <div key={event.id} className="flex items-start space-x-3">
                        <div className={`p-1 rounded-full ${getSeverityColor(event.severity)}`}>
                          <IconComponent className="w-3 h-3" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-gray-900 dark:text-gray-200 leading-5">{event.message}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{event.time}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Greenhouse Summary</CardTitle>
              </CardHeader>
              <CardContent className="text-sm space-y-2">
                <div className="flex justify-between"><span>Size:</span> <span>{systemStatus.greenhouse.size}</span></div>
                <div className="flex justify-between"><span>Active Robots:</span> <span>{systemStatus.greenhouse.activeRobots}/{systemStatus.greenhouse.totalRobots}</span></div>
                <div className="flex justify-between items-center"><span>Temperature:</span> <span className="flex items-center"><Thermometer className="w-4 h-4 mr-1 text-blue-500" /> {systemStatus.greenhouse.temperature}°C</span></div>
                <div className="flex justify-between items-center"><span>Sensors:</span> <span className="flex items-center"><Wifi className="w-4 h-4 mr-1 text-green-500" /> Online</span></div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Notifications</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {systemStatus.notifications.map((notification) => (
                  <div key={notification.id} className={`p-3 rounded-lg text-xs ${getSeverityColor(notification.severity)}`}>
                    {notification.message}
                  </div>
                ))}
              </CardContent>
            </Card>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;