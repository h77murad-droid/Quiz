import { questions } from '../constants/questions';

export interface Question {
  id: number;
  question_text: string;
  option_1: string;
  option_2: string;
  option_3: string;
  option_4: string;
  correct_answer: number;
  category: string;
  difficulty: string;
}

// Get a random set of questions
export const getQuestions = (count = 5): Question[] => {
  const shuffled = [...questions].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

// Check if an answer is correct
export const checkAnswer = (questionId: number, answer: number): boolean => {
  const question = questions.find(q => q.id === questionId);
  return question ? question.correct_answer === answer : false;
};

// Calculate score based on time
export const calculateScore = (timeRemaining: number): number => {
  // Simple scoring: 10 points for correct answer + bonus for time
  return 10 + Math.floor(timeRemaining / 2);
};
