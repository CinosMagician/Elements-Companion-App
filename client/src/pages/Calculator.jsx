import React, { useState } from 'react';
import './Calculator.css'; // Ensure your CSS file is correctly imported

const Calculator = () => {
    // State for dynamic values
    const [values, setValues] = useState({
        darkness: 0,
        water: 0,
        death: 0,
        life: 0,
        earth: 0,
        aether: 0,
        fire: 0,
        air: 0,
        gravity: 0,
        entropy: 0,
        time: 0,
        light: 0,
    });

    // State for calculator buttons
    const [result, setResult] = useState(0);
    const [hp, setHp] = useState(50); // Initial HP value
    const totalMaxHP = 100; // Example total max HP

    // Increment and decrement functions with boundary checks
    const increment = (key, value) => {
        setValues(prev => ({
            ...prev,
            [key]: Math.min(prev[key] + value, 75)
        }));
    };

    const decrement = (key, value) => {
        setValues(prev => ({
            ...prev,
            [key]: Math.max(prev[key] - value, 0)
        }));
    };

    // Button click handler for calculator
    const handleButtonClick = (value) => {
        if (value === '=') {
            try {
                setResult(eval(result));
            } catch {
                setResult('Error');
            }
        } else if (value === '-' || value === '+') {
            setResult(result + value);
        } else {
            setResult(result + value);
        }
    };

    // HP value handler
    const handleHpChange = (change) => {
        setHp(prevHp => Math.max(0, Math.min(prevHp + change, totalMaxHP)));
    };

    return (
        <div className="calculator">
            <div className="block-left">
                {/* Existing dynamic counters */}
                {Object.keys(values).map((key) => (
                    <div className="row" key={key}>
                        <button className="minus-button" onClick={() => decrement(key, 1)}>-</button>
                        <div className="icon-text">
                            <img src={`/assets/images/icons/${key}.png`} alt="Element Icon" className="icon" />
                            <span className="text">{values[key]}</span>
                        </div>
                        <button className="plus-button" onClick={() => increment(key, 1)}>+</button>
                    </div>
                ))}
            </div>

            <div className="block-right">
                {/* Calculator grid */}
                <div className="calculator-grid">
                    <div className="button" onClick={() => handleButtonClick('1')}>1</div>
                    <div className="button" onClick={() => handleButtonClick('2')}>2</div>
                    <div className="button" onClick={() => handleButtonClick('3')}>3</div>
                    <div className="button" onClick={() => handleButtonClick('water')}>water</div>

                    <div className="button" onClick={() => handleButtonClick('4')}>4</div>
                    <div className="button" onClick={() => handleButtonClick('5')}>5</div>
                    <div className="button" onClick={() => handleButtonClick('6')}>6</div>
                    <div className="button" onClick={() => handleButtonClick('death')}>death</div>

                    <div className="button" onClick={() => handleButtonClick('7')}>7</div>
                    <div className="button" onClick={() => handleButtonClick('8')}>8</div>
                    <div className="button" onClick={() => handleButtonClick('9')}>9</div>
                    <div className="button" onClick={() => handleButtonClick('neurotoxin')}>neurotoxin</div>

                    <div className="button" onClick={() => handleButtonClick('-')}>-</div>
                    <div className="button" onClick={() => handleButtonClick('0')}>0</div>
                    <div className="button" onClick={() => handleButtonClick('+')}>+</div>
                    <div className="button" onClick={() => handleButtonClick('=')}>=</div>
                </div>

                {/* Result box */}
                <div className="result-box">
                    <span className="result-text">{result}</span>
                </div>

                {/* HP bar */}
                <div className="hp-bar">
                    <div className="hp-info">
                        <span className="hp-label">HP:</span>
                        <span className="hp-value">{hp} / {totalMaxHP}</span>
                    </div>
                    <div className="hp-progress-bar">
                        <div
                            className="hp-progress"
                            style={{ width: `${(hp / totalMaxHP) * 100}%` }}
                        ></div>
                    </div>
                </div>

                {/* HP control buttons */}
                <div className="hp-controls">
                    <button className="hp-button" onClick={() => handleHpChange(-10)}>-10 HP</button>
                    <button className="hp-button" onClick={() => handleHpChange(10)}>+10 HP</button>
                </div>
            </div>
        </div>
    );
};

export default Calculator;
