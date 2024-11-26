export interface Question {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: string;
  completed: boolean;
  notes?: string;
  description: string;
  link: string;
}

export interface Category {
  name: string;
  total: number;
  completed: number;
}