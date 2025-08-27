import React, { useState, useMemo } from 'react';
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
  Activity
} from 'lucide-react';

// Template Card Component
const TemplateCard = ({ template, isSelected, onSelect, onPreview }) => {
  const getCategoryColor = (category) => {
    switch (category.toLowerCase()) {
      case 'night operations': return 'bg-purple-100 text-purple-800';
      case 'growth management': return 'bg-green-100 text-green-800';
      case 'maintenance': return 'bg-blue-100 text-blue-800';
      case 'emergency': return 'bg-red-100 text-red-800';
      case 'transport': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRiskColor = (level) => {
    switch (level.toLowerCase()) {
      case 'low': return 'text-green-600';
      case 'medium': return 'text-yellow-600';
      case 'high': return 'text-red-600';
      default: return 'text-gray-600';
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
      className={`cursor-pointer transition-all duration-200 hover:shadow-md hover:scale-[1.01] ${
        isSelected ? 'ring-2 ring-[#256C3A] ring-opacity-50' : ''
      }`}
      onClick={() => onSelect(template)}
      data-testid={`template-card-${template.id}`}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-2">
            {getCategoryIcon(template.category)}
            <Badge className={`${getCategoryColor(template.category)} text-xs`}>
              {template.category}
            </Badge>
          </div>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              // Toggle favorite
            }}
            className="text-gray-400 hover:text-yellow-500 transition-colors"
            data-testid={`favorite-${template.id}`}
          >
            <Star className="w-4 h-4" />
          </button>
        </div>
        <CardTitle className="text-lg font-semibold text-gray-900 leading-tight">
          {template.name}
        </CardTitle>
        <p className="text-sm text-gray-600 line-clamp-2">
          {template.description}
        </p>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="space-y-3">
          {/* Key Metrics */}
          <div className="grid grid-cols-3 gap-2 text-xs">
            <div className="text-center">
              <Clock className="w-3 h-3 mx-auto mb-1 text-gray-500" />
              <div className="font-medium text-gray-900">{template.duration}</div>
              <div className="text-gray-500">Duration</div>
            </div>
            <div className="text-center">
              <Users className="w-3 h-3 mx-auto mb-1 text-gray-500" />
              <div className="font-medium text-gray-900">{template.robotsRequired}</div>
              <div className="text-gray-500">Robots</div>
            </div>
            <div className="text-center">
              <Shield className={`w-3 h-3 mx-auto mb-1 ${getRiskColor(template.riskLevel)}`} />
              <div className={`font-medium ${getRiskColor(template.riskLevel)}`}>{template.riskLevel}</div>
              <div className="text-gray-500">Risk</div>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1">
            {template.tags.slice(0, 3).map((tag, index) => (
              <Badge key={index} variant="outline" className="text-xs px-2 py-0.5">
                {tag}
              </Badge>
            ))}
            {template.tags.length > 3 && (
              <Badge variant="outline" className="text-xs px-2 py-0.5">
                +{template.tags.length - 3}
              </Badge>
            )}
          </div>

          {/* CTA */}
          <Button 
            onClick={(e) => {
              e.stopPropagation();
              onPreview(template);
            }}
            className="w-full bg-[#256C3A] hover:bg-[#1e5530] text-white text-sm"
            data-testid={`preview-${template.id}`}
          >
            <Eye className="w-4 h-4 mr-2" />
            Preview & Apply
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

import { useOverlayStore } from '@/stores/overlay';
import { useEffect } from 'react';

// Template Preview Modal
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
      <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-hidden flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-xl font-bold text-gray-900">{template.name}</h2>
            <p className="text-sm text-gray-600 mt-1">{template.description}</p>
          </div>
          <button onClick={handleClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex border-b border-gray-200">
          {['overview', 'workflow', 'parameters', 'safety', 'json'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors capitalize ${
                activeTab === tab
                  ? 'border-[#256C3A] text-[#256C3A]'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
              data-testid={`tab-${tab}`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="p-6 overflow-y-auto max-h-96">
          {activeTab === 'overview' && (
            <div className="space-y-6" data-testid="overview-tab">
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Execution Steps</h3>
                <div className="space-y-2">
                  {template.steps.map((step, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-6 h-6 bg-[#256C3A] text-white rounded-full flex items-center justify-center text-xs font-bold">
                        {index + 1}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{step.name}</div>
                        <div className="text-sm text-gray-600">{step.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Execution Window</h3>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-blue-600" />
                    <span className="text-blue-800 font-medium">{template.executionWindow}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'workflow' && (
            <div data-testid="workflow-tab">
              <h3 className="font-semibold text-gray-900 mb-3">Workflow Graph</h3>
              <div className="bg-gray-100 rounded-lg p-8 text-center">
                <Activity className="w-12 h-12 mx-auto text-gray-400 mb-2" />
                <p className="text-gray-600">Workflow diagram would be rendered here</p>
              </div>
            </div>
          )}

          {activeTab === 'parameters' && (
            <div data-testid="parameters-tab">
              <h3 className="font-semibold text-gray-900 mb-3">Configurable Parameters</h3>
              <div className="space-y-4">
                {template.parameters.map((param, index) => (
                  <div key={index}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {param.name}
                    </label>
                    <input
                      type={param.type}
                      defaultValue={param.defaultValue}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#256C3A]"
                    />
                    <p className="text-xs text-gray-500 mt-1">{param.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'safety' && (
            <div data-testid="safety-tab">
              <h3 className="font-semibold text-gray-900 mb-3">Safety Requirements</h3>
              <div className="space-y-3">
                {template.safetyRequirements.map((req, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 bg-red-50 rounded-lg border border-red-200">
                    <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5" />
                    <div>
                      <div className="font-medium text-red-800">{req.title}</div>
                      <div className="text-sm text-red-700">{req.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'json' && (
            <div data-testid="json-tab">
              <h3 className="font-semibold text-gray-900 mb-3">Template Definition</h3>
              <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-xs overflow-x-auto">
{JSON.stringify(template, null, 2)}
              </pre>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between p-6 border-t border-gray-200">
          <div className="text-sm text-gray-600">
            Estimated duration: {template.duration} • {template.robotsRequired} robots required
          </div>
          <div className="flex space-x-3">
            <Button variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button 
              onClick={handleApply}
              className="bg-[#256C3A] hover:bg-[#1e5530] text-white"
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

  // Sample template data
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
      id: 'leaf-pruning-transport',
      name: 'Leaf Pruning + Waste Transport',
      description: 'Coordinated leaf pruning and waste transportation during optimal night hours.',
      category: 'Night Operations',
      duration: '1h 15m',
      robotsRequired: 2,
      riskLevel: 'Low',
      tags: ['pruning', 'transport', 'night', 'coordination'],
      executionWindow: '22:00 - 04:00',
      steps: [
        { name: 'Zone Preparation', description: 'Clear pathways and prepare collection points' },
        { name: 'Precision Pruning', description: 'Selective leaf removal in target zones' },
        { name: 'Waste Collection', description: 'Immediate collection and transport' },
        { name: 'Area Cleanup', description: 'Final cleanup and sanitization' }
      ],
      parameters: [
        { name: 'Target Zones', type: 'text', defaultValue: 'C2,C5,C7', description: 'Zones for leaf pruning' },
        { name: 'Collection Capacity', type: 'number', defaultValue: 50, description: 'Waste capacity per trip (kg)' }
      ],
      safetyRequirements: [
        { title: 'Path Clearance', description: 'Ensure clear pathways for waste transport' }
      ]
    },
    {
      id: 'rush-hour-avoidance',
      name: 'Rush Hour Avoidance',
      description: 'Human-robot safety protocol maintaining safe distances during peak human activity.',
      category: 'Transport',
      duration: 'Variable',
      robotsRequired: 4,
      riskLevel: 'High',
      tags: ['safety', 'human-robot', 'avoidance', 'scheduling'],
      executionWindow: 'Adaptive',
      steps: [
        { name: 'Human Detection', description: 'Continuous monitoring of human presence' },
        { name: 'Dynamic Rescheduling', description: 'Adaptive task rescheduling based on activity' },
        { name: 'Safe Distance Maintenance', description: 'Maintain 5m minimum distance from humans' },
        { name: 'Priority Override', description: 'Emergency protocols for critical operations' }
      ],
      parameters: [
        { name: 'Safe Distance', type: 'number', defaultValue: 5, description: 'Minimum distance from humans (m)' },
        { name: 'Detection Sensitivity', type: 'number', defaultValue: 95, description: 'Human detection confidence (%)' }
      ],
      safetyRequirements: [
        { title: 'Human Detection Systems', description: 'Verify all human detection sensors are calibrated' },
        { title: 'Emergency Protocols', description: 'Test emergency stop and override systems' }
      ]
    },
    {
      id: 'charging-handover',
      name: 'Charging Station Handover',
      description: 'Automated battery management with intelligent charging station allocation.',
      category: 'Maintenance',
      duration: '45m',
      robotsRequired: 'All',
      riskLevel: 'Low',
      tags: ['charging', 'battery', 'handover', 'optimization'],
      executionWindow: 'As needed',
      steps: [
        { name: 'Battery Assessment', description: 'Check battery levels across all robots' },
        { name: 'Station Allocation', description: 'Optimize charging station assignments' },
        { name: 'Handover Sequence', description: 'Coordinate robot transitions to charging' },
        { name: 'Monitoring', description: 'Monitor charging progress and health' }
      ],
      parameters: [
        { name: 'Battery Threshold', type: 'number', defaultValue: 25, description: 'Charging trigger level (%)' },
        { name: 'Priority Weighting', type: 'text', defaultValue: 'critical,routine', description: 'Task priority for charging order' }
      ],
      safetyRequirements: [
        { title: 'Electrical Safety', description: 'Verify charging station electrical safety' }
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

  // Calculate selection summary
  const selectedCategories = [...new Set(
    selectedTemplates.map(id => templates.find(t => t.id === id)?.category).filter(Boolean)
  )];

  return (
    <div className="min-h-screen bg-gray-50 flex" data-testid="scenario-template-gallery-page">
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
                  <p className="text-sm text-gray-500">Scenario Template Gallery</p>
                </div>
              </div>
              
              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search templates, tags..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 w-80 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#256C3A] focus:border-transparent"
                  data-testid="search-input"
                />
              </div>
            </div>
          </header>

          {/* Toolbar */}
          <div className="bg-white border-b border-gray-200 px-8 py-4" data-testid="template-toolbar">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                {/* Filters */}
                <select 
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#256C3A]"
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
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#256C3A]"
                  data-testid="risk-filter"
                >
                  {riskLevels.map(risk => (
                    <option key={risk} value={risk}>
                      {risk === 'all' ? 'All Risk Levels' : `${risk.charAt(0).toUpperCase() + risk.slice(1)} Risk`}
                    </option>
                  ))}
                </select>
              </div>

              {/* Actions */}
              <div className="flex items-center space-x-3">
                <Button variant="outline" className="shadow-sm" data-testid="import-template">
                  <Upload className="w-4 h-4 mr-2" />
                  Import Template
                </Button>
                <Button variant="outline" className="shadow-sm" data-testid="export-selected">
                  <Download className="w-4 h-4 mr-2" />
                  Export Selected
                </Button>
                <Button className="bg-[#256C3A] hover:bg-[#1e5530] text-white shadow-sm" data-testid="create-template">
                  <Plus className="w-4 h-4 mr-2" />
                  Create from Scratch
                </Button>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          {selectedTemplates.length > 0 && (
            <div className="bg-blue-50 border-b border-blue-200 px-8 py-3" data-testid="quick-actions">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-blue-700">
                  {selectedTemplates.length} template{selectedTemplates.length !== 1 ? 's' : ''} selected
                </span>
                <div className="flex space-x-3">
                  <Button size="sm" className="bg-[#256C3A] hover:bg-[#1e5530] text-white" data-testid="validate-selection">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Validate Selection
                  </Button>
                  <Button size="sm" variant="outline" className="border-blue-300 text-blue-700" data-testid="apply-to-project">
                    Apply to Project
                  </Button>
                  <Button size="sm" variant="ghost" className="text-blue-700" data-testid="save-favorite">
                    <Star className="w-4 h-4 mr-2" />
                    Save as Favorite
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Template Grid */}
          <div className="flex-1 p-8" data-testid="template-grid">
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

            {filteredTemplates.length === 0 && (
              <div className="text-center py-16" data-testid="no-templates">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-gray-400" />
                </div>
                <h4 className="text-lg font-medium text-gray-900 mb-2">No templates found</h4>
                <p className="text-gray-500">Try adjusting your search criteria or filters.</p>
              </div>
            )}
          </div>
        </div>

        {/* Inspector Panel */}
        <aside className="w-90 bg-white border-l border-gray-200 shadow-lg" data-testid="inspector-panel" role="complementary">
          <div className="h-full flex flex-col">
            <div className="border-b border-gray-200 p-6 bg-gray-50">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Selection Summary</h3>
              
              <div className="space-y-4">
                <div>
                  <div className="text-sm font-medium text-gray-700 mb-2">Templates Selected</div>
                  <div className="text-2xl font-bold text-gray-900">{selectedTemplates.length}</div>
                </div>

                {selectedCategories.length > 0 && (
                  <div>
                    <div className="text-sm font-medium text-gray-700 mb-2">Categories</div>
                    <div className="flex flex-wrap gap-1">
                      {selectedCategories.map((category, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {category}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="flex-1 p-6 overflow-y-auto">
              {selectedTemplates.length > 0 ? (
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Compatibility & Requirements</h4>
                    <div className="bg-green-50 rounded-xl p-4 border border-green-200">
                      <div className="flex items-center space-x-2 mb-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span className="text-sm font-medium text-green-800">All templates compatible</span>
                      </div>
                      <div className="text-sm text-green-700">
                        Selected templates are compatible with your current project configuration.
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Apply Options</h4>
                    <div className="space-y-3">
                      <Button className="w-full bg-[#256C3A] hover:bg-[#1e5530] text-white justify-start">
                        <Play className="w-4 h-4 mr-2" />
                        Apply to Current Project
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Plus className="w-4 h-4 mr-2" />
                        Create New Project
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Dry Run Validate
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-16">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Star className="w-8 h-8 text-gray-400" />
                  </div>
                  <h4 className="text-lg font-medium text-gray-900 mb-2">No Templates Selected</h4>
                  <p className="text-gray-500">Select templates from the gallery to see compatibility and apply options.</p>
                </div>
              )}
            </div>
          </div>
        </aside>
      </main>

      {/* Template Preview Modal */}
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