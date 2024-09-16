import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_CARDS } from '../utils/queries';
import CardCanvas from './CardCanvas';

const PandemoniumPage = () => {
    // List of card names to select from
    const cardNames = [
        'Virus', 
        'Lightning', 
        'Ice Bolt', 
        'Fire Bolt', 
        'Freeze', 
        'Parallel Universe', 
        'Lobotomizer', 
        'Drain Life', 
        'Owl\'s Eye', 
        'Shockwave', 
        'Reverse Time', 
        'Gravity Pull'
    ];

    // List of card effects corresponding to card names
    const effectNames = [
        {
            cardName: 'Virus',
            skillName: 'Infect',
            effect: 'Inflict 1 Poison to Creature'
        },
        {
            cardName: 'Lightning',
            skillName: 'Lightning',
            effect: 'Deal 5 Damage to Creature'
        },
        {
            cardName: 'Ice Bolt',
            skillName: 'Ice Bolt',
            effect: 'Deals 2 damage to the target for each 10 water quantums in your possession (min 2 damage if <=10). Each hit has a 1 in 20 chance to freeze, Roll a d20, a 20 is a freeze for 3 turns.'
        },
        {
            cardName: 'Fire Bolt',
            skillName: 'Fire Bolt',
            effect: 'Deals 3 damage to the target for each 10 fire quantums in your possession (min 3 damage).'
        },
        {
            cardName: 'Freeze',
            skillName: 'Freeze',
            effect: 'Freeze the target creature for 3 turns. Frozen creatures cannot attack or use skills.'
        },
        {
            cardName: 'Parallel Universe',
            skillName: 'Parallel Universe',
            effect: "Summon an exact copy of the target creature. The duplicate is spawned under the owner of the targeted creature's control."
        },
        {
            cardName: 'Lobotomizer',
            skillName: 'Lobotomize',
            effect: 'Remove any skill from the target creature.'
        },
        {
            cardName: 'Drain Life',
            skillName: 'Drain Life',
            effect: 'Inflict 1 Poison to Creature'
        },
        {
            cardName: 'Owl\'s Eye',
            skillName: 'Sniper',
            effect: 'Deal 3 damage to the target creature.'
        },
        {
            cardName: 'Shockwave',
            skillName: 'Shockwave',
            effect: 'Deal 4 damage to a target creature. Instantly kill the creature if frozen.'
        },
        {
            cardName: 'Reverse Time',
            skillName: 'Reverse Time',
            effect: 'The target creature is placed on top of the creature owner\'s deck.'
        },
        {
            cardName: 'Gravity Pull',
            skillName: 'Gravity Pull',
            effect: 'The creature enchanted with gravity pull will absorb all the damage directed against its owner.'
        }
    ];

    // State to keep track of the specific cards fetched from GraphQL
    const [specificCards, setSpecificCards] = useState([]);
    // State to keep track of the number of creatures
    const [numCreatures, setNumCreatures] = useState(0);
    // State to keep track of the selected cards and their effects
    const [selectedEffects, setSelectedEffects] = useState([]);
    const { loading, error, data } = useQuery(GET_CARDS);

    // Fetch cards and filter them based on the cardNames array
    useEffect(() => {
        if (!loading && !error && data) {
            const filteredCards = data.cards.filter(card => cardNames.includes(card.name));
            setSpecificCards(filteredCards);
        }
    }, [loading, error, data]);

    // Function to select multiple random cards
    const selectRandomEffects = () => {
        if (specificCards.length > 0 && numCreatures > 0) {
            const newSelectedEffects = [];
            for (let i = 0; i < numCreatures; i++) {
                const randomIndex = Math.floor(Math.random() * specificCards.length);
                const selected = specificCards[randomIndex];
                const effect = effectNames.find(effect => effect.cardName === selected.name);
                if (effect) {
                    newSelectedEffects.push({
                        card: selected,
                        effect: effect
                    });
                }
            }
            setSelectedEffects(newSelectedEffects);
        }
    };

    return (
        <div>
            <h1>Pandemonium Random Effects:</h1>
            {loading && <p>Loading cards...</p>}
            {error && <p>Error loading cards.</p>}
            
            <div>
                <label htmlFor="numCreatures">Enter number of creatures:</label>
                <input
                    id="numCreatures"
                    type="number"
                    min="1"
                    value={numCreatures}
                    onChange={(e) => setNumCreatures(parseInt(e.target.value, 10))}
                />
            </div>

            <p>Click the button to reveal random card effects:</p>
            
            {/* Display the selected effects */}
            {selectedEffects.length > 0 && (
                <div>
                    {selectedEffects.map((item, index) => (
                        <div key={index}>
                            <h2>Selected Effect: {item.effect.skillName}</h2>
                            <p>Effect: {item.effect.effect}</p>
                            <div className="card-section">
                                <CardCanvas card={item.card} />
                            </div>
                        </div>
                    ))}
                </div>
            )}
            
            {/* Button to select random effects */}
            <button onClick={selectRandomEffects} disabled={loading || error || specificCards.length === 0}>
                Reveal Random Effects
            </button>
        </div>
    );
};

export default PandemoniumPage;