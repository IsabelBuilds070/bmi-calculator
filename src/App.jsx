import { useState } from "react";
import "./App.css";

export default function App() {
  const [unit, setUnit] = useState("metric");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [bmi, setBmi] = useState(null);
  const [category, setCategory] = useState("");

  const getCategory = (bmi) => {
    if (bmi < 18.5) return { label: "Underweight", color: "#3b82f6" };
    if (bmi < 25) return { label: "Normal", color: "#22c55e" };
    if (bmi < 30) return { label: "Overweight", color: "#f97316" };
    return { label: "Obese", color: "#ef4444" };
  };

  const calculate = () => {
    if (!weight || !height) return;
    let bmiValue;
    if (unit === "metric") {
      const h = parseFloat(height) / 100;
      bmiValue = parseFloat(weight) / (h * h);
    } else {
      bmiValue = (703 * parseFloat(weight)) / (parseFloat(height) * parseFloat(height));
    }
    const rounded = parseFloat(bmiValue.toFixed(1));
    setBmi(rounded);
    setCategory(getCategory(rounded));
  };

  const reset = () => {
    setWeight("");
    setHeight("");
    setBmi(null);
    setCategory("");
  };

  return (
    <div className="app">
      <div className="card">
        <div className="header">
          <span className="logo">⚖️</span>
          <h1>BMI Calculator</h1>
          <p>Know your body, know your health</p>
        </div>

        <div className="toggle">
          <button
            className={unit === "metric" ? "active" : ""}
            onClick={() => { setUnit("metric"); reset(); }}
          >
            Metric (kg/cm)
          </button>
          <button
            className={unit === "imperial" ? "active" : ""}
            onClick={() => { setUnit("imperial"); reset(); }}
          >
            Imperial (lbs/in)
          </button>
        </div>

        <div className="input-group">
          <label>Weight ({unit === "metric" ? "kg" : "lbs"})</label>
          <input
            type="number"
            placeholder={unit === "metric" ? "e.g. 70" : "e.g. 154"}
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label>Height ({unit === "metric" ? "cm" : "inches"})</label>
          <input
            type="number"
            placeholder={unit === "metric" ? "e.g. 170" : "e.g. 67"}
            value={height}
            onChange={(e) => setHeight(e.target.value)}
          />
        </div>

        <button className="calc-btn" onClick={calculate}>Calculate BMI</button>

        {bmi && (
          <div className="result" style={{ borderColor: category.color }}>
            <p className="result-label">Your BMI</p>
            <h2 className="result-value" style={{ color: category.color }}>{bmi}</h2>
            <span className="result-badge" style={{ background: category.color }}>
              {category.label}
            </span>

            <div className="gauge">
              <div className="gauge-bar">
                <div className="gauge-segment blue" />
                <div className="gauge-segment green" />
                <div className="gauge-segment orange" />
                <div className="gauge-segment red" />
              </div>
              <div className="gauge-labels">
                <span>Underweight</span>
                <span>Normal</span>
                <span>Overweight</span>
                <span>Obese</span>
              </div>
            </div>

            <button className="reset-btn" onClick={reset}>Reset</button>
          </div>
        )}
      </div>
    </div>
  );
}