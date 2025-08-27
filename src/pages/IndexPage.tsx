import React from 'react';
import IndexSection from '@/components/layout/IndexSection';
import {
  LayoutDashboard,
  Map,
  Workflow,
  PlayCircle,
  Calendar,
  Bot,
  GalleryVertical,
  Share2,
  BarChart,
  ShieldCheck,
  Code2,
  BookOpen,
} from 'lucide-react';

const corePages = [
  { code: 'FF-CORE-001', title: 'Dashboard', description: 'KPI cards, simulation execution, trend charts, and event logs.', to: '/dashboard', type: 'CORE' as const, icon: LayoutDashboard },
  { code: 'FF-CORE-002', title: '3D Greenhouse Map Editor', description: '1m grid greenhouse map with placement, zoom, and minimap.', to: '/map-editor', type: 'CORE' as const, icon: Map },
  { code: 'FF-CORE-003', title: 'Workflow Editor', description: 'Node-based Trigger/Action/Condition/End sequence editor.', to: '/workflow-editor', type: 'CORE' as const, icon: Workflow },
  { code: 'FF-CORE-004', title: 'Simulation Viewer', description: '3D playback with speed controls, scrubber, and visualizations.', to: '/simulation-viewer', type: 'CORE' as const, icon: PlayCircle },
  { code: 'FF-CORE-005', title: 'Mission Scheduler', description: 'Gantt-style timeline with DnD, and collision warnings.', to: '/mission-scheduler', type: 'CORE' as const, icon: Calendar },
  { code: 'FF-CORE-006', title: 'Robot Library Manager', description: 'Table for models, firmware, and batteries with bulk updates.', to: '/robot-library', type: 'CORE' as const, icon: Bot },
  { code: 'FF-CORE-007', title: 'Scenario Template Gallery', description: 'Preview and apply representative scenario templates.', to: '/scenario-templates', type: 'CORE' as const, icon: GalleryVertical },
  { code: 'FF-CORE-008', title: 'Design Export Center', description: 'Export to ROS2, JSON, PDF, OpenAPI with version tagging.', to: '/design-export', type: 'CORE' as const, icon: Share2 },
];

const advancedPages = [
  { code: 'FF-ADV-001', title: 'Performance Analysis Dashboard', description: 'Compare KPIs like completion rate, time, energy, and collisions.', to: '/performance-dashboard', type: 'ADV' as const, icon: BarChart },
  { code: 'FF-ADV-002', title: 'Collision & Safety Validation', description: 'Path vs. worker heatmap and safety distance compliance.', to: '/safety-validation', type: 'ADV' as const, icon: ShieldCheck },
  { code: 'FF-ADV-004', title: 'API & Developer Tools', description: 'API Explorer, SDK, Webhook Tester, and API key management.', to: '/developer-tools', type: 'ADV' as const, icon: Code2 },
];

const managementPages = [
  { code: 'FF-MGT-004', title: 'Help & Tutorials', description: 'Getting Started, Tutorials, FAQ, Docs, and progress tracking.', to: '/help', type: 'MGT' as const, icon: BookOpen },
];

const IndexPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-foreground">
      <header className="relative bg-white dark:bg-gray-800/50 py-10 sm:py-12 md:py-16 mb-10 text-center overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-10">
            {/* Decorative SVG background */}
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 400"><path fill="currentColor" d="M362.6-11.4c-81.2 5.5-161.7 39-232.2 92.5l-2.1 1.6c-17.5 13.4-34.4 27.6-50.2 42.6L1.6 189.5C-1.8 222.8 1.4 259.9 14.8 291.6c13.4 31.7 36.3 58.3 66.3 77.2l2.3 1.4c71.3 44.4 150.9 69.3 234.3 71.1l2.3.1c83.4-1.8 163-26.7 234.3-71.1l2.3-1.4c30-18.9 52.9-45.5 66.3-77.2c13.4-31.7 16.6-68.8 3.2-102.1l-14-36.2c-15.8-15-32.7-29.2-50.2-42.6l-2.1-1.6c-70.5-53.5-151-87-232.2-92.5l-5.6-.4-5.6.4z" /></svg>
        </div>
        <div className="relative z-10 flex flex-col items-center">
            <div className="w-16 h-16 mb-4">
                <svg viewBox="0 0 64 64">
                    <defs>
                        <linearGradient id="logoBg" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style={{stopColor:'#256C3A'}}/>
                        <stop offset="100%" style={{stopColor:'#1e5530'}}/>
                        </linearGradient>
                    </defs>
                    <rect x="8" y="8" width="48" height="48" rx="12" fill="url(#logoBg)"/>
                    <rect x="16" y="36" width="4" height="12" fill="white" rx="2"/>
                    <rect x="22" y="32" width="4" height="16" fill="white" rx="2"/>
                    <rect x="28" y="28" width="4" height="20" fill="white" rx="2"/>
                    <rect x="34" y="24" width="4" height="24" fill="white" rx="2"/>
                    <rect x="40" y="30" width="4" height="18" fill="white" rx="2"/>
                    <circle cx="48" cy="20" r="4" fill="white"/>
                    <rect x="46" y="18" width="4" height="4" fill="#256C3A" rx="1"/>
                </svg>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">FarmFlow Designer</h1>
            <p className="text-lg text-muted-foreground mt-2">MVP Index</p>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <IndexSection title="Core Modules" pages={corePages} />
        <IndexSection title="Advanced Modules" pages={advancedPages} />
        <IndexSection title="Management" pages={managementPages} />
      </main>
      <footer className="text-center mt-12 py-8 text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} FarmFlow. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default IndexPage;
