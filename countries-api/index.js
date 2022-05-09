import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ThemeProvider } from "./themecontext";



const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    
    {/* <header className="top-header">
      <div className="title">
        <a href="/" className="title-text">
          Where in the world?
        </a>
      </div>
      <div className="theme-container">
        <i className="fa-solid fa-moon"></i>
        <div className="mode" onClick={themeToggle}>Dark Mode</div>
      </div>
    </header> */}
    <ThemeProvider>
    <div>
    <App />
    </div>
    </ThemeProvider>
  </React.StrictMode>
);
