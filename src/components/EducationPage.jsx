import React, { useState } from 'react';

const EducationPage = () => {
  const [activeSection, setActiveSection] = useState('basics');


  const sections = {
    
    basics: {
      title: 'Understanding Exchange Rates',
      content: `Exchange rates represent the value of one currency in terms of another. They fluctuate constantly due to various factors:
      
      • Economic indicators (GDP, inflation, employment)
      • Interest rates
      • Political stability
      • Market speculation
      • Trade balances
      
      Understanding these factors can help you make better decisions when converting currencies.`,
      tips: [
        'Monitor exchange rates regularly to identify trends',
        'Consider using limit orders for better rates',
        'Be aware of hidden fees in currency conversion',
        'Plan ahead for large currency conversions'
      ]
      
    }, conversion: {
      title: 'Currency Conversion Tips',
      content: `When converting currencies, there are several strategies to get the best rates:
      
      • Compare rates from multiple providers
      • Consider timing your conversion
      • Look for providers with low or no fees
      • Be aware of dynamic currency conversion
      • Understand the difference between buy and sell rates`,
      tips: [
        'Use online comparison tools to find the best rates',
        'Avoid converting at airports or hotels',
        'Consider using multi-currency accounts',
        'Keep an eye on market trends'
      ]
    },
    saving: {
      title: 'Saving Money on Currency Conversion',
      content: `There are several ways to minimize costs when converting currencies:
      
      • Use specialist currency providers
      • Consider peer-to-peer exchange platforms
      • Look for fee-free conversion options
      • Use credit cards with no foreign transaction fees
      • Plan large conversions in advance`,
      tips: [
        'Set up rate alerts for your target exchange rate',
        'Consider using a currency converter app',
        'Keep track of conversion history',
        'Learn about different conversion methods'
      ]
    }
  };

  return (
    <div className="education-page">
      <h1 className="page-title">Currency Education Center</h1>
      
      <div className="education-nav">
        <button
          className={`nav-button ${activeSection === 'basics' ? 'active' : ''}`}
          onClick={() => setActiveSection('basics')}
        >
          Exchange Rate Basics
        </button>
        <button
          className={`nav-button ${activeSection === 'conversion' ? 'active' : ''}`}
          onClick={() => setActiveSection('conversion')}
        >
          Conversion Tips
        </button>
        <button
          className={`nav-button ${activeSection === 'saving' ? 'active' : ''}`}
          onClick={() => setActiveSection('saving')}
        >
          Saving Money
        </button>
      </div>

      <div className="education-content">
        <div className="education-card">
          <h2>{sections[activeSection].title}</h2>
          <div className="content-section">
            <p className="main-content">{sections[activeSection].content}</p>
            <div className="tips-section">
              <h3>Key Tips:</h3>
              <ul>
                {sections[activeSection].tips.map((tip, index) => (
                  <li key={index}>{tip}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        
        <div className="faq-section">
          <h2>Frequently Asked Questions</h2>
          <div className="faq-list">
            <div className="faq-item">
              <h3>What is the best time to convert currencies?</h3>
              <p>Currency markets are most active during business hours when multiple markets are open. However, the best time depends on your specific needs and market conditions.</p>
            </div>
            <div className="faq-item">
              <h3>How do I avoid hidden fees?</h3>
              <p>Always check the total cost including all fees, compare rates from multiple providers, and be wary of dynamic currency conversion offers.</p>
            </div>
            <div className="faq-item">
              <h3>What affects exchange rates?</h3>
              <p>Exchange rates are influenced by economic indicators, political stability, interest rates, market speculation, and trade balances between countries.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EducationPage;
