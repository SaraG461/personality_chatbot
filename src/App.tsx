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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

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

      </Routes>

      

        
    </BrowserRouter>
  );
}

export default App;