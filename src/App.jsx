import ConverterForm from "./components/converterForm"; // Capitalized component name

const App = () => {
  return (
    <div className="currency-converter">
      <h2 className="currency-title">CURRENCY CONVERTER</h2>
      <ConverterForm /> {/* Capitalized component usage */}
    </div>
  );
}

export default App;
