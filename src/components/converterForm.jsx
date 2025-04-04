import React, { useState, useEffect } from 'react';
import CurrencySelect from './CurrencySelect';

const ConverterForm = () => {
  const [amount, setAmount] = useState('');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(null);

  const fetchExchangeRate = async () => {
    setError(null);
    setLoading(true);

    try {
      const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
      const data = await response.json();
      
      if (data.rates && data.rates[toCurrency]) {
        const rate = data.rates[toCurrency];
        const convertedAmount = amount ? (amount * rate).toFixed(2) : null;
        setResult({
          amount,
          fromCurrency,
          toCurrency,
          rate,
          convertedAmount
        });
        setLastUpdate(new Date());
      } else {
        setError('Unable to fetch exchange rate. Please try again.');
      }
    } catch (err) {
      setError('An error occurred while fetching the exchange rate.');
    } finally {
      setLoading(false);
    }
  };

  // Auto-update rates every minute
  useEffect(() => {
    const interval = setInterval(fetchExchangeRate, 60000);
    return () => clearInterval(interval);
  }, [fromCurrency, toCurrency]);

  // Initial fetch and fetch when currencies change
  useEffect(() => {
    fetchExchangeRate();
  }, [fromCurrency, toCurrency]);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchExchangeRate();
  };

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const startVoiceInput = () => {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new window.webkitSpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        const number = parseFloat(transcript.replace(/[^0-9.]/g, ''));
        if (!isNaN(number)) {
          setAmount(number.toString());
        }
        setIsListening(false);
      };

      recognition.onerror = (event) => {
        console.error('Speech recognition error', event.error);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } else {
      setError('Speech recognition is not supported in your browser.');
    }
  };

  return (
    <div className="currency-converter">
      <h1 className="currency-title">Live Currency Converter</h1>
      <form className="converter-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Amount</label>
          <div className="input-group">
            <input
              type="number"
              className="form-input"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
              required
            />
            <button
              type="button"
              className="voice-input-button"
              onClick={startVoiceInput}
              disabled={isListening}
            >
              {isListening ? '🎤 Listening...' : '🎤'}
            </button>
          </div>
        </div>

        <div className="form-currency-group">
          <div className="form-section">
            <label className="form-label">From</label>
            <CurrencySelect
              selectedCurrency={fromCurrency}
              onCurrencyChange={(e) => setFromCurrency(e.target.value)}
            />
          </div>

          <button
            type="button"
            className="swap-icon"
            onClick={swapCurrencies}
            aria-label="Swap currencies"
          >
            ⇄
          </button>

          <div className="form-section">
            <label className="form-label">To</label>
            <CurrencySelect
              selectedCurrency={toCurrency}
              onCurrencyChange={(e) => setToCurrency(e.target.value)}
            />
          </div>
        </div>

        <button
          type="submit"
          className="submit-button"
          disabled={loading || !amount}
        >
          {loading ? 'Converting...' : 'Convert'}
        </button>
      </form>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      {result && !error && (
        <div className="result-container">
          <h2 className="result-title">Conversion Result</h2>
          <p className="exchange-rate-result">
            {result.amount} {result.fromCurrency} = {result.convertedAmount} {result.toCurrency}
          </p>
          <p className="exchange-rate-info">
            1 {result.fromCurrency} = {result.rate} {result.toCurrency}
          </p>
          {lastUpdate && (
            <p className="last-update">
              Last updated: {lastUpdate.toLocaleTimeString()}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default ConverterForm;
