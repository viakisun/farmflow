import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';
import { describe, it, expect } from 'vitest';

// Mock the dashboard page to isolate the routing test
vi.mock('./pages/DashboardPage', () => ({
  default: () => <div>Mocked Dashboard Page</div>,
}));

describe('App Routing', () => {
  it('renders the index page for the root route', () => {
    // Render the App with the root route
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );

    // Check if the IndexPage's main heading is present
    expect(screen.getByRole('heading', { name: /FarmFlow Designer/i })).toBeInTheDocument();
  });

  it('renders the dashboard page for the /dashboard route', () => {
    // Render the App with the /dashboard route
    render(
        <MemoryRouter initialEntries={['/dashboard']}>
            <App />
        </MemoryRouter>
    );

    // Check if the mocked dashboard page content is present
    // Note: It's better to test for actual content of the page,
    // but for a simple routing test, checking for a unique element is sufficient.
    // The DashboardPage is complex, so we check for its top-level test id.
    // I will remove the mock and test for the actual content.
    expect(screen.getByTestId('dashboard-page')).toBeInTheDocument();
  });

  it('renders the placeholder page for the /map-editor route', () => {
    // Render the App with the /map-editor route
    render(
        <MemoryRouter initialEntries={['/map-editor']}>
            <App />
        </MemoryRouter>
    );

    // Check for the content of the placeholder page
    expect(screen.getByRole('heading', { name: /3D Greenhouse Map Editor Page/i })).toBeInTheDocument();
  });
});
