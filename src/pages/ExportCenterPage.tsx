import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Search,
  Filter,
  Download,
  Copy,
  GitBranch,
  FileText,
  Code,
  Settings,
  Home,
  BarChart3,
  Workflow,
  Calendar,
  Package,
  Star,
  Bell,
  User,
  HelpCircle,
  ChevronDown,
  RefreshCw,
  Plus,
  ExternalLink,
  File,
  FileJson,
  FileCode,
  Database,
  Zap,
  CheckCircle,
  Clock,
  Eye,
  MoreHorizontal,
  Tag,
  Upload,
  FolderOpen
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

// Export Card Component
const ExportCard = ({ exportItem, isSelected, onSelect }) => {
  const getFormatIcon = (format) => {
    switch (format.toLowerCase()) {
      case 'ros2': return <Code className="w-5 h-5" />;
      case 'json': return <FileJson className="w-5 h-5" />;
      case 'pdf': return <FileText className="w-5 h-5" />;
      case 'markdown': return <File className="w-5 h-5" />;
      case 'openapi': return <Database className="w-5 h-5" />;
      default: return <FileCode className="w-5 h-5" />;
    }
  };

  const getFormatColor = (format) => {
    switch (format.toLowerCase()) {
      case 'ros2': return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'json': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'pdf': return 'bg-red-50 text-red-700 border-red-200';
      case 'markdown': return 'bg-gray-50 text-gray-700 border-gray-200';
      case 'openapi': return 'bg-green-50 text-green-700 border-green-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'ready': return 'text-green-600 bg-green-50';
      case 'generating': return 'text-amber-600 bg-amber-50';
      case 'failed': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <Card 
      className={`cursor-pointer transition-all duration-300 hover:shadow-lg hover:shadow-[#256C3A]/10 hover:-translate-y-1 group ${
        isSelected ? 'ring-2 ring-[#256C3A] ring-opacity-40 shadow-lg shadow-[#256C3A]/10' : 'hover:ring-1 hover:ring-[#256C3A]/20'
      }`}
      onClick={() => onSelect(exportItem)}
      data-testid={`export-card-${exportItem.id}`}
    >
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-xl border ${getFormatColor(exportItem.format)}`}>
              {getFormatIcon(exportItem.format)}
            </div>
            <div>
              <CardTitle className="text-lg font-bold text-gray-900 group-hover:text-[#256C3A] transition-colors">
                {exportItem.name}
              </CardTitle>
              <div className="flex items-center space-x-2 mt-1">
                <Badge className={`${getFormatColor(exportItem.format)} text-xs font-medium border px-2 py-1`}>
                  {exportItem.format.toUpperCase()}
                </Badge>
                <Badge variant="outline" className="text-xs px-2 py-1">
                  {exportItem.version}
                </Badge>
              </div>
            </div>
          </div>
          <div className={`px-2 py-1 rounded-lg ${getStatusColor(exportItem.status)}`}>
            <span className="text-xs font-medium">{exportItem.status}</span>
          </div>
        </div>
        
        <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
          {exportItem.description}
        </p>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="space-y-4">
          {/* Metadata */}
          <div className="grid grid-cols-2 gap-4 p-3 bg-gray-50 rounded-xl text-sm">
            <div>
              <div className="text-gray-500 text-xs">Size</div>
              <div className="font-medium text-gray-900">{exportItem.size}</div>
            </div>
            <div>
              <div className="text-gray-500 text-xs">Created</div>
              <div className="font-medium text-gray-900">{exportItem.createdAt}</div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-2">
            <Button 
              size="sm" 
              className="flex-1 bg-[#256C3A] hover:bg-[#1e5530] text-white"
              data-testid={`download-${exportItem.id}`}
            >
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
            <Button 
              size="sm" 
              variant="outline" 
              className="border-gray-300"
              data-testid={`copy-link-${exportItem.id}`}
            >
              <Copy className="w-4 h-4" />
            </Button>
            <Button 
              size="sm" 
              variant="outline" 
              className="border-gray-300"
              data-testid={`push-repo-${exportItem.id}`}
            >
              <GitBranch className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

import { useOverlayStore } from '@/stores/overlay';
import { useEffect } from 'react';

// New Export Dialog Component
const NewExportDialog = ({ isOpen, onClose }) => {
  const { open, closeAll } = useOverlayStore();
  const [selectedFormat, setSelectedFormat] = useState('json');
  const [exportName, setExportName] = useState('');
  const [version, setVersion] = useState('1.0.0');

  useEffect(() => {
    if (isOpen) {
      open();
    } else {
      closeAll();
    }
    // Cleanup on unmount
    return () => closeAll();
  }, [isOpen, open, closeAll]);

  if (!isOpen) return null;

  const exportFormats = [
    { id: 'ros2', name: 'ROS2 Launch Files', description: 'Generate ROS2 launch and configuration files' },
    { id: 'json', name: 'JSON Workflow', description: 'Export workflow definitions as JSON' },
    { id: 'pdf', name: 'PDF Report', description: 'Comprehensive documentation report' },
    { id: 'markdown', name: 'Markdown Docs', description: 'Human-readable documentation' },
    { id: 'openapi', name: 'API Bundle', description: 'OpenAPI YAML specification' }
  ];

  const handleClose = () => {
    closeAll();
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4" data-testid="new-export-dialog">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Create New Export</h2>
            <p className="text-sm text-gray-600 mt-1">Generate export artifacts from your designs</p>
          </div>
          <Button variant="ghost" onClick={handleClose}>
            <FileText className="w-5 h-5" />
          </Button>
        </div>

        <div className="p-6 space-y-6 overflow-y-auto">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Export Name</label>
            <input
              type="text"
              value={exportName}
              onChange={(e) => setExportName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#256C3A]"
              placeholder="Enter export name..."
              data-testid="export-name-input"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Version</label>
            <input
              type="text"
              value={version}
              onChange={(e) => setVersion(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#256C3A]"
              placeholder="e.g., 1.0.0"
              data-testid="version-input"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Export Format</label>
            <div className="space-y-3">
              {exportFormats.map((format) => (
                <label
                  key={format.id}
                  className={`flex items-start space-x-3 p-4 rounded-xl border cursor-pointer transition-colors ${
                    selectedFormat === format.id 
                      ? 'border-[#256C3A] bg-[#256C3A]/5' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="format"
                    value={format.id}
                    checked={selectedFormat === format.id}
                    onChange={(e) => setSelectedFormat(e.target.value)}
                    className="mt-1"
                  />
                  <div>
                    <div className="font-medium text-gray-900">{format.name}</div>
                    <div className="text-sm text-gray-600">{format.description}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between p-6 border-t border-gray-200 bg-gray-50">
          <div className="text-sm text-gray-600">
            Export will be generated and ready for download
          </div>
          <div className="flex space-x-3">
            <Button variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button className="bg-[#256C3A] hover:bg-[#1e5530] text-white">
              <Zap className="w-4 h-4 mr-2" />
              Generate Export
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

const ExportCenter = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFormat, setSelectedFormat] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedExport, setSelectedExport] = useState(null);
  const [showNewExportDialog, setShowNewExportDialog] = useState(false);

  // Sample export data
  const [exports] = useState([
    {
      id: 'exp-001',
      name: 'Night Operations Workflow',
      description: 'Complete ROS2 launch configuration for automated night operations including pruning and cleanup tasks.',
      format: 'ros2',
      version: 'v1.2.1',
      status: 'ready',
      size: '2.3 MB',
      createdAt: '2 hours ago',
      downloads: 47,
      preview: 'launch/night_operations.launch.py'
    },
    {
      id: 'exp-002',
      name: 'Growth Management API',
      description: 'OpenAPI specification for growth management endpoints including thinning and analysis operations.',
      format: 'openapi',
      version: 'v2.0.0',
      status: 'ready',
      size: '156 KB',
      createdAt: '1 day ago',
      downloads: 23,
      preview: 'api/growth-management.yaml'
    },
    {
      id: 'exp-003',
      name: 'Emergency Protocols',
      description: 'JSON workflow definitions for emergency evacuation and safety protocols.',
      format: 'json',
      version: 'v1.0.5',
      status: 'generating',
      size: '89 KB',
      createdAt: '3 hours ago',
      downloads: 12,
      preview: 'workflows/emergency.json'
    },
    {
      id: 'exp-004',
      name: 'System Documentation',
      description: 'Comprehensive PDF report covering all greenhouse automation systems and workflows.',
      format: 'pdf',
      version: 'v3.1.0',
      status: 'ready',
      size: '8.7 MB',
      createdAt: '5 days ago',
      downloads: 156,
      preview: 'docs/system-overview.pdf'
    },
    {
      id: 'exp-005',
      name: 'Quick Reference Guide',
      description: 'Markdown documentation for developers covering API usage and common workflows.',
      format: 'markdown',
      version: 'v1.1.2',
      status: 'failed',
      size: '245 KB',
      createdAt: '1 week ago',
      downloads: 34,
      preview: 'README.md'
    },
    {
      id: 'exp-006',
      name: 'Transport Coordination',
      description: 'ROS2 configuration for multi-robot coordination and transport logistics.',
      format: 'ros2',
      version: 'v1.0.8',
      status: 'ready',
      size: '1.8 MB',
      createdAt: '3 days ago',
      downloads: 29,
      preview: 'launch/transport.launch.py'
    }
  ]);

  // Filter exports
  const filteredExports = useMemo(() => {
    return exports.filter(exportItem => {
      const matchesSearch = exportItem.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           exportItem.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesFormat = selectedFormat === 'all' || exportItem.format === selectedFormat;
      const matchesStatus = selectedStatus === 'all' || exportItem.status === selectedStatus;
      
      return matchesSearch && matchesFormat && matchesStatus;
    });
  }, [exports, searchQuery, selectedFormat, selectedStatus]);

  const formats = ['all', ...new Set(exports.map(e => e.format))];
  const statuses = ['all', 'ready', 'generating', 'failed'];

  const handleExportSelect = (exportItem) => {
    setSelectedExport(exportItem);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex" data-testid="export-center-page">
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
                  <p className="text-sm text-gray-600 font-medium">Design Export Center</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search exports, formats..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-3 w-96 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#256C3A] focus:border-transparent transition-all shadow-sm"
                    data-testid="search-input"
                  />
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

          {/* Toolbar */}
          <div className="bg-white border-b border-gray-200 px-8 py-4" data-testid="export-toolbar">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-3">
                  <Filter className="w-4 h-4 text-gray-500" />
                  <select 
                    value={selectedFormat}
                    onChange={(e) => setSelectedFormat(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#256C3A] bg-white shadow-sm"
                    data-testid="format-filter"
                  >
                    {formats.map(format => (
                      <option key={format} value={format}>
                        {format === 'all' ? 'All Formats' : format.toUpperCase()}
                      </option>
                    ))}
                  </select>

                  <select 
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#256C3A] bg-white shadow-sm"
                    data-testid="status-filter"
                  >
                    {statuses.map(status => (
                      <option key={status} value={status}>
                        {status === 'all' ? 'All Status' : status.charAt(0).toUpperCase() + status.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="text-sm text-gray-600">
                  <span className="font-medium">{filteredExports.length}</span> exports found
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Button variant="outline" className="border-gray-300" data-testid="refresh-exports">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Refresh
                </Button>
                <Button 
                  className="bg-[#256C3A] hover:bg-[#1e5530] text-white shadow-sm"
                  onClick={() => setShowNewExportDialog(true)}
                  data-testid="new-export"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  New Export
                </Button>
              </div>
            </div>
          </div>

          {/* Export Grid */}
          <div className="flex-1 p-8 bg-gray-50" data-testid="export-grid">
            {filteredExports.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredExports.map(exportItem => (
                  <ExportCard
                    key={exportItem.id}
                    exportItem={exportItem}
                    isSelected={selectedExport?.id === exportItem.id}
                    onSelect={handleExportSelect}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-20" data-testid="no-exports">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FolderOpen className="w-10 h-10 text-gray-400" />
                </div>
                <h4 className="text-xl font-semibold text-gray-900 mb-3">No exports found</h4>
                <p className="text-gray-600 mb-6">Try adjusting your search criteria or filters.</p>
                <Button 
                  className="bg-[#256C3A] hover:bg-[#1e5530] text-white"
                  onClick={() => setShowNewExportDialog(true)}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Create Your First Export
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Inspector Panel */}
        <aside className="w-96 bg-white border-l border-gray-200 shadow-lg" data-testid="inspector-panel" role="complementary">
          <div className="h-full flex flex-col">
            <div className="border-b border-gray-200 p-6 bg-gradient-to-r from-gray-50 to-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-1">Export Details</h3>
              <p className="text-sm text-gray-600">Format information & preview</p>
            </div>
            
            <div className="flex-1 p-6 overflow-y-auto">
              {selectedExport ? (
                <div className="space-y-6">
                  <div>
                    <h4 className="font-bold text-gray-900 mb-3">{selectedExport.name}</h4>
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">
                      {selectedExport.description}
                    </p>
                    
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <div className="text-xs text-gray-500 mb-1">Format</div>
                        <div className="font-semibold">{selectedExport.format.toUpperCase()}</div>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <div className="text-xs text-gray-500 mb-1">Version</div>
                        <div className="font-semibold">{selectedExport.version}</div>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <div className="text-xs text-gray-500 mb-1">Size</div>
                        <div className="font-semibold">{selectedExport.size}</div>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <div className="text-xs text-gray-500 mb-1">Downloads</div>
                        <div className="font-semibold">{selectedExport.downloads}</div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h5 className="font-semibold text-gray-900 mb-3">File Preview</h5>
                    <div className="bg-gray-900 rounded-lg overflow-hidden">
                      <div className="bg-gray-800 px-4 py-2 border-b border-gray-700">
                        <span className="text-green-400 text-sm font-mono">{selectedExport.preview}</span>
                      </div>
                      <div className="p-4 text-green-400 font-mono text-sm">
                        # Preview content would appear here
                        <br />
                        # Based on export format and type
                        <br />
                        # Interactive preview coming soon...
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Button className="w-full bg-[#256C3A] hover:bg-[#1e5530] text-white">
                      <Download className="w-4 h-4 mr-2" />
                      Download Export
                    </Button>
                    <div className="grid grid-cols-2 gap-3">
                      <Button variant="outline" className="border-gray-300">
                        <Copy className="w-4 h-4 mr-2" />
                        Copy Link
                      </Button>
                      <Button variant="outline" className="border-gray-300">
                        <GitBranch className="w-4 h-4 mr-2" />
                        Push to Repo
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-20">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Eye className="w-8 h-8 text-gray-400" />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">No Export Selected</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Click on an export card to view detailed information, preview content, and access download options.
                  </p>
                </div>
              )}
            </div>
          </div>
        </aside>
      </main>

      {/* New Export Dialog */}
      <NewExportDialog
        isOpen={showNewExportDialog}
        onClose={() => setShowNewExportDialog(false)}
      />
    </div>
  );
};

export default ExportCenter;