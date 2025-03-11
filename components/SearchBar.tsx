// src/components/SearchBar.tsx
"use client";

import { motion } from "framer-motion";
import { MagnifyingGlass } from "@phosphor-icons/react"; // Use an icon library

interface SearchBarProps {
  onQueryChange: (newQuery: string) => void;
}

export default function SearchBar({ onQueryChange }: SearchBarProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onQueryChange(e.target.value); // Pass the input value back to parent component
  };

  return (
    <div className="w-full">
      <input
        type="text"
        placeholder="Search for files or keywords..."
        onChange={handleChange}
        className="w-full p-2 border border-gray-300 rounded"
      />
    </div>
  );
}