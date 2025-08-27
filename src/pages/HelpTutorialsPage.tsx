import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Search,
  Book,
  Play,
  CheckCircle,
  Clock,
  ArrowRight,
  ChevronDown,
  ChevronRight,
  Settings,
  Home,
  BarChart3,
  Workflow,
  Calendar,
  Package,
  Star,
  Shield,
  Code,
  Download,
  Bell,
  User,
  HelpCircle,
  BookOpen,
  Video,
  MessageSquare,
  ExternalLink,
  FileText,
  Bookmark,
  Mail,
  Phone,
  Users,
  Lightbulb,
  Target,
  Zap,
  Map,
  PlayCircle,
  Pause,
  Volume2
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

// Getting Started Step Component
const GettingStartedStep = ({ step, isCompleted, isActive, onClick }) => {
  return (
    <div 
      className={`p-6 rounded-xl border cursor-pointer transition-all ${
        isActive ? 'border-[#256C3A] bg-[#256C3A]/5' : 
        isCompleted ? 'border-green-300 bg-green-50' : 
        'border-gray-200 hover:border-gray-300'
      }`}
      onClick={() => onClick(step)}
      data-testid={`getting-started-step-${step.id}`}
    >
      <div className="flex items-start space-x-4">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
          isCompleted ? 'bg-green-500 text-white' : 
          isActive ? 'bg-[#256C3A] text-white' : 
          'bg-gray-200 text-gray-600'
        }`}>
          {isCompleted ? <CheckCircle className="w-5 h-5" /> : <span className="font-bold text-sm">{step.order}</span>}
        </div>
        <div className="flex-1">
          <h4 className="font-bold text-gray-900 mb-2">{step.title}</h4>
          <p className="text-sm text-gray-600 mb-3">{step.description}</p>
          <div className="flex items-center space-x-3 text-sm text-gray-500">
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4" />
              <span>{step.duration}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Target className="w-4 h-4" />
              <span>{step.difficulty}</span>
            </div>
          </div>
        </div>
        <ArrowRight className={`w-5 h-5 ${isActive ? 'text-[#256C3A]' : 'text-gray-400'}`} />
      </div>
    </div>
  );
};

// Tutorial Card Component
const TutorialCard = ({ tutorial, onStart }) => {
  return (
    <Card className="hover:shadow-lg transition-shadow group" data-testid={`tutorial-card-${tutorial.id}`}>
      <CardHeader className="pb-4">
        <div className="relative mb-4">
          <div className="w-full h-32 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center">
            <PlayCircle className="w-12 h-12 text-[#256C3A] group-hover:scale-110 transition-transform" />
          </div>
          <Badge className="absolute top-2 right-2 bg-[#256C3A] text-white">
            {tutorial.type}
          </Badge>
        </div>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg font-bold mb-2">{tutorial.title}</CardTitle>
            <p className="text-sm text-gray-600 line-clamp-2">{tutorial.description}</p>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-3 text-gray-500">
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span>{tutorial.duration}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Users className="w-4 h-4" />
                <span>{tutorial.views} views</span>
              </div>
            </div>
            <Badge variant="outline" className="text-xs">
              {tutorial.difficulty}
            </Badge>
          </div>
          
          <Button 
            onClick={() => onStart(tutorial)}
            className="w-full bg-[#256C3A] hover:bg-[#1e5530] text-white"
          >
            <Play className="w-4 h-4 mr-2" />
            Start Tutorial
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

// FAQ Item Component
const FAQItem = ({ faq, isExpanded, onToggle }) => {
  return (
    <div 
      className="border border-gray-200 rounded-xl overflow-hidden"
      data-testid={`faq-item-${faq.id}`}
    >
      <button
        className="w-full p-6 text-left hover:bg-gray-50 transition-colors flex items-center justify-between"
        onClick={() => onToggle(faq.id)}
      >
        <h4 className="font-semibold text-gray-900 pr-4">{faq.question}</h4>
        {isExpanded ? <ChevronDown className="w-5 h-5 text-gray-500" /> : <ChevronRight className="w-5 h-5 text-gray-500" />}
      </button>
      {isExpanded && (
        <div className="px-6 pb-6 border-t border-gray-200 bg-gray-50/50">
          <div className="pt-4 text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: faq.answer }} />
          {faq.relatedLinks && (
            <div className="mt-4 space-y-2">
              <p className="text-sm font-medium text-gray-900">Related Resources:</p>
              {faq.relatedLinks.map((link, index) => (
                <a key={index} href="#" className="block text-sm text-[#256C3A] hover:underline">
                  {link.title}
                </a>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// Documentation Link Component
const DocumentationLink = ({ doc }) => {
  return (
    <a 
      href="#" 
      className="block p-4 border border-gray-200 rounded-xl hover:border-[#256C3A] hover:bg-[#256C3A]/5 transition-all group"
      data-testid={`doc-link-${doc.id}`}
    >
      <div className="flex items-start space-x-3">
        <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-[#256C3A] group-hover:text-white transition-colors">
          <FileText className="w-5 h-5" />
        </div>
        <div className="flex-1">
          <h4 className="font-semibold text-gray-900 group-hover:text-[#256C3A] transition-colors">
            {doc.title}
          </h4>
          <p className="text-sm text-gray-600 mt-1">{doc.description}</p>
          <div className="flex items-center space-x-3 mt-2 text-xs text-gray-500">
            <span>Last updated: {doc.lastUpdated}</span>
            <span>•</span>
            <span>{doc.type}</span>
          </div>
        </div>
        <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-[#256C3A] transition-colors" />
      </div>
    </a>
  );
};

const HelpTutorialsPage = () => {
  const [activeTab, setActiveTab] = useState('getting-started');
  const [activeStep, setActiveStep] = useState(null);
  const [expandedFAQ, setExpandedFAQ] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Sample getting started steps
  const gettingStartedSteps = [
    {
      id: 'setup-account',
      order: 1,
      title: 'Set Up Your Account',
      description: 'Create your developer account and configure initial settings for greenhouse management.',
      duration: '5 min',
      difficulty: 'Easy',
      completed: true
    },
    {
      id: 'first-workflow',
      order: 2,
      title: 'Create Your First Workflow',
      description: 'Learn the basics of workflow design with our interactive workflow builder.',
      duration: '10 min',
      difficulty: 'Easy',
      completed: true
    },
    {
      id: 'map-setup',
      order: 3,
      title: 'Configure Greenhouse Map',
      description: 'Set up your 80m × 30m greenhouse layout with zones and robot paths.',
      duration: '15 min',
      difficulty: 'Medium',
      completed: false
    },
    {
      id: 'first-simulation',
      order: 4,
      title: 'Run Your First Simulation',
      description: 'Execute and validate your workflow with our advanced simulation engine.',
      duration: '12 min',
      difficulty: 'Medium',
      completed: false
    },
    {
      id: 'api-integration',
      order: 5,
      title: 'API Integration',
      description: 'Connect your applications using our comprehensive REST API.',
      duration: '20 min',
      difficulty: 'Advanced',
      completed: false
    }
  ];

  // Sample tutorials
  const tutorials = [
    {
      id: 'workflow-basics',
      title: 'Workflow Design Fundamentals',
      description: 'Master the core concepts of robot workflow design and automation patterns.',
      duration: '18 min',
      difficulty: 'Beginner',
      views: '2.1k',
      type: 'Video'
    },
    {
      id: 'map-editing',
      title: 'Greenhouse Map Editor',
      description: 'Complete guide to setting up your greenhouse layout with zones and obstacles.',
      duration: '25 min',
      difficulty: 'Intermediate',
      views: '1.5k',
      type: 'Interactive'
    },
    {
      id: 'scheduling-advanced',
      title: 'Advanced Scheduling Techniques',
      description: 'Optimize robot schedules for maximum efficiency and minimal conflicts.',
      duration: '32 min',
      difficulty: 'Advanced',
      views: '890',
      type: 'Video'
    },
    {
      id: 'simulation-debugging',
      title: 'Simulation & Debugging',
      description: 'Debug workflows using simulation tools and performance analytics.',
      duration: '22 min',
      difficulty: 'Intermediate',
      views: '1.2k',
      type: 'Interactive'
    },
    {
      id: 'safety-validation',
      title: 'Safety & Collision Validation',
      description: 'Ensure safe robot operations with comprehensive safety validation.',
      duration: '28 min',
      difficulty: 'Advanced',
      views: '743',
      type: 'Video'
    },
    {
      id: 'api-integration',
      title: 'API Integration Workshop',
      description: 'Build custom applications using FarmFlow APIs and SDKs.',
      duration: '45 min',
      difficulty: 'Advanced',
      views: '654',
      type: 'Workshop'
    }
  ];

  // Sample FAQ items
  const faqItems = [
    {
      id: 'greenhouse-size',
      question: 'Can I configure greenhouse dimensions other than 80m × 30m?',
      answer: 'Currently, FarmFlow Designer is optimized for the standard 80m × 30m greenhouse layout with 1m grid precision. Custom dimensions will be supported in a future release. You can create zones within the standard layout to simulate different greenhouse sections.',
      relatedLinks: [
        { title: 'Greenhouse Layout Configuration Guide', url: '#' },
        { title: 'Zone Management Tutorial', url: '#' }
      ]
    },
    {
      id: 'robot-limits',
      question: 'What is the maximum number of robots I can simulate?',
      answer: 'The simulation engine supports up to 50 robots simultaneously. For optimal performance, we recommend starting with 5-10 robots and scaling based on your computational requirements and use case complexity.',
      relatedLinks: [
        { title: 'Performance Optimization Guide', url: '#' }
      ]
    },
    {
      id: 'api-rate-limits',
      question: 'What are the API rate limits for different subscription tiers?',
      answer: 'API rate limits vary by subscription: <br>• Free tier: 100 requests/minute<br>• Professional: 1,000 requests/minute<br>• Enterprise: 10,000 requests/minute<br><br>Rate limits reset every minute and can be monitored in your developer console.',
      relatedLinks: [
        { title: 'API Documentation', url: '#' },
        { title: 'Subscription Plans', url: '#' }
      ]
    },
    {
      id: 'data-export',
      question: 'How can I export simulation results and workflow data?',
      answer: 'FarmFlow provides multiple export options including JSON, CSV, PDF reports, and ROS2 launch files. You can access the Export Center from the main navigation or use our REST API for programmatic data export.',
      relatedLinks: [
        { title: 'Export Center Guide', url: '#' },
        { title: 'Data Export API Reference', url: '#' }
      ]
    },
    {
      id: 'ros2-integration',
      question: 'Is ROS2 integration required for using FarmFlow?',
      answer: 'ROS2 integration is optional but recommended for production deployments. FarmFlow can generate ROS2-compatible launch files and configurations, but also supports standalone operation and custom API integrations for non-ROS environments.',
      relatedLinks: [
        { title: 'ROS2 Integration Guide', url: '#' },
        { title: 'Custom Integration Examples', url: '#' }
      ]
    }
  ];

  // Sample documentation links
  const documentationLinks = [
    {
      id: 'api-reference',
      title: 'API Reference',
      description: 'Complete REST API documentation with interactive examples',
      lastUpdated: '2 days ago',
      type: 'API Documentation'
    },
    {
      id: 'sdk-guides',
      title: 'SDK Integration Guides',
      description: 'Python, TypeScript, and ROS2 SDK documentation and examples',
      lastUpdated: '1 week ago',
      type: 'SDK Documentation'
    },
    {
      id: 'system-architecture',
      title: 'System Architecture',
      description: 'Technical overview of FarmFlow platform architecture and components',
      lastUpdated: '3 days ago',
      type: 'Technical Documentation'
    },
    {
      id: 'deployment-guide',
      title: 'Deployment Guide',
      description: 'Production deployment strategies and best practices',
      lastUpdated: '5 days ago',
      type: 'Operations Guide'
    }
  ];

  // Sample user progress data
  const userProgress = {
    onboardingProgress: 75,
    completedTutorials: 4,
    totalTutorials: tutorials.length,
    bookmarkedGuides: ['workflow-basics', 'map-editing', 'api-integration'],
    totalTimeSpent: '2h 45m'
  };

  const tabs = [
    { id: 'getting-started', label: 'Getting Started', icon: Zap },
    { id: 'tutorials', label: 'Tutorials', icon: Video },
    { id: 'faq', label: 'FAQ', icon: HelpCircle },
    { id: 'documentation', label: 'Documentation', icon: FileText }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'getting-started':
        return (
          <div className="space-y-6" data-testid="getting-started-content">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Get Started with FarmFlow</h3>
              <div className="bg-[#256C3A]/5 border border-[#256C3A]/20 rounded-xl p-6 mb-6">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-[#256C3A]">Your Progress</h4>
                  <span className="text-[#256C3A] font-bold">{userProgress.onboardingProgress}% Complete</span>
                </div>
                <div className="w-full bg-[#256C3A]/20 rounded-full h-3">
                  <div 
                    className="bg-[#256C3A] h-3 rounded-full transition-all duration-500"
                    style={{ width: `${userProgress.onboardingProgress}%` }}
                  />
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              {gettingStartedSteps.map(step => (
                <GettingStartedStep
                  key={step.id}
                  step={step}
                  isCompleted={step.completed}
                  isActive={activeStep?.id === step.id}
                  onClick={setActiveStep}
                />
              ))}
            </div>
          </div>
        );

      case 'tutorials':
        return (
          <div className="space-y-6" data-testid="tutorials-content">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Video Tutorials & Walkthroughs</h3>
              <p className="text-gray-600 mb-6">Comprehensive guides to master FarmFlow's features and capabilities.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tutorials.map(tutorial => (
                <TutorialCard
                  key={tutorial.id}
                  tutorial={tutorial}
                  onStart={(tutorial) => console.log('Starting tutorial:', tutorial.id)}
                />
              ))}
            </div>
          </div>
        );

      case 'faq':
        return (
          <div className="space-y-6" data-testid="faq-content">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h3>
              <p className="text-gray-600 mb-6">Common questions and solutions from our developer community.</p>
            </div>
            
            <div className="space-y-4">
              {faqItems.map(faq => (
                <FAQItem
                  key={faq.id}
                  faq={faq}
                  isExpanded={expandedFAQ === faq.id}
                  onToggle={(id) => setExpandedFAQ(expandedFAQ === id ? null : id)}
                />
              ))}
            </div>
          </div>
        );

      case 'documentation':
        return (
          <div className="space-y-6" data-testid="documentation-content">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Technical Documentation</h3>
              <p className="text-gray-600 mb-6">Comprehensive technical guides and API references.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {documentationLinks.map(doc => (
                <DocumentationLink key={doc.id} doc={doc} />
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex" data-testid="help-tutorials-page">
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
                  <p className="text-sm text-gray-600 font-medium">Help & Tutorials</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search help articles..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-3 w-96 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#256C3A] focus:border-transparent transition-all shadow-sm"
                    data-testid="help-search"
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

          {/* Tab Navigation */}
          <div className="bg-white border-b border-gray-200 px-8" data-testid="tab-navigation">
            <div className="flex space-x-0">
              {tabs.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id)}
                  className={`flex items-center space-x-2 px-6 py-4 text-sm font-medium border-b-2 transition-all ${
                    activeTab === id
                      ? 'border-[#256C3A] text-[#256C3A] bg-[#256C3A]/5'
                      : 'border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                  data-testid={`tab-${id}`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="flex-1 p-8" data-testid="tab-content">
            {renderTabContent()}
          </div>
        </div>

        {/* Inspector Panel */}
        <aside className="w-96 bg-white border-l border-gray-200 shadow-lg" data-testid="inspector-panel" role="complementary">
          <div className="h-full flex flex-col">
            <div className="border-b border-gray-200 p-6 bg-gradient-to-r from-gray-50 to-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-1">Learning Progress</h3>
              <p className="text-sm text-gray-600">Track your FarmFlow mastery</p>
            </div>
            
            <div className="flex-1 p-6 overflow-y-auto space-y-6">
              {/* Progress Overview */}
              <div data-testid="progress-overview">
                <h4 className="font-bold text-gray-900 mb-4">Your Progress</h4>
                <div className="space-y-4">
                  <div className="bg-[#256C3A]/5 p-4 rounded-xl border border-[#256C3A]/20">
                    <div className="text-2xl font-bold text-[#256C3A] mb-1">
                      {userProgress.completedTutorials}/{userProgress.totalTutorials}
                    </div>
                    <div className="text-sm text-gray-600">Tutorials Completed</div>
                  </div>
                  
                  <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
                    <div className="text-2xl font-bold text-blue-600 mb-1">
                      {userProgress.totalTimeSpent}
                    </div>
                    <div className="text-sm text-gray-600">Total Learning Time</div>
                  </div>

                  <div className="bg-amber-50 p-4 rounded-xl border border-amber-200">
                    <div className="text-2xl font-bold text-amber-600 mb-1">
                      {userProgress.onboardingProgress}%
                    </div>
                    <div className="text-sm text-gray-600">Onboarding Complete</div>
                  </div>
                </div>
              </div>

              {/* Bookmarked Guides */}
              <div data-testid="bookmarked-guides">
                <h4 className="font-bold text-gray-900 mb-4">Bookmarked Guides</h4>
                <div className="space-y-3">
                  {userProgress.bookmarkedGuides.map((guideId) => {
                    const tutorial = tutorials.find(t => t.id === guideId);
                    return tutorial ? (
                      <div key={guideId} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                        <Bookmark className="w-4 h-4 text-[#256C3A]" />
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium text-gray-900 truncate">{tutorial.title}</div>
                          <div className="text-xs text-gray-500">{tutorial.duration}</div>
                        </div>
                      </div>
                    ) : null;
                  })}
                </div>
              </div>

              {/* Support Options */}
              <div data-testid="support-options">
                <h4 className="font-bold text-gray-900 mb-4">Need More Help?</h4>
                <div className="space-y-3">
                  <Button 
                    variant="outline" 
                    className="w-full justify-start border-gray-300"
                    data-testid="contact-support"
                  >
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Live Chat Support
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="w-full justify-start border-gray-300"
                    data-testid="email-support"
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    Email Support
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="w-full justify-start border-gray-300"
                    data-testid="community-forum"
                  >
                    <Users className="w-4 h-4 mr-2" />
                    Community Forum
                  </Button>
                </div>
              </div>

              {/* Quick Links */}
              <div data-testid="quick-links">
                <h4 className="font-bold text-gray-900 mb-4">Quick Links</h4>
                <div className="space-y-2 text-sm">
                  <a href="#" className="block text-[#256C3A] hover:underline">System Status</a>
                  <a href="#" className="block text-[#256C3A] hover:underline">Release Notes</a>
                  <a href="#" className="block text-[#256C3A] hover:underline">Developer Blog</a>
                  <a href="#" className="block text-[#256C3A] hover:underline">Feature Requests</a>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
};

export default HelpTutorialsPage;