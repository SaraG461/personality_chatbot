import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";

import Home from "./pages/Home";
import Assessment from "./pages/Assessment";
import AssessmentHistory from "./pages/AssessmentHistory";
import AssessmentResultDetails from "./pages/AssessmentResultDetails";
import CompanionIntro from "./pages/CompanionIntro";
import Storybook from "./pages/Storybook";
import MeetCompanion from "./pages/MeetCompanion";
import Introduction from "./pages/Introduction";
import PersonalityReveal from "./pages/PersonalityReveal";
import PersonalityJourney from "./pages/PersonalityJourney";
import LetterInvitation from "./pages/LetterInvitation";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/assessment"
          element={<Assessment />}
        />

        <Route
          path="/history"
          element={<AssessmentHistory />}
        />

        <Route
          path="/history/:assessmentId"
          element={<AssessmentResultDetails />}
        />

        <Route
          path="/companion"
          element={<CompanionIntro />}
        />

        <Route
          path="/storybook"
          element={<Storybook />}
        />

        <Route
          path="/personality-reveal"
          element={<PersonalityReveal />}
        />

        <Route
          path="/introduction"
          element={<Introduction />}
        />

        <Route
          path="/letter-invitation"
          element={<LetterInvitation />}
        />

        <Route
          path="/personality-journey"
          element={<PersonalityJourney />}
        />

        <Route
          path="/meet-companion"
          element={<MeetCompanion />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;