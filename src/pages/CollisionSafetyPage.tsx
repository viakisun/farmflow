import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Play,
  Pause,
  SkipForward,
  SkipBack,
  RotateCcw,
  Settings,
  Home,
  BarChart3,
  Workflow,
  Calendar,
  Package,
  Star,
  Download,
  Bell,
  User,
  HelpCircle,
  AlertTriangle,
  Shield,
  Target,
  Maximize2,
  Minimize2,
  Info,
  RefreshCw,
  Sliders,
  Eye,
  EyeOff
} from 'lucide-react';

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
const SafetyKPICard = ({ title, value, unit, status, icon: Icon, data_testid }) => {
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'safe': return 'text-green-600 bg-green-50 border-green-200';
      case 'warning': return 'text-amber-600 bg-amber-50 border-amber-200';
      case 'critical': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  return (
    <Card className="relative overflow-hidden" data-testid={data_testid}>
      <CardContent className="p-7">
        <div className="flex items-center justify-between mb-6">
          <div className={`p-2.5 rounded-xl border ${getStatusColor(status)} mt-5`}>
            <Icon className="w-5 h-5" />
          </div>
          <div className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(status)} border`}>
            {status.toUpperCase()}
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

// Canvas Visualization Component
const SafetyCanvas = ({ isPlaying, currentTime, showHeatmap, showPaths, showZones }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const { width, height } = canvas;

    // Clear canvas
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(0, 0, width, height);

    // Draw grid (80m x 30m, 1m grid)
    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = 0.5;
    
    const gridSize = 10; // pixels per meter
    for (let x = 0; x <= 80 * gridSize; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, 30 * gridSize);
      ctx.stroke();
    }
    for (let y = 0; y <= 30 * gridSize; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(80 * gridSize, y);
      ctx.stroke();
    }

    // Draw greenhouse boundaries
    ctx.strokeStyle = '#64748b';
    ctx.lineWidth = 2;
    ctx.strokeRect(0, 0, 80 * gridSize, 30 * gridSize);

    // Draw human zones (if enabled)
    if (showZones) {
      ctx.fillStyle = 'rgba(59, 130, 246, 0.1)';
      ctx.strokeStyle = '#3b82f6';
      ctx.lineWidth = 1;
      
      // Human work zone 1
      ctx.fillRect(20 * gridSize, 5 * gridSize, 15 * gridSize, 8 * gridSize);
      ctx.strokeRect(20 * gridSize, 5 * gridSize, 15 * gridSize, 8 * gridSize);
      
      // Human work zone 2
      ctx.fillRect(50 * gridSize, 15 * gridSize, 12 * gridSize, 10 * gridSize);
      ctx.strokeRect(50 * gridSize, 15 * gridSize, 12 * gridSize, 10 * gridSize);
    }

    // Draw collision risk heatmap (if enabled)
    if (showHeatmap) {
      const gradient = ctx.createRadialGradient(300, 100, 0, 300, 100, 80);
      gradient.addColorStop(0, 'rgba(239, 68, 68, 0.4)');
      gradient.addColorStop(0.5, 'rgba(245, 101, 101, 0.2)');
      gradient.addColorStop(1, 'rgba(245, 101, 101, 0)');
      
      ctx.fillStyle = gradient;
      ctx.fillRect(220, 20, 160, 160);
    }

    // Draw robot paths (if enabled)
    if (showPaths) {
      // Robot 1 path
      ctx.strokeStyle = '#256C3A';
      ctx.lineWidth = 3;
      ctx.setLineDash([]);
      ctx.beginPath();
      ctx.moveTo(10 * gridSize, 10 * gridSize);
      ctx.lineTo(30 * gridSize, 10 * gridSize);
      ctx.lineTo(30 * gridSize, 20 * gridSize);
      ctx.lineTo(50 * gridSize, 20 * gridSize);
      ctx.stroke();

      // Robot 2 path
      ctx.strokeStyle = '#3B4A6B';
      ctx.beginPath();
      ctx.moveTo(70 * gridSize, 5 * gridSize);
      ctx.lineTo(40 * gridSize, 5 * gridSize);
      ctx.lineTo(40 * gridSize, 25 * gridSize);
      ctx.stroke();
    }

    // Draw robots (animated based on currentTime)
    const robot1X = 10 + (currentTime * 0.5) % 40;
    const robot1Y = 10;
    const robot2X = 70 - (currentTime * 0.3) % 30;
    const robot2Y = 5 + Math.sin(currentTime * 0.1) * 5;

    // Robot 1
    ctx.fillStyle = '#256C3A';
    ctx.beginPath();
    ctx.arc(robot1X * gridSize, robot1Y * gridSize, 8, 0, 2 * Math.PI);
    ctx.fill();
    ctx.fillStyle = 'white';
    ctx.font = '10px Inter';
    ctx.textAlign = 'center';
    ctx.fillText('R1', robot1X * gridSize, robot1Y * gridSize + 3);

    // Robot 2
    ctx.fillStyle = '#3B4A6B';
    ctx.beginPath();
    ctx.arc(robot2X * gridSize, robot2Y * gridSize, 8, 0, 2 * Math.PI);
    ctx.fill();
    ctx.fillStyle = 'white';
    ctx.fillText('R2', robot2X * gridSize, robot2Y * gridSize + 3);

    // Safety zones around robots
    ctx.strokeStyle = 'rgba(37, 108, 58, 0.3)';
    ctx.lineWidth = 1;
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    ctx.arc(robot1X * gridSize, robot1Y * gridSize, 20, 0, 2 * Math.PI);
    ctx.stroke();

    ctx.strokeStyle = 'rgba(59, 74, 107, 0.3)';
    ctx.beginPath();
    ctx.arc(robot2X * gridSize, robot2Y * gridSize, 20, 0, 2 * Math.PI);
    ctx.stroke();

  }, [currentTime, showHeatmap, showPaths, showZones]);

  return (
    <div className="relative bg-white rounded-xl border border-gray-200 overflow-hidden">
      <canvas 
        ref={canvasRef} 
        width={800} 
        height={300} 
        className="w-full h-full"
        data-testid="safety-canvas"
      />
      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 text-sm">
        <div className="font-medium text-gray-900">Greenhouse Layout</div>
        <div className="text-gray-600">80m × 30m, 1m grid</div>
      </div>
    </div>
  );
};

// Safety Event Item Component
const SafetyEventItem = ({ event, isSelected, onClick }) => {
  const getSeverityColor = (severity) => {
    switch (severity.toLowerCase()) {
      case 'info': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'warning': return 'text-amber-600 bg-amber-50 border-amber-200';
      case 'error': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getSeverityIcon = (severity) => {
    switch (severity.toLowerCase()) {
      case 'info': return Info;
      case 'warning': return AlertTriangle;
      case 'error': return AlertTriangle;
      default: return Info;
    }
  };

  const Icon = getSeverityIcon(event.severity);

  return (
    <div 
      className={`p-4 rounded-xl border cursor-pointer transition-all ${
        isSelected ? 'border-[#256C3A] bg-[#256C3A]/5' : 'border-gray-200 hover:border-gray-300'
      }`}
      onClick={() => onClick(event)}
      data-testid={`safety-event-${event.id}`}
    >
      <div className="flex items-start space-x-3">
        <div className={`p-2 rounded-lg border ${getSeverityColor(event.severity)}`}>
          <Icon className="w-4 h-4" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-semibold text-gray-900 truncate">{event.title}</h4>
            <Badge className={`${getSeverityColor(event.severity)} border text-xs`}>
              {event.severity}
            </Badge>
          </div>
          <p className="text-sm text-gray-600 line-clamp-2">{event.description}</p>
          <div className="flex items-center justify-between mt-3 text-xs text-gray-500">
            <span>{event.time}</span>
            <span>{event.location}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Simulation Controls Component
const SimulationControls = ({ isPlaying, onPlayPause, onStep, onReset, currentTime, duration }) => {
  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold">Simulation Controls</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Playback Controls */}
          <div className="flex items-center justify-center space-x-3">
            <Button variant="outline" onClick={onReset} data-testid="reset-simulation">
              <RotateCcw className="w-4 h-4" />
            </Button>
            <Button variant="outline" onClick={() => onStep(-1)} data-testid="step-back">
              <SkipBack className="w-4 h-4" />
            </Button>
            <Button 
              className="bg-[#256C3A] hover:bg-[#1e5530] text-white px-6"
              onClick={onPlayPause}
              data-testid="play-pause"
            >
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
            </Button>
            <Button variant="outline" onClick={() => onStep(1)} data-testid="step-forward">
              <SkipForward className="w-4 h-4" />
            </Button>
            <Button variant="outline" data-testid="simulation-settings">
              <Settings className="w-4 h-4" />
            </Button>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-gray-600">
              <span>{Math.floor(currentTime)}s</span>
              <span>{duration}s</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-[#256C3A] h-2 rounded-full transition-all"
                style={{ width: `${(currentTime / duration) * 100}%` }}
              />
            </div>
          </div>

          {/* Speed Control */}
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">Playback Speed</span>
            <select className="px-3 py-1 border border-gray-300 rounded-lg text-sm">
              <option value="0.5">0.5x</option>
              <option value="1" defaultValue>1x</option>
              <option value="2">2x</option>
              <option value="4">4x</option>
            </select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const CollisionSafetyValidation = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showHeatmap, setShowHeatmap] = useState(true);
  const [showPaths, setShowPaths] = useState(true);
  const [showZones, setShowZones] = useState(true);
  const [safetyThreshold, setSafetyThreshold] = useState(2.0);

  const duration = 120; // 2 minutes simulation

  // Sample safety events
  const [safetyEvents] = useState([
    {
      id: 'evt-001',
      title: 'Near-Miss Detected',
      description: 'Robot R1 approached within 1.8m of Robot R2, below safety threshold of 2.0m',
      severity: 'warning',
      time: '14:23:15',
      location: 'Zone A3 (25m, 12m)',
      robots: ['R1', 'R2'],
      distance: 1.8
    },
    {
      id: 'evt-002',
      title: 'Human Zone Violation',
      description: 'Robot R2 entered active human work zone without clearance protocol',
      severity: 'error',
      time: '14:22:48',
      location: 'Zone B2 (52m, 18m)',
      robots: ['R2'],
      distance: 0.5
    },
    {
      id: 'evt-003',
      title: 'Path Optimization',
      description: 'Alternative path available to reduce collision risk by 15%',
      severity: 'info',
      time: '14:22:12',
      location: 'Zone A1 (15m, 8m)',
      robots: ['R1'],
      distance: null
    },
    {
      id: 'evt-004',
      title: 'Critical Collision Risk',
      description: 'Two robots on intersecting paths with collision probability >85%',
      severity: 'error',
      time: '14:21:55',
      location: 'Zone C1 (42m, 22m)',
      robots: ['R1', 'R2'],
      distance: 0.8
    },
    {
      id: 'evt-005',
      title: 'Safety Protocol Engaged',
      description: 'Emergency stop protocol activated due to proximity violation',
      severity: 'warning',
      time: '14:21:33',
      location: 'Zone A2 (28m, 14m)',
      robots: ['R1'],
      distance: 1.2
    }
  ]);

  // Animation loop
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setCurrentTime(prev => {
        if (prev >= duration) {
          setIsPlaying(false);
          return duration;
        }
        return prev + 0.1;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [isPlaying, duration]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleStep = (direction) => {
    setCurrentTime(prev => {
      const newTime = prev + (direction * 1);
      return Math.max(0, Math.min(duration, newTime));
    });
  };

  const handleReset = () => {
    setCurrentTime(0);
    setIsPlaying(false);
  };

  const handleEventSelect = (event) => {
    setSelectedEvent(event);
    // Jump to event time
    const eventSeconds = parseInt(event.time.split(':')[2]);
    setCurrentTime(eventSeconds);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex" data-testid="collision-safety-page">
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
                    VIAFARM
                  </h1>
                  <p className="text-sm text-gray-600 font-medium">Collision & Safety Validation</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-3">
                  <Button variant="outline" className="border-gray-300" data-testid="export-report">
                    <Download className="w-4 h-4 mr-2" />
                    Export Report
                  </Button>
                  <Button variant="outline" className="border-gray-300" data-testid="refresh-validation">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Re-validate
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

          {/* KPI Section */}
          <div className="bg-white border-b border-gray-200 px-8 py-6" data-testid="kpi-section">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <SafetyKPICard
                title="Collisions Detected"
                value="2"
                unit="events"
                status="critical"
                icon={AlertTriangle}
                data_testid="collisions-kpi"
              />
              <SafetyKPICard
                title="Near-Misses"
                value="5"
                unit="events"
                status="warning"
                icon={Target}
                data_testid="near-misses-kpi"
              />
              <SafetyKPICard
                title="Safe Distance Compliance"
                value="87.5"
                unit="%"
                status="warning"
                icon={Shield}
                data_testid="compliance-kpi"
              />
            </div>
          </div>

          {/* Visualization Controls */}
          <div className="bg-white border-b border-gray-200 px-8 py-4" data-testid="visualization-controls">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <span className="text-sm font-medium text-gray-700">Display Options:</span>
                <div className="flex items-center space-x-4">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={showHeatmap} 
                      onChange={(e) => setShowHeatmap(e.target.checked)}
                      className="rounded border-gray-300 text-[#256C3A] focus:ring-[#256C3A]"
                    />
                    <span className="text-sm">Risk Heatmap</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={showPaths} 
                      onChange={(e) => setShowPaths(e.target.checked)}
                      className="rounded border-gray-300 text-[#256C3A] focus:ring-[#256C3A]"
                    />
                    <span className="text-sm">Robot Paths</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={showZones} 
                      onChange={(e) => setShowZones(e.target.checked)}
                      className="rounded border-gray-300 text-[#256C3A] focus:ring-[#256C3A]"
                    />
                    <span className="text-sm">Human Zones</span>
                  </label>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <label className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-gray-700">Safety Threshold:</span>
                  <input 
                    type="number" 
                    value={safetyThreshold}
                    onChange={(e) => setSafetyThreshold(parseFloat(e.target.value))}
                    min="0.5" 
                    max="5" 
                    step="0.1"
                    className="w-16 px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#256C3A]"
                  />
                  <span className="text-sm text-gray-500">m</span>
                </label>
              </div>
            </div>
          </div>

          {/* Main Canvas and Controls */}
          <div className="flex-1 p-8 space-y-6" data-testid="main-visualization">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <div className="lg:col-span-3">
                <SafetyCanvas 
                  isPlaying={isPlaying}
                  currentTime={currentTime}
                  showHeatmap={showHeatmap}
                  showPaths={showPaths}
                  showZones={showZones}
                />
              </div>
              <div>
                <SimulationControls
                  isPlaying={isPlaying}
                  onPlayPause={handlePlayPause}
                  onStep={handleStep}
                  onReset={handleReset}
                  currentTime={currentTime}
                  duration={duration}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Inspector Panel */}
        <aside className="w-96 bg-white border-l border-gray-200 shadow-lg" data-testid="inspector-panel" role="complementary">
          <div className="h-full flex flex-col">
            <div className="border-b border-gray-200 p-6 bg-gradient-to-r from-gray-50 to-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-1">Safety Events</h3>
              <p className="text-sm text-gray-600">Detected collisions and violations</p>
            </div>
            
            <div className="flex-1 p-6 overflow-y-auto">
              <div className="space-y-4" data-testid="safety-events-list">
                {safetyEvents.map(event => (
                  <SafetyEventItem
                    key={event.id}
                    event={event}
                    isSelected={selectedEvent?.id === event.id}
                    onClick={handleEventSelect}
                  />
                ))}
              </div>

              {selectedEvent && (
                <div className="mt-6 p-4 bg-gray-50 rounded-xl" data-testid="event-details">
                  <h4 className="font-bold text-gray-900 mb-3">Event Details</h4>
                  <div className="space-y-3 text-sm">
                    <div>
                      <span className="font-medium text-gray-700">Robots Involved:</span>
                      <div className="flex space-x-1 mt-1">
                        {selectedEvent.robots.map(robot => (
                          <Badge key={robot} variant="outline" className="text-xs">
                            {robot}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    {selectedEvent.distance && (
                      <div>
                        <span className="font-medium text-gray-700">Distance:</span>
                        <span className="ml-2">{selectedEvent.distance}m</span>
                      </div>
                    )}
                    <div>
                      <span className="font-medium text-gray-700">Threshold:</span>
                      <span className="ml-2">{safetyThreshold}m</span>
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

export default CollisionSafetyValidation;