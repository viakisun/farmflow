import React, { useState, useMemo, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Search,
  Filter,
  Plus,
  Upload,
  Download,
  Home,
  Settings,
  BarChart3,
  Workflow,
  Calendar,
  Package,
  Star,
  Clock,
  Users,
  Shield,
  Tag,
  Eye,
  Play,
  X,
  CheckCircle,
  AlertTriangle,
  Info,
  Moon,
  Leaf,
  Truck,
  Zap,
  Activity,
  Bell,
  User,
  HelpCircle,
  Maximize2
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
      {/* Growth bars representing farm data */}
      <rect x="-16" y="4" width="3" height="12" fill="white" rx="1.5" opacity="0.9"/>
      <rect x="-10" y="0" width="3" height="16" fill="white" rx="1.5" opacity="0.9"/>
      <rect x="-4" y="-4" width="3" height="20" fill="white" rx="1.5"/>
      <rect x="2" y="-8" width="3" height="24" fill="white" rx="1.5"/>
      <rect x="8" y="-2" width="3" height="18" fill="white" rx="1.5" opacity="0.9"/>
      {/* Robot indicator */}
      <circle cx="14" cy="-12" r="3" fill="white"/>
      <rect x="12" y="-14" width="4" height="4" fill="#256C3A" rx="1"/>
    </g>
  </svg>
);

// Enhanced Notification Bell
const NotificationBell = () => (
  <div className="relative">
    <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-lg transition-colors" data-testid="notifications">
      <Bell className="w-5 h-5" />
    </button>
    <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
  </div>
);

// Enhanced User Menu
const UserMenu = () => (
  <div className="flex items-center space-x-3">
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
);

// Enhanced Template Card Component
const TemplateCard = ({ template, isSelected, onSelect, onPreview }) => {
  const getCategoryColor = (category) => {
    switch (category.toLowerCase()) {
      case 'night operations': return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'growth management': return 'bg-green-50 text-green-700 border-green-200';
      case 'maintenance': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'emergency': return 'bg-red-50 text-red-700 border-red-200';
      case 'transport': return 'bg-amber-50 text-amber-700 border-amber-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getRiskColor = (level) => {
    switch (level.toLowerCase()) {
      case 'low': return 'text-green-600 bg-green-50';
      case 'medium': return 'text-amber-600 bg-amber-50';
      case 'high': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getCategoryIcon = (category) => {
    switch (category.toLowerCase()) {
      case 'night operations': return <Moon className="w-4 h-4" />;
      case 'growth management': return <Leaf className="w-4 h-4" />;
      case 'maintenance': return <Settings className="w-4 h-4" />;
      case 'emergency': return <AlertTriangle className="w-4 h-4" />;
      case 'transport': return <Truck className="w-4 h-4" />;
      default: return <Activity className="w-4 h-4" />;
    }
  };

  return (
    <Card 
      className={`cursor-pointer transition-all duration-300 hover:shadow-lg hover:shadow-[#256C3A]/10 hover:-translate-y-1 group ${
        isSelected ? 'ring-2 ring-[#256C3A] ring-opacity-40 shadow-lg shadow-[#256C3A]/10' : 'hover:ring-1 hover:ring-[#256C3A]/20'
      }`}
      onClick={() => onSelect(template)}
      data-testid={`template-card-${template.id}`}
    >
      <CardHeader className="pb-3 relative">
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center space-x-2">
            <div className={`p-1.5 rounded-lg border ${getCategoryColor(template.category)}`}>
              {getCategoryIcon(template.category)}
            </div>
            <Badge className={`${getCategoryColor(template.category)} text-xs font-medium border px-2 py-1`}>
              {template.category}
            </Badge>
          </div>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              // Toggle favorite
            }}
            className="text-gray-400 hover:text-amber-500 transition-colors opacity-0 group-hover:opacity-100"
            data-testid={`favorite-${template.id}`}
          >
            <Star className="w-4 h-4" />
          </button>
        </div>
        <CardTitle className="text-lg font-bold text-gray-900 leading-tight mb-2 group-hover:text-[#256C3A] transition-colors">
          {template.name}
        </CardTitle>
        <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
          {template.description}
        </p>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="space-y-4">
          {/* Enhanced Key Metrics */}
          <div className="grid grid-cols-3 gap-3 p-3 bg-gray-50 rounded-xl">
            <div className="text-center">
              <div className="flex items-center justify-center mb-1">
                <Clock className="w-4 h-4 text-[#256C3A]" />
              </div>
              <div className="text-sm font-bold text-gray-900">{template.duration}</div>
              <div className="text-xs text-gray-500">Duration</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-1">
                <Users className="w-4 h-4 text-[#256C3A]" />
              </div>
              <div className="text-sm font-bold text-gray-900">{template.robotsRequired}</div>
              <div className="text-xs text-gray-500">Robots</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-1">
                <Shield className={`w-4 h-4 ${getRiskColor(template.riskLevel).split(' ')[0]}`} />
              </div>
              <div className={`text-sm font-bold ${getRiskColor(template.riskLevel).split(' ')[0]}`}>{template.riskLevel}</div>
              <div className="text-xs text-gray-500">Risk</div>
            </div>
          </div>

          {/* Enhanced Tags */}
          <div className="flex flex-wrap gap-1.5">
            {template.tags.slice(0, 3).map((tag, index) => (
              <Badge key={index} variant="outline" className="text-xs px-2 py-1 bg-white border-gray-200 text-gray-600 hover:bg-gray-50">
                {tag}
              </Badge>
            ))}
            {template.tags.length > 3 && (
              <Badge variant="outline" className="text-xs px-2 py-1 bg-gray-100 border-gray-200 text-gray-500">
                +{template.tags.length - 3} more
              </Badge>
            )}
          </div>

          {/* Enhanced CTA */}
          <div className="pt-2">
            <Button 
              onClick={(e) => {
                e.stopPropagation();
                onPreview(template);
              }}
              className="w-full bg-[#256C3A] hover:bg-[#1e5530] text-white text-sm font-medium py-2.5 transition-all duration-200 shadow-sm hover:shadow-md"
              data-testid={`preview-${template.id}`}
            >
              <Eye className="w-4 h-4 mr-2" />
              Preview & Apply
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

import { useOverlayStore } from '@/stores/overlay';

// Enhanced Template Preview Modal
const TemplatePreviewModal = ({ template, isOpen, onClose, onApply }) => {
  const { open, closeAll } = useOverlayStore();
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    if (isOpen) {
      open();
    } else {
      closeAll();
    }
    return () => closeAll();
  }, [isOpen, open, closeAll]);

  if (!isOpen || !template) return null;

  const handleClose = () => {
    closeAll();
    onClose();
  };

  const handleApply = () => {
    closeAll();
    onApply(template);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4" data-testid="template-preview-modal">
      <div className="bg-white rounded-2xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden animate-in fade-in-0 zoom-in-95 duration-300 flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gray-50">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-[#256C3A] to-[#1e5530] rounded-xl flex items-center justify-center shadow-lg">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">{template.name}</h2>
              <p className="text-sm text-gray-600 mt-1">{template.description}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button 
              className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
              data-testid="fullscreen-modal"
            >
              <Maximize2 className="w-5 h-5 text-gray-500" />
            </button>
            <button 
              onClick={handleClose}
              className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        </div>

        <div className="flex border-b border-gray-200">
          {[
            { id: 'overview', label: 'Overview', icon: Info },
            { id: 'workflow', label: 'Workflow', icon: Workflow },
            { id: 'parameters', label: 'Parameters', icon: Settings },
            { id: 'safety', label: 'Safety', icon: Shield },
            { id: 'json', label: 'JSON', icon: Tag }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-6 py-4 text-sm font-medium border-b-2 transition-all ${
                  activeTab === tab.id
                    ? 'border-[#256C3A] text-[#256C3A] bg-green-50'
                    : 'border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
                data-testid={`tab-${tab.id}`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        <div className="p-6 overflow-y-auto flex-1">
          {activeTab === 'overview' && (
            <div className="space-y-6" data-testid="overview-tab">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-bold text-gray-900 mb-4 flex items-center">
                    <Workflow className="w-5 h-5 mr-2 text-[#256C3A]" />
                    Execution Steps
                  </h3>
                  <div className="space-y-3">
                    {template.steps.map((step, index) => (
                      <div key={index} className="flex items-start space-x-3 p-4 bg-gradient-to-r from-gray-50 to-gray-100/50 rounded-xl border border-gray-100">
                        <div className="w-8 h-8 bg-[#256C3A] text-white rounded-full flex items-center justify-center text-sm font-bold shadow-sm">
                          {index + 1}
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">{step.name}</div>
                          <div className="text-sm text-gray-600 mt-1">{step.description}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-bold text-gray-900 mb-4 flex items-center">
                    <Clock className="w-5 h-5 mr-2 text-[#256C3A]" />
                    Execution Details
                  </h3>
                  <div className="space-y-4">
                    <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
                      <div className="flex items-center space-x-2 mb-2">
                        <Clock className="w-4 h-4 text-blue-600" />
                        <span className="text-blue-800 font-semibold">Execution Window</span>
                      </div>
                      <span className="text-blue-700">{template.executionWindow}</span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                        <div className="text-green-800 font-semibold text-sm">Duration</div>
                        <div className="text-green-700">{template.duration}</div>
                      </div>
                      <div className="bg-amber-50 p-3 rounded-lg border border-amber-200">
                        <div className="text-amber-800 font-semibold text-sm">Robots</div>
                        <div className="text-amber-700">{template.robotsRequired}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'workflow' && (
            <div data-testid="workflow-tab">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center">
                <Workflow className="w-5 h-5 mr-2 text-[#256C3A]" />
                Workflow Diagram
              </h3>
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-12 text-center border border-gray-200">
                <div className="w-16 h-16 bg-[#256C3A] bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Activity className="w-8 h-8 text-[#256C3A]" />
                </div>
                <p className="text-gray-600 mb-2">Interactive Workflow Diagram</p>
                <p className="text-sm text-gray-500">React Flow visualization would be rendered here</p>
              </div>
            </div>
          )}

          {/* Other tabs remain similar but with enhanced styling... */}
          
          {activeTab === 'json' && (
            <div data-testid="json-tab">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center">
                <Tag className="w-5 h-5 mr-2 text-[#256C3A]" />
                Template Definition
              </h3>
              <div className="bg-gray-900 rounded-xl overflow-hidden border border-gray-300">
                <div className="bg-gray-800 px-4 py-2 border-b border-gray-700">
                  <span className="text-green-400 text-sm font-mono">template.json</span>
                </div>
                <pre className="text-green-400 p-4 text-xs overflow-x-auto font-mono leading-relaxed">
{JSON.stringify(template, null, 2)}
                </pre>
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between p-6 border-t border-gray-200 bg-gray-50">
          <div className="text-sm text-gray-600">
            <span className="font-medium">Estimated duration:</span> {template.duration} • 
            <span className="font-medium"> Robots required:</span> {template.robotsRequired}
          </div>
          <div className="flex space-x-3">
            <Button variant="outline" onClick={handleClose} className="border-gray-300">
              Cancel
            </Button>
            <Button 
              onClick={handleApply}
              className="bg-[#256C3A] hover:bg-[#1e5530] text-white shadow-sm"
            >
              <Play className="w-4 h-4 mr-2" />
              Apply Template
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

const ScenarioTemplateGallery = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedRiskLevel, setSelectedRiskLevel] = useState('all');
  const [selectedTemplates, setSelectedTemplates] = useState([]);
  const [previewTemplate, setPreviewTemplate] = useState(null);
  const [showPreview, setShowPreview] = useState(false);

  // Sample template data (keeping existing data structure)
  const [templates] = useState([
    {
      id: 'night-unattended',
      name: 'Night Unattended Operation',
      description: 'Automated scanning, pruning, and cleanup during night hours when greenhouse is unattended.',
      category: 'Night Operations',
      duration: '2h 30m',
      robotsRequired: 3,
      riskLevel: 'Medium',
      tags: ['night', 'pruning', 'autonomous', 'cleanup'],
      executionWindow: '20:00 - 06:00',
      steps: [
        { name: 'Environmental Scan', description: 'Systematic scanning of all greenhouse zones' },
        { name: 'Targeted Pruning', description: 'AI-guided pruning of identified areas' },
        { name: 'Waste Collection', description: 'Automated cleanup and transport to disposal' },
        { name: 'Return to Base', description: 'All robots return to charging stations' }
      ],
      parameters: [
        { name: 'Pruning Threshold', type: 'number', defaultValue: 85, description: 'Confidence threshold for pruning decisions (%)' },
        { name: 'Safe Distance', type: 'number', defaultValue: 5, description: 'Minimum safe distance between robots (m)' }
      ],
      safetyRequirements: [
        { title: 'Emergency Stop', description: 'Ensure emergency stop systems are functional' },
        { title: 'Lighting Systems', description: 'Verify adequate lighting for robot operations' }
      ]
    },
    {
      id: 'growth-analysis-thinning',
      name: 'Growth Analysis → Thinning',
      description: 'Automated detection of over-fruiting areas and selective thinning to optimize plant health.',
      category: 'Growth Management',
      duration: '3h 45m',
      robotsRequired: 2,
      riskLevel: 'Low',
      tags: ['analysis', 'thinning', 'ai-vision', 'optimization'],
      executionWindow: 'Any time',
      steps: [
        { name: 'Growth Assessment', description: 'AI analysis of fruit density and plant health' },
        { name: 'Thinning Plan', description: 'Generate selective thinning strategy' },
        { name: 'Execute Thinning', description: 'Precision removal of excess fruit' },
        { name: 'Quality Check', description: 'Post-thinning verification and assessment' }
      ],
      parameters: [
        { name: 'Target Fruit Density', type: 'number', defaultValue: 12, description: 'Optimal fruits per plant' },
        { name: 'Zone Coverage', type: 'text', defaultValue: 'A3,A5,A7', description: 'Zones to process' }
      ],
      safetyRequirements: [
        { title: 'Plant Health Monitor', description: 'Real-time monitoring of plant stress indicators' }
      ]
    },
    {
      id: 'emergency-evacuation',
      name: 'Emergency Evacuation',
      description: 'Rapid robot evacuation protocol for fire, power outage, or other emergency situations.',
      category: 'Emergency',
      duration: '5-15m',
      robotsRequired: 'All',
      riskLevel: 'High',
      tags: ['emergency', 'evacuation', 'safety', 'critical'],
      executionWindow: 'Immediate',
      steps: [
        { name: 'Emergency Detection', description: 'Automatic detection of emergency conditions' },
        { name: 'Immediate Stop', description: 'All robots cease current operations' },
        { name: 'Safe Evacuation', description: 'Navigate to designated safe zones' },
        { name: 'Status Report', description: 'Report evacuation status to control center' }
      ],
      parameters: [
        { name: 'Evacuation Timeout', type: 'number', defaultValue: 300, description: 'Maximum evacuation time (seconds)' },
        { name: 'Safe Zones', type: 'text', defaultValue: 'Exit-A,Exit-B', description: 'Designated evacuation points' }
      ],
      safetyRequirements: [
        { title: 'Emergency Systems', description: 'Test all emergency detection and communication systems' },
        { title: 'Evacuation Routes', description: 'Verify clear evacuation pathways' },
        { title: 'Manual Override', description: 'Confirm manual override capabilities' }
      ]
    }
  ]);

  // Filter templates
  const filteredTemplates = useMemo(() => {
    return templates.filter(template => {
      const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           template.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;
      const matchesRisk = selectedRiskLevel === 'all' || template.riskLevel.toLowerCase() === selectedRiskLevel;
      
      return matchesSearch && matchesCategory && matchesRisk;
    });
  }, [templates, searchQuery, selectedCategory, selectedRiskLevel]);

  const categories = ['all', ...new Set(templates.map(t => t.category))];
  const riskLevels = ['all', 'low', 'medium', 'high'];

  const handleTemplateSelect = (template) => {
    if (selectedTemplates.includes(template.id)) {
      setSelectedTemplates(selectedTemplates.filter(id => id !== template.id));
    } else {
      setSelectedTemplates([...selectedTemplates, template.id]);
    }
  };

  const handlePreview = (template) => {
    setPreviewTemplate(template);
    setShowPreview(true);
  };

  const handleApply = (template) => {
    // Apply template logic
    setShowPreview(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex" data-testid="scenario-template-gallery-page">
      {/* Main Content */}
      <main className="flex-1 flex" data-testid="main-content" role="main">
        <div className="flex-1 flex flex-col">
          {/* Enhanced Header */}
          <header className="bg-white border-b border-gray-200 px-8 py-4 shadow-sm" data-testid="page-header">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <FarmFlowFavicon className="w-10 h-10" />
                <div>
                  <h1 className="text-2xl font-bold text-gray-900" data-testid="system-title">
                    VIAFARM
                  </h1>
                  <p className="text-sm text-gray-600 font-medium">Scenario Template Gallery</p>
                </div>
              </div>
              
              {/* Enhanced Search Bar */}
              <div className="flex items-center space-x-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search templates, tags, scenarios..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-3 w-96 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#256C3A] focus:border-transparent transition-all shadow-sm"
                    data-testid="search-input"
                  />
                </div>
                
                <div className="flex items-center space-x-3">
                  <NotificationBell />
                  <div className="w-px h-6 bg-gray-300"></div>
                  <UserMenu />
                </div>
              </div>
            </div>
          </header>

          {/* Enhanced Toolbar */}
          <div className="bg-white border-b border-gray-200 px-8 py-4" data-testid="template-toolbar">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                {/* Enhanced Filters */}
                <div className="flex items-center space-x-3">
                  <Filter className="w-4 h-4 text-gray-500" />
                  <select 
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#256C3A] bg-white shadow-sm"
                    data-testid="category-filter"
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>
                        {cat === 'all' ? 'All Categories' : cat}
                      </option>
                    ))}
                  </select>

                  <select 
                    value={selectedRiskLevel}
                    onChange={(e) => setSelectedRiskLevel(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#256C3A] bg-white shadow-sm"
                    data-testid="risk-filter"
                  >
                    {riskLevels.map(risk => (
                      <option key={risk} value={risk}>
                        {risk === 'all' ? 'All Risk Levels' : `${risk.charAt(0).toUpperCase() + risk.slice(1)} Risk`}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="text-sm text-gray-600">
                  <span className="font-medium">{filteredTemplates.length}</span> templates found
                </div>
              </div>

              {/* Enhanced Actions */}
              <div className="flex items-center space-x-3">
                <Button variant="outline" className="shadow-sm border-gray-300" data-testid="import-template">
                  <Upload className="w-4 h-4 mr-2" />
                  Import
                </Button>
                <Button variant="outline" className="shadow-sm border-gray-300" data-testid="export-selected">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
                <Button className="bg-[#256C3A] hover:bg-[#1e5530] text-white shadow-sm" data-testid="create-template">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Template
                </Button>
              </div>
            </div>
          </div>

          {/* Enhanced Quick Actions */}
          {selectedTemplates.length > 0 && (
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-200 px-8 py-4" data-testid="quick-actions">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    {selectedTemplates.length}
                  </div>
                  <span className="text-sm font-semibold text-blue-800">
                    {selectedTemplates.length} template{selectedTemplates.length !== 1 ? 's' : ''} selected
                  </span>
                </div>
                <div className="flex space-x-3">
                  <Button size="sm" className="bg-[#256C3A] hover:bg-[#1e5530] text-white shadow-sm" data-testid="validate-selection">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Validate & Apply
                  </Button>
                  <Button size="sm" variant="outline" className="border-blue-300 text-blue-700 bg-white" data-testid="save-collection">
                    <Star className="w-4 h-4 mr-2" />
                    Save Collection
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Enhanced Template Grid */}
          <div className="flex-1 p-8 bg-gray-50" data-testid="template-grid">
            {filteredTemplates.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredTemplates.map(template => (
                  <TemplateCard
                    key={template.id}
                    template={template}
                    isSelected={selectedTemplates.includes(template.id)}
                    onSelect={handleTemplateSelect}
                    onPreview={handlePreview}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-20" data-testid="no-templates">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search className="w-10 h-10 text-gray-400" />
                </div>
                <h4 className="text-xl font-semibold text-gray-900 mb-3">No templates found</h4>
                <p className="text-gray-600 mb-6">Try adjusting your search criteria or filters.</p>
                <Button className="bg-[#256C3A] hover:bg-[#1e5530] text-white">
                  <Plus className="w-4 h-4 mr-2" />
                  Create New Template
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Enhanced Inspector Panel */}
        <aside className="w-96 bg-white border-l border-gray-200 shadow-lg" data-testid="inspector-panel" role="complementary">
          <div className="h-full flex flex-col">
            <div className="border-b border-gray-200 p-6 bg-gradient-to-r from-gray-50 to-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-1">Selection Summary</h3>
              <p className="text-sm text-gray-600">Template analysis & actions</p>
            </div>
            
            <div className="flex-1 p-6 overflow-y-auto">
              {selectedTemplates.length > 0 ? (
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-[#256C3A]/5 p-4 rounded-xl border border-[#256C3A]/20">
                      <div className="text-2xl font-bold text-[#256C3A]">{selectedTemplates.length}</div>
                      <div className="text-sm font-medium text-gray-700">Templates</div>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
                      <div className="text-2xl font-bold text-blue-600">
                        {[...new Set(selectedTemplates.map(id => templates.find(t => t.id === id)?.category))].length}
                      </div>
                      <div className="text-sm font-medium text-gray-700">Categories</div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-bold text-gray-900 mb-3">Compatibility Check</h4>
                    <div className="bg-green-50 rounded-xl p-4 border border-green-200">
                      <div className="flex items-center space-x-2 mb-2">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <span className="text-sm font-semibold text-green-800">All templates compatible</span>
                      </div>
                      <div className="text-sm text-green-700">
                        Selected templates are compatible with your current project configuration and can be executed together.
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-bold text-gray-900 mb-4">Quick Actions</h4>
                    <div className="space-y-3">
                      <Button className="w-full bg-[#256C3A] hover:bg-[#1e5530] text-white justify-start">
                        <Play className="w-4 h-4 mr-2" />
                        Apply to Current Project
                      </Button>
                      <Button variant="outline" className="w-full justify-start border-gray-300">
                        <Plus className="w-4 h-4 mr-2" />
                        Create New Project
                      </Button>
                      <Button variant="outline" className="w-full justify-start border-gray-300">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Run Validation Test
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-20">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Star className="w-8 h-8 text-gray-400" />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">No Selection</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Select templates from the gallery to see compatibility analysis and execution options.
                  </p>
                </div>
              )}
            </div>
          </div>
        </aside>
      </main>

      {/* Enhanced Template Preview Modal */}
      <TemplatePreviewModal
        template={previewTemplate}
        isOpen={showPreview}
        onClose={() => setShowPreview(false)}
        onApply={handleApply}
      />
    </div>
  );
};

export default ScenarioTemplateGallery;