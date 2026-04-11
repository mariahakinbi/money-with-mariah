import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import HubPage from "./pages/HubPage.jsx";
import CoachingPage from "./pages/CoachingPage.jsx";
import CoastFirePage from "./pages/CoastFirePage.jsx";

function RouteEffects() {
  const { pathname, search } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
    if (window.gtag) {
      window.gtag("event", "page_view", {
        page_path: pathname + search,
        page_location: window.location.href,
        page_title: document.title,
      });
    }
  }, [pathname, search]);
  return null;
}

export default function App() {
  return (
    <>
      <RouteEffects />
      <Routes>
        <Route path="/" element={<HubPage />} />
        <Route path="/coaching" element={<CoachingPage />} />
        <Route path="/coastfire" element={<CoastFirePage />} />
      </Routes>
    </>
  );
}
