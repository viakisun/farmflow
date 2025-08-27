import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AppLayout from './components/layout/AppLayout';
import SiteLayout from './components/layout/SiteLayout';
import IndexPage from './pages/IndexPage';
import DashboardPage from './pages/DashboardPage';
import MapEditorPage from './pages/MapEditorPage';
import WorkflowEditorPage from './pages/WorkflowEditorPage';
import SimulationViewerPage from './pages/SimulationViewerPage';
import MissionSchedulerPage from './pages/MissionSchedulerPage';
import RobotLibraryManagerPage from './pages/RobotLibraryManagerPage';
import ScenarioTemplateGalleryPage from './pages/ScenarioTemplateGalleryPage';
import ExportCenterPage from './pages/ExportCenterPage';
import PerformanceDashboardPage from './pages/PerformanceDashboardPage';
import CollisionSafetyPage from './pages/CollisionSafetyPage';
import ApiToolsPage from './pages/ApiToolsPage';
import HelpTutorialsPage from './pages/HelpTutorialsPage';

const router = createBrowserRouter([
  {
    element: <SiteLayout />,
    children: [
      {
        path: '/',
        element: <IndexPage />,
      },
    ],
  },
  {
    element: <AppLayout />,
    children: [
      {
        path: '/dashboard',
        element: <DashboardPage />,
      },
      {
        path: '/map-editor',
        element: <MapEditorPage />,
      },
      {
        path: '/workflow-editor',
        element: <WorkflowEditorPage />,
      },
      {
        path: '/simulation-viewer',
        element: <SimulationViewerPage />,
      },
      {
        path: '/mission-scheduler',
        element: <MissionSchedulerPage />,
      },
      {
        path: '/robot-library',
        element: <RobotLibraryManagerPage />,
      },
      {
        path: '/scenario-templates',
        element: <ScenarioTemplateGalleryPage />,
      },
      {
        path: '/design-export',
        element: <ExportCenterPage />,
      },
      {
        path: '/performance-dashboard',
        element: <PerformanceDashboardPage />,
      },
      {
        path: '/safety-validation',
        element: <CollisionSafetyPage />,
      },
      {
        path: '/developer-tools',
        element: <ApiToolsPage />,
      },
      {
        path: '/help',
        element: <HelpTutorialsPage />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
