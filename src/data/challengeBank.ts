export interface Challenge {
  id: string;
  title: string;
  description: string;
  argument: string;
  fallacies: Array<{
    id: string;
    name: string;
    description: string;
  }>;
  correctFallacies: string[];
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  explanation: string;
  category: string;
}

const fallacyBank = [
  {
    id: 'ad-hominem',
    name: 'Ad Hominem',
    description: 'Attacking the person instead of the argument'
  },
  {
    id: 'straw-man',
    name: 'Straw Man',
    description: 'Misrepresenting an opponent\'s argument to make it easier to attack'
  },
  {
    id: 'appeal-to-authority',
    name: 'Appeal to Authority',
    description: 'Using an authority figure to support a claim without proper evidence'
  },
  {
    id: 'false-dilemma',
    name: 'False Dilemma',
    description: 'Presenting only two options when more exist'
  },
  {
    id: 'slippery-slope',
    name: 'Slippery Slope',
    description: 'Suggesting that one action will inevitably lead to a chain of events'
  },
  {
    id: 'appeal-to-emotion',
    name: 'Appeal to Emotion',
    description: 'Using emotional manipulation instead of logical reasoning'
  },
  {
    id: 'hasty-generalization',
    name: 'Hasty Generalization',
    description: 'Making a broad conclusion based on insufficient evidence'
  },
  {
    id: 'circular-reasoning',
    name: 'Circular Reasoning',
    description: 'Using the conclusion as evidence for itself'
  },
  {
    id: 'appeal-to-popularity',
    name: 'Appeal to Popularity',
    description: 'Arguing something is true because many people believe it'
  },
  {
    id: 'post-hoc',
    name: 'Post Hoc',
    description: 'Assuming causation from correlation'
  },
  {
    id: 'red-herring',
    name: 'Red Herring',
    description: 'Introducing irrelevant information to distract from the main issue'
  },
  {
    id: 'begging-the-question',
    name: 'Begging the Question',
    description: 'Assuming the truth of what you\'re trying to prove'
  }
];

const challenges: Challenge[] = [
  {
    id: 'challenge-1',
    title: 'Social Media Debate',
    description: 'Analyze this argument about social media regulation',
    argument: 'We should ban social media because it\'s making people stupid. Look at how many people believe fake news! And besides, my friend who works at a tech company says it\'s all designed to make us addicted. Everyone knows social media is bad for society - just look at how many people are against it on Twitter.',
    fallacies: fallacyBank,
    correctFallacies: ['hasty-generalization', 'appeal-to-authority', 'appeal-to-popularity'],
    difficulty: 'Beginner',
    category: 'Technology',
    explanation: 'This argument contains multiple fallacies: hasty generalization (assuming all social media users are stupid), appeal to authority (citing an unnamed friend), and appeal to popularity (claiming everyone knows it\'s bad).'
  },
  {
    id: 'challenge-2',
    title: 'Environmental Policy',
    description: 'Evaluate this environmental argument',
    argument: 'If we allow electric cars, next thing you know everyone will want solar panels, then wind turbines, and before long we\'ll have to live in caves! We should stick with traditional energy sources because they\'ve worked for generations. My grandfather used to say "if it ain\'t broke, don\'t fix it."',
    fallacies: fallacyBank,
    correctFallacies: ['slippery-slope', 'appeal-to-authority', 'appeal-to-emotion'],
    difficulty: 'Beginner',
    category: 'Environment',
    explanation: 'This argument uses slippery slope (predicting extreme outcomes), appeal to authority (grandfather\'s wisdom), and appeal to emotion (fear of living in caves).'
  },
  {
    id: 'challenge-3',
    title: 'Education Reform',
    description: 'Examine this education policy argument',
    argument: 'We should abolish homework because students hate it. Studies show that countries with less homework have happier students. Besides, if homework was good for learning, why do so many students complain about it? You\'re either with us or against education reform.',
    fallacies: fallacyBank,
    correctFallacies: ['appeal-to-emotion', 'appeal-to-authority', 'false-dilemma'],
    difficulty: 'Intermediate',
    category: 'Education',
    explanation: 'This argument contains appeal to emotion (students hate it), appeal to authority (studies show), and false dilemma (either with us or against reform).'
  },
  {
    id: 'challenge-4',
    title: 'Healthcare Debate',
    description: 'Analyze this healthcare argument',
    argument: 'Universal healthcare will lead to socialism, and socialism always leads to communism. We can\'t trust government-run healthcare because governments are inefficient. My doctor says private healthcare is better, and doctors know best about these things.',
    fallacies: fallacyBank,
    correctFallacies: ['slippery-slope', 'hasty-generalization', 'appeal-to-authority'],
    difficulty: 'Intermediate',
    category: 'Healthcare',
    explanation: 'This argument uses slippery slope (healthcare → socialism → communism), hasty generalization (all governments are inefficient), and appeal to authority (doctor\'s opinion).'
  },
  {
    id: 'challenge-5',
    title: 'Technology Ethics',
    description: 'Evaluate this AI ethics argument',
    argument: 'AI will either save humanity or destroy it completely. There\'s no middle ground. We should ban AI development because it\'s too dangerous. Look at how many movies show AI taking over the world! And my neighbor who works in tech says AI is already smarter than humans.',
    fallacies: fallacyBank,
    correctFallacies: ['false-dilemma', 'appeal-to-emotion', 'appeal-to-authority'],
    difficulty: 'Advanced',
    category: 'Technology',
    explanation: 'This argument contains false dilemma (save or destroy), appeal to emotion (movie references), and appeal to authority (neighbor\'s opinion).'
  },
  {
    id: 'challenge-6',
    title: 'Economic Policy',
    description: 'Analyze this economic argument',
    argument: 'Raising the minimum wage will cause inflation, which will lead to higher prices, which will lead to economic collapse. We should keep wages low because that\'s what worked in the 1950s. My economics professor says so, and he has a PhD.',
    fallacies: fallacyBank,
    correctFallacies: ['slippery-slope', 'appeal-to-authority', 'hasty-generalization'],
    difficulty: 'Advanced',
    category: 'Economics',
    explanation: 'This argument uses slippery slope (wage increase → inflation → collapse), appeal to authority (professor with PhD), and hasty generalization (assuming 1950s policies work today).'
  },
  {
    id: 'challenge-7',
    title: 'Climate Change',
    description: 'Examine this climate change argument',
    argument: 'Climate change isn\'t real because it snowed last winter. Scientists who say it\'s real are just trying to get research funding. Either you believe in climate change or you\'re a science denier. My uncle who works in oil says climate science is fake.',
    fallacies: fallacyBank,
    correctFallacies: ['hasty-generalization', 'ad-hominem', 'false-dilemma', 'appeal-to-authority'],
    difficulty: 'Advanced',
    category: 'Environment',
    explanation: 'This argument contains hasty generalization (snow disproves climate change), ad hominem (attacking scientists\' motives), false dilemma (either/or), and appeal to authority (uncle\'s opinion).'
  },
  {
    id: 'challenge-8',
    title: 'Gun Control',
    description: 'Analyze this gun control argument',
    argument: 'Guns don\'t kill people, people kill people. If we ban guns, only criminals will have guns. We need guns to protect ourselves from the government. My grandfather fought in WWII and he always said the Second Amendment is sacred.',
    fallacies: fallacyBank,
    correctFallacies: ['red-herring', 'false-dilemma', 'appeal-to-authority'],
    difficulty: 'Intermediate',
    category: 'Politics',
    explanation: 'This argument uses red herring (guns vs people), false dilemma (ban or criminals have guns), and appeal to authority (grandfather\'s military service).'
  }
];

// Get challenge by date (for daily consistency)
export const getDailyChallengeByDate = (): Challenge => {
  const today = new Date();
  const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
  return challenges[dayOfYear % challenges.length];
};

// Get random challenge
export const getRandomChallenge = (): Challenge => {
  return challenges[Math.floor(Math.random() * challenges.length)];
};

// Get challenge by ID
export const getChallengeById = (id: string): Challenge | undefined => {
  return challenges.find(challenge => challenge.id === id);
};

// Get challenges by difficulty
export const getChallengesByDifficulty = (difficulty: Challenge['difficulty']): Challenge[] => {
  return challenges.filter(challenge => challenge.difficulty === difficulty);
};

// Get challenges by category
export const getChallengesByCategory = (category: string): Challenge[] => {
  return challenges.filter(challenge => challenge.category === category);
};

export { challenges, fallacyBank }; 