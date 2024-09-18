import React, { useState } from 'react';
import './Calculator.css';
import MaxHPModal from '../components/MaxHPModal';
import RemoveQuantaModal from '../components/RemoveQuantaModal';
import AddQuantaModal from '../components/AddQuantaModal';

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

    // State for calculator input, HP, and max HP
    const [input, setInput] = useState('');
    const [hp, setHp] = useState(100); // Initial HP value
    const [maxHP, setMaxHP] = useState(100); // Initial Max HP
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [previewHP, setPreviewHP] = useState(null); // Preview of HP after status effects
    const [previewType, setPreviewType] = useState('none'); // Type of preview (healing or damage)

    // Status states
    const [status, setStatus] = useState({ type: 'none', count: 0 });

    // State for modals
    const [isRemoveQuantaModalOpen, setIsRemoveQuantaModalOpen] = useState(false);
    const [isAddQuantaModalOpen, setIsAddQuantaModalOpen] = useState(false);

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
                // Evaluate the expression safely
                const evaluatedValue = new Function('return ' + input)();
                
                // Check for valid result
                if (isNaN(evaluatedValue) || input === '' || input === 'Error') {
                    setInput('Error');
                } else {
                    // Update the hp state
                    setHp(prevHp => {
                        const newHp = prevHp + evaluatedValue;
                        const clampedHp = Math.max(0, Math.min(newHp, maxHP));
                        updatePreviewHP(clampedHp);
                        return clampedHp;
                    });
                    setInput(''); // Clear the input field after calculation
                }
            } catch {
                setInput('Error');
            }
        } else if (value === 'C') {
            setInput(''); // Clear input if C is pressed
        } else {
            // Append the clicked value to the input
            setInput(prevInput => prevInput + value);
        }
    };

    // Update preview HP based on current HP and status
    const updatePreviewHP = (currentHp) => {
        let newPreviewHP = null;
        let newPreviewType = 'none';

        if (status.type === 'purify') {
            newPreviewHP = Math.min(maxHP, currentHp + status.count);
            newPreviewType = 'healing';
        } else if (status.type === 'toxin' || status.type === 'neurotoxin') {
            newPreviewHP = Math.max(0, currentHp - status.count);
            newPreviewType = 'damage';
        }

        setPreviewHP(newPreviewHP);
        setPreviewType(newPreviewType);
    };

    // Handle status updates
    const handleStatusChange = (newStatus) => {
        let newPreviewHP = null;
        let newPreviewType = 'none';

        if (newStatus === 'purify') {
            if (status.type === 'toxin' || status.type === 'neurotoxin') {
                // Cancel the existing toxin or neurotoxin status
                newPreviewHP = Math.min(maxHP, hp + 1);
                newPreviewType = 'healing';
                setStatus({ type: 'purify', count: 1 });
            } else if (status.type === 'purify') {
                // Increase purify count
                newPreviewHP = Math.min(maxHP, hp + status.count + 1);
                newPreviewType = 'healing';
                setStatus(prev => ({ type: 'purify', count: prev.count + 1 }));
            } else {
                // Apply purify with count of 1
                newPreviewHP = Math.min(maxHP, hp + 1);
                newPreviewType = 'healing';
                setStatus({ type: 'purify', count: 1 });
            }
        } else if (newStatus === 'toxin') {
            if (status.type === 'purify') {
                // Cancel purify status
                const newPurifyCount = Math.max(status.count - 1, 0);
                if (newPurifyCount === 0) {
                    newPreviewType = 'none';
                    setStatus({ type: 'none', count: 0 });
                } else if (newPurifyCount < 0){
                    setStatus({ type: 'purify', count: newPurifyCount });
                    newPreviewHP = Math.max(0, hp - 1);
                    newPreviewType = 'damage';
                } else {
                    setStatus({ type: 'purify', count: newPurifyCount });
                    newPreviewHP = Math.max(0, hp - 1);
                    newPreviewType = 'damage';
                }
            } else if (status.type === 'neurotoxin') {
                // Increase neurotoxin count if it's already active
                newPreviewHP = Math.max(0, hp - (status.count + 1));
                newPreviewType = 'damage';
                setStatus(prev => ({ type: 'neurotoxin', count: prev.count + 1 }));
            } else {
                // Apply toxin with incremented count
                newPreviewHP = Math.max(0, hp - (status.count + 1));
                newPreviewType = 'damage';
                setStatus({ type: 'toxin', count: status.count + 1 });
            }
        } else if (newStatus === 'neurotoxin') {
            if (status.type === 'purify') {
                // Cancel purify status
                const newPurifyCount = Math.max(status.count - 1, 0);
                if (newPurifyCount === 0) {
                    newPreviewType = 'none';
                    setStatus({ type: 'none', count: 0 });
                } else if (newPurifyCount < 0){
                    setStatus({ type: 'purify', count: newPurifyCount });
                    newPreviewHP = Math.max(0, hp - 1);
                    newPreviewType = 'damage';
                } else {
                    setStatus({ type: 'purify', count: newPurifyCount });
                    newPreviewHP = Math.max(0, hp - 1);
                    newPreviewType = 'damage';
                }
            } else if (newStatus === 'neurotoxin' && status.type === 'toxin') {
                // Increase toxin count if it's already active
                newPreviewHP = Math.max(0, hp - (status.count + 1));
                newPreviewType = 'damage';
                setStatus(prev => ({ type: 'neurotoxin', count: prev.count + 1 }));
            } else {
                // Apply neurotoxin with incremented count
                newPreviewHP = Math.max(0, hp - (status.count + 1));
                newPreviewType = 'damage';
                setStatus({ type: 'neurotoxin', count: status.count + 1 });
            }
        } else if (newStatus === 'none') {
            newPreviewType = 'none';
            setStatus({ type: 'none', count: 0 });
        }

        setPreviewHP(newPreviewHP);
        setPreviewType(newPreviewType);
    };

    // Handle end turn actions
    const handleEndTurn = () => {
        let newHp = hp;
        if (status.type === 'purify') {
            newHp = Math.min(maxHP, hp + status.count);
        } else if (status.type === 'toxin' || status.type === 'neurotoxin') {
            newHp = Math.max(0, hp - status.count);
        }
        setHp(newHp);
        updatePreviewHP(newHp);
    };

    // Handle max HP change
    const handleMaxHPChange = (newMaxHP) => {
        setMaxHP(newMaxHP);
        setHp(prevHp => Math.min(newMaxHP, prevHp)); // Ensure HP does not exceed new Max HP
        updatePreviewHP(Math.min(newMaxHP, hp)); // Update preview HP based on new max HP
    };

    // Calculate total quanta
    const calculateTotalQuanta = () => {
        return Object.values(values).reduce((total, count) => total + count, 0);
    };

    // Remove random quanta
    const removeRandomQuanta = (quantity) => {
        const quantaKeys = Object.keys(values);
        let remainingQuantity = quantity;
        let updatedValues = { ...values };

        while (remainingQuantity > 0) {
            const nonZeroKeys = quantaKeys.filter(key => updatedValues[key] > 0);
            if (nonZeroKeys.length === 0) break; // No more quanta to remove

            const randomKey = nonZeroKeys[Math.floor(Math.random() * nonZeroKeys.length)];
            if (updatedValues[randomKey] > 0) {
                updatedValues[randomKey] = Math.max(0, updatedValues[randomKey] - 1);
                remainingQuantity -= 1;
            }
        }

        setValues(updatedValues);
    };

    // Add random quanta
    const addRandomQuanta = (quantity) => {
        const quantaKeys = Object.keys(values);
        let remainingQuantity = quantity;
        let updatedValues = { ...values };

        while (remainingQuantity > 0) {
            const nonFullKeys = quantaKeys.filter(key => updatedValues[key] < 75);
            if (nonFullKeys.length === 0) break; // All elements are full

            const randomKey = nonFullKeys[Math.floor(Math.random() * nonFullKeys.length)];
            if (updatedValues[randomKey] < 75) {
                updatedValues[randomKey] = Math.min(75, updatedValues[randomKey] + 1);
                remainingQuantity -= 1;
            }
        }

        setValues(updatedValues);
    };

    return (
        <div className="calculator-container">
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
                    <div className="container">
                        <div className='icon-text'>
                            <img src={`/assets/images/icons/blank.png`} className="icon" />
                            <img src={`/assets/images/icons/blank.png`} className="icon" />
                            <img src={`/assets/images/icons/blank.png`} className="icon" />
                            <button className="text-button" onClick={() => setIsRemoveQuantaModalOpen(true)}>Remove Random Quanta</button>
                            <img src={`/assets/images/icons/chroma.png`} alt="Element Icon" className="icon" />
                            <button className="text-button" onClick={() => setIsAddQuantaModalOpen(true)}>Add Random Quanta</button>
                        </div>
                    </div>
                </div>
                <div className="block-right">
                    {/* Calculator grid */}
                    <div className="calculator-grid">
                        <div className="button" onClick={() => handleButtonClick('1')}>1</div>
                        <div className="button" onClick={() => handleButtonClick('2')}>2</div>
                        <div className="button" onClick={() => handleButtonClick('3')}>3</div>
                        <img src='/assets/images/icons/water.png' className="button" onClick={() => handleStatusChange('purify')} alt="Purify"/>
                        <div className="button" onClick={() => handleButtonClick('*')}>*</div>

                        <div className="button" onClick={() => handleButtonClick('4')}>4</div>
                        <div className="button" onClick={() => handleButtonClick('5')}>5</div>
                        <div className="button" onClick={() => handleButtonClick('6')}>6</div>
                        <img src='/assets/images/icons/death.png' className="button" onClick={() => handleStatusChange('toxin')} alt="Toxin"/>
                        <div className="button" onClick={() => handleButtonClick('/')}>/</div>

                        <div className="button" onClick={() => handleButtonClick('7')}>7</div>
                        <div className="button" onClick={() => handleButtonClick('8')}>8</div>
                        <div className="button" onClick={() => handleButtonClick('9')}>9</div>
                        <img src='/assets/images/icons/neurotoxin.png' className="button" onClick={() => handleStatusChange('neurotoxin')} alt="Neurotoxin"/>
                        <div className="button" onClick={() => handleButtonClick('C')}>C</div>

                        <div className="button" onClick={() => handleButtonClick('-')}>-</div>
                        <div className="button" onClick={() => handleButtonClick('0')}>0</div>
                        <div className="button" onClick={() => handleButtonClick('+')}>+</div>
                        <img src='/assets/images/icons/none.png' className="button" onClick={() => handleStatusChange('none')} alt="Clear Status"/>
                        <div className="button" onClick={() => handleButtonClick('=')}>=</div>
                    </div>

                    {/* Result box */}
                    <div className="result-box">
                        <span className="result-text">{input}</span>
                    </div>

                    {/* HP bar */}
                    <div className="hp-bar">
                        <div className="hp-info">
                            <span className="hp-label">HP:</span>
                            <span className="hp-value">{hp} / {maxHP}</span>
                        </div>
                        <div className="hp-progress-bar">
                            <div
                                className="hp-progress"
                                style={{
                                    width: `${(hp / maxHP) * 100}%`,
                                    backgroundColor: 'green'
                                }}
                            ></div>
                            {previewHP !== null && previewType === 'healing' && previewHP > hp && (
                                <div
                                    className="hp-progress-preview"
                                    style={{
                                        width: `${((previewHP - hp) / maxHP) * 100}%`,
                                        backgroundColor: 'blue',
                                        position: 'absolute',
                                        left: `${(hp / maxHP) * 100}%`
                                    }}
                                ></div>
                            )}
                            {previewHP !== null && previewType === 'damage' && previewHP < hp && (
                                <div
                                    className="hp-progress-preview"
                                    style={{
                                        width: `${((hp - previewHP) / maxHP) * 100}%`,
                                        backgroundColor: 'yellow',
                                        position: 'absolute',
                                        left: `${(previewHP / maxHP) * 100}%`
                                    }}
                                ></div>
                            )}
                        </div>
                    </div>

                    {/* HP control buttons */}
                    <div className="hp-controls">
                        <button className="hp-button" onClick={handleEndTurn}>End Turn</button>
                        <button className="hp-button" onClick={() => setIsModalOpen(true)}>Change Max HP</button>
                        <div>
                            {(
                                <div className="status">
                                    <img src={`/assets/images/icons/${status.type}.png`} alt={`${status.type} Icon`} className="status-icon" />
                                    <span className="status-text">
                                        {status.type === 'none' ? '0' : status.type === 'purify' ? `+${status.count}` : `-${status.count}`}
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Max HP Modal */}
            <MaxHPModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={handleMaxHPChange}
                maxHP={maxHP}
            />

            {/* Remove Quanta Modal */}
            <RemoveQuantaModal
                isOpen={isRemoveQuantaModalOpen}
                onClose={() => setIsRemoveQuantaModalOpen(false)}
                onConfirm={removeRandomQuanta}
                totalQuanta={calculateTotalQuanta()}
            />

            {/* Add Quanta Modal */}
            <AddQuantaModal
                isOpen={isAddQuantaModalOpen}
                onClose={() => setIsAddQuantaModalOpen(false)}
                onConfirm={addRandomQuanta}
            />
        </div>
    );
};

export default Calculator;
