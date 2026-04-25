import { Routes, Route, useLocation } from "react-router-dom";
import { useState } from "react";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Aptitude from "./pages/Aptitude";

import SectionTopics from "./pages/SectionTopics";
import MockTestIntro from "./pages/MockTestIntro";
import MockTestPage from "./pages/MockTestPage";
import TopicPage from "./pages/TopicPage";
import TestPage from "./pages/TestPage";
import ResultPage from "./pages/ResultPage";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

function App() {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const hideNavbar =
    location.pathname === "/" ||
    location.pathname === "/signup" ||
    location.pathname === "/mock-test/start";

  const hideSidebar = hideNavbar;

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Navbar */}
      {!hideNavbar && (
        <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      )}

      <div className="flex">

        {/* Sidebar */}
        {!hideSidebar && <Sidebar open={sidebarOpen} />}

        {/* Content */}
        <main
          className={`flex-1 transition-all duration-300 ${
            !hideNavbar ? "p-6 md:p-8" : ""
          }`}
        >
          <Routes>

            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/aptitude" element={<Aptitude />} />

            <Route path="/topics/:section" element={<SectionTopics />} />
            <Route path="/topic/:topic" element={<TopicPage />} />

            <Route path="/mock-test" element={<MockTestIntro />} />
            <Route path="/mock-test/start" element={<MockTestPage />} />

            <Route path="/test" element={<TestPage />} />
            <Route path="/result" element={<ResultPage />} />

            <Route
              path="*"
              element={
                <h1 className="text-2xl font-bold text-center mt-10">
                  Page Not Found
                </h1>
              }
            />

          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;