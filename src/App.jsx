import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ConverterForm from './components/converterForm';
import NewsPage from './components/NewsPage';
import EducationPage from './components/EducationPage';
import './index.css';

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    document.body.className = darkMode ? 'dark-mode' : '';
  }, [darkMode]);
  
  return (
    <Router>
      <div className={`app-container ${darkMode ? 'dark-mode' : ''}`}>
        <nav className="main-nav">
          <div className="nav-brand">
            <Link to="/">Currency Converter</Link>
          </div>
          <div className="nav-links">
            <Link to="/">Converter</Link>
            <Link to="/news">News & Trends</Link>
            <Link to="/education">Education</Link>
            <button 
              className="theme-toggle"
              onClick={() => setDarkMode(!darkMode)}
              aria-label="Toggle dark mode"
            >
              {darkMode ? '☀️' : '🌙'}
            </button>
          </div>
        </nav>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<ConverterForm />} />
            <Route path="/news" element={<NewsPage />} />
            <Route path="/education" element={<EducationPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
