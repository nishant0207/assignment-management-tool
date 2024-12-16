import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

console.log("React App Starting...");

const container = document.getElementById("root"); // Ensure this matches the id in index.html
if (!container) {
  console.error("Root container not found! Check index.html.");
} else {
  const root = ReactDOM.createRoot(container);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}