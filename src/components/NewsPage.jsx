////
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const NewsPage = () => {
  const [news, setNews] = useState([]);
  const [trendingPairs, setTrendingPairs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [feedbacks, setFeedbacks] = useState(() => {
    const saved = localStorage.getItem('feedbacks');
    return saved ? JSON.parse(saved) : [];
  });

  const fetchNews = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Using a free news API endpoint (GNews)
      const response = await axios.get('https://gnews.io/api/v4/top-headlines', {
        params: {
          category: 'business',
          lang: 'en',
          apikey: process.env.REACT_APP_GNEWS_API_KEY || 'YOUR_API_KEY' // Replace with your API key
        }
      });
      
      if (response.data.articles && response.data.articles.length > 0) {
        setNews(response.data.articles);
      } else {
        throw new Error('No news articles found');
      }
    } catch (err) {
      setError('Unable to fetch news at the moment. Please check your API key or try again later.');
      console.error('Error fetching news:', err);
      
      // Retry mechanism
      if (retryCount < 3) {
        setTimeout(() => {
          setRetryCount(prev => prev + 1);
          fetchNews();
        }, 5000); // Retry after 5 seconds
      }
    } finally {
      setLoading(false);
    }
  };

  
  const fetchTrendingPairs = async () => {
    try {
      // Using a free exchange rates API
      const response = await axios.get('https://api.exchangerate-api.com/v4/latest/USD');
      const rates = response.data.rates;
      
      // Get top 5 most traded currency pairs
      const popularPairs = [
        { from: 'USD', to: 'EUR', rate: rates.EUR },
        { from: 'USD', to: 'GBP', rate: rates.GBP },
        { from: 'USD', to: 'JPY', rate: rates.JPY },
        { from: 'USD', to: 'AUD', rate: rates.AUD },
        { from: 'USD', to: 'CAD', rate: rates.CAD }
      ];
      
      setTrendingPairs(popularPairs);
    } catch (err) {
      console.error('Error fetching trending pairs:', err);
    }
  };

  useEffect(() => {
    fetchNews();
    fetchTrendingPairs();
  }, [retryCount]);

  useEffect(() => {
    localStorage.setItem('feedbacks', JSON.stringify(feedbacks));
  }, [feedbacks]);

  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    if (feedback.trim()) {
      const newFeedback = {
        id: Date.now(),
        text: feedback,
        date: new Date().toLocaleString()
      };
      setFeedbacks([...feedbacks, newFeedback]);
      setFeedback('');
    }
  };

  return (
    <div className="news-page">
      <h1 className="page-title">Financial News & Trends</h1>
      
      <div className="trending-section">
        <h2>Trending Currency Pairs</h2>
        <div className="trending-grid">
          {trendingPairs.map((pair, index) => (
            <div key={index} className="trending-card">
              <div className="pair-info">
                <span className="pair">{pair.from}/{pair.to}</span>
                <span className="rate">{pair.rate.toFixed(4)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="market-analysis">
        <h2>Market Analysis</h2>
        <div className="analysis-content">
          <p>
            The currency market is currently experiencing significant movements due to various economic factors.
            Major currencies are showing mixed performance, with the USD maintaining its strength against most pairs.
            Keep an eye on central bank announcements and economic indicators for potential market shifts.
          </p>
        </div>
      </div>

      {loading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading news...</p>
        </div>
      ) : error ? (
        <div className="error-container">
          <p className="error-message">{error}</p>
          {retryCount < 3 && (
            <p className="retry-message">Retrying in {5 - retryCount} seconds...</p>
          )}
          <button 
            className="retry-button"
            onClick={() => {
              setRetryCount(0);
              fetchNews();
            }}
          >
            Retry Now
          </button>
        </div>
      ) : (
        <div className="news-grid">
          {news.map((article, index) => (
            <div key={index} className="news-card">
              {article.image && (
                <img
                  src={article.image}
                  alt={article.title}
                  className="news-image"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://via.placeholder.com/300x200?text=No+Image';
                  }}
                />
              )}
              <div className="news-content">
                <h2 className="news-title">
                  <a href={article.url} target="_blank" rel="noopener noreferrer">
                    {article.title}
                  </a>
                </h2>
                <p className="news-description">{article.description}</p>
                <div className="news-meta">
                  <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
                  <span>{article.source.name}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      
      <div className="feedback-section">
        <h2>User Feedback</h2>
        <form onSubmit={handleFeedbackSubmit} className="feedback-form">
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Share your thoughts or ask questions..."
            className="feedback-input"
          />
          <button type="submit" className="submit-feedback">
            Submit Feedback
          </button>
        </form>

        <div className="feedbacks-list">
          {feedbacks.map((item) => (
            <div key={item.id} className="feedback-item">
              <p className="feedback-text">{item.text}</p>
              <span className="feedback-date">{item.date}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewsPage; 
