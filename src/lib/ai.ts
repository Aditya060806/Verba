// Sarvam AI and OpenRouter Claude 3 Haiku integration helpers

// Use Vite's import.meta.env for environment variables
export const SARVAM_API_KEY = import.meta.env.VITE_SARVAM_API_KEY || '';
export const OPENROUTER_API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY || '';

// Mathematical evaluation framework for AI judge
interface ClashEvaluation {
  clashId: string;
  topic: string;
  weight: number; // 1-10 importance
  governmentScore: number; // -1 to 1 (negative = loss, positive = win, 0 = draw)
  oppositionScore: number;
  reasoning: string;
  evidence: string[];
}

interface SpeakerEvaluation {
  role: string;
  side: string;
  speaker: string;
  matter: number; // 0-100
  manner: number; // 0-100
  method: number; // 0-100
  roleFulfillment: number; // 0-100
  totalScore: number;
  strengths: string[];
  improvements: string[];
  feedback: string;
}

interface DebateResult {
  winner: string;
  margin: 'clear' | 'close' | 'unanimous';
  governmentScore: number;
  oppositionScore: number;
  speakerScores: SpeakerEvaluation[];
  clashEvaluations: ClashEvaluation[];
  chainOfThought: string[];
  overallFeedback: string;
}

// Skill level configurations
const skillLevels = {
  beginner: {
    complexity: 0.3,
    evidenceDepth: 0.4,
    strategicThinking: 0.3,
    rebuttalStrength: 0.4,
    poiQuality: 0.3
  },
  intermediate: {
    complexity: 0.6,
    evidenceDepth: 0.7,
    strategicThinking: 0.6,
    rebuttalStrength: 0.7,
    poiQuality: 0.6
  },
  advanced: {
    complexity: 0.9,
    evidenceDepth: 0.9,
    strategicThinking: 0.9,
    rebuttalStrength: 0.9,
    poiQuality: 0.9
  }
};

// Helper function to make Sarvam AI API calls
async function callSarvamAI(endpoint: string, payload: any): Promise<any> {
  if (!SARVAM_API_KEY) {
    throw new Error('Sarvam AI API key is missing. Please set VITE_SARVAM_API_KEY in your .env file.');
  }

  try {
    // Use the correct Sarvam AI chat completion endpoint
    const response = await fetch('https://api.sarvam.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${SARVAM_API_KEY}`,
        'Content-Type': 'application/json'
      },
              body: JSON.stringify({
          model: "sarvam-m",
          messages: [
            {
              role: "system",
              content: `You are an expert debate coach and adjudicator. You specialize in ${endpoint} and provide detailed, structured responses in JSON format.`
            },
            {
              role: "user",
              content: JSON.stringify(payload)
            }
          ],
          temperature: 0.7,
          max_tokens: 2000
        })
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Sarvam AI API error (${response.status}): ${errorText}`);
    }

    const result = await response.json();
    console.log('Sarvam AI raw response:', result);
    
    // Extract the content from the response
    const content = result.choices?.[0]?.message?.content;
    if (!content) {
      throw new Error('No content received from Sarvam AI');
    }
    
    // Try to parse as JSON, fallback to text
    try {
      // Clean up markdown code blocks if present
      let cleanContent = content;
      if (content.includes('```json')) {
        cleanContent = content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      }
      return JSON.parse(cleanContent);
    } catch {
      return { content, text: content };
    }
  } catch (error) {
    console.error('Sarvam AI API call failed:', error);
    throw error;
  }
}

// --- Sarvam AI: Debate Case Prep ---
export async function generateDebateCase({ motion, format, side, level, manuals }: {
  motion: string;
  format: string;
  side: string;
  level: string;
  manuals?: string[];
}): Promise<any> {
  const result = await callSarvamAI('debate/case-prep', {
    motion,
    format,
    side,
    skillLevel: level,
    manuals: manuals || [],
    includeEvidence: true,
    includeRebuttals: true,
    includeStakeholders: true
  });
  
  console.log('Sarvam AI case prep result:', result);
  return result;
}

// --- Sarvam AI: AI Debater Speech ---
export async function generateDebateSpeech({ motion, format, side, role, level, context }: {
  motion: string;
  format: string;
  side: string;
  role: string;
  level: string;
  context: any;
}): Promise<string> {
  const result = await callSarvamAI('debate/speech', {
    motion,
    format,
    side,
    role,
    skillLevel: level,
    debateContext: context,
    previousSpeeches: context.speeches || [],
    pois: context.pois || [],
    speechTime: context.speechTime || 0,
    includeRebuttals: true,
    includeEvidence: true
  });
  
  console.log('Sarvam AI speech result:', result);
  return result.speech || result.content || result.text;
}

// --- Sarvam AI: POI Generation ---
export async function generatePOI({ motion, format, side, role, context }: {
  motion: string;
  format: string;
  side: string;
  role: string;
  context: any;
}): Promise<string> {
  const result = await callSarvamAI('debate/poi', {
    motion,
    format,
    side,
    role,
    debateContext: context,
    currentSpeech: context.currentSpeech || "",
    timing: context.speechTime || 0,
    includeChallenging: true,
    includeContextual: true
  });
  
  console.log('Sarvam AI POI result:', result);
  return result.poi || result.content || result.text;
}

// --- Mathematical Evaluation Algorithm ---
function calculateClashScores(speeches: any[], format: string): ClashEvaluation[] {
  const clashes: ClashEvaluation[] = [];
  
  // Identify major clashes from speeches
  const clashTopics = [
    "Democratic Integrity",
    "Freedom of Speech", 
    "Practical Implementation",
    "Economic Impact",
    "International Precedent"
  ];
  
  clashTopics.forEach((topic, index) => {
    const governmentArguments = speeches.filter(s => s.side === "Government" && s.text?.includes(topic)).length;
    const oppositionArguments = speeches.filter(s => s.side === "Opposition" && s.text?.includes(topic)).length;
    
    // Simple scoring: more arguments = better performance
    const govScore = Math.min(1, governmentArguments / 3);
    const oppScore = Math.min(1, oppositionArguments / 3);
    
    clashes.push({
      clashId: `clash-${index}`,
      topic,
      weight: 8 - index, // First clashes are more important
      governmentScore: govScore,
      oppositionScore: oppScore,
      reasoning: `Government presented ${governmentArguments} arguments, Opposition presented ${oppositionArguments} arguments on ${topic}`,
      evidence: [`${governmentArguments} gov arguments`, `${oppositionArguments} opp arguments`]
    });
  });
  
  return clashes;
}

function evaluateSpeaker(speeches: any[], role: string, side: string, format: string): SpeakerEvaluation {
  const speakerSpeech = speeches.find(s => s.role === role && s.side === side);
  
  if (!speakerSpeech) {
    return {
      role,
      side,
      speaker: "AI",
      matter: 75,
      manner: 75,
      method: 75,
      roleFulfillment: 75,
      totalScore: 75,
      strengths: ["Good structure", "Clear arguments"],
      improvements: ["More evidence needed", "Stronger rebuttals"],
      feedback: "Solid performance with room for improvement."
    };
  }
  
  // Analyze speech content for scoring
  const speechLength = speakerSpeech.text?.length || 0;
  const hasEvidence = speakerSpeech.text?.includes("research") || speakerSpeech.text?.includes("study") || speakerSpeech.text?.includes("data");
  const hasRebuttal = speakerSpeech.text?.includes("opposition") || speakerSpeech.text?.includes("they claim") || speakerSpeech.text?.includes("however");
  const hasStructure = speakerSpeech.text?.includes("first") || speakerSpeech.text?.includes("second") || speakerSpeech.text?.includes("therefore");
  
  const matter = 70 + (hasEvidence ? 20 : 0) + (hasRebuttal ? 10 : 0);
  const manner = 75 + (speechLength > 500 ? 15 : 0) + (hasStructure ? 10 : 0);
  const method = 75 + (hasStructure ? 15 : 0) + (hasRebuttal ? 10 : 0);
  const roleFulfillment = 80 + (role.includes("Prime") || role.includes("Leader") ? 10 : 0);
  
  const totalScore = Math.round((matter + manner + method + roleFulfillment) / 4);
  
  return {
    role,
    side,
    speaker: "You",
    matter,
    manner,
    method,
    roleFulfillment,
    totalScore,
    strengths: [
      hasEvidence ? "Good use of evidence" : "Clear arguments",
      hasStructure ? "Well-structured speech" : "Good delivery",
      hasRebuttal ? "Effective rebuttals" : "Strong position"
    ],
    improvements: [
      !hasEvidence ? "Include more evidence" : "Consider counter-arguments",
      !hasStructure ? "Improve speech structure" : "Work on timing",
      !hasRebuttal ? "Address opposition arguments" : "Strengthen conclusions"
    ],
    feedback: `Good performance as ${role}. ${hasEvidence ? "Strong evidence use." : "Consider adding more evidence."} ${hasRebuttal ? "Effective rebuttals." : "Address opposition arguments more directly."}`
  };
}

// --- Sarvam AI: Adjudication ---
export async function adjudicateDebate({ speeches, format, roles, manuals }: {
  speeches: any[];
  format: string;
  roles: string[];
  manuals?: string[];
}): Promise<DebateResult> {
  const result = await callSarvamAI('debate/adjudicate', {
    speeches,
    format,
    roles,
    manuals: manuals || [],
    evaluationFramework: "mathematical",
    includeClashAnalysis: true,
    includeSpeakerScores: true,
    includeChainOfThought: true
  });
  
  console.log('Sarvam AI adjudication result:', result);
  
  // Ensure the result has the expected structure
  if (result && (result.winner || result.result?.winner)) {
    return {
      winner: result.winner || result.result?.winner,
      margin: result.margin || result.result?.margin || "clear",
      governmentScore: result.governmentScore || result.scores?.government || 75,
      oppositionScore: result.oppositionScore || result.scores?.opposition || 70,
      speakerScores: result.speakerScores || result.scores || [],
      clashEvaluations: result.clashEvaluations || result.clashAnalysis || [],
      chainOfThought: result.chainOfThought || result.reasoning || [],
      overallFeedback: result.overallFeedback || result.feedback || "Good debate with room for improvement."
    };
  }
  
  return result;
}

// --- OpenRouter Claude 3 Haiku: Debate Coach ---
export async function getDebateCoachResponse({ prompt, context }: { prompt: string; context?: any }): Promise<string> {
  const apiKey = OPENROUTER_API_KEY;
  if (!apiKey) {
    throw new Error('OpenRouter API key is missing. Please set VITE_OPENROUTER_API_KEY in your .env file.');
  }
  
  // Use the correct OpenRouter endpoint and request body for Claude 3 Haiku
  const endpoint = 'https://openrouter.ai/api/v1/chat/completions';
  let response;
  try {
    response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'anthropic/claude-3-haiku',
        messages: [
          {
            role: 'system',
            content: `You are an expert debate coach. Provide specific, actionable advice for competitive debate. Focus on argument structure, evidence use, rebuttal techniques, and strategic thinking. Be encouraging but honest about areas for improvement.${context ? ` Context: ${JSON.stringify(context)}` : ''}`
          },
          { role: 'user', content: prompt }
        ]
      })
    });
  } catch (networkError) {
    throw new Error('Network error: ' + (networkError instanceof Error ? networkError.message : String(networkError)));
  }
  
  const text = await response.text();
  if (!response.ok) {
    if (text.trim().startsWith('<')) {
      throw new Error(`OpenRouter API error (${response.status}): Received HTML response. Check your endpoint, API key, or CORS.\n${text.slice(0, 200)}`);
    } else {
      throw new Error(`OpenRouter API error (${response.status}): ${text}`);
    }
  }
  
  try {
    const data = JSON.parse(text);
    return data.choices?.[0]?.message?.content || data.reply || data.result || 'No response from AI.';
  } catch (jsonError) {
    throw new Error('Failed to parse JSON from OpenRouter API. Raw response: ' + text.slice(0, 200));
  }
} 