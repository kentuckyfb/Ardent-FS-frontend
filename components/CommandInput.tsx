import React from 'react';
import { Command } from 'lucide-react';

interface CommandInputProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  handleCommand: (e: React.FormEvent) => void;
  cursorVisible: boolean;
  isLoading: boolean;
}

const CommandInput: React.FC<CommandInputProps> = ({ 
  searchQuery, 
  setSearchQuery, 
  handleCommand, 
  cursorVisible,
  isLoading
}) => (
  <form onSubmit={handleCommand} className="relative mb-4">
    <div className="flex items-center bg-gray-900 rounded-md border border-gray-700 px-3 py-2">
      <span className="text-blue-400 mr-2">
        <Command size={16} className="inline" />
      </span>
      <input
        type="text"
        value={searchQuery}
        onChange={e => setSearchQuery(e.target.value)}
        className="flex-1 bg-transparent outline-none caret-transparent"
        placeholder="Type a command (try 'help' or 'search filename')"
        autoFocus
        disabled={isLoading}
      />
      <span className={`w-2 h-5 bg-green-400 ml-1 ${cursorVisible ? 'opacity-100' : 'opacity-0'}`}></span>
    </div>
  </form>
);

export default CommandInput;