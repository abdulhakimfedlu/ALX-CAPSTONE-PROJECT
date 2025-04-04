import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const HistoryPage = () => {
  const [conversionHistory, setConversionHistory] = useState([]);
  const [selectedPair, setSelectedPair] = useState('');
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Load conversion history from localStorage
    const history = JSON.parse(localStorage.getItem('conversionHistory')) || [];
    setConversionHistory(history);
  }, []);

  useEffect(() => {
    if (selectedPair) {
      fetchHistoricalData(selectedPair);
    }
  }, [selectedPair]);

  const fetchHistoricalData = async (pair) => {
    setLoading(true);
    try {
      const [fromCurrency, toCurrency] = pair.split('-');
      const endDate = new Date();
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - 30); // Last 30 days

      const response = await fetch(
        `https://api.exchangerate-api.com/v4/historical/${fromCurrency}/${startDate.toISOString().split('T')[0]}/${endDate.toISOString().split('T')[0]}`
      );
      
      if (!response.ok) throw new Error('Failed to fetch historical data');
      
      const data = await response.json();
      const rates = data.rates[toCurrency];
      
      const chartData = {
        labels: Object.keys(rates).map(date => new Date(date).toLocaleDateString()),
        datasets: [
          {
            label: `${fromCurrency} to ${toCurrency}`,
            data: Object.values(rates),
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
          }
        ]
      };
      
      setChartData(chartData);
    } catch (error) {
      console.error('Error fetching historical data:', error);
    } finally {
      setLoading(false);
    }
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Exchange Rate History'
      }
    }
  };

  return (
    <div className="history-page">
      <h2 className="page-title">Conversion History & Trends</h2>

      <div className="history-content">
        <div className="history-list">
          <h3>Recent Conversions</h3>
          {conversionHistory.length > 0 ? (
            <div className="conversion-list">
              {conversionHistory.map((conversion, index) => (
                <div key={index} className="conversion-item">
                  <div className="conversion-details">
                    <span className="amount">{conversion.amount} {conversion.fromCurrency}</span>
                    <span className="arrow">→</span>
                    <span className="result">{conversion.result} {conversion.toCurrency}</span>
                  </div>
                  <div className="conversion-date">
                    {new Date(conversion.date).toLocaleString()}
                  </div>
                  <button
                    className="view-trend"
                    onClick={() => setSelectedPair(`${conversion.fromCurrency}-${conversion.toCurrency}`)}
                  >
                    View Trend
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="no-history">No conversion history available</p>
          )}
        </div>

        <div className="chart-section">
          <h3>Exchange Rate Trend</h3>
          {loading ? (
            <div className="loading-message">Loading chart data...</div>
          ) : chartData ? (
            <div className="chart-container">
              <Line options={options} data={chartData} />
            </div>
          ) : (
            <p className="no-data">Select a currency pair to view its trend</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default HistoryPage; 