import type { PersonalityType } from "./types/companion";

type PersonalityProfile = {
  title: string;
  description: string;
};

export const personalityProfiles: Record<
  PersonalityType,
  PersonalityProfile
> = {
  INFJ: {
    title: "The Advocate",
    description:
      "Thoughtful, empathetic and quietly determined, you are often guided by a strong sense of purpose. You value meaningful connections and naturally look beyond the surface to understand people and ideas.",
  },

  INFP: {
    title: "The Mediator",
    description:
      "Imaginative, compassionate and guided by your values, you care deeply about authenticity and meaningful connections. You often see potential in people and ideas that others may overlook.",
  },

  ENFJ: {
    title: "The Protagonist",
    description:
      "Warm, inspiring and people-focused, you naturally encourage others and help bring out their strengths. You are often motivated by connection, purpose and positive change.",
  },

  ENFP: {
    title: "The Campaigner",
    description:
      "Enthusiastic, imaginative and open-minded, you are energised by new ideas, meaningful experiences and genuine connections with others.",
  },

  INTJ: {
    title: "The Architect",
    description:
      "Strategic, independent and future-focused, you enjoy understanding complex systems and creating thoughtful plans that turn ideas into reality.",
  },

  INTP: {
    title: "The Logician",
    description:
      "Curious, analytical and inventive, you enjoy exploring ideas, questioning assumptions and discovering how things work beneath the surface.",
  },

  ENTJ: {
    title: "The Commander",
    description:
      "Confident, decisive and goal-oriented, you naturally organise people and ideas while working towards ambitious and meaningful outcomes.",
  },

  ENTP: {
    title: "The Debater",
    description:
      "Quick-thinking, curious and inventive, you enjoy exploring possibilities, challenging ideas and finding unexpected solutions to difficult problems.",
  },

  ISTJ: {
    title: "The Logistician",
    description:
      "Reliable, practical and organised, you value responsibility, consistency and completing tasks carefully and effectively.",
  },

  ISFJ: {
    title: "The Defender",
    description:
      "Caring, dependable and observant, you notice the needs of others and often provide steady support through thoughtful and practical actions.",
  },

  ESTJ: {
    title: "The Executive",
    description:
      "Direct, organised and dependable, you value structure, clear expectations and practical action when working towards a goal.",
  },

  ESFJ: {
    title: "The Consul",
    description:
      "Friendly, attentive and community-minded, you enjoy helping others feel included, supported and appreciated.",
  },

  ISTP: {
    title: "The Virtuoso",
    description:
      "Independent, practical and adaptable, you enjoy solving problems through direct observation, experimentation and hands-on experience.",
  },

  ISFP: {
    title: "The Adventurer",
    description:
      "Gentle, creative and open-minded, you value personal freedom, emotional honesty and appreciating beauty in everyday life.",
  },

  ESTP: {
    title: "The Entrepreneur",
    description:
      "Energetic, bold and action-oriented, you respond quickly to opportunities and enjoy learning through real-world experience.",
  },

  ESFP: {
    title: "The Entertainer",
    description:
      "Warm, spontaneous and expressive, you bring energy to the present moment and enjoy sharing memorable experiences with others.",
  },
};