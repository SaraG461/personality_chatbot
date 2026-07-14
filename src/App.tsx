import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";

import Home from "./pages/Home";
import Assessment from "./pages/Assessment";
import AssessmentHistory from "./pages/AssessmentHistory";

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
      </Routes>
    </BrowserRouter>
  );
}

export default App;