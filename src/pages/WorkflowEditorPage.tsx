import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Plus,
  GitBranch,
  ZoomIn,
  Undo,
  Redo,
  Play,
  Shield,
  Home,
  Settings,
  BarChart3,
  Workflow,
  ZoomOut,
  Move,
  ChevronDown
} from 'lucide-react';

// Custom Node Component
const WorkflowNode = ({ node, isSelected, onSelect, onDrag, position }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const nodeRef = useRef(null);

  const getNodeStyle = (type) => {
    switch (type) {
      case 'trigger':
        return {
          bg: 'bg-blue-50',
          border: 'border-blue-200',
          dot: 'bg-blue-500',
          text: 'text-blue-700',
          shadow: 'shadow-blue-100'
        };
      case 'action':
        return {
          bg: 'bg-green-50',
          border: 'border-green-200',
          dot: 'bg-green-500',
          text: 'text-green-700',
          shadow: 'shadow-green-100'
        };
      case 'condition':
        return {
          bg: 'bg-yellow-50',
          border: 'border-yellow-200',
          dot: 'bg-yellow-500',
          text: 'text-yellow-700',
          shadow: 'shadow-yellow-100'
        };
      case 'end':
        return {
          bg: 'bg-gray-50',
          border: 'border-gray-200',
          dot: 'bg-gray-500',
          text: 'text-gray-700',
          shadow: 'shadow-gray-100'
        };
      default:
        return {
          bg: 'bg-white',
          border: 'border-gray-200',
          dot: 'bg-gray-400',
          text: 'text-gray-700',
          shadow: 'shadow-gray-100'
        };
    }
  };

  const style = getNodeStyle(node.type);

  const handleMouseDown = (e) => {
    e.stopPropagation();
    setIsDragging(true);
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
    onSelect(node);
  };

  const handleMouseMove = useCallback((e) => {
    if (isDragging && onDrag) {
      const newX = Math.max(90, Math.min(e.clientX - dragStart.x, window.innerWidth - 300));
      const newY = Math.max(50, e.clientY - dragStart.y);
      onDrag(node.id, { x: newX, y: newY });
    }
  }, [isDragging, dragStart, onDrag, node.id]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
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
      ref={nodeRef}
      className={`absolute cursor-move select-none transition-all duration-200 ${
        isSelected ? 'ring-2 ring-[#256C3A] ring-opacity-75 scale-105' : ''
      } ${isDragging ? 'z-50' : 'z-10'}`}
      style={{
        left: position.x,
        top: position.y,
        transform: 'translate(-50%, -50%)'
      }}
      onMouseDown={handleMouseDown}
      data-testid={`${node.type}-node-${node.id}`}
    >
      <div className={`px-5 py-4 shadow-lg rounded-2xl ${style.bg} border-2 ${style.border} min-w-[200px] backdrop-blur-sm bg-opacity-95 hover:shadow-xl transition-shadow duration-200`}>
        <div className="flex items-center space-x-3 mb-3">
          <div className={`w-3 h-3 ${style.dot} rounded-full ring-2 ring-white`}></div>
          <div className={`text-xs font-bold ${style.text} uppercase tracking-wider`}>{node.type}</div>
        </div>
        <div className="text-sm font-semibold text-gray-900 leading-relaxed">{node.label}</div>
        {node.parameters && Object.keys(node.parameters).length > 0 && (
          <div className="mt-2 text-xs text-gray-600">
            {Object.entries(node.parameters).slice(0, 2).map(([key, value]) => (
              <div key={key} className="truncate">
                {key}: {String(value)}
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Enhanced Connection Points */}
      <div className="absolute -right-3 top-1/2 w-6 h-6 bg-white border-2 border-[#256C3A] rounded-full transform -translate-y-1/2 shadow-md hover:scale-110 transition-transform cursor-pointer">
        <div className="w-2 h-2 bg-[#256C3A] rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
      </div>
      <div className="absolute -left-3 top-1/2 w-6 h-6 bg-white border-2 border-gray-300 rounded-full transform -translate-y-1/2 shadow-md hover:scale-110 transition-transform cursor-pointer">
        <div className="w-2 h-2 bg-gray-400 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
      </div>
    </div>
  );
};

// Enhanced Connection Line Component
const ConnectionLine = ({ from, to, label, animated = false, type = 'default' }) => {
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const length = Math.sqrt(dx * dx + dy * dy);
  const angle = Math.atan2(dy, dx) * 180 / Math.PI;
  
  const lineColor = type === 'error' ? '#ef4444' : '#256C3A';
  const lineWidth = type === 'error' ? 'h-1' : 'h-0.5';
  
  return (
    <div className="absolute pointer-events-none z-0" style={{ left: from.x, top: from.y }}>
      <div
        className={`${lineWidth} origin-left transition-all duration-300 ${animated ? 'animate-pulse' : ''}`}
        style={{
          width: length,
          transform: `rotate(${angle}deg)`,
          backgroundColor: lineColor,
          borderRadius: '2px'
        }}
      >
        {/* Enhanced Arrow head */}
        <div 
          className="absolute right-0 top-0 w-0 h-0 border-l-[8px] border-t-[4px] border-t-transparent border-b-[4px] border-b-transparent transform -translate-y-1/2"
          style={{ borderLeftColor: lineColor }}
        ></div>
      </div>
      {label && (
        <div 
          className="absolute bg-white px-3 py-1.5 text-xs font-semibold text-gray-700 border border-gray-300 rounded-full shadow-md"
          style={{
            left: length / 2,
            top: -16,
            transform: 'translateX(-50%)'
          }}
        >
          {label}
        </div>
      )}
    </div>
  );
};

// Enhanced Minimap Component
const Minimap = ({ nodes, selectedNode, onNodeClick }) => {
  return (
    <div className="absolute bottom-6 right-6 w-56 h-36 bg-white border-2 border-gray-200 rounded-xl shadow-lg overflow-hidden">
      <div className="w-full h-full bg-gradient-to-br from-gray-50 to-gray-100 relative">
        <div className="absolute top-2 left-3 text-xs font-semibold text-gray-600">Minimap</div>
        {nodes.map((node) => {
          const isSelected = selectedNode?.id === node.id;
          return (
            <div
              key={node.id}
              className={`absolute w-3 h-3 rounded-full cursor-pointer transition-all duration-200 ${
                isSelected ? 'ring-2 ring-[#256C3A] ring-opacity-75 scale-125' : 'hover:scale-110'
              }`}
              style={{
                left: (node.position.x / 8) + '%',
                top: (node.position.y / 6) + '%',
                backgroundColor: node.type === 'trigger' ? '#3b82f6' :
                               node.type === 'action' ? '#10b981' :
                               node.type === 'condition' ? '#f59e0b' : '#6b7280'
              }}
              onClick={() => onNodeClick && onNodeClick(node)}
              title={node.label}
            />
          );
        })}
        {/* Viewport indicator */}
        <div className="absolute border-2 border-[#256C3A] bg-[#256C3A] bg-opacity-10 rounded cursor-pointer"
             style={{
               left: '15%',
               top: '15%',
               width: '50%',
               height: '50%'
             }}
        />
      </div>
    </div>
  );
};

const WorkflowEditor = () => {
  const [selectedTab, setSelectedTab] = useState('properties');
  const [selectedNode, setSelectedNode] = useState(null);
  const [zoom, setZoom] = useState(100);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [showAddMenu, setShowAddMenu] = useState(false);
  const canvasRef = useRef(null);

  // Enhanced workflow data
  const [nodes, setNodes] = useState([
    {
      id: '1',
      type: 'trigger',
      label: 'Growth Analysis Complete',
      position: { x: 250, y: 180 },
      parameters: { sensor: 'camera-01', threshold: 85, interval: '2h' }
    },
    {
      id: '2',
      type: 'condition',
      label: 'Battery Level > 25%?',
      position: { x: 250, y: 320 },
      parameters: { minBattery: 25, unit: '%', checkInterval: '30s' }
    },
    {
      id: '3',
      type: 'action',
      label: 'Dispatch Pruning Robot',
      position: { x: 500, y: 380 },
      parameters: { robotId: 'ARM-01', pruningTarget: 15, maxDuration: '45m' }
    },
    {
      id: '4',
      type: 'end',
      label: 'Return to Charging Station',
      position: { x: 750, y: 440 },
      parameters: { chargingStation: 'CS-01', priority: 'normal' }
    },
    {
      id: '5',
      type: 'end',
      label: 'Low Battery Alert',
      position: { x: 250, y: 480 },
      parameters: { alertLevel: 'warning', notifyAdmin: true }
    }
  ]);

  const connections = [
    { from: '1', to: '2', label: '', type: 'default' },
    { from: '2', to: '3', label: 'Yes', type: 'default' },
    { from: '3', to: '4', label: '', type: 'default' },
    { from: '2', to: '5', label: 'No', type: 'error' }
  ];

  const nodeTemplates = [
    { type: 'trigger', label: 'New Trigger', icon: '⚡' },
    { type: 'action', label: 'New Action', icon: '🔧' },
    { type: 'condition', label: 'New Condition', icon: '❓' },
    { type: 'end', label: 'New End', icon: '🏁' }
  ];

  const handleNodeSelect = (node) => {
    setSelectedNode(node);
  };

  const handleNodeDrag = (nodeId, newPosition) => {
    setNodes(prevNodes =>
      prevNodes.map(node => {
        if (node.id === nodeId) {
          const updatedNode = { ...node, position: newPosition };
          if (selectedNode?.id === nodeId) {
            setSelectedNode(updatedNode);
          }
          return updatedNode;
        }
        return node;
      })
    );
  };

  const handleCanvasClick = (e) => {
    if (e.target === e.currentTarget) {
      setSelectedNode(null);
      setShowAddMenu(false);
    }
  };

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 25, 200));
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 25, 50));
  };

  const handleZoomFit = () => {
    setZoom(100);
    setPan({ x: 0, y: 0 });
  };

  const handleAddNode = (nodeType) => {
    const newNode = {
      id: String(nodes.length + 1),
      type: nodeType.type,
      label: nodeType.label,
      position: { x: 400, y: 200 },
      parameters: {}
    };
    setNodes(prev => [...prev, newNode]);
    setShowAddMenu(false);
    setSelectedNode(newNode);
  };

  const updateNodeProperty = (nodeId, property, value) => {
    setNodes(prevNodes =>
      prevNodes.map(node =>
        node.id === nodeId ? { ...node, [property]: value } : node
      )
    );
    if (selectedNode?.id === nodeId) {
      setSelectedNode(prev => ({ ...prev, [property]: value }));
    }
  };

  const updateNodeParameter = (nodeId, paramKey, value) => {
    setNodes(prevNodes =>
      prevNodes.map(node => {
        if (node.id === nodeId) {
          const updatedNode = {
            ...node,
            parameters: { ...node.parameters, [paramKey]: value }
          };
          if (selectedNode?.id === nodeId) {
            setSelectedNode(updatedNode);
          }
          return updatedNode;
        }
        return node;
      })
    );
  };

  // Generate connection lines
  const connectionLines = connections.map(conn => {
    const fromNode = nodes.find(n => n.id === conn.from);
    const toNode = nodes.find(n => n.id === conn.to);
    if (!fromNode || !toNode) return null;
    
    return {
      id: `${conn.from}-${conn.to}`,
      from: fromNode.position,
      to: toNode.position,
      label: conn.label,
      animated: true,
      type: conn.type
    };
  }).filter(Boolean);

  return (
    <div className="min-h-screen bg-gray-50 flex" data-testid="workflow-editor-page">
      {/* Main Content */}
      <main className="flex-1 flex" data-testid="main-content" role="main">
        {/* Content Area */}
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
                  <p className="text-sm text-gray-500">Workflow Editor</p>
                </div>
              </div>
              
              {/* Quick Actions */}
              <div className="flex space-x-3" data-testid="quick-actions">
                <Button className="bg-[#256C3A] hover:bg-[#1e5530] text-white shadow-md" data-testid="validate-workflow">
                  <Shield className="w-4 h-4 mr-2" />
                  Validate Workflow
                </Button>
                <Button variant="outline" className="border-[#3B4A6B] text-[#3B4A6B] hover:bg-[#3B4A6B] hover:text-white shadow-sm" data-testid="run-simulation">
                  <Play className="w-4 h-4 mr-2" />
                  Run Simulation
                </Button>
              </div>
            </div>
          </header>

          {/* Enhanced Toolbar */}
          <div className="bg-white border-b border-gray-200 px-8 py-4 shadow-sm" data-testid="workflow-toolbar">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => setShowAddMenu(!showAddMenu)}
                    className="shadow-sm"
                    data-testid="add-node"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Node
                    <ChevronDown className="w-4 h-4 ml-2" />
                  </Button>
                  {showAddMenu && (
                    <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-200 rounded-xl shadow-lg z-50">
                      {nodeTemplates.map((template) => (
                        <button
                          key={template.type}
                          className="w-full px-4 py-3 text-left hover:bg-gray-50 first:rounded-t-xl last:rounded-b-xl flex items-center space-x-3"
                          onClick={() => handleAddNode(template)}
                        >
                          <span className="text-lg">{template.icon}</span>
                          <div>
                            <div className="font-medium text-gray-900 capitalize">{template.type}</div>
                            <div className="text-xs text-gray-500">{template.label}</div>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                
                <Button variant="outline" size="sm" className="shadow-sm" data-testid="auto-layout">
                  <GitBranch className="w-4 h-4 mr-2" />
                  Auto Layout
                </Button>
                <Button variant="outline" size="sm" onClick={handleZoomFit} className="shadow-sm" data-testid="zoom-fit">
                  <ZoomIn className="w-4 h-4 mr-2" />
                  Zoom Fit
                </Button>
                <div className="flex items-center space-x-2 border-l pl-4 ml-4">
                  <Button variant="outline" size="sm" className="shadow-sm" data-testid="undo" disabled>
                    <Undo className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm" className="shadow-sm" data-testid="redo" disabled>
                    <Redo className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              
              {/* Enhanced Zoom Controls */}
              <div className="flex items-center space-x-3 bg-gray-50 rounded-xl px-4 py-2">
                <Button variant="ghost" size="sm" onClick={handleZoomOut} className="h-8 w-8 p-0" data-testid="zoom-out">
                  <ZoomOut className="w-4 h-4" />
                </Button>
                <span className="text-sm font-medium text-gray-700 w-12 text-center">{zoom}%</span>
                <Button variant="ghost" size="sm" onClick={handleZoomIn} className="h-8 w-8 p-0" data-testid="zoom-in">
                  <ZoomIn className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Enhanced Canvas */}
          <div className="flex-1 bg-gray-50 relative overflow-hidden" data-testid="workflow-canvas">
            <div 
              ref={canvasRef}
              className="w-full h-full relative cursor-grab active:cursor-grabbing"
              onClick={handleCanvasClick}
              style={{
                backgroundImage: `
                  radial-gradient(circle at 1px 1px, rgba(37, 108, 58, 0.15) 1px, transparent 0),
                  linear-gradient(rgba(37, 108, 58, 0.05) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(37, 108, 58, 0.05) 1px, transparent 1px)
                `,
                backgroundSize: '20px 20px, 20px 20px, 20px 20px',
                backgroundPosition: `${pan.x}px ${pan.y}px`
              }}
              aria-label="Workflow canvas"
            >
              {/* Connection Lines */}
              {connectionLines.map((line) => (
                <ConnectionLine
                  key={line.id}
                  from={line.from}
                  to={line.to}
                  label={line.label}
                  animated={line.animated}
                  type={line.type}
                />
              ))}

              {/* Workflow Nodes */}
              {nodes.map((node) => (
                <WorkflowNode
                  key={node.id}
                  node={node}
                  position={node.position}
                  isSelected={selectedNode?.id === node.id}
                  onSelect={handleNodeSelect}
                  onDrag={handleNodeDrag}
                />
              ))}
            </div>

            {/* Enhanced Minimap */}
            <Minimap 
              nodes={nodes} 
              selectedNode={selectedNode}
              onNodeClick={handleNodeSelect}
            />
          </div>
        </div>

        {/* Enhanced Inspector Panel */}
        <aside className="w-96 bg-white border-l border-gray-200 shadow-lg" data-testid="inspector-panel" role="complementary">
          <div className="h-full flex flex-col">
            {/* Inspector Header */}
            <div className="border-b border-gray-200 p-6 bg-gray-50">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Inspector</h3>
              <div className="flex space-x-1 bg-white rounded-xl p-1">
                <button
                  onClick={() => setSelectedTab('properties')}
                  className={`px-4 py-2.5 text-sm font-semibold rounded-lg transition-all ${
                    selectedTab === 'properties'
                      ? 'bg-[#256C3A] text-white shadow-md'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                  data-testid="properties-tab"
                >
                  Properties
                </button>
                <button
                  onClick={() => setSelectedTab('json')}
                  className={`px-4 py-2.5 text-sm font-semibold rounded-lg transition-all ${
                    selectedTab === 'json'
                      ? 'bg-[#256C3A] text-white shadow-md'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                  data-testid="json-tab"
                >
                  JSON Preview
                </button>
              </div>
            </div>

            {/* Enhanced Inspector Content */}
            <div className="flex-1 p-6 overflow-y-auto" aria-live="polite">
              {selectedNode ? (
                <div data-testid="node-inspector">
                  {selectedTab === 'properties' && (
                    <div className="space-y-8">
                      {/* Node Information */}
                      <div className="bg-gray-50 rounded-xl p-4">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-semibold text-gray-900">Node Information</h4>
                          <Badge className={`${
                            selectedNode.type === 'trigger' ? 'bg-blue-100 text-blue-800' :
                            selectedNode.type === 'action' ? 'bg-green-100 text-green-800' :
                            selectedNode.type === 'condition' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-gray-100 text-gray-800'
                          } capitalize font-semibold`}>
                            {selectedNode.type}
                          </Badge>
                        </div>
                        
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                              Node Label
                            </label>
                            <input
                              type="text"
                              value={selectedNode.label}
                              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#256C3A] focus:border-transparent transition-all"
                              data-testid="node-label-input"
                              onChange={(e) => updateNodeProperty(selectedNode.id, 'label', e.target.value)}
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-semibold text-gray-700 mb-2">X Position</label>
                              <div className="relative">
                                <input
                                  type="number"
                                  value={Math.round(selectedNode.position.x / 20)}
                                  className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm bg-gray-50"
                                  readOnly
                                />
                                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-gray-500">m</span>
                              </div>
                            </div>
                            <div>
                              <label className="block text-sm font-semibold text-gray-700 mb-2">Y Position</label>
                              <div className="relative">
                                <input
                                  type="number"
                                  value={Math.round(selectedNode.position.y / 20)}
                                  className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm bg-gray-50"
                                  readOnly
                                />
                                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-gray-500">m</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Parameters */}
                      {selectedNode.parameters && Object.keys(selectedNode.parameters).length > 0 && (
                        <div className="bg-blue-50 rounded-xl p-4">
                          <h4 className="font-semibold text-gray-900 mb-4">Parameters</h4>
                          <div className="space-y-4">
                            {Object.entries(selectedNode.parameters).map(([key, value]) => (
                              <div key={key}>
                                <label className="block text-sm font-semibold text-gray-700 mb-2 capitalize">
                                  {key.replace(/([A-Z])/g, ' $1').trim()}
                                </label>
                                <input
                                  type="text"
                                  value={String(value)}
                                  className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#256C3A] transition-all"
                                  data-testid={`param-${key}-input`}
                                  onChange={(e) => updateNodeParameter(selectedNode.id, key, e.target.value)}
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Add Parameter */}
                      <div className="border-2 border-dashed border-gray-200 rounded-xl p-4 text-center">
                        <Button variant="outline" size="sm" className="text-gray-600">
                          <Plus className="w-4 h-4 mr-2" />
                          Add Parameter
                        </Button>
                      </div>
                    </div>
                  )}

                  {selectedTab === 'json' && (
                    <div data-testid="json-preview" className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold text-gray-900">JSON Preview</h4>
                        <Button variant="outline" size="sm">Copy</Button>
                      </div>
                      <pre className="bg-gray-900 text-green-400 p-6 rounded-xl text-xs overflow-x-auto whitespace-pre-wrap font-mono border">
{JSON.stringify({
  id: selectedNode.id,
  type: selectedNode.type,
  label: selectedNode.label,
  parameters: selectedNode.parameters,
  position: {
    x: Math.round(selectedNode.position.x / 20),
    y: Math.round(selectedNode.position.y / 20)
  },
  metadata: {
    created: new Date().toISOString(),
    version: "1.0.0"
  }
}, null, 2)}
                      </pre>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-16" data-testid="no-selection">
                  <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
                    <Workflow className="w-10 h-10 text-gray-400" />
                  </div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-3">No Node Selected</h4>
                  <p className="text-gray-500 leading-relaxed max-w-sm mx-auto">
                    Click on any workflow node in the canvas to view and edit its properties, parameters, and configuration.
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

export default WorkflowEditor;