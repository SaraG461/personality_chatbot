import type { AssessmentResult } from "../types/Assessment";

export type AssessmentHistoryItem = {
  id: number;
  personality_type: string;
  matched_personality_type: string;
  companion_name: string;

  extraversion: number;
  introversion: number;

  sensing: number;
  intuition: number;

  thinking: number;
  feeling: number;

  judging: number;
  perceiving: number;

  created_at: string;
};

type SaveAssessmentInput = {
  result: AssessmentResult;
  matchedPersonalityType: string;
  companionName: string;
};

const API_BASE_URL = "http://127.0.0.1:5000/api";

export async function saveAssessment({
  result,
  matchedPersonalityType,
  companionName,
}: SaveAssessmentInput): Promise<AssessmentHistoryItem> {
  const response = await fetch(`${API_BASE_URL}/assessments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      personalityType: result.personalityType,
      matchedPersonalityType,
      companionName,
      percentages: result.percentages,
    }),
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => null);

    throw new Error(
      errorBody?.error ?? "The assessment could not be saved.",
    );
  }

  return response.json();
}

export async function getAssessmentHistory(): Promise<
  AssessmentHistoryItem[]
> {
  const response = await fetch(`${API_BASE_URL}/assessments`);

  if (!response.ok) {
    const errorBody = await response.json().catch(() => null);

    throw new Error(
      errorBody?.error ??
        "The assessment history could not be loaded.",
    );
  }

  return response.json();
}

export async function getAssessmentById(
  assessmentId: number,
): Promise<AssessmentHistoryItem> {
  const response = await fetch(
    `${API_BASE_URL}/assessments/${assessmentId}`,
  );

  if (!response.ok) {
    const errorBody = await response.json().catch(() => null);

    throw new Error(
      errorBody?.error ??
        "The assessment result could not be loaded.",
    );
  }

  return response.json();
}