import React from 'react';
import { GraduationCap } from 'lucide-react';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-imperial-navy text-white py-6 shadow-md">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center">
            <GraduationCap className="h-8 w-8 mr-3 text-imperial-teal" />
            <div>
              <h1 className="text-2xl font-bold">OmarBot</h1>
              <p className="text-imperial-teal text-sm font-medium">Marketing Management Assistant</p>
            </div>
          </div>
        </div>
      </header>
      <main className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
        {children}
      </main>
    </div>
  );
};

export default Layout;