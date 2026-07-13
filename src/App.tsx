import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Assessment from "./pages/Assessment";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/assessment" element={<Assessment />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;