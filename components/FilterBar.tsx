// File: components/TerminalFileSearch/FilterBar.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { File, FileText, Folder, Calendar } from 'lucide-react';

interface FilterBarProps {
  activeFilters: string[];
  handleFilterClick: (filter: string) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ 
  activeFilters,
  handleFilterClick
}) => {
  const filters = [
    { id: 'file', label: 'Files', icon: <File size={14} className="mr-1" />, color: 'blue' },
    { id: 'folder', label: 'Folders', icon: <Folder size={14} className="mr-1" />, color: 'yellow' },
    { id: 'doc', label: 'Documents', icon: <FileText size={14} className="mr-1" />, color: 'green' },
    { id: 'recent', label: 'Recent', icon: <Calendar size={14} className="mr-1" />, color: 'purple' },
  ];

  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {filters.map(filter => {
        const isActive = activeFilters.includes(filter.id);
        const colorClass = `text-${filter.color}-400 border-${filter.color}-800`;
        const activeClass = isActive ? `bg-${filter.color}-900` : 'bg-gray-800';
        
        return (
          <motion.button
            key={filter.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleFilterClick(filter.id)}
            className={`flex items-center px-3 py-1 ${activeClass} ${colorClass} rounded-md border text-sm`}
          >
            {filter.icon}
            <span>{filter.label}</span>
          </motion.button>
        );
      })}
    </div>
  );
};

export default FilterBar;