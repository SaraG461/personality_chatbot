export type PersonalityType =
  | "INFJ"
  | "INFP"
  | "ENFJ"
  | "ENFP"
  | "INTJ"
  | "INTP"
  | "ENTJ"
  | "ENTP"
  | "ISTJ"
  | "ISFJ"
  | "ESTJ"
  | "ESFJ"
  | "ISTP"
  | "ISFP"
  | "ESTP"
  | "ESFP";

export type Favourite = {
  label: string;
  value: string;
};

export type AiCompanion = {
  personalityType: PersonalityType;
  name: string;
  title: string;
  emoji: string;
  preferredEmojis: string[];

  shortDescription: string;
  greeting: string;
  backgroundStory: string;
  story: string;

  birthday: string;
  favourites: Favourite[];

  quirkyHabit: string;
  dream: string;
  fear: string;
  comfortItem: string;

  personalityTraits: string[];
  communicationStyle: string[];
  values: string[];
  dislikes: string[];
  hiddenFacts: string[];
};