"use client";

import { motion } from "framer-motion";
import { File, Folder } from "lucide-react";

interface SearchResult {
  name: string;
  path: string;
  type: "file" | "folder";
  size: string;
  modified: string;
}

interface SearchResultsProps {
  results: SearchResult[];
}

export default function SearchResults({ results }: SearchResultsProps) {
  return (
    <div className="mt-8 space-y-4">
      {results.length === 0 ? (
        <p className="text-gray-500">No results found</p>
      ) : (
        results.map((result, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-4 bg-gray-900 border border-gray-700 rounded-lg hover:bg-gray-800 transition-all cursor-pointer"
          >
            <div className="flex items-center gap-3">
              {result.type === "file" ? (
                <File size={20} className="text-cyan-500" />
              ) : (
                <Folder size={20} className="text-cyan-500" />
              )}
              <span className="text-white">{result.name}</span>
              <span className="text-sm text-gray-400">{result.path}</span>
            </div>
            <div className="text-sm text-gray-400 mt-2">
              {result.size} • {result.modified}
            </div>
          </motion.div>
        ))
      )}
    </div>
  );
}