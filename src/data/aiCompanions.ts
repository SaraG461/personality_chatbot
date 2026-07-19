import type {
  AiCompanion,
  PersonalityType,
} from "./types/companion";

import {
  may,
  loey,
  orion,
} from "./companions";

export const aiCompanions: Partial<
  Record<PersonalityType, AiCompanion>
> = {
  INFJ: may,
  ENFP: loey,
  INTJ: orion,
};