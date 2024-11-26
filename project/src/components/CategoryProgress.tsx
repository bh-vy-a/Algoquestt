import React from 'react';
import { Category } from '../types';

interface CategoryProgressProps {
  categories: Category[];
}

export default function CategoryProgress({ categories }: CategoryProgressProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      {categories.map((category) => (
        <div
          key={category.name}
          className="bg-gray-800 p-4 rounded-lg"
        >
          <h3 className="text-white font-medium mb-2">{category.name}</h3>
          <div className="relative pt-1">
            <div className="flex mb-2 items-center justify-between">
              <div>
                <span className="text-xs font-semibold inline-block text-green-400">
                  {Math.round((category.completed / category.total) * 100)}%
                </span>
              </div>
              <div className="text-right">
                <span className="text-xs font-semibold inline-block text-gray-400">
                  {category.completed}/{category.total}
                </span>
              </div>
            </div>
            <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-700">
              <div
                style={{ width: `${(category.completed / category.total) * 100}%` }}
                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-400"
              ></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}