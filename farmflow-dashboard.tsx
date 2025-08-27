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
  Clock,
  ChevronDown,
  Menu,
  Home,
  Settings,
  BarChart3,
  Workflow
} from 'lucide-react';

const Dashboard = () => {
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

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'error': return 'text-red-600 bg-red-50';
      case 'warning': return 'text-yellow-600 bg-yellow-50';
      case 'info': return 'text-blue-600 bg-blue-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex" data-testid="dashboard-page">
      {/* Left Navigation */}
      <nav className="w-16 bg-white border-r border-gray-200 flex flex-col items-center py-4" data-testid="left-nav">
        <div className="w-8 h-8 mb-8">
          <svg className="w-8 h-8" viewBox="0 0 64 64">
            <defs>
              <linearGradient id="navBg" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{stopColor:'#256C3A'}}/>
                <stop offset="100%" style={{stopColor:'#1e5530'}}/>
              </linearGradient>
            </defs>
            <rect x="8" y="8" width="48" height="48" rx="12" fill="url(#navBg)"/>
            <rect x="16" y="36" width="4" height="12" fill="white" rx="2"/>
            <rect x="22" y="32" width="4" height="16" fill="white" rx="2"/>
            <rect x="28" y="28" width="4" height="20" fill="white" rx="2"/>
            <rect x="34" y="24" width="4" height="24" fill="white" rx="2"/>
            <rect x="40" y="30" width="4" height="18" fill="white" rx="2"/>
            <circle cx="48" cy="20" r="4" fill="white"/>
            <rect x="46" y="18" width="4" height="4" fill="#256C3A" rx="1"/>
          </svg>
        </div>
        
        <div className="flex flex-col space-y-4">
          <button className="w-10 h-10 rounded-lg bg-[#256C3A] text-white flex items-center justify-center" data-testid="nav-dashboard">
            <Home className="w-5 h-5" />
          </button>
          <button className="w-10 h-10 rounded-lg text-gray-500 hover:bg-gray-100 flex items-center justify-center" data-testid="nav-workflows">
            <Workflow className="w-5 h-5" />
          </button>
          <button className="w-10 h-10 rounded-lg text-gray-500 hover:bg-gray-100 flex items-center justify-center" data-testid="nav-analytics">
            <BarChart3 className="w-5 h-5" />
          </button>
          <button className="w-10 h-10 rounded-lg text-gray-500 hover:bg-gray-100 flex items-center justify-center" data-testid="nav-settings">
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 flex" data-testid="main-content">
        {/* Content Area */}
        <div className="flex-1 p-8">
          {/* Header */}
          <header className="flex items-center justify-between mb-8" data-testid="page-header">
            <div>
              <div className="flex items-center space-x-3 mb-2">
                <div className="w-10 h-10">
                  <svg className="w-10 h-10 drop-shadow-sm" viewBox="0 0 64 64">
                    <defs>
                      <linearGradient id="headerBg" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style={{stopColor:'#256C3A'}}/>
                        <stop offset="100%" style={{stopColor:'#1e5530'}}/>
                      </linearGradient>
                    </defs>
                    <rect x="8" y="8" width="48" height="48" rx="12" fill="url(#headerBg)"/>
                    <rect x="16" y="36" width="4" height="12" fill="white" rx="2"/>
                    <rect x="22" y="32" width="4" height="16" fill="white" rx="2"/>
                    <rect x="28" y="28" width="4" height="20" fill="white" rx="2"/>
                    <rect x="34" y="24" width="4" height="24" fill="white" rx="2"/>
                    <rect x="40" y="30" width="4" height="18" fill="white" rx="2"/>
                    <circle cx="48" cy="20" r="4" fill="white"/>
                    <rect x="46" y="18" width="4" height="4" fill="#256C3A" rx="1"/>
                  </svg>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900" data-testid="system-title">
                    VIA FarmFlow for Developers
                  </h1>
                  <p className="text-sm text-gray-500">Smart Greenhouse Workflow Management Dashboard</p>
                </div>
              </div>
            </div>
            <div className="text-sm text-gray-500">
              Last updated: {new Date().toLocaleTimeString('en-US', { hour12: false })}
            </div>
          </header>

          {/* KPI Cards */}
          <div className="grid grid-cols-12 gap-6 mt-6 mb-6" data-testid="kpi-cards">
            <Card className="col-span-4 hover:shadow-lg hover:scale-[1.02] transition-all duration-200 cursor-pointer border-0 shadow-sm h-40" data-testid="kpi-efficiency">
              <CardContent className="p-6 h-full flex flex-col">
                <div className="flex items-center justify-between mt-2">
                  <h3 className="text-sm font-medium text-gray-600">System Efficiency</h3>
                  <div className="w-8 h-8 bg-green-50 rounded-lg flex items-center justify-center">
                    <Activity className="w-4 h-4 text-[#256C3A]" />
                  </div>
                </div>
                <div className="text-3xl font-bold text-gray-900 flex-1 flex items-center">89.2%</div>
                <div className="flex items-center text-sm mb-2">
                  <span className="text-green-600">▲ 2.1%</span>
                  <span className="text-gray-500 ml-2">vs last hour</span>
                </div>
              </CardContent>
            </Card>

            <Card className="col-span-4 hover:shadow-lg hover:scale-[1.02] transition-all duration-200 cursor-pointer border-0 shadow-sm h-40" data-testid="kpi-energy">
              <CardContent className="p-6 h-full flex flex-col">
                <div className="flex items-center justify-between mt-2">
                  <h3 className="text-sm font-medium text-gray-600">Energy Usage</h3>
                  <div className="w-8 h-8 bg-yellow-50 rounded-lg flex items-center justify-center">
                    <Zap className="w-4 h-4 text-yellow-600" />
                  </div>
                </div>
                <div className="text-3xl font-bold text-gray-900 flex-1 flex items-center">142.8 kWh</div>
                <div className="flex items-center text-sm mb-2">
                  <span className="text-red-600">▼ 5.2%</span>
                  <span className="text-gray-500 ml-2">vs last hour</span>
                </div>
              </CardContent>
            </Card>

            <Card className="col-span-4 hover:shadow-lg hover:scale-[1.02] transition-all duration-200 cursor-pointer border-0 shadow-sm h-40" data-testid="kpi-uptime">
              <CardContent className="p-6 h-full flex flex-col">
                <div className="flex items-center justify-between mt-2">
                  <h3 className="text-sm font-medium text-gray-600">Robot Uptime</h3>
                  <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
                    <Bot className="w-4 h-4 text-blue-600" />
                  </div>
                </div>
                <div className="text-3xl font-bold text-gray-900 flex-1 flex items-center">99.7%</div>
                <div className="flex items-center text-sm mb-2">
                  <span className="text-green-600">▲ 0.3%</span>
                  <span className="text-gray-500 ml-2">vs last hour</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="flex justify-center mt-6 mb-6" data-testid="quick-actions">
            <div className="flex space-x-4">
              <Button className="bg-[#256C3A] hover:bg-[#1e5530] text-white" data-testid="run-simulation">
                <Play className="w-4 h-4 mr-2" />
                Run Simulation
              </Button>
              <Button variant="outline" className="border-[#3B4A6B] text-[#3B4A6B] hover:bg-[#3B4A6B] hover:text-white" data-testid="export-data">
                <Download className="w-4 h-4 mr-2" />
                Export Data
              </Button>
            </div>
          </div>

          {/* Charts & Events */}
          <div className="grid grid-cols-12 gap-6 mt-6" data-testid="charts-events">
            {/* Efficiency Trend Chart */}
            <Card className="col-span-8" data-testid="efficiency-chart">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Efficiency Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={efficiencyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="time" stroke="#666" />
                    <YAxis stroke="#666" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'white', 
                        border: '1px solid #e2e8f0',
                        borderRadius: '8px'
                      }} 
                    />
                    <Line 
                      type="monotone" 
                      dataKey="efficiency" 
                      stroke="#256C3A" 
                      strokeWidth={3}
                      dot={{ fill: '#256C3A', r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Recent Events */}
            <Card className="col-span-4" data-testid="recent-events">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Recent Events</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4" aria-live="polite">
                  {recentEvents.map((event) => {
                    const IconComponent = event.icon;
                    return (
                      <div key={event.id} className="flex items-start space-x-3" data-testid={`event-${event.id}`}>
                        <div className={`p-1 rounded-full ${getSeverityColor(event.severity)}`}>
                          <IconComponent className="w-3 h-3" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-gray-900 leading-5">{event.message}</p>
                          <p className="text-xs text-gray-500 mt-1">{event.time}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Inspector Panel */}
        <aside className="w-80 bg-white border-l border-gray-200 p-6" data-testid="inspector-panel">
          {/* Workflow Status */}
          <div className="mb-8" data-testid="workflow-status">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Workflow Execution Status</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">{systemStatus.workflow.name}</span>
                <Badge className="bg-green-100 text-green-800">Running</Badge>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-[#256C3A] h-2 rounded-full transition-all duration-300" 
                  style={{ width: `${systemStatus.workflow.progress}%` }}
                ></div>
              </div>
              <div className="text-xs text-gray-500">{systemStatus.workflow.progress}% Complete</div>
            </div>
          </div>

          {/* Greenhouse Summary */}
          <div className="mb-8" data-testid="greenhouse-summary">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Greenhouse Summary</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Size</span>
                <span className="text-sm font-medium">{systemStatus.greenhouse.size}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Active Robots</span>
                <span className="text-sm font-medium">
                  {systemStatus.greenhouse.activeRobots}/{systemStatus.greenhouse.totalRobots}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Temperature</span>
                <div className="flex items-center">
                  <Thermometer className="w-4 h-4 text-blue-500 mr-1" />
                  <span className="text-sm font-medium">{systemStatus.greenhouse.temperature}°C</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Sensors</span>
                <div className="flex items-center">
                  <Wifi className="w-4 h-4 text-green-500 mr-1" />
                  <span className="text-sm font-medium">Online</span>
                </div>
              </div>
              <div className="text-xs text-gray-500 pt-2">
                Last updated: {systemStatus.greenhouse.lastUpdate}
              </div>
            </div>
          </div>

          {/* Notifications */}
          <div className="mb-6" data-testid="notifications">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Notifications</h3>
            <div className="space-y-2">
              {systemStatus.notifications.map((notification) => (
                <div 
                  key={notification.id} 
                  className={`p-3 rounded-lg text-xs ${getSeverityColor(notification.severity)}`}
                  data-testid={`notification-${notification.id}`}
                >
                  {notification.message}
                </div>
              ))}
            </div>
          </div>

          {/* JSON Preview Toggle */}
          <div data-testid="json-preview-section">
            <button 
              onClick={() => setJsonPreview(!jsonPreview)}
              className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              data-testid="json-preview-toggle"
            >
              <span className="text-sm font-medium text-gray-700">JSON Preview</span>
              <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${jsonPreview ? 'rotate-180' : ''}`} />
            </button>
            {jsonPreview && (
              <div className="mt-2 p-3 bg-gray-900 rounded-lg">
                <pre className="text-xs text-green-400 overflow-x-auto">
{JSON.stringify({
  dashboard: {
    kpis: {
      efficiency: 89.2,
      energy: 142.8,
      uptime: 99.7
    },
    workflow: systemStatus.workflow,
    greenhouse: systemStatus.greenhouse
  }
}, null, 2)}
                </pre>
              </div>
            )}
          </div>
        </aside>
      </main>
    </div>
  );
};

export default Dashboard;