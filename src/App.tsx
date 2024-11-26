import React, { useEffect, useState } from 'react';
import { Brain, Search } from 'lucide-react';
import { Question, Category } from './types';
import QuestionList from './components/QuestionList';
import CategoryProgress from './components/CategoryProgress';

const initialQuestions: Question[] = [
  {
    id: '1',
    title: 'Two Sum',
    difficulty: 'Easy',
    category: 'Arrays',
    completed: false,
  },
  {
    id: '2',
    title: 'Valid Parentheses',
    difficulty: 'Easy',
    category: 'Stacks',
    completed: false,
  },
  {
    id: '3',
    title: 'Merge K Sorted Lists',
    difficulty: 'Hard',
    category: 'Linked Lists',
    completed: false,
  },
  {
    id: '4',
    title: 'Binary Tree Level Order Traversal',
    difficulty: 'Medium',
    category: 'Trees',
    completed: false,
  },
];

function App() {
  const [questions, setQuestions] = useState<Question[]>(() => {
    const saved = localStorage.getItem('questions');
    return saved ? JSON.parse(saved) : initialQuestions;
  });
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    localStorage.setItem('questions', JSON.stringify(questions));
  }, [questions]);

  const categories: Category[] = Array.from(
    new Set(questions.map((q) => q.category))
  ).map((categoryName) => {
    const categoryQuestions = questions.filter((q) => q.category === categoryName);
    return {
      name: categoryName,
      total: categoryQuestions.length,
      completed: categoryQuestions.filter((q) => q.completed).length,
    };
  });

  const filteredQuestions = questions.filter(
    (question) =>
      question.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      question.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleToggleComplete = (id: string) => {
    setQuestions((prev) =>
      prev.map((q) =>
        q.id === id ? { ...q, completed: !q.completed } : q
      )
    );
  };

  const handleAddNote = (id: string, note: string) => {
    setQuestions((prev) =>
      prev.map((q) =>
        q.id === id ? { ...q, notes: note } : q
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center space-x-4 mb-8">
          <Brain className="w-8 h-8 text-green-400" />
          <h1 className="text-3xl font-bold">AlgoQuest</h1>
        </div>

        <div className="relative mb-8">
          <input
            type="text"
            placeholder="Search questions or categories..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-gray-800 text-white px-4 py-2 pl-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
        </div>

        <CategoryProgress categories={categories} />

        <QuestionList
          questions={filteredQuestions}
          onToggleComplete={handleToggleComplete}
          onAddNote={handleAddNote}
        />
      </div>
    </div>
  );
}

export default App;