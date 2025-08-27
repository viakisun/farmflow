import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import IndexPage from './IndexPage';
import { describe, it, expect } from 'vitest';

describe('IndexPage', () => {
  it('renders the main heading and section titles', () => {
    render(
      <MemoryRouter>
        <IndexPage />
      </MemoryRouter>
    );

    // Check for the main page title
    expect(screen.getByRole('heading', { name: /FarmFlow Designer/i })).toBeInTheDocument();

    // Check for the subtitle
    expect(screen.getByText(/MVP Index/i)).toBeInTheDocument();

    // Check for section titles
    expect(screen.getByRole('heading', { name: /Core Modules/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Advanced Modules/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Management/i })).toBeInTheDocument();

    // Check for a few cards to ensure they are rendered
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('FF-CORE-001')).toBeInTheDocument();
    expect(screen.getByText('API & Developer Tools')).toBeInTheDocument();
    expect(screen.getByText('FF-ADV-004')).toBeInTheDocument();
  });
});
