import React from 'react';
import { motion } from 'framer-motion';
import { Folder, File, FileText, ChevronRight } from 'lucide-react';
import { CommandHistoryEntry, FileResult } from './types';
import { resourceLimits } from 'worker_threads';

interface TerminalOutputProps {
  commandHistory: CommandHistoryEntry[];
  isTyping: boolean;
}

const TerminalOutput: React.FC<TerminalOutputProps> = ({ commandHistory, isTyping }) => {
  const formatDate = (timestamp: string) => {
    try {
      const date = new Date(parseInt(timestamp) * 1000);
      return date.toLocaleString();
    } catch (e) {
      return timestamp;
    }
  };



  const getFileIcon = (result: FileResult) => {
    if (!result || !result.name) {
      return <File className="mr-2" size={16} />;
    }
    if (result.icon) {
      return <span className="mr-2 text-lg">{result.icon}</span>;
    }

    if (result.type === 'folder') {
      return <Folder className="mr-2 text-yellow-400" size={16} />;
    } else {
      const extension = typeof result.name === 'string' ? result.name.split('.').pop()?.toLowerCase() : '';
      switch (extension) {
        case 'json': return <File className="mr-2 text-yellow-400" size={16} />;
        case 'js':
        case 'ts':
        case 'tsx':
        case 'jsx': return <FileText className="mr-2 text-blue-400" size={16} />;
        case 'md': return <FileText className="mr-2 text-green-400" size={16} />;
        case 'txt': return <FileText className="mr-2 text-gray-400" size={16} />;
        default: return <File className="mr-2" size={16} />;
      }
    }
  };

  return (
    <div className="flex-1 mb-4 overflow-auto bg-gray-900 p-4 rounded-md border border-gray-700 max-h-96 min-h-[300px]">
      {commandHistory.map((entry, index) => (
        <div key={index} className="mb-3">
          {entry.type === 'user' ? (
            <div className="flex">
              <span className="text-blue-400 mr-2">
                <ChevronRight size={16} className="inline" />
              </span>
              <span>{entry.content}</span>
            </div>
          ) : entry.type === 'results' ? (
            <div className="pl-4 mt-2 space-y-2">
              {entry.content.length > 0 ? (
                <>
                  {entry.keywords && entry.keywords.length > 0 && (
                    <div className="text-xs text-gray-400 mb-2">
                      <span className="text-purple-400 font-semibold">Keywords:</span> {entry.keywords.join(', ')}
                    </div>
                  )}
                  <div className="grid grid-cols-[auto_1fr_auto] gap-x-4 gap-y-1 text-sm border-b border-gray-700 pb-1 mb-2">
                    <div className="font-bold text-gray-300">Type</div>
                    <div className="font-bold text-gray-300">Name</div>
                    <div className="font-bold text-gray-300 text-right">Size</div>
                  </div>
                  {entry.content.map((result, fileIndex) => {
                    const path = result.path;
                    const name = result.name; // extract file name from path
                    return (
                      <motion.div
                        key={fileIndex}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: fileIndex * 0.07 }}
                        className="grid grid-cols-[auto_1fr_auto] gap-x-4 items-center py-1 px-2 hover:bg-gray-800 rounded cursor-pointer group"
                      >
                        <div className="flex items-center">
                          {getFileIcon({ name } as FileResult)}
                        </div>
                        <div className="flex flex-col min-w-0">
                          <div className="text-white truncate">{name}</div>
                          <div className="text-gray-500 text-xs truncate">{path}</div>
                          {result.matches && result.matches.length > 0 && (
                            <div className="text-xs text-purple-400 mt-1">Match: {result.matches[0]}</div>
                          )}
                        </div>
                        <div className="flex flex-col items-end">
                          {/* Optional placeholder */}
                        </div>
                      </motion.div>
                    );
                  })}
                </>
              ) : (
                <div className="text-gray-400 italic">No results found</div>
              )}
            </div>
          ) : (
            <div className="flex items-start">
              <span className="text-green-400 mr-2 shrink-0">system:</span>
              {'isLoading' in entry && entry.isLoading ? (
                <div className="flex items-center">
                  <span className={entry.isError ? 'text-red-400' : ''}>{entry.content}</span>
                  <motion.div
                    animate={{
                      opacity: [0.5, 1, 0.5],
                      scale: [0.98, 1.02, 0.98]
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 1.5
                    }}
                    className="ml-2 flex space-x-1"
                  >
                    <div className="h-1 w-1 rounded-full bg-green-400"></div>
                    <div className="h-1 w-1 rounded-full bg-green-400"></div>
                    <div className="h-1 w-1 rounded-full bg-green-400"></div>
                  </motion.div>
                </div>
              ) : (
                <div className={entry.isError ? 'text-red-400' : 'whitespace-pre-line'}>{entry.content}</div>
              )}
            </div>
          )}
        </div>
      ))}
      {isTyping && (
        <div className="flex">
          <span className="text-green-400 mr-2">system:</span>
          <motion.div
            animate={{
              opacity: [0.5, 1, 0.5],
              scale: [0.98, 1.02, 0.98]
            }}
            transition={{
              repeat: Infinity,
              duration: 1.5
            }}
            className="flex space-x-1"
          >
            <div className="h-1 w-1 rounded-full bg-green-400"></div>
            <div className="h-1 w-1 rounded-full bg-green-400"></div>
            <div className="h-1 w-1 rounded-full bg-green-400"></div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default TerminalOutput;