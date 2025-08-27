import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Play,
  Pause,
  StepForward,
  RotateCcw,
  Save,
  Download,
  Home,
  Settings,
  BarChart3,
  Workflow,
  Zap,
  Cpu,
  Activity,
  Thermometer,
  Droplets,
  DoorOpen,
  Battery,
  MapPin,
  Clock,
  CheckCircle,
  AlertTriangle,
  Info,
  ZoomIn,
  ZoomOut,
  Move
} from 'lucide-react';

// Simple CSS-based Greenhouse Visualization
const GreenhouseView = ({ robots, simulationTime, isPlaying }) => {
  const [scale, setScale] = useState(1);

  const handleZoomIn = () => setScale(prev => Math.min(2, prev * 1.2));
  const handleZoomOut = () => setScale(prev => Math.max(0.5, prev * 0.8));
  const handleResetView = () => setScale(1);

  return (
    <div className="w-full h-full bg-gray-50 relative overflow-hidden">
      {/* Grid Overlay */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `
            linear-gradient(rgba(37, 108, 58, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(37, 108, 58, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: `${20 * scale}px ${20 * scale}px`,
          transform: `scale(${scale})`
        }}
      />

      {/* Greenhouse Layout */}
      <div 
        className="absolute top-20 left-20"
        style={{ transform: `scale(${scale})`, transformOrigin: 'top left' }}
      >
        {/* Main Greenhouse Structure */}
        <div className="relative" style={{ width: '800px', height: '300px' }}>
          {/* Greenhouse Border */}
          <div className="absolute inset-0 border-4 border-gray-400 bg-white bg-opacity-10 rounded-lg" />
          
          {/* Rails */}
          <div className="absolute left-16 top-0 w-1 h-full bg-gray-600" />
          <div className="absolute left-32 top-0 w-1 h-full bg-gray-600" />
          <div className="absolute left-48 top-0 w-1 h-full bg-gray-600" />
          <div className="absolute left-64 top-0 w-1 h-full bg-gray-600" />

          {/* Work Zones */}
          <div className="absolute left-20 top-16 w-32 h-24 bg-green-400 bg-opacity-40 rounded-lg" />
          <div className="absolute right-20 top-20 w-28 h-20 bg-green-400 bg-opacity-40 rounded-lg" />

          {/* Collision Zone */}
          <div className="absolute left-1/2 top-8 w-20 h-16 bg-red-500 bg-opacity-50 rounded-lg transform -translate-x-1/2" />

          {/* Robots */}
          {robots.map((robot) => (
            <div
              key={robot.id}
              className="absolute transition-all duration-500 ease-in-out"
              style={{
                left: `${robot.position.x * 8}px`,
                top: `${robot.position.z * 8}px`,
                transform: `translate(-50%, -50%)`
              }}
            >
              <div 
                className="w-6 h-6 border-2 border-white shadow-lg rounded-sm flex items-center justify-center text-xs font-bold text-white relative"
                style={{ backgroundColor: robot.color }}
              >
                {robot.id.charAt(0)}
                {robot.status === 'active' && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Status Legend */}
      <div className="absolute top-4 left-4 bg-white rounded-xl p-4 shadow-lg border border-gray-200">
        <div className="text-xs font-bold text-gray-700 mb-3 uppercase">Greenhouse Status</div>
        <div className="space-y-2 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full" />
            <span>{robots.filter(r => r.status === 'active').length} Robots Active</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-400 rounded-full" />
            <span>2 Work Zones</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full" />
            <span>1 Collision Zone</span>
          </div>
        </div>
      </div>

      {/* View Controls */}
      <div className="absolute bottom-4 left-4 flex space-x-2">
        <Button variant="outline" size="sm" onClick={handleZoomIn} className="bg-white shadow-md">
          <ZoomIn className="w-4 h-4" />
        </Button>
        <Button variant="outline" size="sm" onClick={handleZoomOut} className="bg-white shadow-md">
          <ZoomOut className="w-4 h-4" />
        </Button>
        <Button variant="outline" size="sm" onClick={handleResetView} className="bg-white shadow-md">
          <Move className="w-4 h-4" />
        </Button>
      </div>

      {/* Scale Display */}
      <div className="absolute top-4 right-4 bg-white rounded-lg px-3 py-2 text-sm font-semibold text-gray-700 shadow-md">
        {Math.round(scale * 100)}%
      </div>
    </div>
  );
};

const SimulationViewer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [simulationSpeed, setSimulationSpeed] = useState(1);
  const [simulationTime, setSimulationTime] = useState(8250);
  const [selectedTab, setSelectedTab] = useState('robots');

  // Sample robot data
  const [robots] = useState([
    {
      id: 'ARM-01',
      name: 'Pruning Robot Alpha',
      position: { x: 25, z: 15 },
      rotation: 0,
      color: '#256C3A',
      status: 'active',
      battery: 85,
      task: 'Pruning Zone A',
      speed: 1.2
    },
    {
      id: 'TRP-02', 
      name: 'Transport Robot Beta',
      position: { x: 55, z: 18 },
      rotation: Math.PI / 2,
      color: '#3b82f6',
      status: 'idle',
      battery: 92,
      task: 'Standby',
      speed: 0
    },
    {
      id: 'INS-03',
      name: 'Inspection Robot Gamma',
      position: { x: 42, z: 8 },
      rotation: Math.PI,
      color: '#f59e0b',
      status: 'active',
      battery: 67,
      task: 'Quality Check',
      speed: 0.8
    }
  ]);

  // Sample events
  const [events] = useState([
    { id: 1, time: '02:17:45', type: 'info', icon: CheckCircle, message: 'ARM-01 completed pruning cycle in Zone A', severity: 'success' },
    { id: 2, time: '02:17:30', type: 'warning', icon: AlertTriangle, message: 'TRP-02 battery optimization cycle initiated', severity: 'warning' },
    { id: 3, time: '02:17:15', type: 'info', icon: Activity, message: 'INS-03 started quality inspection sequence', severity: 'info' },
    { id: 4, time: '02:17:00', type: 'info', icon: MapPin, message: 'ARM-01 moved to position (25.0, 15.0)', severity: 'info' },
    { id: 5, time: '02:16:45', type: 'success', icon: CheckCircle, message: 'Workflow validation completed successfully', severity: 'success' },
    { id: 6, time: '02:16:30', type: 'info', icon: Thermometer, message: 'Temperature adjusted to 22.5°C in Zone B', severity: 'info' }
  ]);

  const environmentData = {
    temperature: 22.5,
    humidity: 65,
    doors: {
      entrance: 'closed',
      emergency: 'closed', 
      maintenance: 'open'
    },
    sensors: {
      active: 24,
      total: 28,
      offline: 4
    }
  };

  const performanceData = {
    fps: 60,
    cpuUsage: 34,
    gpuUsage: 28,
    memoryUsage: 1.2,
    networkLatency: 12
  };

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handlePlayPause = () => setIsPlaying(!isPlaying);
  const handleReset = () => {
    setSimulationTime(0);
    setIsPlaying(false);
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'success': return 'text-green-600';
      case 'warning': return 'text-yellow-600';
      case 'error': return 'text-red-600';
      default: return 'text-blue-600';
    }
  };

  const getSeverityBg = (severity) => {
    switch (severity) {
      case 'success': return 'bg-green-50';
      case 'warning': return 'bg-yellow-50';
      case 'error': return 'bg-red-50';
      default: return 'bg-blue-50';
    }
  };

  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setSimulationTime(prev => prev + simulationSpeed);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, simulationSpeed]);

  return (
    <div className="min-h-screen bg-gray-50 flex" data-testid="simulation-viewer-page">
      {/* Main Content */}
      <main className="flex-1 flex" data-testid="main-content" role="main">
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="bg-white border-b border-gray-200 px-8 py-4 shadow-sm" data-testid="page-header">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8">
                  <svg className="w-8 h-8 drop-shadow-sm" viewBox="0 0 64 64">
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
                  <h1 className="text-xl font-bold text-gray-900" data-testid="system-title">
                    VIAFARM
                  </h1>
                  <p className="text-sm text-gray-500">Simulation Viewer</p>
                </div>
              </div>
              
              {/* Quick Actions */}
              <div className="flex space-x-3" data-testid="quick-actions">
                <Button variant="outline" className="border-[#3B4A6B] text-[#3B4A6B] hover:bg-[#3B4A6B] hover:text-white shadow-sm" data-testid="save-recording">
                  <Save className="w-4 h-4 mr-2" />
                  Save Recording
                </Button>
                <Button variant="outline" className="border-[#3B4A6B] text-[#3B4A6B] hover:bg-[#3B4A6B] hover:text-white shadow-sm" data-testid="export-report">
                  <Download className="w-4 h-4 mr-2" />
                  Export Report
                </Button>
              </div>
            </div>
          </header>

          {/* Simulation Controls */}
          <div className="bg-white border-b border-gray-200 px-8 py-4 shadow-sm" data-testid="simulation-toolbar">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-3">
                  <Button 
                    variant={isPlaying ? "default" : "outline"}
                    size="sm" 
                    onClick={handlePlayPause}
                    className={isPlaying ? "bg-[#256C3A] hover:bg-[#1e5530] text-white" : ""}
                    data-testid="play-pause-btn"
                  >
                    {isPlaying ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
                    {isPlaying ? 'Pause' : 'Play'}
                  </Button>
                  <Button variant="outline" size="sm" data-testid="step-btn">
                    <StepForward className="w-4 h-4 mr-2" />
                    Step
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleReset} data-testid="reset-btn">
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Reset
                  </Button>
                </div>

                <div className="flex items-center space-x-3">
                  <label className="text-sm font-medium text-gray-700">Speed:</label>
                  <select 
                    value={simulationSpeed}
                    onChange={(e) => setSimulationSpeed(Number(e.target.value))}
                    className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#256C3A]"
                    data-testid="speed-selector"
                  >
                    <option value={0.5}>0.5x</option>
                    <option value={1}>1x</option>
                    <option value={2}>2x</option>
                    <option value={4}>4x</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center space-x-2 bg-gray-50 px-4 py-2 rounded-xl">
                <Clock className="w-4 h-4 text-gray-500" />
                <span className="text-sm font-medium text-gray-700">Sim Time:</span>
                <span className="text-sm font-mono font-bold text-[#256C3A]" data-testid="sim-time">
                  {formatTime(simulationTime)}
                </span>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 flex">
            {/* Simulation View */}
            <div className="flex-1" data-testid="simulation-canvas">
              <GreenhouseView robots={robots} simulationTime={simulationTime} isPlaying={isPlaying} />
            </div>

            {/* Simulation Log */}
            <div className="w-1/3 bg-white border-l border-gray-200 flex flex-col" data-testid="simulation-log">
              <div className="border-b border-gray-200 p-4">
                <h3 className="text-lg font-semibold text-gray-900">Simulation Log</h3>
                <p className="text-sm text-gray-500 mt-1">Real-time event monitoring</p>
              </div>
              
              <div className="flex-1 overflow-y-auto p-4" aria-live="polite">
                <div className="space-y-3">
                  {events.map((event) => {
                    const IconComponent = event.icon;
                    return (
                      <div 
                        key={event.id} 
                        className={`flex items-start space-x-3 p-3 rounded-xl border ${getSeverityBg(event.severity)} border-gray-200`}
                        data-testid={`event-${event.id}`}
                      >
                        <div className={`p-1 rounded-full ${getSeverityColor(event.severity)}`}>
                          <IconComponent className="w-4 h-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs font-mono text-gray-500">{event.time}</span>
                            <Badge className={`text-xs ${
                              event.severity === 'success' ? 'bg-green-100 text-green-800' :
                              event.severity === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                              event.severity === 'error' ? 'bg-red-100 text-red-800' :
                              'bg-blue-100 text-blue-800'
                            }`}>
                              {event.type}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-900 leading-relaxed">{event.message}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Inspector Panel */}
        <aside className="w-96 bg-white border-l border-gray-200 shadow-lg" data-testid="inspector-panel" role="complementary">
          <div className="h-full flex flex-col">
            <div className="border-b border-gray-200 p-6 bg-gray-50">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Inspector</h3>
              <div className="flex space-x-2 bg-white rounded-lg p-1 shadow-sm">
                <button
                  onClick={() => setSelectedTab('robots')}
                  className={`px-4 py-2.5 text-sm font-semibold rounded-md transition-all ${
                    selectedTab === 'robots'
                      ? 'bg-[#256C3A] text-white shadow-sm'
                      : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                  data-testid="robots-tab"
                >
                  Robots
                </button>
                <button
                  onClick={() => setSelectedTab('environment')}
                  className={`px-4 py-2.5 text-sm font-semibold rounded-md transition-all ${
                    selectedTab === 'environment'
                      ? 'bg-[#256C3A] text-white shadow-sm'
                      : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                  data-testid="environment-tab"
                >
                  Environment
                </button>
                <button
                  onClick={() => setSelectedTab('performance')}
                  className={`px-4 py-2.5 text-sm font-semibold rounded-md transition-all ${
                    selectedTab === 'performance'
                      ? 'bg-[#256C3A] text-white shadow-sm'
                      : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                  data-testid="performance-tab"
                >
                  Performance
                </button>
              </div>
            </div>

            <div className="flex-1 p-6 overflow-y-auto">
              {selectedTab === 'robots' && (
                <div className="space-y-6" data-testid="robots-panel">
                  {robots.map((robot) => (
                    <div key={robot.id} className="bg-gray-50 rounded-xl p-5 border border-gray-200">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="font-semibold text-gray-900">{robot.name}</h4>
                        <Badge className={`${
                          robot.status === 'active' ? 'bg-green-100 text-green-800' : 
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {robot.status}
                        </Badge>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Battery className="w-4 h-4 text-gray-500" />
                            <span className="text-sm text-gray-600">Battery</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                              <div 
                                className={`h-full ${
                                  robot.battery > 75 ? 'bg-green-500' :
                                  robot.battery > 25 ? 'bg-yellow-500' : 'bg-red-500'
                                }`}
                                style={{ width: `${robot.battery}%` }}
                              />
                            </div>
                            <span className="text-sm font-medium text-gray-900">{robot.battery}%</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Activity className="w-4 h-4 text-gray-500" />
                            <span className="text-sm text-gray-600">Task</span>
                          </div>
                          <span className="text-sm font-medium text-gray-900">{robot.task}</span>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <MapPin className="w-4 h-4 text-gray-500" />
                            <span className="text-sm text-gray-600">Position</span>
                          </div>
                          <span className="text-sm font-mono text-gray-900">
                            ({robot.position.x}m, {robot.position.z}m)
                          </span>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Zap className="w-4 h-4 text-gray-500" />
                            <span className="text-sm text-gray-600">Speed</span>
                          </div>
                          <span className="text-sm font-medium text-gray-900">{robot.speed} m/s</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {selectedTab === 'environment' && (
                <div className="space-y-6" data-testid="environment-panel">
                  <div className="bg-blue-50 rounded-xl p-5 border border-blue-200">
                    <h4 className="font-semibold text-gray-900 mb-4">Climate Control</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Thermometer className="w-4 h-4 text-blue-500" />
                          <span className="text-sm text-gray-600">Temperature</span>
                        </div>
                        <span className="text-sm font-medium text-gray-900">{environmentData.temperature}°C</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Droplets className="w-4 h-4 text-blue-500" />
                          <span className="text-sm text-gray-600">Humidity</span>
                        </div>
                        <span className="text-sm font-medium text-gray-900">{environmentData.humidity}%</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
                    <h4 className="font-semibold text-gray-900 mb-4">Door Status</h4>
                    <div className="space-y-3">
                      {Object.entries(environmentData.doors).map(([door, status]) => (
                        <div key={door} className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <DoorOpen className="w-4 h-4 text-gray-500" />
                            <span className="text-sm text-gray-600 capitalize">{door}</span>
                          </div>
                          <Badge className={`${
                            status === 'open' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                          }`}>
                            {status}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {selectedTab === 'performance' && (
                <div className="space-y-6" data-testid="performance-panel">
                  <div className="bg-green-50 rounded-xl p-5 border border-green-200">
                    <h4 className="font-semibold text-gray-900 mb-4">System Performance</h4>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Activity className="w-4 h-4 text-green-500" />
                          <span className="text-sm text-gray-600">Frame Rate</span>
                        </div>
                        <span className="text-sm font-medium text-gray-900">{performanceData.fps} fps</span>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Cpu className="w-4 h-4 text-green-500" />
                          <span className="text-sm text-gray-600">CPU Usage</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-green-500"
                              style={{ width: `${performanceData.cpuUsage}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium text-gray-900">{performanceData.cpuUsage}%</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Memory</span>
                        <span className="text-sm font-medium text-gray-900">{performanceData.memoryUsage} GB</span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Network Latency</span>
                        <span className="text-sm font-medium text-gray-900">{performanceData.networkLatency}ms</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
};

export default SimulationViewer;