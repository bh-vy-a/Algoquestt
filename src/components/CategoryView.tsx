import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import QuestionList from './QuestionList';
import { Question } from '../types';

interface CategoryViewProps {
  questions: Question[];
  onToggleComplete: (id: string) => void;
  onAddNote: (id: string, note: string) => void;
}

export default function CategoryView({ questions, onToggleComplete, onAddNote }: CategoryViewProps) {
  const { category } = useParams();
  const categoryQuestions = questions.filter(q => q.category.toLowerCase() === category?.toLowerCase());
  
  const completed = categoryQuestions.filter(q => q.completed).length;
  const total = categoryQuestions.length;
  const percentage = Math.round((completed / total) * 100);

  return (
    <div className="container mx-auto px-4 py-8">
      <Link to="/" className="flex items-center space-x-2 text-gray-400 hover:text-white mb-6">
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Dashboard</span>
      </Link>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-4">{category}</h1>
        <div className="bg-gray-800 p-4 rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-300">Progress</span>
            <span className="text-green-400 font-semibold">{completed}/{total} ({percentage}%)</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2.5">
            <div
              className="bg-green-400 h-2.5 rounded-full transition-all duration-500"
              style={{ width: `${percentage}%` }}
            ></div>
          </div>
        </div>
      </div>

      <QuestionList
        questions={categoryQuestions}
        onToggleComplete={onToggleComplete}
        onAddNote={onAddNote}
      />
    </div>
  );
}