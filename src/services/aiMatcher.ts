import { ResourceItem, SkillSwapItem } from '../types';

export interface MatchedResource {
  item: ResourceItem;
  matchScore: number;
  reason: string;
}

export interface MatchedPerson {
  student: {
    id: string;
    name: string;
    avatar: string;
    department: string;
    reputation: number;
    skills: string[];
    availability: string;
    distance: string;
  };
  matchScore: number;
  reason: string;
}

export interface MatchedSkill {
  skillSwap: SkillSwapItem;
  matchScore: number;
  reason: string;
}

export interface AIMatchAnalysis {
  query: string;
  overallMatchScore: number;
  extractedNeeds: string[];
  resources: MatchedResource[];
  people: MatchedPerson[];
  skills: MatchedSkill[];
  comboSynergy?: {
    title: string;
    description: string;
    primaryResource: string;
    primaryHelper: string;
    combinedSavings: number;
  };
}

/* -------------------------------------------------------
   CAMPUS INTELLIGENCE
   Keyword + semantic matching without external AI API
------------------------------------------------------- */

const SEMANTIC_CLUSTERS: Record<string, string[]> = {
  math: [
    'calculus',
    'mathematics',
    'maths',
    'differentiation',
    'integration',
    'derivatives',
    'integrals',
    'limits',
    'algebra',
    'numerical',
    'formulas',
    'grewal',
    'fourier'
  ],

  python: [
    'programming',
    'coding',
    'script',
    'data science',
    'pandas',
    'numpy',
    'automation',
    'software'
  ],

  sql: [
    'database',
    'db',
    'queries',
    'postgres',
    'mysql',
    'joins',
    'group by',
    'backend'
  ],

  calculator: [
    'casio',
    'scientific',
    'fx',
    'exam',
    'classwiz',
    'computation'
  ],

  books: [
    'book',
    'textbook',
    'guide',
    'notes',
    'reading',
    'handbook',
    'volume',
    'edition'
  ],

  electronics: [
    'gadget',
    'charger',
    'laptop',
    'cable',
    'adapter',
    'raspberry pi',
    'screen'
  ],

  hostel: [
    'room',
    'desk',
    'chair',
    'kettle',
    'fan',
    'bed',
    'living',
    'furniture',
    'hostel'
  ],

  dsa: [
    'data structures',
    'algorithms',
    'trees',
    'graphs',
    'c++',
    'sorting',
    'leetcode'
  ],

  design: [
    'figma',
    'ui',
    'ux',
    'wireframe',
    'prototype',
    'cad',
    'autocad',
    'drawing'
  ],

  stationery: [
    'drafter',
    'drafting',
    'notebook',
    'scale',
    'pens',
    'sheets'
  ]
};

/* -------------------------------------------------------
   Intent detection
------------------------------------------------------- */

const INTENTS = {
  learn: [
    'learn',
    'teach',
    'understand',
    'explain',
    'mentor',
    'help me',
    'study',
    'practice'
  ],

  borrow: [
    'borrow',
    'need',
    'looking for',
    'find',
    'get',
    'want'
  ],

  exchange: [
    'exchange',
    'swap',
    'in exchange',
    'trade'
  ],

  urgent: [
    'tomorrow',
    'today',
    'urgent',
    'exam',
    'asap',
    'quick'
  ]
};

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .split(/\s+/)
    .filter(token => token.length > 2);
}

function expandTokens(tokens: string[]): Set<string> {
  const expanded = new Set<string>(tokens);

  for (const token of tokens) {
    for (const [key, synonyms] of Object.entries(SEMANTIC_CLUSTERS)) {
      if (token === key || synonyms.includes(token)) {
        expanded.add(key);

        synonyms.forEach(word => {
          expanded.add(word);
        });
      }
    }
  }

  return expanded;
}

function detectIntent(query: string): string[] {
  const lower = query.toLowerCase();

  return Object.entries(INTENTS)
    .filter(([, words]) =>
      words.some(word => lower.includes(word))
    )
    .map(([intent]) => intent);
}

function detectNeeds(tokens: Set<string>): string[] {
  const needs: string[] = [];

  if (
    [...tokens].some(t =>
      ['math', 'calculus'].includes(t)
    )
  ) {
    needs.push('Mathematics & Calculus');
  }

  if (
    [...tokens].some(t =>
      ['python', 'coding', 'programming'].includes(t)
    )
  ) {
    needs.push('Python Programming');
  }

  if (
    [...tokens].some(t =>
      ['sql', 'database'].includes(t)
    )
  ) {
    needs.push('SQL & Databases');
  }

  if (
    [...tokens].some(t =>
      ['calculator', 'casio'].includes(t)
    )
  ) {
    needs.push('Exam Scientific Calculator');
  }

  if (
    [...tokens].some(t =>
      ['dsa', 'algorithms'].includes(t)
    )
  ) {
    needs.push('Data Structures & Algorithms');
  }

  if (
    [...tokens].some(t =>
      ['hostel', 'kettle', 'desk', 'chair'].includes(t)
    )
  ) {
    needs.push('Hostel Living Essentials');
  }

  if (
    [...tokens].some(t =>
      ['design', 'figma', 'autocad'].includes(t)
    )
  ) {
    needs.push('Design & Prototyping');
  }

  if (needs.length === 0) {
    needs.push('General Campus Resource');
  }

  return needs;
}

/* -------------------------------------------------------
   Intelligent scoring
------------------------------------------------------- */

function calculateMatchScore(
  query: string,
  expandedTokens: Set<string>,
  rawTokens: string[],
  searchableText: string,
  qualityBonus = 0
): number {
  let score = 30;

  const matchedTokens: string[] = [];

  for (const token of expandedTokens) {
    if (
      token.length > 2 &&
      searchableText.includes(token)
    ) {
      matchedTokens.push(token);
    }
  }

  // Semantic matches
  score += Math.min(35, matchedTokens.length * 7);

  // Exact phrase match
  const lowerQuery = query.toLowerCase();

  if (
    lowerQuery.length > 8 &&
    searchableText.includes(lowerQuery)
  ) {
    score += 20;
  }

  // Exact important word matches
  for (const token of rawTokens) {
    if (token.length > 3 && searchableText.includes(token)) {
      score += 5;
    }
  }

  score += qualityBonus;

  return Math.min(99, Math.max(35, Math.round(score)));
}

function getMatchLevel(score: number): string {
  if (score >= 90) return 'Excellent';
  if (score >= 80) return 'Strong';
  if (score >= 65) return 'Good';
  if (score >= 50) return 'Relevant';
  return 'Possible';
}

/* -------------------------------------------------------
   MAIN CAMPUS MATCH ENGINE
------------------------------------------------------- */

export function analyzeCampusNeed(
  query: string,
  resources: ResourceItem[],
  skills: SkillSwapItem[]
): AIMatchAnalysis {
  const rawTokens = tokenize(query);
  const expandedTokens = expandTokens(rawTokens);
  const intents = detectIntent(query);

  const detectedNeeds = detectNeeds(expandedTokens);

  /* -----------------------------------------------------
     1. RESOURCE MATCHING
  ----------------------------------------------------- */

  const scoredResources: MatchedResource[] = resources
    .filter(resource => resource.status === 'available')
    .map(item => {
      const searchableText =
        `${item.title} ${item.description} ${item.tags.join(' ')} ${item.category}`
          .toLowerCase();

      let qualityBonus = 0;

      if (item.condition === 'Like New') {
        qualityBonus += 4;
      }

      if (item.exchangeType === 'Free') {
        qualityBonus += 5;
      }

      const matchScore = calculateMatchScore(
        query,
        expandedTokens,
        rawTokens,
        searchableText,
        qualityBonus
      );

      const level = getMatchLevel(matchScore);

      const matchingNeed =
        detectedNeeds.find(need =>
          searchableText.includes(
            need
              .toLowerCase()
              .split(' ')[0]
          )
        );

      let reason = '';

      if (matchScore >= 80) {
        reason =
          `${level} match because this resource directly relates to your ` +
          `${matchingNeed || 'requested need'}. ` +
          `Available in ${item.location}, with an estimated saving of ₹${item.estimatedValue}.`;
      } else if (matchScore >= 60) {
        reason =
          `Relevant campus resource matching part of your request. ` +
          `Available from ${item.ownerName} in ${item.location}.`;
      } else {
        reason =
          `Possible alternative based on related campus keywords and category.`;
      }

      return {
        item,
        matchScore,
        reason
      };
    })
    .filter(item => item.matchScore >= 50)
    .sort((a, b) => b.matchScore - a.matchScore);

  /* -----------------------------------------------------
     2. SKILL MATCHING
  ------------------------------------------------------- */

  const scoredSkills: MatchedSkill[] = skills
    .map(skillSwap => {
      const searchableText =
        `${skillSwap.skillOffered} ${skillSwap.description} ${skillSwap.skillOfferedCategory}`
          .toLowerCase();

      let qualityBonus = 0;

      if (skillSwap.rating >= 4.8) {
        qualityBonus += 6;
      } else if (skillSwap.rating >= 4.5) {
        qualityBonus += 3;
      }

      const matchScore = calculateMatchScore(
        query,
        expandedTokens,
        rawTokens,
        searchableText,
        qualityBonus
      );

      const level = getMatchLevel(matchScore);

      let reason = '';

      if (matchScore >= 80) {
        reason =
          `${level} skill match — ${skillSwap.studentName} can help with ` +
          `${skillSwap.skillOffered}. ` +
          `Rated ${skillSwap.rating}★ and available ${skillSwap.availability}.`;
      } else {
        reason =
          `Related skill offered by ${skillSwap.studentName}. ` +
          `Availability: ${skillSwap.availability}.`;
      }

      return {
        skillSwap,
        matchScore,
        reason
      };
    })
    .filter(skill => skill.matchScore >= 50)
    .sort((a, b) => b.matchScore - a.matchScore);

  /* -----------------------------------------------------
     3. PEOPLE MATCHING
  ------------------------------------------------------- */

  const peopleMap = new Map<string, MatchedPerson>();

  // Skill mentors
  scoredSkills.slice(0, 4).forEach(match => {
    const person = match.skillSwap;

    peopleMap.set(person.studentId, {
      student: {
        id: person.studentId,
        name: person.studentName,
        avatar: person.studentAvatar,
        department: person.studentDepartment,
        reputation: person.rating,
        skills: [person.skillOffered],
        availability: person.availability,
        distance: 'Same Campus'
      },

      matchScore: match.matchScore,

      reason:
        `Can help you with ${person.skillOffered}. ` +
        `This is a ${getMatchLevel(match.matchScore).toLowerCase()} match ` +
        `based on your request.`
    });
  });

  // Resource owners
  scoredResources.slice(0, 4).forEach(match => {
    const resource = match.item;

    if (!peopleMap.has(resource.ownerId)) {
      peopleMap.set(resource.ownerId, {
        student: {
          id: resource.ownerId,
          name: resource.ownerName,
          avatar: resource.ownerAvatar,
          department: 'Hostel Resident',
          reputation: resource.ownerReputation,
          skills: [`Has ${resource.title}`],
          availability: resource.availability,
          distance: resource.location
        },

        matchScore: Math.max(45, match.matchScore - 3),

        reason:
          `Owns the resource "${resource.title}" that matches your request. ` +
          `Located at ${resource.location}.`
      });
    }
  });

  const scoredPeople = Array.from(
    peopleMap.values()
  )
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, 3);

  /* -----------------------------------------------------
     4. OVERALL MATCH SCORE
  ------------------------------------------------------- */

  const topResource = scoredResources[0];
  const topSkill = scoredSkills[0];

  let overallScore = 55;

  if (topResource && topSkill) {
    overallScore = Math.round(
      topResource.matchScore * 0.45 +
      topSkill.matchScore * 0.55
    );
  } else if (topResource) {
    overallScore = topResource.matchScore;
  } else if (topSkill) {
    overallScore = topSkill.matchScore;
  }

  // Intent confidence
  if (intents.length > 0) {
    overallScore += 3;
  }

  overallScore = Math.min(99, overallScore);

  /* -----------------------------------------------------
     5. COMBO SYNERGY
  ------------------------------------------------------- */

  let comboSynergy:
    AIMatchAnalysis['comboSynergy'] = undefined;

  if (
    topResource &&
    topSkill &&
    topResource.matchScore >= 65 &&
    topSkill.matchScore >= 65
  ) {
    const estimatedMentorValue = 300;

    comboSynergy = {
      title: 'Complete Solution: Material + Peer Mentorship',

      description:
        `We found both a physical resource and a peer who can help you learn it. ` +
        `Use "${topResource.item.title}" and connect with ` +
        `${topSkill.skillSwap.studentName} for a more complete solution.`,

      primaryResource: topResource.item.title,

      primaryHelper: topSkill.skillSwap.studentName,

      // Resource value + conservative estimated value of one peer session
      combinedSavings:
        topResource.item.estimatedValue +
        estimatedMentorValue
    };
  }

  return {
    query,
    overallMatchScore: overallScore,
    extractedNeeds: detectedNeeds,
    resources: scoredResources.slice(0, 4),
    people: scoredPeople,
    skills: scoredSkills.slice(0, 4),
    comboSynergy
  };
}