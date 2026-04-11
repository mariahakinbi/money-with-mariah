import { Routes, Route } from "react-router-dom";
import HubPage from "./pages/HubPage.jsx";
import CoachingPage from "./pages/CoachingPage.jsx";
import CoastFirePage from "./pages/CoastFirePage.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HubPage />} />
      <Route path="/coaching" element={<CoachingPage />} />
      <Route path="/coastfire" element={<CoastFirePage />} />
    </Routes>
  );
}
