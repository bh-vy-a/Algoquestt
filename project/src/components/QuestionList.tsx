import React from 'react';
import { Check, Circle, ExternalLink } from 'lucide-react';
import { Question } from '../types';

interface QuestionListProps {
  questions: Question[];
  onToggleComplete: (id: string) => void;
  onAddNote: (id: string, note: string) => void;
}

export default function QuestionList({ questions, onToggleComplete, onAddNote }: QuestionListProps) {
  return (
    <div className="space-y-4">
      {questions.map((question) => (
        <div
          key={question.id}
          className="bg-gray-800 rounded-lg p-4 hover:bg-gray-700 transition-colors"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-3">
              <button
                onClick={() => onToggleComplete(question.id)}
                className={`p-1 rounded-full transition-colors ${
                  question.completed ? 'text-green-400' : 'text-gray-400'
                }`}
              >
                {question.completed ? (
                  <Check className="w-5 h-5" />
                ) : (
                  <Circle className="w-5 h-5" />
                )}
              </button>
              <div>
                <div className="flex items-center space-x-2">
                  <h3 className="text-white font-medium">{question.title}</h3>
                  <a
                    href={question.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
                <div className="flex space-x-2 text-sm">
                  <span
                    className={`${
                      question.difficulty === 'Easy'
                        ? 'text-green-400'
                        : question.difficulty === 'Medium'
                        ? 'text-yellow-400'
                        : 'text-red-400'
                    }`}
                  >
                    {question.difficulty}
                  </span>
                  <span className="text-gray-400">•</span>
                  <span className="text-gray-400">{question.category}</span>
                </div>
              </div>
            </div>
          </div>
          
          <p className="text-gray-400 text-sm mb-3">{question.description}</p>

          <div className="mt-2">
            <textarea
              value={question.notes || ''}
              onChange={(e) => onAddNote(question.id, e.target.value)}
              placeholder="Add notes..."
              className="w-full bg-gray-900 text-gray-300 rounded p-2 text-sm"
              rows={2}
            />
          </div>
        </div>
      ))}
    </div>
  );
}