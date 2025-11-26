import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { getQuestions, checkAnswer, calculateScore, Question } from '../lib/quizService';

const QUIZ_LENGTH = 5;
const TIMER_DURATION = 15;

const QuizScreen = () => {
  const router = useRouter();
  const { roomCode, playerName } = useLocalSearchParams();

  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [timer, setTimer] = useState(TIMER_DURATION);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  useEffect(() => {
    setQuestions(getQuestions(QUIZ_LENGTH));
  }, []);

  useEffect(() => {
    if (questions.length === 0) return;

    const countdown = setInterval(() => {
      setTimer(prev => {
        if (prev === 1) {
          handleTimeOut();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(countdown);
  }, [currentQuestionIndex, questions]);

  const handleAnswerPress = (answerIndex: number) => {
    if (selectedAnswer !== null) return;

    const question = questions[currentQuestionIndex];
    const correct = checkAnswer(question.id, answerIndex);

    setSelectedAnswer(answerIndex);
    setIsCorrect(correct);

    if (correct) {
      const points = calculateScore(timer);
      setScore(prev => prev + points);
      setStreak(prev => prev + 1);
    } else {
      setStreak(0);
    }

    setTimeout(() => {
      goToNextQuestion();
    }, 1500);
  };

  const handleTimeOut = () => {
    setStreak(0);
    setTimeout(() => {
      goToNextQuestion();
    }, 1500);
  };

  const goToNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setTimer(TIMER_DURATION);
      setSelectedAnswer(null);
      setIsCorrect(null);
    } else {
      // End of quiz
      router.push(`/LeaderboardScreen?roomCode=${roomCode}&finalScore=${score}&playerName=${playerName}`);
    }
  };

  const getOptionStyle = (index: number) => {
    if (selectedAnswer === null) return styles.optionButton;

    const question = questions[currentQuestionIndex];
    if (index === question.correct_answer) {
      return styles.correctOption;
    }
    if (index === selectedAnswer && isCorrect === false) {
      return styles.incorrectOption;
    }
    return styles.optionButton;
  };

  if (questions.length === 0) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#fff" />
        <Text style={styles.loadingText}>جاري تحضير الأسئلة...</Text>
      </View>
    );
  }

  const question = questions[currentQuestionIndex];
  const options = [question.option_1, question.option_2, question.option_3, question.option_4];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.scoreText}>النتيجة: {score}</Text>
        <Text style={styles.timer}>{timer}</Text>
      </View>

      <View style={styles.questionContainer}>
        <Text style={styles.questionText}>{question.question_text}</Text>
      </View>

      <View style={styles.optionsContainer}>
        {options.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={getOptionStyle(index + 1)}
            onPress={() => handleAnswerPress(index + 1)}
            disabled={selectedAnswer !== null}
          >
            <Text style={styles.optionText}>{option}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.streakText}>🔥 سلسلة الإجابات الصحيحة: {streak}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0f172a',
        padding: 24,
        justifyContent: 'space-between',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 40,
    },
    scoreText: {
        color: '#f59e0b',
        fontSize: 20,
        fontWeight: 'bold',
    },
    timer: {
        color: '#f87171',
        fontSize: 24,
        fontWeight: 'bold',
    },
    questionContainer: {
        backgroundColor: '#1e293b',
        borderRadius: 12,
        padding: 20,
        marginTop: 20,
        minHeight: 120,
        justifyContent: 'center',
    },
    questionText: {
        color: '#fff',
        fontSize: 22,
        textAlign: 'center',
        fontWeight: '600',
    },
    optionsContainer: {
        marginTop: 30,
    },
    optionButton: {
        backgroundColor: '#334155',
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
    },
    correctOption: {
        backgroundColor: '#10b981',
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
    },
    incorrectOption: {
        backgroundColor: '#ef4444',
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
    },
    optionText: {
        color: '#fff',
        fontSize: 18,
        textAlign: 'center',
    },
    streakText: {
        color: '#f59e0b',
        fontSize: 18,
        textAlign: 'center',
        fontWeight: 'bold',
        marginBottom: 20,
    },
    loadingText: {
        color: '#fff',
        marginTop: 10,
        fontSize: 18,
    }
});

export default QuizScreen;
