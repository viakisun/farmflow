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
    <div className="h-full overflow-y-auto p-4 md:p-8">
      <header className="mb-10 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight dark:text-white">FarmFlow Designer</h1>
        <p className="text-lg text-muted-foreground mt-2">MVP Application Hub</p>
      </header>
      <main className="max-w-7xl mx-auto">
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
