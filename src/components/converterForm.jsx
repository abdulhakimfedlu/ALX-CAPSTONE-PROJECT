import React, { useState, useEffect } from 'react';
import CurrencySelect from './CurrencySelect';

const ConverterForm = () => {
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('ETB');
  const [exchangeRate, setExchangeRate] = useState(0);
  const [amount, setAmount] = useState(1);
  const [conversionResult, setConversionResult] = useState('');

  useEffect(() => {
    // Fetch the exchange rate when currencies change
    const fetchExchangeRate = async () => {
      try {
        const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
        const data = await response.json();
        const rate = data.rates[toCurrency];
        setExchangeRate(rate);
        setConversionResult((amount * rate).toFixed(2)); // Calculate conversion
      } catch (error) {
        console.error("Error fetching exchange rates:", error);
      }
    };

    fetchExchangeRate();
  }, [fromCurrency, toCurrency, amount]);

  const handleFromCurrencyChange = (event) => {
    setFromCurrency(event.target.value);
  };

  const handleToCurrencyChange = (event) => {
    setToCurrency(event.target.value);
  };

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  return (
    <div>
      <form className="converter-form">
        <div className="form-group">
          <label className="form-label">Enter Amount</label>
          <input 
            type="number" 
            className="form-input" 
            value={amount} 
            onChange={handleAmountChange} 
            required 
          />
        </div>

        <div className="form-group form-currency-group">
          <div className="form-section">
            <label className="form-label">From</label>
            <CurrencySelect 
              selectedCurrency={fromCurrency}
              onCurrencyChange={handleFromCurrencyChange}
            />
          </div>
          <div className="swap-icon"></div>
          <div className="form-section">
            <label className="form-label">To</label>
            <CurrencySelect 
              selectedCurrency={toCurrency}
              onCurrencyChange={handleToCurrencyChange}
            />
          </div>
        </div>
        <button type="submit" className="submit-button">Get Exchange Rate</button>
        {conversionResult && (
          <p className="exchange-rate-result">{amount} {fromCurrency} = {conversionResult} {toCurrency}</p>
        )}
      </form>
    </div>
  );
};

export default ConverterForm;
