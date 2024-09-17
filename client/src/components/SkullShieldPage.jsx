import React, { useState } from 'react';

const SkullShieldPage = () => {
    const [hp, setHp] = useState('');
    const [odds, setOdds] = useState(null); // Add state for odds

    // Handle HP input change and calculate odds
    const handleHpChange = (event) => {
        const hpValue = parseFloat(event.target.value);
        setHp(event.target.value);

        // Calculate the odds
        if (!isNaN(hpValue) && hpValue > 0) {
            const probability = 50 / hpValue;
            setOdds(probability.toFixed(2) + '%'); // Format to 2 decimal places
        } else {
            setOdds(null); // Reset if invalid input
        }
    };

    // Calculate the probability and determine the outcome
    const rollForSkeleton = () => {
        // Convert hp to a number
        const hpValue = parseFloat(hp);

        if (isNaN(hpValue) || hpValue <= 0) {
            alert('Please enter a valid HP value greater than 0.');
            return;
        }

        // Calculate probability: 50% / HP
        const probability = 50 / hpValue;

        // Roll the odds
        const roll = Math.random() * 100; // Get a random number between 0 and 100

        // Determine the outcome
        const result = roll < probability ? 'The creature turned into a skeleton.' : 'The creature survived.';
        
        // Show the result in a pop-up
        alert(result);
    };

    return (
        <div>
            <h1>Skeleton Calculator</h1>
            <div>
                <label>
                    Enter HP:
                    <input
                        type="number"
                        value={hp}
                        onChange={handleHpChange}
                        min="1"
                        placeholder="Enter creature's HP"
                    />
                </label>
            </div>
            <div>
                {odds !== null && <p>Odds of turning into a skeleton: {odds}</p>}
            </div>
            <div>
                <button onClick={rollForSkeleton}>Attack into Skull Shield!</button>
            </div>
        </div>
    );
};

export default SkullShieldPage;