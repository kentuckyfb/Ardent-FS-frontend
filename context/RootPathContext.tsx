"use client";

// context/RootPathContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define types for the context
interface RootPathContextType {
  rootPath: string;
  setRootPath: (path: string) => void;
}

// Create context with default values
const RootPathContext = createContext<RootPathContextType | undefined>(undefined);

// Context provider to manage root path
export const RootPathProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [rootPath, setRootPath] = useState<string>('/test_files'); // Default root path

  return (
    <RootPathContext.Provider value={{ rootPath, setRootPath }}>
      {children}
    </RootPathContext.Provider>
  );
};

// Hook to access root path context
export const useRootPath = (): RootPathContextType => {
  const context = useContext(RootPathContext);
  if (!context) {
    throw new Error('useRootPath must be used within a RootPathProvider');
  }
  return context;
};
