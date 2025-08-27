import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Search,
  Filter,
  Calendar,
  Download,
  Settings,
  Home,
  BarChart3,
  Workflow,
  Package,
  Star,
  TrendingUp,
  TrendingDown,
  Clock,
  Zap,
  AlertTriangle,
  CheckCircle,
  Activity,
  Bell,
  User,
  HelpCircle,
  ChevronDown,
  RefreshCw,
  Maximize2,
  MoreHorizontal,
  Target,
  Battery,
  Shield
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

// Favicon Component
const FarmFlowFavicon = ({ className = "w-8 h-8" }) => (
  <svg className={className} viewBox="0 0 64 64">
    <defs>
      <linearGradient id="faviconGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{stopColor:'#256C3A'}}/>
        <stop offset="50%" style={{stopColor:'#2D7A42'}}/>
        <stop offset="100%" style={{stopColor:'#1e5530'}}/>
      </linearGradient>
      <filter id="faviconShadow">
        <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="rgba(0,0,0,0.1)"/>
      </filter>
    </defs>
    <rect x="6" y="6" width="52" height="52" rx="16" fill="url(#faviconGradient)" filter="url(#faviconShadow)"/>
    <g transform="translate(32,32)">
      <rect x="-16" y="4" width="3" height="12" fill="white" rx="1.5" opacity="0.9"/>
      <rect x="-10" y="0" width="3" height="16" fill="white" rx="1.5" opacity="0.9"/>
      <rect x="-4" y="-4" width="3" height="20" fill="white" rx="1.5"/>
      <rect x="2" y="-8" width="3" height="24" fill="white" rx="1.5"/>
      <rect x="8" y="-2" width="3" height="18" fill="white" rx="1.5" opacity="0.9"/>
      <circle cx="14" cy="-12" r="3" fill="white"/>
      <rect x="12" y="-14" width="4" height="4" fill="#256C3A" rx="1"/>
    </g>
  </svg>
);

// KPI Card Component
const KPICard = ({ title, value, unit, trend, trendValue, icon: Icon, color = "green", data_testid }) => {
  const colorClasses = {
    green: "text-green-600 bg-green-50 border-green-200",
    blue: "text-blue-600 bg-blue-50 border-blue-200",
    amber: "text-amber-600 bg-amber-50 border-amber-200",
    red: "text-red-600 bg-red-50 border-red-200"
  };

  const trendColorClasses = {
    up: "text-green-600",
    down: "text-red-600",
    neutral: "text-gray-600"
  };

  return (
    <Card className="relative overflow-hidden" data-testid={data_testid}>
      <CardContent className="p-7">
        <div className="flex items-center justify-between mb-6">
          <div className={`p-2.5 rounded-xl border ${colorClasses[color]} mt-5`}>
            <Icon className="w-5 h-5" />
          </div>
          <div className={`flex items-center space-x-1 ${trendColorClasses[trend]}`}>
            {trend === 'up' && <TrendingUp className="w-4 h-4" />}
            {trend === 'down' && <TrendingDown className="w-4 h-4" />}
            <span className="text-sm font-medium">{trendValue}</span>
          </div>
        </div>
        
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <div className="flex items-baseline space-x-1">
            <p className="text-3xl font-bold text-gray-900 leading-none">{value}</p>
            <p className="text-base text-gray-500 font-medium">{unit}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Performance Chart Component
const PerformanceChart = ({ title, data, type = "line", dataKey, color = "#256C3A" }) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Calendar className="w-4 h-4 mr-2" />
            Last 7 days
          </Button>
          <Button variant="ghost" size="sm">
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={280}>
          {type === "line" ? (
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="time" 
                stroke="#888" 
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis 
                stroke="#888" 
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e0e0e0',
                  borderRadius: '8px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                }}
              />
              <Line 
                type="monotone" 
                dataKey={dataKey} 
                stroke={color} 
                strokeWidth={3}
                dot={{ fill: color, strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: color, strokeWidth: 2 }}
              />
            </LineChart>
          ) : (
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="time" 
                stroke="#888" 
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis 
                stroke="#888" 
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e0e0e0',
                  borderRadius: '8px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                }}
              />
              <Bar dataKey={dataKey} fill={color} radius={[4, 4, 0, 0]} />
            </BarChart>
          )}
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

// Robot Comparison Table
const RobotComparisonTable = ({ data }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Robot Performance Comparison</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full" data-testid="robot-comparison-table">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-2 font-semibold text-gray-700">Robot ID</th>
                <th className="text-right py-3 px-2 font-semibold text-gray-700">Completion Rate</th>
                <th className="text-right py-3 px-2 font-semibold text-gray-700">Avg Duration</th>
                <th className="text-right py-3 px-2 font-semibold text-gray-700">Energy Usage</th>
                <th className="text-center py-3 px-2 font-semibold text-gray-700">Status</th>
              </tr>
            </thead>
            <tbody>
              {data.map((robot, index) => (
                <tr key={robot.id} className="border-b border-gray-100 hover:bg-gray-50 cursor-pointer" data-testid={`robot-row-${robot.id}`}>
                  <td className="py-4 px-2">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${robot.status === 'active' ? 'bg-green-500' : robot.status === 'maintenance' ? 'bg-amber-500' : 'bg-red-500'}`}></div>
                      <span className="font-medium text-gray-900">{robot.id}</span>
                    </div>
                  </td>
                  <td className="py-4 px-2 text-right">
                    <span className="font-semibold text-gray-900">{robot.completionRate}%</span>
                  </td>
                  <td className="py-4 px-2 text-right">
                    <span className="text-gray-900">{robot.avgDuration} min</span>
                  </td>
                  <td className="py-4 px-2 text-right">
                    <span className="text-gray-900">{robot.energyUsage} kWh</span>
                  </td>
                  <td className="py-4 px-2 text-center">
                    <Badge 
                      className={`${
                        robot.status === 'active' ? 'bg-green-50 text-green-700 border-green-200' :
                        robot.status === 'maintenance' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                        'bg-red-50 text-red-700 border-red-200'
                      } border`}
                    >
                      {robot.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

const PerformanceDashboard = () => {
  const [selectedTimeRange, setSelectedTimeRange] = useState('7d');
  const [selectedRobotType, setSelectedRobotType] = useState('all');
  const [selectedScenario, setSelectedScenario] = useState('all');
  const [selectedRobot, setSelectedRobot] = useState(null);

  // Sample data
  const kpiData = [
    { title: "Task Completion Rate", value: "94.2", unit: "%", trend: "up", trendValue: "+2.1%" },
    { title: "Average Mission Duration", value: "23.5", unit: "min", trend: "down", trendValue: "-1.8%" },
    { title: "Energy Consumption", value: "145.8", unit: "kWh", trend: "up", trendValue: "+5.2%" },
    { title: "Safety Events", value: "3", unit: "events", trend: "down", trendValue: "-40%" }
  ];

  const performanceData = [
    { time: '00:00', completionRate: 92, duration: 25, energy: 12.5, events: 0 },
    { time: '04:00', completionRate: 95, duration: 22, energy: 15.2, events: 1 },
    { time: '08:00', completionRate: 89, duration: 28, energy: 18.7, events: 0 },
    { time: '12:00', completionRate: 97, duration: 20, energy: 22.1, events: 1 },
    { time: '16:00', completionRate: 93, duration: 24, energy: 19.8, events: 0 },
    { time: '20:00', completionRate: 96, duration: 21, energy: 16.3, events: 1 }
  ];

  const robotComparisonData = [
    { id: 'ROB-001', completionRate: 96.8, avgDuration: 21.2, energyUsage: 28.4, status: 'active' },
    { id: 'ROB-002', completionRate: 94.1, avgDuration: 24.7, energyUsage: 31.2, status: 'active' },
    { id: 'ROB-003', completionRate: 91.5, avgDuration: 26.1, energyUsage: 29.8, status: 'maintenance' },
    { id: 'ROB-004', completionRate: 97.2, avgDuration: 19.8, energyUsage: 25.6, status: 'active' },
    { id: 'ROB-005', completionRate: 88.9, avgDuration: 28.3, energyUsage: 33.1, status: 'error' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex" data-testid="performance-dashboard-page">
      {/* Main Content */}
      <main className="flex-1 flex" data-testid="main-content" role="main">
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="bg-white border-b border-gray-200 px-8 py-4 shadow-sm" data-testid="page-header">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <FarmFlowFavicon className="w-10 h-10" />
                <div>
                  <h1 className="text-2xl font-bold text-gray-900" data-testid="system-title">
                    VIA FarmFlow for Developers
                  </h1>
                  <p className="text-sm text-gray-600 font-medium">Performance Analysis Dashboard</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-3">
                  <Button variant="outline" className="border-gray-300" data-testid="export-report">
                    <Download className="w-4 h-4 mr-2" />
                    Export Report
                  </Button>
                  <Button variant="outline" className="border-gray-300" data-testid="refresh-data">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Refresh
                  </Button>
                </div>
                
                <div className="flex items-center space-x-3">
                  <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-lg transition-colors" data-testid="notifications">
                    <Bell className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-lg transition-colors" data-testid="help">
                    <HelpCircle className="w-5 h-5" />
                  </button>
                  <div className="flex items-center space-x-2 px-3 py-2 bg-gray-50 rounded-xl hover:bg-gray-100 cursor-pointer transition-colors" data-testid="user-menu">
                    <div className="w-6 h-6 bg-gradient-to-br from-[#256C3A] to-[#1e5530] rounded-full flex items-center justify-center">
                      <User className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-sm font-medium text-gray-700">Developer</span>
                  </div>
                </div>
              </div>
            </div>
          </header>

          {/* Filters Toolbar */}
          <div className="bg-white border-b border-gray-200 px-8 py-4" data-testid="filters-toolbar">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Filter className="w-4 h-4 text-gray-500" />
                  <span className="text-sm font-medium text-gray-700">Filters:</span>
                </div>
                
                <select 
                  value={selectedTimeRange}
                  onChange={(e) => setSelectedTimeRange(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#256C3A] bg-white"
                  data-testid="time-range-filter"
                >
                  <option value="24h">Last 24 hours</option>
                  <option value="7d">Last 7 days</option>
                  <option value="30d">Last 30 days</option>
                  <option value="90d">Last 90 days</option>
                </select>

                <select 
                  value={selectedRobotType}
                  onChange={(e) => setSelectedRobotType(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#256C3A] bg-white"
                  data-testid="robot-type-filter"
                >
                  <option value="all">All Robot Types</option>
                  <option value="harvester">Harvester Robots</option>
                  <option value="pruning">Pruning Robots</option>
                  <option value="transport">Transport Robots</option>
                </select>

                <select 
                  value={selectedScenario}
                  onChange={(e) => setSelectedScenario(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#256C3A] bg-white"
                  data-testid="scenario-filter"
                >
                  <option value="all">All Scenarios</option>
                  <option value="night-ops">Night Operations</option>
                  <option value="growth-mgmt">Growth Management</option>
                  <option value="maintenance">Maintenance</option>
                </select>
              </div>

              <div className="text-sm text-gray-600">
                Last updated: <span className="font-medium">2 minutes ago</span>
              </div>
            </div>
          </div>

          {/* Main Dashboard Content */}
          <div className="flex-1 p-8 space-y-8" data-testid="dashboard-content">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" data-testid="kpi-section">
              <KPICard 
                title="Task Completion Rate"
                value="94.2"
                unit="%"
                trend="up"
                trendValue="+2.1%"
                icon={Target}
                color="green"
                data_testid="completion-rate-kpi"
              />
              <KPICard 
                title="Average Mission Duration"
                value="23.5"
                unit="min"
                trend="down"
                trendValue="-1.8%"
                icon={Clock}
                color="blue"
                data_testid="duration-kpi"
              />
              <KPICard 
                title="Energy Consumption"
                value="145.8"
                unit="kWh"
                trend="up"
                trendValue="+5.2%"
                icon={Battery}
                color="amber"
                data_testid="energy-kpi"
              />
              <KPICard 
                title="Safety Events"
                value="3"
                unit="events"
                trend="down"
                trendValue="-40%"
                icon={Shield}
                color="red"
                data_testid="safety-kpi"
              />
            </div>

            {/* Performance Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6" data-testid="charts-section">
              <PerformanceChart 
                title="Task Completion Rate Over Time"
                data={performanceData}
                type="line"
                dataKey="completionRate"
                color="#256C3A"
              />
              <PerformanceChart 
                title="Energy Consumption Trends"
                data={performanceData}
                type="bar"
                dataKey="energy"
                color="#3B4A6B"
              />
            </div>

            {/* Robot Comparison Table */}
            <div data-testid="comparison-section">
              <RobotComparisonTable data={robotComparisonData} />
            </div>
          </div>
        </div>

        {/* Inspector Panel */}
        <aside className="w-96 bg-white border-l border-gray-200 shadow-lg" data-testid="inspector-panel" role="complementary">
          <div className="h-full flex flex-col">
            <div className="border-b border-gray-200 p-6 bg-gradient-to-r from-gray-50 to-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-1">Robot Inspector</h3>
              <p className="text-sm text-gray-600">Detailed performance metrics</p>
            </div>
            
            <div className="flex-1 p-6 overflow-y-auto">
              {selectedRobot ? (
                <div className="space-y-6">
                  {/* Selected robot details would go here */}
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-[#256C3A] rounded-full flex items-center justify-center mx-auto mb-4">
                      <Activity className="w-8 h-8 text-white" />
                    </div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">ROB-001 Selected</h4>
                    <p className="text-gray-600 text-sm">Detailed metrics and analysis</p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-20">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <BarChart3 className="w-8 h-8 text-gray-400" />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">No Selection</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Click on a robot in the comparison table to view detailed performance metrics and analysis.
                  </p>
                </div>
              )}
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
};

export default PerformanceDashboard;