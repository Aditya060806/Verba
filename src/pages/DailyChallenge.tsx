import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft, 
  CheckCircle, 
  XCircle, 
  Star,
  Brain,
  Lightbulb,
  Target,
  RefreshCw,
  Trophy,
  Calendar,
  Clock,
  BookOpen
} from 'lucide-react';
import { getDailyChallengeByDate, getRandomChallenge, type Challenge } from '@/data/challengeBank';

const DailyChallenge = () => {
  const navigate = useNavigate();
  const [challengeData, setChallengeData] = useState<Challenge | null>(null);
  const [selectedFallacies, setSelectedFallacies] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [loading, setLoading] = useState(true);
  const [animateIn, setAnimateIn] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(5);

  useEffect(() => {
    const loadChallenge = () => {
      setLoading(true);
      const challenge = getDailyChallengeByDate();
      
      setTimeout(() => {
        setChallengeData(challenge);
        setLoading(false);
        setTimeout(() => setAnimateIn(true), 100);
      }, 500);
    };

    loadChallenge();
    
    setSelectedFallacies([]);
    setSubmitted(false);
    setShowConfetti(false);
  }, []);

  const loadNewChallenge = () => {
    setAnimateIn(false);
    setLoading(true);
    setSubmitted(false);
    setSelectedFallacies([]);
    setShowConfetti(false);
    
    setTimeout(() => {
      const challenge = getRandomChallenge();
      setChallengeData(challenge);
      setLoading(false);
      setTimeout(() => setAnimateIn(true), 100);
    }, 300);
  };

  const handleFallacyToggle = (fallacyId: string) => {
    if (submitted) return;
    
    setSelectedFallacies(prev => 
      prev.includes(fallacyId) 
        ? prev.filter(id => id !== fallacyId)
        : [...prev, fallacyId]
    );
  };

  const handleSubmit = () => {
    if (!challengeData) return;
    
    setSubmitted(true);
    
    const correctCount = selectedFallacies.filter(id => 
      challengeData.correctFallacies.includes(id)
    ).length;
    
    const totalCorrect = challengeData.correctFallacies.length;
    const incorrectCount = selectedFallacies.filter(id => 
      !challengeData.correctFallacies.includes(id)
    ).length;
    
    const newScore = Math.max(0, (correctCount - incorrectCount) * 10);
    setScore(newScore);
    
    if (correctCount === totalCorrect && selectedFallacies.length === totalCorrect) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    }
  };

  const getOptionStatus = (fallacyId: string) => {
    if (!submitted) return 'default';
    
    const isSelected = selectedFallacies.includes(fallacyId);
    const isCorrect = challengeData?.correctFallacies.includes(fallacyId);
    
    if (isSelected && isCorrect) return 'correct';
    if (isSelected && !isCorrect) return 'incorrect';
    if (!isSelected && isCorrect) return 'missed';
    return 'default';
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'correct': return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'incorrect': return <XCircle className="w-5 h-5 text-red-600" />;
      case 'missed': return <Target className="w-5 h-5 text-orange-600" />;
      default: return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'correct': return 'border-green-500 bg-green-50';
      case 'incorrect': return 'border-red-500 bg-red-50';
      case 'missed': return 'border-orange-500 bg-orange-50';
      default: return 'border-gray-200 bg-white hover:border-[#EE6C29] hover:bg-orange-50';
    }
  };

  const correctCount = submitted && challengeData ? selectedFallacies.filter(id => 
    challengeData.correctFallacies.includes(id)
  ).length : 0;

  const totalCorrect = challengeData?.correctFallacies.length || 0;

  if (loading || !challengeData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#282B2B] via-gray-800 to-[#282B2B]">
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-20">
            <div className="animate-spin w-12 h-12 border-4 border-[#EE6C29] border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-[#7AA6B3] text-lg">Loading your challenge...</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#282B2B] via-gray-800 to-[#282B2B]">
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          <div className="absolute inset-0 animate-pulse">
            {[...Array(50)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-[#EE6C29] rounded-full animate-bounce"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`,
                  animationDuration: `${1 + Math.random()}s`
                }}
              />
            ))}
          </div>
        </div>
      )}
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')}
            className="text-white hover:bg-white/10 mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
          
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Brain className="w-8 h-8 text-[#EE6C29]" />
              <h1 className="text-4xl font-bold text-white">Daily Challenge</h1>
            </div>
            <p className="text-[#7AA6B3] text-lg">
              Sharpen your fallacy detection skills with today's argument analysis
            </p>
          </div>
        </div>

        {/* Challenge Controls */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="border-[#7AA6B3] text-[#7AA6B3] px-3 py-1">
              Difficulty: {challengeData.difficulty}
            </Badge>
            <Badge variant="outline" className="border-[#7AA6B3] text-[#7AA6B3] px-3 py-1">
              Category: {challengeData.category}
            </Badge>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-[#7AA6B3]">
              <Trophy className="w-4 h-4" />
              <span>Streak: {streak} days</span>
            </div>
            <Button
              onClick={loadNewChallenge}
              variant="outline"
              size="sm"
              className="border-[#EE6C29] text-[#EE6C29] hover:bg-[#EE6C29]/10"
              disabled={loading}
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              New Challenge
            </Button>
          </div>
        </div>

        {/* Challenge Card */}
        <Card className={`border-0 shadow-lg bg-white/90 backdrop-blur-sm mb-6 transition-all duration-500 ${
          animateIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          <CardHeader>
            <CardTitle className="text-2xl text-gray-900">{challengeData.title}</CardTitle>
            <CardDescription className="text-gray-600">{challengeData.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <p className="text-gray-800 leading-relaxed italic">"{challengeData.argument}"</p>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Select all the logical fallacies you can identify:
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {challengeData.fallacies.map((fallacy) => {
                  const status = getOptionStatus(fallacy.id);
                  return (
                    <button
                      key={fallacy.id}
                      onClick={() => handleFallacyToggle(fallacy.id)}
                      disabled={submitted}
                      className={`p-4 rounded-lg border-2 transition-all text-left ${
                        getStatusColor(status)
                      } ${!submitted ? 'cursor-pointer' : 'cursor-default'}`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">{fallacy.name}</h4>
                          <p className="text-sm text-gray-600 mt-1">{fallacy.description}</p>
                        </div>
                        {getStatusIcon(status)}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {!submitted && (
              <Button
                onClick={handleSubmit}
                disabled={selectedFallacies.length === 0}
                className="w-full bg-gradient-to-r from-[#EE6C29] to-orange-600 hover:from-[#EE6C29]/90 hover:to-orange-600/90 text-white"
              >
                Submit Analysis
              </Button>
            )}

            {submitted && (
              <div className="space-y-4">
                {/* Results Summary */}
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">Your Score</h3>
                    <div className="text-2xl font-bold text-[#EE6C29]">{score} points</div>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span>Correct: {correctCount}/{totalCorrect}</span>
                    <span>Accuracy: {totalCorrect > 0 ? Math.round((correctCount / totalCorrect) * 100) : 0}%</span>
                  </div>
                </div>

                {/* Explanation */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">Analysis</h4>
                  <p className="text-gray-700">{challengeData.explanation}</p>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <Button
                    onClick={loadNewChallenge}
                    className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                  >
                    <Lightbulb className="w-4 h-4 mr-2" />
                    Try Another
                  </Button>
                  <Button
                    onClick={() => navigate('/learning')}
                    variant="outline"
                    className="flex-1"
                  >
                    <BookOpen className="w-4 h-4 mr-2" />
                    Learn More
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Daily Stats */}
        <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-[#EE6C29]" />
              Today's Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <div className="text-2xl font-bold text-[#EE6C29]">{streak}</div>
                <div className="text-sm text-gray-600">Day Streak</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">12</div>
                <div className="text-sm text-gray-600">Challenges Completed</div>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">85%</div>
                <div className="text-sm text-gray-600">Average Accuracy</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default DailyChallenge; 