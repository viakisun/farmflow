import React, { useState, useRef, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Plus,
  Calendar,
  ZoomIn,
  ZoomOut,
  Filter,
  Bot,
  Clock,
  AlertTriangle,
  Home,
  Settings,
  BarChart3,
  Workflow,
  ChevronDown,
  Activity,
  Target,
  CheckCircle
} from 'lucide-react';

// Draggable Mission Block Component
const MissionBlock = ({ mission, onDrag, onSelect, isSelected, conflicts = [] }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const blockRef = useRef(null);

  const getMissionColor = (type) => {
    switch (type) {
      case 'pruning': return '#256C3A';
      case 'transport': return '#3b82f6';
      case 'inspection': return '#f59e0b';
      case 'maintenance': return '#8b5cf6';
      default: return '#6b7280';
    }
  };

  const hasConflict = conflicts.some(c => c.missionId === mission.id);

  const handleMouseDown = (e) => {
    e.preventDefault();
    setIsDragging(true);
    setDragStart({
      x: e.clientX - blockRef.current.offsetLeft,
      y: e.clientY - blockRef.current.offsetTop
    });
    onSelect(mission);
  };

  const handleMouseMove = useCallback((e) => {
    if (isDragging && onDrag) {
      const newX = e.clientX - dragStart.x;
      const hourWidth = 60; // 60px per hour
      const snappedHour = Math.round(newX / hourWidth);
      onDrag(mission.id, Math.max(0, Math.min(23, snappedHour)));
    }
  }, [isDragging, dragStart, onDrag, mission.id]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  React.useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  return (
    <div
      ref={blockRef}
      className={`absolute rounded-lg cursor-move transition-all duration-200 ${
        isSelected ? 'ring-2 ring-[#256C3A] ring-opacity-75 z-20' : 'z-10'
      } ${hasConflict ? 'ring-2 ring-red-500' : ''} ${isDragging ? 'shadow-lg scale-105' : 'shadow-md'}`}
      style={{
        left: `${mission.startHour * 60}px`,
        width: `${mission.duration * 60 - 4}px`,
        height: '32px',
        backgroundColor: hasConflict ? '#ef4444' : getMissionColor(mission.type),
        top: '4px'
      }}
      onMouseDown={handleMouseDown}
      data-testid={`mission-${mission.id}`}
      title={`${mission.name} (${mission.startHour}:00 - ${mission.startHour + mission.duration}:00)`}
    >
      <div className="px-3 py-1 text-white text-sm font-medium truncate h-full flex items-center">
        {mission.name}
        {hasConflict && (
          <AlertTriangle className="w-3 h-3 ml-2 text-white" />
        )}
      </div>
    </div>
  );
};

// Timeline Grid Component
const TimelineGrid = ({ robots, missions, onMissionDrag, selectedMission, onMissionSelect, conflicts }) => {
  const hours = Array.from({ length: 24 }, (_, i) => i);

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden" data-testid="timeline-grid">
      {/* Hour Headers */}
      <div className="flex border-b border-gray-200 bg-gray-50">
        <div className="w-40 p-4 font-semibold text-gray-700 text-sm">Robot</div>
        <div className="flex-1 flex">
          {hours.map(hour => (
            <div key={hour} className="w-15 p-2 text-center text-xs font-medium text-gray-600 border-l border-gray-100">
              {hour.toString().padStart(2, '0')}:00
            </div>
          ))}
        </div>
      </div>

      {/* Robot Rows */}
      {robots.map((robot) => (
        <div key={robot.id} className="flex border-b border-gray-100 hover:bg-gray-50" data-testid={`robot-row-${robot.id}`}>
          <div className="w-40 p-4 flex items-center space-x-3">
            <div 
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: robot.color }}
            />
            <div>
              <div className="font-medium text-gray-900 text-sm">{robot.name}</div>
              <div className="text-xs text-gray-500">{robot.type}</div>
            </div>
          </div>
          
          <div className="flex-1 relative" style={{ height: '60px' }}>
            {/* Hour Grid Lines */}
            {hours.map(hour => (
              <div
                key={hour}
                className="absolute top-0 bottom-0 border-l border-gray-100"
                style={{ left: `${hour * 60}px` }}
              />
            ))}
            
            {/* Mission Blocks */}
            {missions
              .filter(mission => mission.robotId === robot.id)
              .map(mission => (
                <MissionBlock
                  key={mission.id}
                  mission={mission}
                  onDrag={onMissionDrag}
                  onSelect={onMissionSelect}
                  isSelected={selectedMission?.id === mission.id}
                  conflicts={conflicts}
                />
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};

const MissionScheduler = () => {
  const [selectedDate, setSelectedDate] = useState('2024-12-15');
  const [selectedMission, setSelectedMission] = useState(null);
  const [inspectorTab, setInspectorTab] = useState('details');

  // Sample robot data
  const [robots] = useState([
    { id: 'ARM-01', name: 'Pruning Robot Alpha', type: 'Pruning', color: '#256C3A' },
    { id: 'TRP-02', name: 'Transport Robot Beta', type: 'Transport', color: '#3b82f6' },
    { id: 'INS-03', name: 'Inspection Robot Gamma', type: 'Inspection', color: '#f59e0b' },
    { id: 'MNT-04', name: 'Maintenance Robot Delta', type: 'Maintenance', color: '#8b5cf6' }
  ]);

  // Sample mission data
  const [missions, setMissions] = useState([
    { id: 'M001', robotId: 'ARM-01', name: 'Pruning A3', type: 'pruning', startHour: 6, duration: 2, zone: 'A3', parameters: { intensity: 'medium' } },
    { id: 'M002', robotId: 'ARM-01', name: 'Pruning B1', type: 'pruning', startHour: 14, duration: 3, zone: 'B1', parameters: { intensity: 'high' } },
    { id: 'M003', robotId: 'TRP-02', name: 'Transport B2 → Dock', type: 'transport', startHour: 8, duration: 1, from: 'B2', to: 'Dock', parameters: { capacity: 50 } },
    { id: 'M004', robotId: 'TRP-02', name: 'Supply Run', type: 'transport', startHour: 16, duration: 2, from: 'Storage', to: 'A1', parameters: { capacity: 75 } },
    { id: 'M005', robotId: 'INS-03', name: 'Quality Check C2', type: 'inspection', startHour: 9, duration: 1, zone: 'C2', parameters: { checkType: 'visual' } },
    { id: 'M006', robotId: 'INS-03', name: 'Health Scan', type: 'inspection', startHour: 18, duration: 2, zone: 'All', parameters: { checkType: 'sensor' } },
    { id: 'M007', robotId: 'MNT-04', name: 'System Check', type: 'maintenance', startHour: 2, duration: 1, target: 'Rails', parameters: { checkType: 'routine' } }
  ]);

  // Detect conflicts
  const conflicts = [];
  robots.forEach(robot => {
    const robotMissions = missions.filter(m => m.robotId === robot.id).sort((a, b) => a.startHour - b.startHour);
    for (let i = 0; i < robotMissions.length - 1; i++) {
      const current = robotMissions[i];
      const next = robotMissions[i + 1];
      if (current.startHour + current.duration > next.startHour) {
        conflicts.push({
          missionId: current.id,
          conflictWith: next.id,
          message: `Overlaps with ${next.name}`
        });
      }
    }
  });

  // Calculate metrics
  const metrics = {
    scheduled: missions.length,
    conflicts: conflicts.length,
    utilization: Math.round((missions.reduce((acc, m) => acc + m.duration, 0) / (robots.length * 24)) * 100)
  };

  const handleMissionDrag = (missionId, newStartHour) => {
    setMissions(prev => prev.map(m => 
      m.id === missionId ? { ...m, startHour: newStartHour } : m
    ));
  };

  const handleMissionSelect = (mission) => {
    setSelectedMission(mission);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex" data-testid="mission-scheduler-page">
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
                  <p className="text-sm text-gray-500">Mission Scheduler</p>
                </div>
              </div>
              
              {/* Date Picker */}
              <div className="flex items-center space-x-2 bg-gray-50 px-4 py-2 rounded-xl">
                <Calendar className="w-4 h-4 text-gray-500" />
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="bg-transparent text-sm font-medium text-gray-700 border-none outline-none"
                  data-testid="date-picker"
                />
              </div>
            </div>
          </header>

          {/* Toolbar */}
          <div className="bg-white border-b border-gray-200 px-8 py-4" data-testid="scheduler-toolbar">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Button className="bg-[#256C3A] hover:bg-[#1e5530] text-white shadow-sm" data-testid="add-mission">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Mission
                </Button>
                <Button variant="outline" className="shadow-sm" data-testid="auto-schedule">
                  <Bot className="w-4 h-4 mr-2" />
                  Auto-Schedule
                </Button>
                
                <div className="flex items-center space-x-2 border-l pl-4">
                  <Button variant="outline" size="sm" data-testid="zoom-in">
                    <ZoomIn className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm" data-testid="zoom-out">
                    <ZoomOut className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Filters */}
              <div className="flex items-center space-x-3">
                <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#256C3A]" data-testid="robot-filter">
                  <option>All Robots</option>
                  <option>Pruning</option>
                  <option>Transport</option>
                  <option>Inspection</option>
                  <option>Maintenance</option>
                </select>
                <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#256C3A]" data-testid="task-filter">
                  <option>All Tasks</option>
                  <option>Active</option>
                  <option>Scheduled</option>
                  <option>Completed</option>
                </select>
              </div>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="px-8 py-4 bg-gray-50 border-b border-gray-200" data-testid="metrics-row">
            <div className="grid grid-cols-3 gap-6">
              <Card className="border-0 shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Missions Scheduled</p>
                      <p className="text-2xl font-bold text-gray-900">{metrics.scheduled}</p>
                    </div>
                    <div className="p-2 bg-blue-50 rounded-lg">
                      <Target className="w-5 h-5 text-blue-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Conflicts Detected</p>
                      <p className="text-2xl font-bold text-gray-900">{metrics.conflicts}</p>
                    </div>
                    <div className="p-2 bg-red-50 rounded-lg">
                      <AlertTriangle className="w-5 h-5 text-red-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Average Utilization</p>
                      <p className="text-2xl font-bold text-gray-900">{metrics.utilization}%</p>
                    </div>
                    <div className="p-2 bg-green-50 rounded-lg">
                      <Activity className="w-5 h-5 text-green-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Timeline */}
          <div className="flex-1 p-8" data-testid="timeline-container">
            <TimelineGrid
              robots={robots}
              missions={missions}
              onMissionDrag={handleMissionDrag}
              selectedMission={selectedMission}
              onMissionSelect={handleMissionSelect}
              conflicts={conflicts}
            />
          </div>

          {/* Event Log */}
          <div className="bg-white border-t border-gray-200 px-8 py-4" data-testid="event-log" aria-live="polite">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Clock className="w-4 h-4" />
              <span>Latest: Mission A3 rescheduled from 08:00 → 06:00</span>
            </div>
          </div>
        </div>

        {/* Inspector Panel */}
        <aside className="w-90 bg-white border-l border-gray-200 shadow-lg" data-testid="inspector-panel" role="complementary">
          <div className="h-full flex flex-col">
            <div className="border-b border-gray-200 p-6 bg-gray-50">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Inspector</h3>
              <div className="flex space-x-2 bg-white rounded-lg p-1 shadow-sm">
                <button
                  onClick={() => setInspectorTab('details')}
                  className={`px-4 py-2.5 text-sm font-semibold rounded-md transition-all ${
                    inspectorTab === 'details'
                      ? 'bg-[#256C3A] text-white shadow-sm'
                      : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                  data-testid="details-tab"
                >
                  Details
                </button>
                <button
                  onClick={() => setInspectorTab('conflicts')}
                  className={`px-4 py-2.5 text-sm font-semibold rounded-md transition-all ${
                    inspectorTab === 'conflicts'
                      ? 'bg-[#256C3A] text-white shadow-sm'
                      : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                  data-testid="conflicts-tab"
                >
                  Conflicts
                </button>
                <button
                  onClick={() => setInspectorTab('json')}
                  className={`px-4 py-2.5 text-sm font-semibold rounded-md transition-all ${
                    inspectorTab === 'json'
                      ? 'bg-[#256C3A] text-white shadow-sm'
                      : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                  data-testid="json-tab"
                >
                  JSON
                </button>
              </div>
            </div>

            <div className="flex-1 p-6 overflow-y-auto">
              {selectedMission ? (
                <div>
                  {inspectorTab === 'details' && (
                    <div className="space-y-6" data-testid="mission-details">
                      <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                        <h4 className="font-semibold text-gray-900 mb-4">Mission Details</h4>
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Name</span>
                            <span className="text-sm font-medium">{selectedMission.name}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Robot</span>
                            <span className="text-sm font-medium">
                              {robots.find(r => r.id === selectedMission.robotId)?.name}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Start Time</span>
                            <span className="text-sm font-medium">{selectedMission.startHour}:00</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Duration</span>
                            <span className="text-sm font-medium">{selectedMission.duration}h</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Type</span>
                            <Badge className="bg-gray-100 text-gray-800 capitalize">
                              {selectedMission.type}
                            </Badge>
                          </div>
                        </div>
                      </div>

                      <div className="bg-gray-50 rounded-xl p-4">
                        <h4 className="font-semibold text-gray-900 mb-4">Parameters</h4>
                        <div className="space-y-2">
                          {Object.entries(selectedMission.parameters || {}).map(([key, value]) => (
                            <div key={key} className="flex justify-between">
                              <span className="text-sm text-gray-600 capitalize">{key}</span>
                              <span className="text-sm font-medium">{value}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {inspectorTab === 'conflicts' && (
                    <div className="space-y-4" data-testid="conflict-warnings">
                      <h4 className="font-semibold text-gray-900">Conflict Warnings</h4>
                      {conflicts.filter(c => c.missionId === selectedMission.id).length > 0 ? (
                        conflicts
                          .filter(c => c.missionId === selectedMission.id)
                          .map((conflict, index) => (
                            <div key={index} className="bg-red-50 border border-red-200 rounded-xl p-4">
                              <div className="flex items-center space-x-2 mb-2">
                                <AlertTriangle className="w-4 h-4 text-red-600" />
                                <span className="text-sm font-semibold text-red-800">Scheduling Conflict</span>
                              </div>
                              <p className="text-sm text-red-700">{conflict.message}</p>
                            </div>
                          ))
                      ) : (
                        <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                          <div className="flex items-center space-x-2">
                            <CheckCircle className="w-4 h-4 text-green-600" />
                            <span className="text-sm font-semibold text-green-800">No conflicts detected</span>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {inspectorTab === 'json' && (
                    <div data-testid="json-preview">
                      <h4 className="font-semibold text-gray-900 mb-4">JSON Preview</h4>
                      <pre className="bg-gray-900 text-green-400 p-4 rounded-xl text-xs overflow-x-auto">
{JSON.stringify({
  id: selectedMission.id,
  robotId: selectedMission.robotId,
  name: selectedMission.name,
  type: selectedMission.type,
  schedule: {
    date: selectedDate,
    startHour: selectedMission.startHour,
    duration: selectedMission.duration,
    endHour: selectedMission.startHour + selectedMission.duration
  },
  parameters: selectedMission.parameters,
  metadata: {
    created: new Date().toISOString(),
    lastModified: new Date().toISOString()
  }
}, null, 2)}
                      </pre>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-16" data-testid="no-mission-selected">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Calendar className="w-8 h-8 text-gray-400" />
                  </div>
                  <h4 className="text-lg font-medium text-gray-900 mb-2">No Mission Selected</h4>
                  <p className="text-gray-500">Click on a mission block in the timeline to view details.</p>
                </div>
              )}
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
};

export default MissionScheduler;