import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Search,
  Filter,
  Download,
  Copy,
  Key,
  RefreshCw,
  Settings,
  Home,
  BarChart3,
  Workflow,
  Calendar,
  Package,
  Star,
  Shield,
  Bell,
  User,
  HelpCircle,
  Code,
  Terminal,
  Webhook,
  Play,
  Eye,
  EyeOff,
  ExternalLink,
  FileText,
  Zap,
  Activity,
  Clock,
  CheckCircle,
  AlertTriangle,
  Info,
  ChevronDown,
  ChevronRight,
  Send
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

// API Endpoint Item Component
const APIEndpointItem = ({ endpoint, isSelected, onSelect }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getMethodColor = (method) => {
    switch (method.toUpperCase()) {
      case 'GET': return 'text-green-600 bg-green-50 border-green-200';
      case 'POST': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'PUT': return 'text-amber-600 bg-amber-50 border-amber-200';
      case 'DELETE': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  return (
    <div 
      className={`rounded-xl border transition-all ${
        isSelected ? 'border-[#256C3A] bg-[#256C3A]/5' : 'border-gray-200 hover:border-gray-300'
      }`}
      data-testid={`api-endpoint-${endpoint.id}`}
    >
      <div 
        className="p-4 cursor-pointer"
        onClick={() => {
          onSelect(endpoint);
          setIsExpanded(!isExpanded);
        }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Badge className={`${getMethodColor(endpoint.method)} border font-mono text-xs px-2 py-1`}>
              {endpoint.method}
            </Badge>
            <code className="font-mono text-sm text-gray-900">{endpoint.path}</code>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">{endpoint.description}</span>
            {isExpanded ? <ChevronDown className="w-4 h-4 text-gray-400" /> : <ChevronRight className="w-4 h-4 text-gray-400" />}
          </div>
        </div>
      </div>

      {isExpanded && (
        <div className="border-t border-gray-200 p-4 bg-gray-50/50">
          <div className="space-y-4">
            <div>
              <h5 className="font-semibold text-gray-900 mb-2">Parameters</h5>
              <div className="space-y-2">
                {endpoint.parameters.map((param, index) => (
                  <div key={index} className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-2">
                      <code className="font-mono text-gray-900">{param.name}</code>
                      <Badge variant="outline" className="text-xs">{param.type}</Badge>
                      {param.required && <Badge className="bg-red-50 text-red-700 border-red-200 text-xs">required</Badge>}
                    </div>
                    <span className="text-gray-600">{param.description}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h5 className="font-semibold text-gray-900 mb-2">Example Response</h5>
              <pre className="bg-gray-900 text-green-400 p-3 rounded-lg text-xs overflow-x-auto">
{JSON.stringify(endpoint.exampleResponse, null, 2)}
              </pre>
            </div>

            <Button 
              className="w-full bg-[#256C3A] hover:bg-[#1e5530] text-white"
              data-testid={`try-endpoint-${endpoint.id}`}
            >
              <Send className="w-4 h-4 mr-2" />
              Try it out
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

// SDK Download Card Component
const SDKCard = ({ sdk }) => {
  return (
    <Card className="hover:shadow-lg transition-shadow" data-testid={`sdk-card-${sdk.id}`}>
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className={`p-3 rounded-xl ${sdk.color} border`}>
              <Code className="w-6 h-6" />
            </div>
            <div>
              <CardTitle className="text-lg font-bold">{sdk.name}</CardTitle>
              <p className="text-sm text-gray-600">{sdk.description}</p>
            </div>
          </div>
          <Badge variant="outline" className="text-xs">{sdk.version}</Badge>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <div className="text-gray-500 text-xs mb-1">Size</div>
              <div className="font-medium">{sdk.size}</div>
            </div>
            <div>
              <div className="text-gray-500 text-xs mb-1">Downloads</div>
              <div className="font-medium">{sdk.downloads}</div>
            </div>
          </div>

          <div className="space-y-2">
            <Button 
              className="w-full bg-[#256C3A] hover:bg-[#1e5530] text-white"
              data-testid={`download-${sdk.id}`}
            >
              <Download className="w-4 h-4 mr-2" />
              Download SDK
            </Button>
            <Button 
              variant="outline" 
              className="w-full border-gray-300"
              data-testid={`docs-${sdk.id}`}
            >
              <FileText className="w-4 h-4 mr-2" />
              View Documentation
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Webhook Tester Component
const WebhookTester = () => {
  const [webhookUrl, setWebhookUrl] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [logs, setLogs] = useState([
    { id: 1, timestamp: '14:23:15', event: 'workflow.completed', status: 'success', payload: '{"workflow_id":"wf-001","status":"completed"}' },
    { id: 2, timestamp: '14:22:48', event: 'robot.collision', status: 'error', payload: '{"robot_id":"R1","location":"25,12","severity":"warning"}' },
    { id: 3, timestamp: '14:22:12', event: 'simulation.started', status: 'success', payload: '{"simulation_id":"sim-123","duration":120}' }
  ]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'success': return 'text-green-600 bg-green-50';
      case 'error': return 'text-red-600 bg-red-50';
      case 'warning': return 'text-amber-600 bg-amber-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <Card data-testid="webhook-tester">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Webhook className="w-5 h-5" />
          <span>Webhook Tester</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Webhook URL</label>
            <div className="flex space-x-2">
              <input
                type="url"
                value={webhookUrl}
                onChange={(e) => setWebhookUrl(e.target.value)}
                placeholder="https://your-webhook-endpoint.com/callback"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#256C3A]"
                data-testid="webhook-url-input"
              />
              <Button 
                onClick={() => setIsListening(!isListening)}
                className={`px-4 ${isListening ? 'bg-red-500 hover:bg-red-600' : 'bg-[#256C3A] hover:bg-[#1e5530]'} text-white`}
                data-testid="webhook-toggle"
              >
                {isListening ? 'Stop' : 'Listen'}
              </Button>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-3">
              <h5 className="font-semibold text-gray-900">Live Logs</h5>
              <div className={`flex items-center space-x-2 ${isListening ? 'text-green-600' : 'text-gray-400'}`}>
                <div className={`w-2 h-2 rounded-full ${isListening ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`}></div>
                <span className="text-xs font-medium">{isListening ? 'Listening' : 'Stopped'}</span>
              </div>
            </div>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {logs.map(log => (
                <div key={log.id} className="p-3 bg-gray-50 rounded-lg text-sm" data-testid={`webhook-log-${log.id}`}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="font-mono text-gray-600">{log.timestamp}</span>
                      <code className="font-mono text-gray-900">{log.event}</code>
                    </div>
                    <div className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(log.status)}`}>
                      {log.status}
                    </div>
                  </div>
                  <pre className="font-mono text-xs text-gray-600 bg-white p-2 rounded overflow-x-auto">
{log.payload}
                  </pre>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const APIToolsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedEndpoint, setSelectedEndpoint] = useState(null);
  const [showApiKey, setShowApiKey] = useState(false);

  // Sample API endpoints
  const [endpoints] = useState([
    {
      id: 'workflow-list',
      method: 'GET',
      path: '/api/v1/workflows',
      description: 'List all workflows',
      category: 'workflow',
      parameters: [
        { name: 'limit', type: 'integer', required: false, description: 'Maximum number of results' },
        { name: 'offset', type: 'integer', required: false, description: 'Number of results to skip' }
      ],
      exampleResponse: {
        workflows: [
          { id: 'wf-001', name: 'Night Operations', status: 'active' }
        ],
        total: 1
      }
    },
    {
      id: 'workflow-create',
      method: 'POST',
      path: '/api/v1/workflows',
      description: 'Create new workflow',
      category: 'workflow',
      parameters: [
        { name: 'name', type: 'string', required: true, description: 'Workflow name' },
        { name: 'description', type: 'string', required: false, description: 'Workflow description' },
        { name: 'steps', type: 'array', required: true, description: 'Workflow steps' }
      ],
      exampleResponse: {
        id: 'wf-002',
        name: 'New Workflow',
        status: 'draft'
      }
    },
    {
      id: 'simulation-start',
      method: 'POST',
      path: '/api/v1/simulations',
      description: 'Start simulation',
      category: 'simulation',
      parameters: [
        { name: 'workflow_id', type: 'string', required: true, description: 'Workflow to simulate' },
        { name: 'duration', type: 'integer', required: false, description: 'Simulation duration in seconds' }
      ],
      exampleResponse: {
        simulation_id: 'sim-123',
        status: 'running',
        estimated_duration: 120
      }
    },
    {
      id: 'robots-status',
      method: 'GET',
      path: '/api/v1/robots/status',
      description: 'Get robot status',
      category: 'robots',
      parameters: [
        { name: 'robot_id', type: 'string', required: false, description: 'Specific robot ID' }
      ],
      exampleResponse: {
        robots: [
          { id: 'R1', status: 'active', battery: 85, location: { x: 25, y: 12 } }
        ]
      }
    }
  ]);

  // Sample SDKs
  const [sdks] = useState([
    {
      id: 'ros2-sdk',
      name: 'ROS2 SDK',
      description: 'Complete ROS2 integration package with launch files and message types',
      version: 'v2.1.0',
      size: '15.2 MB',
      downloads: '2.3k',
      color: 'bg-purple-50 text-purple-700 border-purple-200'
    },
    {
      id: 'python-sdk',
      name: 'Python SDK',
      description: 'Pythonic API client with async support and automatic retry logic',
      version: 'v1.8.4',
      size: '892 KB',
      downloads: '5.1k',
      color: 'bg-blue-50 text-blue-700 border-blue-200'
    },
    {
      id: 'typescript-sdk',
      name: 'TypeScript SDK',
      description: 'Type-safe client library for Node.js and browser environments',
      version: 'v1.5.2',
      size: '1.1 MB',
      downloads: '3.7k',
      color: 'bg-green-50 text-green-700 border-green-200'
    }
  ]);

  // Filter endpoints
  const filteredEndpoints = useMemo(() => {
    return endpoints.filter(endpoint => {
      const matchesSearch = endpoint.path.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           endpoint.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = selectedCategory === 'all' || endpoint.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [endpoints, searchQuery, selectedCategory]);

  const categories = ['all', ...new Set(endpoints.map(e => e.category))];

  // Sample usage data
  const usageData = {
    apiKey: 'ff_sk_1234567890abcdef...',
    quota: { used: 2847, limit: 10000 },
    rateLimit: { current: 45, limit: 100 },
    lastCalls: [
      { timestamp: '14:23:42', endpoint: 'GET /api/v1/workflows', status: 200, duration: '145ms' },
      { timestamp: '14:23:15', endpoint: 'POST /api/v1/simulations', status: 201, duration: '892ms' },
      { timestamp: '14:22:58', endpoint: 'GET /api/v1/robots/status', status: 200, duration: '67ms' },
      { timestamp: '14:22:33', endpoint: 'PUT /api/v1/workflows/wf-001', status: 200, duration: '234ms' },
      { timestamp: '14:22:10', endpoint: 'DELETE /api/v1/simulations/sim-456', status: 204, duration: '89ms' }
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50 flex" data-testid="api-tools-page">
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
                  <p className="text-sm text-gray-600 font-medium">API & Developer Tools</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-3">
                  <Button 
                    className="bg-[#256C3A] hover:bg-[#1e5530] text-white"
                    data-testid="generate-api-key"
                  >
                    <Key className="w-4 h-4 mr-2" />
                    Generate API Key
                  </Button>
                  <Button variant="outline" className="border-gray-300" data-testid="reset-secret">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Reset Secret
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

          {/* Main Content */}
          <div className="flex-1 p-8 space-y-8" data-testid="api-content">
            {/* API Explorer Section */}
            <section data-testid="api-explorer">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">API Explorer</h2>
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search endpoints..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 pr-4 py-2 w-64 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#256C3A] focus:border-transparent"
                      data-testid="endpoint-search"
                    />
                  </div>
                  <select 
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#256C3A]"
                    data-testid="category-filter"
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>
                        {cat === 'all' ? 'All Categories' : `/${cat}`}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-3">
                {filteredEndpoints.map(endpoint => (
                  <APIEndpointItem
                    key={endpoint.id}
                    endpoint={endpoint}
                    isSelected={selectedEndpoint?.id === endpoint.id}
                    onSelect={setSelectedEndpoint}
                  />
                ))}
              </div>
            </section>

            {/* SDK Downloads Section */}
            <section data-testid="sdk-downloads">
              <h2 className="text-xl font-bold text-gray-900 mb-6">SDK Downloads</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sdks.map(sdk => (
                  <SDKCard key={sdk.id} sdk={sdk} />
                ))}
              </div>
            </section>

            {/* Webhook Tester Section */}
            <section data-testid="webhook-section">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Webhook & Callback Tester</h2>
              <WebhookTester />
            </section>
          </div>
        </div>

        {/* Inspector Panel */}
        <aside className="w-96 bg-white border-l border-gray-200 shadow-lg" data-testid="inspector-panel" role="complementary">
          <div className="h-full flex flex-col">
            <div className="border-b border-gray-200 p-6 bg-gradient-to-r from-gray-50 to-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-1">Developer Console</h3>
              <p className="text-sm text-gray-600">Authentication & usage monitoring</p>
            </div>
            
            <div className="flex-1 p-6 overflow-y-auto space-y-6">
              {/* API Key Section */}
              <div data-testid="api-key-section">
                <h4 className="font-bold text-gray-900 mb-3">Current API Key</h4>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <input
                      type={showApiKey ? 'text' : 'password'}
                      value={usageData.apiKey}
                      readOnly
                      className="flex-1 px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm font-mono"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowApiKey(!showApiKey)}
                      data-testid="toggle-api-key"
                    >
                      {showApiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </Button>
                    <Button variant="outline" size="sm" data-testid="copy-api-key">
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                      <div className="text-green-800 font-semibold text-sm">Active</div>
                      <div className="text-green-600 text-xs">Full access</div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                      <div className="text-gray-800 font-semibold text-sm">Scopes</div>
                      <div className="text-gray-600 text-xs">read:*, write:*</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Usage Limits */}
              <div data-testid="usage-limits">
                <h4 className="font-bold text-gray-900 mb-3">Usage Limits</h4>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium text-gray-700">Monthly Quota</span>
                      <span className="text-gray-600">{usageData.quota.used.toLocaleString()} / {usageData.quota.limit.toLocaleString()}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-[#256C3A] h-2 rounded-full"
                        style={{ width: `${(usageData.quota.used / usageData.quota.limit) * 100}%` }}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium text-gray-700">Rate Limit</span>
                      <span className="text-gray-600">{usageData.rateLimit.current} / {usageData.rateLimit.limit} req/min</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full"
                        style={{ width: `${(usageData.rateLimit.current / usageData.rateLimit.limit) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Activity Logs */}
              <div data-testid="activity-logs">
                <h4 className="font-bold text-gray-900 mb-3">Recent API Calls</h4>
                <div className="space-y-3">
                  {usageData.lastCalls.map((call, index) => (
                    <div key={index} className="p-3 bg-gray-50 rounded-lg text-sm" data-testid={`api-call-${index}`}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-mono text-gray-600 text-xs">{call.timestamp}</span>
                        <div className={`px-2 py-1 rounded text-xs font-medium ${
                          call.status === 200 || call.status === 201 || call.status === 204 
                            ? 'text-green-600 bg-green-50' 
                            : 'text-red-600 bg-red-50'
                        }`}>
                          {call.status}
                        </div>
                      </div>
                      <div className="font-mono text-gray-900 text-xs mb-1">{call.endpoint}</div>
                      <div className="text-gray-500 text-xs">{call.duration}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
};

export default APIToolsPage;