"use client";

import { motion } from "framer-motion";
import { Terminal } from "lucide-react";

export default function TerminalHeader() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="mb-8 text-center"
    >
      <div className="flex items-center justify-center mb-2">
        <Terminal size={32} className="mr-2" />
        <h1 className="text-2xl font-bold tracking-wider">Lost·&·Found</h1>
      </div>
      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-sm opacity-80"
      >
        Your files may hide, but they can't run!
      </motion.p>
    </motion.div>
  );
}