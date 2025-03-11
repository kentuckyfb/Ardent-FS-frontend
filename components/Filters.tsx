"use client";

import { motion } from "framer-motion";
import { File, FileText, Folder, Calendar } from "lucide-react";

export default function TerminalFilters() {
  return (
    <div className="flex gap-2 mt-3">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center px-3 py-1 bg-gray-800 text-blue-400 rounded-md border border-blue-800 text-sm"
      >
        <File size={14} className="mr-1" />
        <span>Documents</span>
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center px-3 py-1 bg-gray-800 text-purple-400 rounded-md border border-purple-800 text-sm"
      >
        <FileText size={14} className="mr-1" />
        <span>Code</span>
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center px-3 py-1 bg-gray-800 text-yellow-400 rounded-md border border-yellow-800 text-sm"
      >
        <Folder size={14} className="mr-1" />
        <span>Projects</span>
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center px-3 py-1 bg-gray-800 text-green-400 rounded-md border border-green-800 text-sm"
      >
        <Calendar size={14} className="mr-1" />
        <span>Date</span>
      </motion.button>
    </div>
  );
}