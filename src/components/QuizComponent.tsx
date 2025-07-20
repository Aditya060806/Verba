import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, ChevronLeft, ChevronRight, Trophy, RefreshCw } from 'lucide-react';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const quizQuestions: Question[] = [
  {
    id: 1,
    question: "What are the main components of a strong argument?",
    options: ["Claim, Evidence, Warrant, Impact", "Introduction, Body, Conclusion", "Topic, Opinion, Facts", "Statement, Proof, Summary"],
    correctAnswer: 0,
    explanation: "A strong argument consists of a Claim (your position), Evidence (supporting facts), Warrant (logical connection), and Impact (why it matters)."
  },
  {
    id: 2,
    question: "What is the purpose of a warrant in an argument?",
    options: ["To provide statistical evidence", "To link evidence to the claim", "To conclude the argument", "To introduce the topic"],
    correctAnswer: 1,
    explanation: "A warrant explains how and why the evidence supports your claim, creating the logical bridge between them."
  },
  {
    id: 3,
    question: "Which type of evidence is typically most persuasive in policy debates?",
    options: ["Personal anecdotes", "Statistical data", "Historical examples", "Emotional appeals"],
    correctAnswer: 1,
    explanation: "Statistical data provides quantifiable, verifiable support that is especially powerful in policy discussions."
  },
  {
    id: 4,
    question: "What is the primary goal of the opening statement in a debate?",
    options: ["To attack opponents", "To present your case framework", "To ask questions", "To summarize everything"],
    correctAnswer: 1,
    explanation: "The opening statement establishes your position, main arguments, and the framework through which the debate should be viewed."
  },
  {
    id: 5,
    question: "In formal debate, what is a 'rebuttal'?",
    options: ["Your opening argument", "A response to opponent's arguments", "A closing summary", "A question to the opponent"],
    correctAnswer: 1,
    explanation: "A rebuttal directly addresses and challenges the opponent's arguments, showing why they are flawed or insufficient."
  },
  {
    id: 6,
    question: "What makes expert testimony credible?",
    options: ["Celebrity status", "Relevant expertise and credentials", "Personal opinions", "Emotional delivery"],
    correctAnswer: 1,
    explanation: "Credible expert testimony comes from individuals with proven expertise, qualifications, and experience in the relevant field."
  },
  {
    id: 7,
    question: "What is the fallacy of 'ad hominem'?",
    options: ["Using false statistics", "Attacking the person instead of their argument", "Making hasty generalizations", "Using circular reasoning"],
    correctAnswer: 1,
    explanation: "Ad hominem is attacking the character or attributes of the person making an argument rather than addressing the argument itself."
  },
  {
    id: 8,
    question: "What is the burden of proof in debate?",
    options: ["The obligation to be polite", "The responsibility to prove your claims", "The duty to ask questions", "The need to speak loudly"],
    correctAnswer: 1,
    explanation: "Burden of proof is the obligation to provide sufficient evidence and reasoning to support your claims and convince the audience."
  },
  {
    id: 9,
    question: "Which of these is NOT a common debate format?",
    options: ["Parliamentary", "Policy", "Lincoln-Douglas", "Socratic Circle"],
    correctAnswer: 3,
    explanation: "While Socratic Circle is a discussion format, it's not typically considered a formal competitive debate format like the others."
  },
  {
    id: 10,
    question: "What is the purpose of cross-examination in debate?",
    options: ["To make friends", "To clarify and challenge opponent's arguments", "To give a speech", "To present new evidence"],
    correctAnswer: 1,
    explanation: "Cross-examination allows debaters to ask pointed questions to clarify, expose weaknesses, or challenge the opponent's case."
  },
  {
    id: 11,
    question: "What is a 'strawman' fallacy?",
    options: ["Using weak evidence", "Misrepresenting opponent's argument to attack it easily", "Being too emotional", "Speaking too quietly"],
    correctAnswer: 1,
    explanation: "A strawman fallacy involves mischaracterizing or oversimplifying an opponent's position to make it easier to attack."
  },
  {
    id: 12,
    question: "In debate judging, what is typically most important?",
    options: ["Speaking speed", "Physical appearance", "Quality of arguments and evidence", "Volume of voice"],
    correctAnswer: 2,
    explanation: "Judges primarily evaluate the strength, logic, and evidence quality of arguments rather than delivery style alone."
  },
  {
    id: 13,
    question: "What is the difference between inductive and deductive reasoning?",
    options: ["No difference", "Inductive goes from specific to general, deductive from general to specific", "Inductive is always wrong", "Deductive uses emotions"],
    correctAnswer: 1,
    explanation: "Inductive reasoning draws general conclusions from specific examples, while deductive reasoning applies general principles to specific cases."
  },
  {
    id: 14,
    question: "What is the role of impact in an argument?",
    options: ["To sound impressive", "To explain why the argument matters and its consequences", "To repeat the claim", "To provide more evidence"],
    correctAnswer: 1,
    explanation: "Impact explains the significance and real-world consequences of your argument, showing why it matters to the audience."
  },
  {
    id: 15,
    question: "What is the best way to handle a question you can't answer in cross-examination?",
    options: ["Make up an answer", "Admit uncertainty and offer to clarify", "Attack the questioner", "Change the subject"],
    correctAnswer: 1,
    explanation: "Honesty builds credibility. Acknowledging uncertainty while offering to clarify shows integrity and professionalism."
  }
];

const QuizComponent = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{[key: number]: number}>({});
  const [showResults, setShowResults] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestion]: answerIndex
    });
  };

  const nextQuestion = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setQuizCompleted(true);
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const calculateScore = () => {
    let correct = 0;
    quizQuestions.forEach((question, index) => {
      if (selectedAnswers[index] === question.correctAnswer) {
        correct++;
      }
    });
    return correct;
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswers({});
    setShowResults(false);
    setQuizCompleted(false);
  };

  const currentQ = quizQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;
  const score = calculateScore();
  const scorePercentage = (score / quizQuestions.length) * 100;

  if (quizCompleted && showResults) {
    return (
      <div className="space-y-6">
        {/* Results Summary */}
        <Card className="border-0 bg-gradient-to-r from-blue-50 to-indigo-50">
          <CardContent className="p-6 text-center">
            <Trophy className="w-12 h-12 mx-auto mb-4 text-yellow-500" />
            <h3 className="text-2xl font-bold mb-2">Quiz Complete!</h3>
            <p className="text-lg mb-4">
              You scored <span className="font-bold text-indigo-600">{score}</span> out of <span className="font-bold">{quizQuestions.length}</span>
            </p>
            <div className="mb-4">
              <Progress value={scorePercentage} className="h-3 mb-2" />
              <p className="text-sm text-gray-600">{scorePercentage.toFixed(0)}% Correct</p>
            </div>
            <Badge variant={scorePercentage >= 80 ? "default" : scorePercentage >= 60 ? "secondary" : "destructive"} className="mb-4">
              {scorePercentage >= 80 ? "Excellent!" : scorePercentage >= 60 ? "Good Job!" : "Keep Practicing!"}
            </Badge>
          </CardContent>
        </Card>

        {/* Detailed Results */}
        <div className="space-y-4">
          <h4 className="text-lg font-semibold">Review Your Answers</h4>
          {quizQuestions.map((question, index) => {
            const userAnswer = selectedAnswers[index];
            const isCorrect = userAnswer === question.correctAnswer;
            
            return (
              <Card key={index} className={`border-2 ${isCorrect ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}`}>
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3">
                    {isCorrect ? (
                      <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                    ) : (
                      <XCircle className="w-6 h-6 text-red-600 mt-1 flex-shrink-0" />
                    )}
                    <div className="flex-1">
                      <h5 className="font-semibold mb-2">Question {index + 1}</h5>
                      <p className="mb-3">{question.question}</p>
                      
                      <div className="space-y-2 mb-3">
                        {question.options.map((option, optionIndex) => (
                          <div
                            key={optionIndex}
                            className={`p-2 rounded border ${
                              optionIndex === question.correctAnswer
                                ? 'bg-green-100 border-green-300'
                                : optionIndex === userAnswer && !isCorrect
                                ? 'bg-red-100 border-red-300'
                                : 'bg-gray-50 border-gray-200'
                            }`}
                          >
                            <div className="flex items-center space-x-2">
                              {optionIndex === question.correctAnswer && (
                                <CheckCircle className="w-4 h-4 text-green-600" />
                              )}
                              {optionIndex === userAnswer && !isCorrect && (
                                <XCircle className="w-4 h-4 text-red-600" />
                              )}
                              <span className={optionIndex === question.correctAnswer ? 'font-semibold text-green-800' : ''}>
                                {option}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <div className="bg-blue-50 p-3 rounded border border-blue-200">
                        <p className="text-sm text-blue-800">
                          <strong>Explanation:</strong> {question.explanation}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Reset Button */}
        <div className="text-center">
          <Button onClick={resetQuiz} className="flex items-center space-x-2">
            <RefreshCw className="w-4 h-4" />
            <span>Take Quiz Again</span>
          </Button>
        </div>
      </div>
    );
  }

  if (quizCompleted) {
    return (
      <div className="text-center space-y-4">
        <h3 className="text-2xl font-bold">Ready to see your results?</h3>
        <Button onClick={() => setShowResults(true)} size="lg">
          View Results
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Progress Header */}
      <div className="text-center">
        <h2 className="text-3xl font-heading font-bold text-gradient mb-2">
          Debate Knowledge Quiz
        </h2>
        <p className="text-foreground-secondary mb-4">
          Test your understanding of debate fundamentals
        </p>
        <div className="mb-4">
          <Progress value={progress} className="h-3" />
          <p className="text-sm text-muted-foreground mt-2">
            Question {currentQuestion + 1} of {quizQuestions.length}
          </p>
        </div>
      </div>

      {/* Question Card */}
      <Card className="neu-card">
        <CardContent className="p-6">
          <h3 className="text-xl font-semibold mb-6">{currentQ.question}</h3>
          
          <div className="space-y-3">
            {currentQ.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                className={`w-full p-4 text-left rounded-lg border-2 transition-all hover:scale-[1.02] ${
                  selectedAnswers[currentQuestion] === index
                    ? 'border-primary bg-primary/10'
                    : 'border-border hover:border-primary/50'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    selectedAnswers[currentQuestion] === index
                      ? 'border-primary bg-primary text-white'
                      : 'border-border'
                  }`}>
                    {selectedAnswers[currentQuestion] === index && (
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    )}
                  </div>
                  <span className="font-medium">{option}</span>
                </div>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <Button
          variant="outline"
          onClick={prevQuestion}
          disabled={currentQuestion === 0}
          className="flex items-center space-x-2"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Previous</span>
        </Button>

        <div className="text-sm text-muted-foreground">
          {Object.keys(selectedAnswers).length} of {quizQuestions.length} answered
        </div>

        <Button
          onClick={nextQuestion}
          disabled={selectedAnswers[currentQuestion] === undefined}
          className="flex items-center space-x-2"
        >
          <span>{currentQuestion === quizQuestions.length - 1 ? 'Finish' : 'Next'}</span>
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default QuizComponent; 