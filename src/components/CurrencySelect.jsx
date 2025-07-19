




import React from 'react';


// Array of currency codes and their corresponding flag images
const currencyCodes = [
  { code: "USD", name: "United States Dollar", flag: "https://flagsapi.com/US/flat/64.png" },
  { code: "EUR", name: "Euro", flag: "https://flagsapi.com/EU/flat/64.png" },
  { code: "JPY", name: "Japanese Yen", flag: "https://flagsapi.com/JP/flat/64.png" },
  { code: "ETB", name: "Ethiopian Birr", flag: "https://flagsapi.com/ET/flat/64.png" },
  { code: "GBP", name: "British Pound Sterling", flag: "https://flagsapi.com/GB/flat/64.png" },
  { code: "AUD", name: "Australian Dollar", flag: "https://flagsapi.com/AU/flat/64.png" },
  { code: "CAD", name: "Canadian Dollar", flag: "https://flagsapi.com/CA/flat/64.png" },
  { code: "CHF", name: "Swiss Franc", flag: "https://flagsapi.com/CH/flat/64.png" },
  { code: "CNY", name: "Chinese Yuan", flag: "https://flagsapi.com/CN/flat/64.png" },
  { code: "INR", name: "Indian Rupee", flag: "https://flagsapi.com/IN/flat/64.png" },
  { code: "RUB", name: "Russian Ruble", flag: "https://flagsapi.com/RU/flat/64.png" },
  { code: "BRL", name: "Brazilian Real", flag: "https://flagsapi.com/BR/flat/64.png" },
  { code: "ZAR", name: "South African Rand", flag: "https://flagsapi.com/ZA/flat/64.png" },
  { code: "MXN", name: "Mexican Peso", flag: "https://flagsapi.com/MX/flat/64.png" },
  { code: "SGD", name: "Singapore Dollar", flag: "https://flagsapi.com/SG/flat/64.png" },
  { code: "HKD", name: "Hong Kong Dollar", flag: "https://flagsapi.com/HK/flat/64.png" },
  { code: "NOK", name: "Norwegian Krone", flag: "https://flagsapi.com/NO/flat/64.png" },
  { code: "SEK", name: "Swedish Krona", flag: "https://flagsapi.com/SE/flat/64.png" },
  { code: "NZD", name: "New Zealand Dollar", flag: "https://flagsapi.com/NZ/flat/64.png" },
  { code: "DKK", name: "Danish Krone", flag: "https://flagsapi.com/DK/flat/64.png" },
  { code: "PLN", name: "Polish Zloty", flag: "https://flagsapi.com/PL/flat/64.png" },
  { code: "THB", name: "Thai Baht", flag: "https://flagsapi.com/TH/flat/64.png" },
];


const CurrencySelect = ({ selectedCurrency, onCurrencyChange }) => {
  // Find the selected currency object
  const selectedCurrencyObj = currencyCodes.find(currency => currency.code === selectedCurrency);

  return (
    <div className="currency-select">
      {/* Display the selected currency's flag */}
      {selectedCurrencyObj && (
        <img
          src={selectedCurrencyObj.flag} // Use the flag URL from the selected currency object
          alt={`${selectedCurrencyObj.name} flag`}
          className="currency-flag"
          style={{ width: '40px', height: 'auto', marginRight: '8px' }} // Style the flag image
          onError={(e) => { e.target.onerror = null; e.target.src="https://via.placeholder.com/40"; }} // Fallback image if flag fails to load
        />
      )}
      <select
        className="currency-dropdown"
        value={selectedCurrency} // Set the value to the selected currency
        onChange={onCurrencyChange} // Call the onChange handler when the currency changes
      >
        {currencyCodes.map(currency => (
          <option key={currency.code} value={currency.code}>
            {currency.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CurrencySelect;
