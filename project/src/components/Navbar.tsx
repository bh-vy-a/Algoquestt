import React from 'react';
import { Brain, Menu } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-gray-800 border-b border-gray-700">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-3">
            <Brain className="w-8 h-8 text-green-400" />
            <span className="text-xl font-bold text-white">AlgoQuest</span>
          </Link>
          <div className="flex items-center space-x-4">
            <Link to="/categories" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
              Categories
            </Link>
            <Link to="/progress" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
              Progress
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}