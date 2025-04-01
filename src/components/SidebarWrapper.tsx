import React, { ReactNode } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

interface SidebarWrapperProps {
  children: ReactNode;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const SidebarWrapper: React.FC<SidebarWrapperProps> = ({ 
  children, 
  sidebarOpen, 
  setSidebarOpen 
}) => {
  return (
    <div className="flex h-screen w-full bg-background">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} />
      
      {/* Main content */}
      <div className="flex-1 overflow-auto">
        <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <main className="pt-14 min-h-screen">
          {children}
        </main>
      </div>
    </div>
  );
};

export default SidebarWrapper; 