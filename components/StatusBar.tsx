import React from 'react';

interface StatusBarProps {
  isLoading: boolean;
}

const StatusBar: React.FC<StatusBarProps> = ({ isLoading }) => (
  <div className="mt-2 flex justify-between text-xs text-gray-500">
    <div>v1.0.0</div>
    <div className="flex items-center">
      <span className={`inline-block w-2 h-2 rounded-full ${isLoading ? 'bg-yellow-500' : 'bg-green-500'} mr-1`}></span>
      <span>{isLoading ? 'Processing' : 'Ready'}</span>
    </div>
    <div>AI Engine: Active</div>
  </div>
);

export default StatusBar;