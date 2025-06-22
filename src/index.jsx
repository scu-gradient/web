import React from "react";
import { createRoot } from "react-dom/client";
import { Screen } from "./screens/Screen";

createRoot(document.getElementById("app")).render(
  <React.StrictMode>
    <Screen />
  </React.StrictMode>
);
