import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Screen from "./screens/Screen";
import SearchPage from "./screens/SearchPage";

createRoot(document.getElementById("app")).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Screen />} />
        <Route path="/search" element={<SearchPage />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
