import React from 'react';
import { Outlet } from 'react-router-dom';

const SiteLayout: React.FC = () => {
  return (
    <div className="min-h-screen">
      <Outlet />
    </div>
  );
};

export default SiteLayout;
