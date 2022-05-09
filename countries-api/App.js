import React, {useContext} from "react";
import "./App.css";
import Search from "./components/search";
import SelectedCountry from "./components/selectedcountry";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeContext } from "./themecontext";


const App = () => {
  const { theme, themeToggle, themeText, themeIcon } = useContext(ThemeContext)

  return (
    <div className="container" id={theme}>
    <header className="top-header">
      <div className="title">
        <a href="/" className="title-text">
          Where in the world?
        </a>
      </div>
      <div className="theme-container">
        <i className={themeIcon}></i>
        <div className="mode" onClick={themeToggle}>{themeText}</div>
      </div>
    </header>


    <Router>
      <Routes>
        <Route path="/" element={<Search />} />
        <Route path="/selectedcountry" exact element={<SelectedCountry />} />
      </Routes>
    </Router>
    </div>
  );
};

export default App;
