import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Plus,
  Upload,
  Download,
  Search,
  Bot,
  Home,
  Settings,
  BarChart3,
  Workflow,
  Calendar,
  ChevronUp,
  ChevronDown,
  Package,
  Activity,
  Zap,
  AlertTriangle,
  CheckCircle,
  Clock,
  Cpu,
  Database,
  Wifi
} from 'lucide-react';

// Status Badge Component
const StatusBadge = ({ status }) => {
  const getStatusStyle = (status) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-gray-100 text-gray-800';
      case 'deprecated':
      case 'legacy':
        return 'bg-red-100 text-red-800';
      case 'beta':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Badge className={`${getStatusStyle(status)} text-xs font-semibold`}>
      {status}
    </Badge>
  );
};

// Robot Table Component
const RobotTable = ({ robots, selectedRobots, onSelectRobot, onSelectAll, sortColumn, sortDirection, onSort, onRowClick }) => {
  const getSortIcon = (column) => {
    if (sortColumn !== column) return null;
    return sortDirection === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />;
  };

  const handleSort = (column) => {
    if (sortColumn === column) {
      onSort(column, sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      onSort(column, 'asc');
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm" data-testid="robot-table">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-left">
                <input
                  type="checkbox"
                  checked={selectedRobots.length === robots.length && robots.length > 0}
                  onChange={(e) => onSelectAll(e.target.checked)}
                  className="rounded border-gray-300 text-[#256C3A] focus:ring-[#256C3A]"
                  data-testid="select-all-checkbox"
                />
              </th>
              {[
                { key: 'name', label: 'Robot Name' },
                { key: 'model', label: 'Model' },
                { key: 'firmwareVersion', label: 'Firmware Version' },
                { key: 'batteryCapacity', label: 'Battery Capacity' },
                { key: 'status', label: 'Status' }
              ].map(({ key, label }) => (
                <th
                  key={key}
                  className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort(key)}
                  data-testid={`sort-${key}`}
                >
                  <div className="flex items-center space-x-1">
                    <span>{label}</span>
                    {getSortIcon(key)}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {robots.map((robot) => (
              <tr
                key={robot.id}
                className={`hover:bg-gray-50 cursor-pointer transition-colors ${
                  selectedRobots.includes(robot.id) ? 'bg-blue-50' : ''
                }`}
                onClick={() => onRowClick(robot)}
                data-testid={`robot-row-${robot.id}`}
              >
                <td className="px-6 py-4">
                  <input
                    type="checkbox"
                    checked={selectedRobots.includes(robot.id)}
                    onChange={(e) => {
                      e.stopPropagation();
                      onSelectRobot(robot.id, e.target.checked);
                    }}
                    className="rounded border-gray-300 text-[#256C3A] focus:ring-[#256C3A]"
                    data-testid={`select-robot-${robot.id}`}
                  />
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-3">
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: robot.color || '#6b7280' }}
                    />
                    <div>
                      <div className="font-medium text-gray-900">{robot.name}</div>
                      <div className="text-sm text-gray-500">{robot.type}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-900 font-mono">{robot.model}</td>
                <td className="px-6 py-4 text-sm text-gray-900 font-mono">{robot.firmwareVersion}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{robot.batteryCapacity} kWh</td>
                <td className="px-6 py-4">
                  <StatusBadge status={robot.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const RobotLibraryManager = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRobots, setSelectedRobots] = useState([]);
  const [selectedRobot, setSelectedRobot] = useState(null);
  const [sortColumn, setSortColumn] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');
  const [inspectorTab, setInspectorTab] = useState('details');

  // Sample robot data
  const [robots] = useState([
    {
      id: 'PB-A1',
      name: 'PruneBot-Alpha-01',
      type: 'Pruning Robot',
      model: 'PX-300-A',
      firmwareVersion: 'v2.1.3',
      batteryCapacity: 12.5,
      status: 'Active',
      color: '#256C3A',
      manufacturer: 'GreenTech Robotics',
      sensors: ['Camera', 'LIDAR', 'Force Sensor'],
      firmwareHistory: [
        { version: 'v2.1.3', date: '2024-12-10', notes: 'Performance improvements, bug fixes' },
        { version: 'v2.1.0', date: '2024-11-20', notes: 'New pruning algorithms' },
        { version: 'v2.0.5', date: '2024-10-15', notes: 'Security patches' }
      ],
      compatibility: { ros2: 'Humble', mqtt: 'v5.0', apis: ['REST', 'GraphQL'] }
    },
    {
      id: 'TB-B2',
      name: 'TransBot-Beta-02',
      type: 'Transport Robot',
      model: 'TX-200-B',
      firmwareVersion: 'v1.8.1',
      batteryCapacity: 18.0,
      status: 'Legacy',
      color: '#3b82f6',
      manufacturer: 'AutoMove Systems',
      sensors: ['GPS', 'Ultrasonic', 'Weight Sensor'],
      firmwareHistory: [
        { version: 'v1.8.1', date: '2024-08-15', notes: 'Legacy maintenance release' },
        { version: 'v1.8.0', date: '2024-06-10', notes: 'Final feature release' }
      ],
      compatibility: { ros2: 'Galactic', mqtt: 'v3.1', apis: ['REST'] }
    },
    {
      id: 'IB-C3',
      name: 'InspBot-Gamma-03',
      type: 'Inspection Robot',
      model: 'IX-100-C',
      firmwareVersion: 'v3.0.0-beta',
      batteryCapacity: 8.5,
      status: 'Beta',
      color: '#f59e0b',
      manufacturer: 'VisionTech Labs',
      sensors: ['HD Camera', 'Spectral Sensor', 'Temperature'],
      firmwareHistory: [
        { version: 'v3.0.0-beta', date: '2024-12-01', notes: 'Beta release with AI vision' },
        { version: 'v2.5.2', date: '2024-10-20', notes: 'Stable release' }
      ],
      compatibility: { ros2: 'Iron', mqtt: 'v5.0', apis: ['REST', 'WebSocket'] }
    },
    {
      id: 'MB-D4',
      name: 'MainBot-Delta-04',
      type: 'Maintenance Robot',
      model: 'MX-150-D',
      firmwareVersion: 'v1.5.7',
      batteryCapacity: 15.0,
      status: 'Active',
      color: '#8b5cf6',
      manufacturer: 'ServiceBot Corp',
      sensors: ['Vibration', 'Thermal', 'Pressure'],
      firmwareHistory: [
        { version: 'v1.5.7', date: '2024-11-30', notes: 'Maintenance scheduling improvements' },
        { version: 'v1.5.5', date: '2024-10-25', notes: 'Diagnostic enhancements' }
      ],
      compatibility: { ros2: 'Humble', mqtt: 'v5.0', apis: ['REST', 'gRPC'] }
    },
    {
      id: 'PB-E5',
      name: 'PruneBot-Echo-05',
      type: 'Pruning Robot',
      model: 'PX-250-E',
      firmwareVersion: 'v1.9.2',
      batteryCapacity: 10.0,
      status: 'Inactive',
      color: '#6b7280',
      manufacturer: 'GreenTech Robotics',
      sensors: ['Basic Camera', 'Proximity'],
      firmwareHistory: [
        { version: 'v1.9.2', date: '2024-09-15', notes: 'Final legacy update' }
      ],
      compatibility: { ros2: 'Galactic', mqtt: 'v3.1', apis: ['REST'] }
    }
  ]);

  // Activity log entries
  const [activityLog] = useState([
    { id: 1, message: 'Firmware v2.1.3 deployed to PruneBot-Alpha-01', timestamp: '2024-12-10 14:30' },
    { id: 2, message: 'Robot InspBot-Gamma-03 registered in library', timestamp: '2024-12-09 16:45' },
    { id: 3, message: 'Bulk firmware update completed for 3 transport robots', timestamp: '2024-12-08 09:15' }
  ]);

  // Filter and sort robots
  const filteredAndSortedRobots = useMemo(() => {
    let filtered = robots.filter(robot =>
      robot.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      robot.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
      robot.type.toLowerCase().includes(searchQuery.toLowerCase())
    );

    filtered.sort((a, b) => {
      let aVal = a[sortColumn];
      let bVal = b[sortColumn];
      
      if (typeof aVal === 'string') {
        aVal = aVal.toLowerCase();
        bVal = bVal.toLowerCase();
      }
      
      if (sortDirection === 'asc') {
        return aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
      } else {
        return aVal > bVal ? -1 : aVal < bVal ? 1 : 0;
      }
    });

    return filtered;
  }, [robots, searchQuery, sortColumn, sortDirection]);

  // Calculate metrics
  const metrics = {
    registered: robots.length,
    active: robots.filter(r => ['Active', 'Beta'].includes(r.status)).length,
    deprecated: robots.filter(r => ['Legacy', 'Deprecated'].includes(r.status)).length
  };

  const handleSelectRobot = (robotId, selected) => {
    if (selected) {
      setSelectedRobots([...selectedRobots, robotId]);
    } else {
      setSelectedRobots(selectedRobots.filter(id => id !== robotId));
    }
  };

  const handleSelectAll = (selected) => {
    if (selected) {
      setSelectedRobots(filteredAndSortedRobots.map(r => r.id));
    } else {
      setSelectedRobots([]);
    }
  };

  const handleRowClick = (robot) => {
    setSelectedRobot(robot);
  };

  const handleSort = (column, direction) => {
    setSortColumn(column);
    setSortDirection(direction);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex" data-testid="robot-library-manager-page">
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
                    VIA FarmFlow for Developers
                  </h1>
                  <p className="text-sm text-gray-500">Robot Library Manager</p>
                </div>
              </div>
              
              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search robots..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 w-80 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#256C3A] focus:border-transparent"
                  data-testid="search-input"
                />
              </div>
            </div>
          </header>

          {/* Toolbar */}
          <div className="bg-white border-b border-gray-200 px-8 py-4" data-testid="library-toolbar">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Button className="bg-[#256C3A] hover:bg-[#1e5530] text-white shadow-sm" data-testid="add-robot">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Robot
                </Button>
                <Button variant="outline" className="shadow-sm" data-testid="import-robots">
                  <Upload className="w-4 h-4 mr-2" />
                  Import
                </Button>
                <Button variant="outline" className="shadow-sm" data-testid="export-robots">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </div>

              {/* Bulk Actions */}
              {selectedRobots.length > 0 && (
                <div className="flex items-center space-x-3 bg-blue-50 px-4 py-2 rounded-lg border border-blue-200">
                  <span className="text-sm font-medium text-blue-700">
                    {selectedRobots.length} selected
                  </span>
                  <Button size="sm" variant="outline" className="text-blue-700 border-blue-300 hover:bg-blue-100" data-testid="bulk-update">
                    Update Firmware
                  </Button>
                  <Button size="sm" variant="outline" className="text-blue-700 border-blue-300 hover:bg-blue-100" data-testid="bulk-deactivate">
                    Deactivate
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="px-8 py-4 bg-gray-50 border-b border-gray-200" data-testid="metrics-row">
            <div className="grid grid-cols-3 gap-6">
              <Card className="border-0 shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Robots Registered</p>
                      <p className="text-2xl font-bold text-gray-900">{metrics.registered}</p>
                    </div>
                    <div className="p-2 bg-blue-50 rounded-lg">
                      <Bot className="w-5 h-5 text-blue-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Active Versions</p>
                      <p className="text-2xl font-bold text-gray-900">{metrics.active}</p>
                    </div>
                    <div className="p-2 bg-green-50 rounded-lg">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Deprecated Models</p>
                      <p className="text-2xl font-bold text-gray-900">{metrics.deprecated}</p>
                    </div>
                    <div className="p-2 bg-red-50 rounded-lg">
                      <AlertTriangle className="w-5 h-5 text-red-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Robot Table */}
          <div className="flex-1 p-8" data-testid="table-container">
            <RobotTable
              robots={filteredAndSortedRobots}
              selectedRobots={selectedRobots}
              onSelectRobot={handleSelectRobot}
              onSelectAll={handleSelectAll}
              sortColumn={sortColumn}
              sortDirection={sortDirection}
              onSort={handleSort}
              onRowClick={handleRowClick}
            />
          </div>

          {/* Activity Log */}
          <div className="bg-white border-t border-gray-200 px-8 py-4" data-testid="activity-log" aria-live="polite">
            <h4 className="text-sm font-semibold text-gray-700 mb-3">Recent Activity</h4>
            <div className="space-y-2">
              {activityLog.slice(0, 3).map((entry) => (
                <div key={entry.id} className="flex items-center space-x-2 text-sm text-gray-600">
                  <Clock className="w-3 h-3" />
                  <span>{entry.message}</span>
                  <span className="text-gray-400">• {entry.timestamp}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Inspector Panel */}
        <aside className="w-95 bg-white border-l border-gray-200 shadow-lg" data-testid="inspector-panel" role="complementary">
          <div className="h-full flex flex-col">
            <div className="border-b border-gray-200 p-6 bg-gray-50">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Inspector</h3>
              <div className="flex space-x-2 bg-white rounded-lg p-1 shadow-sm">
                <button
                  onClick={() => setInspectorTab('details')}
                  className={`px-3 py-2 text-sm font-semibold rounded-md transition-all ${
                    inspectorTab === 'details'
                      ? 'bg-[#256C3A] text-white shadow-sm'
                      : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                  data-testid="details-tab"
                >
                  Details
                </button>
                <button
                  onClick={() => setInspectorTab('firmware')}
                  className={`px-3 py-2 text-sm font-semibold rounded-md transition-all ${
                    inspectorTab === 'firmware'
                      ? 'bg-[#256C3A] text-white shadow-sm'
                      : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                  data-testid="firmware-tab"
                >
                  Firmware
                </button>
                <button
                  onClick={() => setInspectorTab('compatibility')}
                  className={`px-3 py-2 text-sm font-semibold rounded-md transition-all ${
                    inspectorTab === 'compatibility'
                      ? 'bg-[#256C3A] text-white shadow-sm'
                      : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                  data-testid="compatibility-tab"
                >
                  Compatibility
                </button>
                <button
                  onClick={() => setInspectorTab('json')}
                  className={`px-3 py-2 text-sm font-semibold rounded-md transition-all ${
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
              {selectedRobot ? (
                <div>
                  {inspectorTab === 'details' && (
                    <div className="space-y-6" data-testid="robot-details">
                      <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                        <h4 className="font-semibold text-gray-900 mb-4">Robot Information</h4>
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Name</span>
                            <span className="text-sm font-medium">{selectedRobot.name}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Type</span>
                            <span className="text-sm font-medium">{selectedRobot.type}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Model</span>
                            <span className="text-sm font-mono">{selectedRobot.model}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Manufacturer</span>
                            <span className="text-sm font-medium">{selectedRobot.manufacturer}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Battery Capacity</span>
                            <span className="text-sm font-medium">{selectedRobot.batteryCapacity} kWh</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">Status</span>
                            <StatusBadge status={selectedRobot.status} />
                          </div>
                        </div>
                      </div>

                      <div className="bg-gray-50 rounded-xl p-4">
                        <h4 className="font-semibold text-gray-900 mb-4">Sensors</h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedRobot.sensors.map((sensor, index) => (
                            <Badge key={index} className="bg-gray-200 text-gray-800">
                              {sensor}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {inspectorTab === 'firmware' && (
                    <div className="space-y-4" data-testid="firmware-history">
                      <h4 className="font-semibold text-gray-900">Firmware History</h4>
                      <div className="space-y-3">
                        {selectedRobot.firmwareHistory.map((version, index) => (
                          <div key={index} className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-mono font-semibold text-gray-900">{version.version}</span>
                              <span className="text-xs text-gray-500">{version.date}</span>
                            </div>
                            <p className="text-sm text-gray-600">{version.notes}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {inspectorTab === 'compatibility' && (
                    <div className="space-y-4" data-testid="compatibility-info">
                      <h4 className="font-semibold text-gray-900">Compatibility</h4>
                      
                      <div className="bg-green-50 rounded-xl p-4 border border-green-200">
                        <h5 className="font-medium text-gray-900 mb-3 flex items-center">
                          <Cpu className="w-4 h-4 mr-2" />
                          ROS2 Compatibility
                        </h5>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Version</span>
                          <Badge className="bg-green-100 text-green-800">{selectedRobot.compatibility.ros2}</Badge>
                        </div>
                      </div>

                      <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                        <h5 className="font-medium text-gray-900 mb-3 flex items-center">
                          <Wifi className="w-4 h-4 mr-2" />
                          MQTT Protocol
                        </h5>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Version</span>
                          <Badge className="bg-blue-100 text-blue-800">{selectedRobot.compatibility.mqtt}</Badge>
                        </div>
                      </div>

                      <div className="bg-purple-50 rounded-xl p-4 border border-purple-200">
                        <h5 className="font-medium text-gray-900 mb-3 flex items-center">
                          <Database className="w-4 h-4 mr-2" />
                          Supported APIs
                        </h5>
                        <div className="flex flex-wrap gap-2">
                          {selectedRobot.compatibility.apis.map((api, index) => (
                            <Badge key={index} className="bg-purple-100 text-purple-800">{api}</Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {inspectorTab === 'json' && (
                    <div data-testid="json-preview">
                      <h4 className="font-semibold text-gray-900 mb-4">JSON Definition</h4>
                      <pre className="bg-gray-900 text-green-400 p-4 rounded-xl text-xs overflow-x-auto whitespace-pre-wrap">
{JSON.stringify({
  id: selectedRobot.id,
  name: selectedRobot.name,
  type: selectedRobot.type,
  model: selectedRobot.model,
  manufacturer: selectedRobot.manufacturer,
  firmware: {
    current: selectedRobot.firmwareVersion,
    history: selectedRobot.firmwareHistory
  },
  specifications: {
    batteryCapacity: selectedRobot.batteryCapacity,
    sensors: selectedRobot.sensors,
    color: selectedRobot.color
  },
  compatibility: selectedRobot.compatibility,
  status: selectedRobot.status,
  metadata: {
    registered: new Date().toISOString(),
    lastUpdated: new Date().toISOString()
  }
}, null, 2)}
                      </pre>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-16" data-testid="no-robot-selected">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Package className="w-8 h-8 text-gray-400" />
                  </div>
                  <h4 className="text-lg font-medium text-gray-900 mb-2">No Robot Selected</h4>
                  <p className="text-gray-500">Click on a robot in the table to view detailed information.</p>
                </div>
              )}
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
};

export default RobotLibraryManager;