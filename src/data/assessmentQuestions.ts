import type { AssessmentQuestion } from "../types/Assessment";

export const assessmentQuestions: AssessmentQuestion[] = [
  // E / I — Social energy

  {
    id: 1,
    category: "Social energy",
    dimension: "EI",
    weight: 2,
    question: "After spending a busy day with other people, how do you usually feel?",
    options: [
      {
        text: "Energised and interested in continuing the conversation",
        value: "E",
      },
      {
        text: "Ready for quiet time so I can recharge",
        value: "I",
      },
    ],
  },
  {
    id: 2,
    category: "Social energy",
    dimension: "EI",
    question: "When you join a group where you do not know many people, what feels more natural?",
    options: [
      {
        text: "Starting conversations and getting to know people",
        value: "E",
      },
      {
        text: "Observing first and speaking when I feel comfortable",
        value: "I",
      },
    ],
  },
  {
    id: 3,
    category: "Social energy",
    dimension: "EI",
    question: "How do you usually develop your thoughts?",
    options: [
      {
        text: "I understand my thoughts better by talking them through",
        value: "E",
      },
      {
        text: "I prefer to think privately before sharing my ideas",
        value: "I",
      },
    ],
  },
  {
    id: 4,
    category: "Social energy",
    dimension: "EI",
    question: "Which kind of social life feels more satisfying?",
    options: [
      {
        text: "A wide circle with many different interactions",
        value: "E",
      },
      {
        text: "A smaller circle with deeper relationships",
        value: "I",
      },
    ],
  },
  {
    id: 5,
    category: "Social energy",
    dimension: "EI",
    question: "During a team discussion, what are you more likely to do?",
    options: [
      {
        text: "Contribute ideas as they come to me",
        value: "E",
      },
      {
        text: "Listen carefully and contribute after reflecting",
        value: "I",
      },
    ],
  },
  {
    id: 6,
    category: "Social energy",
    dimension: "EI",
    question: "When your phone rings unexpectedly, what is your first reaction?",
    options: [
      {
        text: "I am usually happy to answer and see who it is",
        value: "E",
      },
      {
        text: "I would rather know who is calling before answering",
        value: "I",
      },
    ],
  },
  {
    id: 7,
    category: "Social energy",
    dimension: "EI",
    question: "Which working environment helps you feel most engaged?",
    options: [
      {
        text: "A lively environment with regular interaction",
        value: "E",
      },
      {
        text: "A quieter environment where I can concentrate independently",
        value: "I",
      },
    ],
  },
  {
    id: 8,
    category: "Social energy",
    dimension: "EI",
    question: "When meeting someone new, how do you normally behave?",
    options: [
      {
        text: "I quickly find something to talk about",
        value: "E",
      },
      {
        text: "I take time to become comfortable and open up",
        value: "I",
      },
    ],
  },

  // S / N — Information and perception

  {
    id: 9,
    category: "Information style",
    dimension: "SN",
    weight: 2,
    question: "When learning something new, what helps you understand it best?",
    options: [
      {
        text: "Clear examples, practical steps and real situations",
        value: "S",
      },
      {
        text: "The main idea, patterns and future possibilities",
        value: "N",
      },
    ],
  },
  {
    id: 10,
    category: "Information style",
    dimension: "SN",
    question: "Which type of conversation interests you more?",
    options: [
      {
        text: "Talking about real experiences and what is happening now",
        value: "S",
      },
      {
        text: "Exploring ideas, theories and what could happen",
        value: "N",
      },
    ],
  },
  {
    id: 11,
    category: "Information style",
    dimension: "SN",
    question: "When following instructions, what do you usually prefer?",
    options: [
      {
        text: "A clear sequence that explains each step",
        value: "S",
      },
      {
        text: "An overall goal with freedom to find my own approach",
        value: "N",
      },
    ],
  },
  {
    id: 12,
    category: "Information style",
    dimension: "SN",
    question: "What are you more likely to notice first?",
    options: [
      {
        text: "Specific details and what is directly observable",
        value: "S",
      },
      {
        text: "Connections, patterns and hidden meanings",
        value: "N",
      },
    ],
  },
  {
    id: 13,
    category: "Information style",
    dimension: "SN",
    question: "Which task sounds more enjoyable?",
    options: [
      {
        text: "Improving a method that already works",
        value: "S",
      },
      {
        text: "Inventing a completely new method",
        value: "N",
      },
    ],
  },
  {
    id: 14,
    category: "Information style",
    dimension: "SN",
    question: "How do you normally approach a problem?",
    options: [
      {
        text: "I begin with facts and what I already know",
        value: "S",
      },
      {
        text: "I imagine several possibilities before choosing a direction",
        value: "N",
      },
    ],
  },
  {
    id: 15,
    category: "Information style",
    dimension: "SN",
    question: "Which description fits your memory better?",
    options: [
      {
        text: "I often remember specific details and events",
        value: "S",
      },
      {
        text: "I usually remember the meaning or overall impression",
        value: "N",
      },
    ],
  },
  {
    id: 16,
    category: "Information style",
    dimension: "SN",
    question: "Which kind of work attracts you more?",
    options: [
      {
        text: "Work with practical and measurable outcomes",
        value: "S",
      },
      {
        text: "Work involving imagination, concepts and experimentation",
        value: "N",
      },
    ],
  },

  // T / F — Decision-making

  {
    id: 17,
    category: "Decision-making",
    dimension: "TF",
    weight: 2,
    question: "When making an important decision, what usually guides you most?",
    options: [
      {
        text: "Logic, consistency and objective evidence",
        value: "T",
      },
      {
        text: "Personal values and how people will be affected",
        value: "F",
      },
    ],
  },
  {
    id: 18,
    category: "Decision-making",
    dimension: "TF",
    question: "When a friend describes a problem, what do you naturally do first?",
    options: [
      {
        text: "Help identify the cause and suggest a solution",
        value: "T",
      },
      {
        text: "Listen carefully and acknowledge how they feel",
        value: "F",
      },
    ],
  },
  {
    id: 19,
    category: "Decision-making",
    dimension: "TF",
    question: "During a disagreement, what matters more to you?",
    options: [
      {
        text: "Reaching the most reasonable and accurate conclusion",
        value: "T",
      },
      {
        text: "Maintaining understanding and respect between people",
        value: "F",
      },
    ],
  },
  {
    id: 20,
    category: "Decision-making",
    dimension: "TF",
    question: "How do you prefer to receive feedback?",
    options: [
      {
        text: "Directly, with clear examples of what should improve",
        value: "T",
      },
      {
        text: "Considerately, with attention to effort and feelings",
        value: "F",
      },
    ],
  },
  {
    id: 21,
    category: "Decision-making",
    dimension: "TF",
    question: "When rules produce an unfair result for someone, what do you tend to prioritise?",
    options: [
      {
        text: "Applying the rule consistently unless it is officially changed",
        value: "T",
      },
      {
        text: "Considering the individual situation and making an exception",
        value: "F",
      },
    ],
  },
  {
    id: 22,
    category: "Decision-making",
    dimension: "TF",
    question: "Which quality do you value more in yourself?",
    options: [
      {
        text: "Being fair-minded and able to analyse situations clearly",
        value: "T",
      },
      {
        text: "Being compassionate and able to understand other people",
        value: "F",
      },
    ],
  },
  {
    id: 23,
    category: "Decision-making",
    dimension: "TF",
    question: "When choosing between two good options, what breaks the tie?",
    options: [
      {
        text: "Which option is more efficient or logically justified",
        value: "T",
      },
      {
        text: "Which option feels more meaningful or supportive",
        value: "F",
      },
    ],
  },
  {
    id: 24,
    category: "Decision-making",
    dimension: "TF",
    question: "What are people more likely to ask you for?",
    options: [
      {
        text: "An honest opinion or practical solution",
        value: "T",
      },
      {
        text: "Emotional support or personal understanding",
        value: "F",
      },
    ],
  },

  // J / P — Lifestyle and organisation

  {
    id: 25,
    category: "Lifestyle",
    dimension: "JP",
    weight: 2,
    question: "Which approach to your day feels more comfortable?",
    options: [
      {
        text: "Knowing the plan and completing things in an organised order",
        value: "J",
      },
      {
        text: "Keeping my options open and adjusting as the day develops",
        value: "P",
      },
    ],
  },
  {
    id: 26,
    category: "Lifestyle",
    dimension: "JP",
    question: "How do you usually feel about deadlines?",
    options: [
      {
        text: "I prefer to finish early and know the task is complete",
        value: "J",
      },
      {
        text: "I often work best when the deadline becomes closer",
        value: "P",
      },
    ],
  },
  {
    id: 27,
    category: "Lifestyle",
    dimension: "JP",
    question: "When planning a trip, what do you prefer?",
    options: [
      {
        text: "Booking important details and preparing an itinerary",
        value: "J",
      },
      {
        text: "Making a few arrangements and deciding the rest later",
        value: "P",
      },
    ],
  },
  {
    id: 28,
    category: "Lifestyle",
    dimension: "JP",
    question: "How do unfinished tasks usually make you feel?",
    options: [
      {
        text: "Uncomfortable until I finish or schedule them",
        value: "J",
      },
      {
        text: "Comfortable leaving them open while I focus on other things",
        value: "P",
      },
    ],
  },
  {
    id: 29,
    category: "Lifestyle",
    dimension: "JP",
    question: "Which type of work structure suits you better?",
    options: [
      {
        text: "Clear expectations, milestones and decisions",
        value: "J",
      },
      {
        text: "Flexible expectations and room to change direction",
        value: "P",
      },
    ],
  },
  {
    id: 30,
    category: "Lifestyle",
    dimension: "JP",
    question: "When several options are available, what do you naturally do?",
    options: [
      {
        text: "Choose one so I can move forward",
        value: "J",
      },
      {
        text: "Keep exploring in case a better option appears",
        value: "P",
      },
    ],
  },
  {
    id: 31,
    category: "Lifestyle",
    dimension: "JP",
    question: "How do you normally organise personal tasks?",
    options: [
      {
        text: "I use plans, reminders or lists to stay organised",
        value: "J",
      },
      {
        text: "I respond to tasks according to my energy and priorities",
        value: "P",
      },
    ],
  },
  {
    id: 32,
    category: "Lifestyle",
    dimension: "JP",
    question: "How do you react when plans change unexpectedly?",
    options: [
      {
        text: "I need some time to reorganise and adjust",
        value: "J",
      },
      {
        text: "I usually adapt quickly and see where things lead",
        value: "P",
      },
    ],
  },
];