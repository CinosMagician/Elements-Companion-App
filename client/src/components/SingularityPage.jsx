import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_CARDS } from '../utils/queries';
import CardCanvas from '../components/CardCanvas';

const SingularityPage = () => {
    // List of card names to select from
    const cardNames = [
        'Antimatter', 
        'Adrenaline', 
        'Quintessence', 
        'Liquid Shadow',
        'Parallel Universe', 
        'Chaos Power', 
        'Nova'
    ];

    // List of card effects corresponding to card names
    const effectNames = [
        {
            cardName: 'Antimatter',
            skillName: 'Antimatter',
            effect: 'Invert the attack power of this creature. Always triggers when Attack > 0'
        },
        {
            cardName: 'Adrenaline',
            skillName: 'Adrenaline',
            effect: 'This creature attacks multiple times per turn. Negative values in attack give the same results as positive values in the Adrenaline Calculator.'
        },
        {
            cardName: 'Quintessence',
            skillName: 'Quintessence',
            effect: 'Grant immortality to this creature. This creature can no longer be targeted.'
        },
        {
            cardName: 'Liquid Shadow',
            skillName: 'Vampire',
            effect: 'This creature gains the skill Vampire: The damage dealt is returned to you as healing. Negative Damage damages you instead.'
        },
        {
            cardName: 'Parallel Universe',
            skillName: 'Parallel Universe',
            effect: "Summon an exact copy of this creature."
        },
        {
            cardName: 'Chaos Power',
            skillName: 'Chaos Power (Negative)',
            effect: 'A random negative deduction in attack power and bonus addition in health is granted to this creature. Roll 2d6, the first is for attack, reduce the attack of this creature by the amount rolled unless 6, then only 5 is taken. The second dice is bonus in health, add the roll to this creature\'s health except 6 adds only 5 health.'
        },
        {
            cardName: 'Nova',
            skillName: 'Nova',
            effect: 'Generate 12 quanta. 1 for each element. Do not cast more than twice per turn. Will generate a new Singularity and not grant any quanta if cast more than twice.'
        }
    ];

    // State to keep track of the specific cards fetched from GraphQL
    const [specificCards, setSpecificCards] = useState([]);
    // State to keep track of the selected card and its effect
    const [selectedCard, setSelectedCard] = useState(null);
    const [selectedEffect, setSelectedEffect] = useState(null);
    // State to keep track of the attack value input
    const [attackValue, setAttackValue] = useState(0);

    const { loading, error, data } = useQuery(GET_CARDS);

    // Fetch cards and filter them based on the cardNames array
    useEffect(() => {
        if (!loading && !error && data) {
            const filteredCards = data.cards.filter(card => cardNames.includes(card.name));
            setSpecificCards(filteredCards);
        }
    }, [loading, error, data]);

    // Function to select a random card based on the attack value
    const selectRandomCard = () => {
        if (specificCards.length > 0) {
            let selected;
            if (attackValue > 0) {
                // If attack value is greater than 0, select Antimatter
                selected = specificCards.find(card => card.name === 'Antimatter');
                setSelectedEffect(effectNames.find(effect => effect.cardName === 'Antimatter'));
            } else {
                // Otherwise, select a random card from the remaining cards
                const filteredCards = specificCards.filter(card => card.name !== 'Antimatter');
                const randomIndex = Math.floor(Math.random() * filteredCards.length);
                selected = filteredCards[randomIndex];
                setSelectedEffect(effectNames.find(effect => effect.cardName === selected.name));
            }
            setSelectedCard(selected);
        }
    };

    return (
        <div>
            <h1>Singularity Random Effects:</h1>
            {loading && <p>Loading cards...</p>}
            {error && <p>Error loading cards.</p>}
            
            <div>
                <label htmlFor="attackValue">Enter current attack value:</label>
                <input
                    id="attackValue"
                    type="number"
                    value={attackValue}
                    onChange={(e) => setAttackValue(parseInt(e.target.value, 10))}
                />
            </div>

            <p>Click the button to reveal a random card effect:</p>
            
            {/* Display the selected card */}
            {selectedCard && selectedEffect && (
                <div>
                    <h2>Selected Card Effect: {selectedEffect.skillName}</h2>
                    <p>Effect: {selectedEffect.effect}</p>
                    <div className="card-section">
                        <CardCanvas card={selectedCard} />
                    </div>
                </div>
            )}
            
            {/* Button to select a random card */}
            <button onClick={selectRandomCard} disabled={loading || error || specificCards.length === 0}>
                Reveal Random Effect
            </button>
        </div>
    );
};

export default SingularityPage;