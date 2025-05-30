import React from "react";
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import SchemaPage from "./Components/SchemaPage/SchemaPage";
import DemoPage from "./Components/DemoPage/demo_page";
import "./App.css"; // Import your CSS file
import TableManager from "./Components/DataPage/dataPage";
// import "tailwindcss/tailwind.css"; // Import Tailwind CSS
// import "framer-motion/dist/framer-motion.css"; // Import Framer Motion styles
// import "animate.css/animate.min.css"; // Import Animate.css for animations

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        {/* Navigation Bar */}
        <nav className="bg-white shadow-md py-4 px-8 flex justify-between items-center">
          <h1 className="text-xl font-bold text-indigo-600">QueryEase</h1>
          <div className="space-x-4">
            <Link to="/schema" className="text-indigo-700 font-medium hover:underline hover:text-indigo-900 schema-builder-link">
              🧱 Schema Builder
            </Link>
            <Link to="/demo" className="text-indigo-700 font-medium hover:underline hover:text-indigo-900 ml-2">
              💬 Demo Query
            </Link>
            <Link to="/data" className="text-indigo-700 font-medium hover:underline hover:text-indigo-900 ml-2">
              💬 Data Management
            </Link>
          </div>
        </nav>

        {/* Page Routes */}
        <Routes>
          <Route path="/" element={<Navigate to="/schema" replace />} />
          <Route path="/schema" element={<SchemaPage />} />
          <Route path="/demo" element={<DemoPage />} />
          <Route path="/data" element={<TableManager />} />
          <Route path="*" element={<Navigate to="/schema" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
