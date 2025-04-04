import React, { useState } from 'react';

const ToolsPage = () => {
  const [loanAmount, setLoanAmount] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [loanTerm, setLoanTerm] = useState('');
  const [monthlyPayment, setMonthlyPayment] = useState(null);

  const [investmentAmount, setInvestmentAmount] = useState('');
  const [investmentRate, setInvestmentRate] = useState('');
  const [investmentTerm, setInvestmentTerm] = useState('');
  const [futureValue, setFutureValue] = useState(null);

  const calculateLoanPayment = () => {
    const principal = parseFloat(loanAmount);
    const rate = parseFloat(interestRate) / 100 / 12;
    const time = parseFloat(loanTerm) * 12;

    if (principal && rate && time) {
      const payment = (principal * rate * Math.pow(1 + rate, time)) / (Math.pow(1 + rate, time) - 1);
      setMonthlyPayment(payment.toFixed(2));
    }
  };

  const calculateInvestment = () => {
    const principal = parseFloat(investmentAmount);
    const rate = parseFloat(investmentRate) / 100;
    const time = parseFloat(investmentTerm);

    if (principal && rate && time) {
      const value = principal * Math.pow(1 + rate, time);
      setFutureValue(value.toFixed(2));
    }
  };

  return (
    <div className="tools-page">
      <h2 className="page-title">Financial Tools</h2>

      <div className="tools-grid">
        <div className="tool-card">
          <h3>Loan Calculator</h3>
          <div className="calculator-form">
            <div className="form-group">
              <label>Loan Amount ($)</label>
              <input
                type="number"
                value={loanAmount}
                onChange={(e) => setLoanAmount(e.target.value)}
                placeholder="Enter loan amount"
              />
            </div>
            <div className="form-group">
              <label>Annual Interest Rate (%)</label>
              <input
                type="number"
                value={interestRate}
                onChange={(e) => setInterestRate(e.target.value)}
                placeholder="Enter interest rate"
              />
            </div>
            <div className="form-group">
              <label>Loan Term (years)</label>
              <input
                type="number"
                value={loanTerm}
                onChange={(e) => setLoanTerm(e.target.value)}
                placeholder="Enter loan term"
              />
            </div>
            <button onClick={calculateLoanPayment} className="calculate-button">
              Calculate Monthly Payment
            </button>
            {monthlyPayment && (
              <div className="result">
                <h4>Monthly Payment:</h4>
                <p>${monthlyPayment}</p>
              </div>
            )}
          </div>
        </div>

        <div className="tool-card">
          <h3>Investment Calculator</h3>
          <div className="calculator-form">
            <div className="form-group">
              <label>Initial Investment ($)</label>
              <input
                type="number"
                value={investmentAmount}
                onChange={(e) => setInvestmentAmount(e.target.value)}
                placeholder="Enter investment amount"
              />
            </div>
            <div className="form-group">
              <label>Annual Return Rate (%)</label>
              <input
                type="number"
                value={investmentRate}
                onChange={(e) => setInvestmentRate(e.target.value)}
                placeholder="Enter return rate"
              />
            </div>
            <div className="form-group">
              <label>Investment Term (years)</label>
              <input
                type="number"
                value={investmentTerm}
                onChange={(e) => setInvestmentTerm(e.target.value)}
                placeholder="Enter investment term"
              />
            </div>
            <button onClick={calculateInvestment} className="calculate-button">
              Calculate Future Value
            </button>
            {futureValue && (
              <div className="result">
                <h4>Future Value:</h4>
                <p>${futureValue}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToolsPage; 