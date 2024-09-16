import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_CARDS } from '../utils/queries';
import CardCanvas from '../components/CardCanvas';

const ChaosSeedPage = () => {
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
    // State to keep track of the selected card and its effect
    const [selectedCard, setSelectedCard] = useState(null);
    const [selectedEffect, setSelectedEffect] = useState(null);

    const { loading, error, data } = useQuery(GET_CARDS);

    // Fetch cards and filter them based on the cardNames array
    useEffect(() => {
        if (!loading && !error && data) {
            const filteredCards = data.cards.filter(card => cardNames.includes(card.name));
            setSpecificCards(filteredCards);
            console.log(filteredCards);
        }
    }, [loading, error, data]);

    // Function to select a random card
    const selectRandomCard = () => {
        if (specificCards.length > 0) {
            // Generate a random index
            const randomIndex = Math.floor(Math.random() * specificCards.length);
            // Get the selected card
            const selected = specificCards[randomIndex];
            // Find the matching effect from effectNames
            const effect = effectNames.find(effect => effect.cardName === selected.name);
            // Update the state with the selected card and effect
            setSelectedCard(selected);
            setSelectedEffect(effect);
        }
    };

    return (
        <div>
            <h1>Chaos Seed Random Effects:</h1>
            {loading && <p>Loading cards...</p>}
            {error && <p>Error loading cards.</p>}
            <p>Click the button to reveal a random card effect:</p>
            {/* Display the selected card */}
            {selectedCard && selectedEffect && (
                <div>
                    <h2>Selected Card Effect: {selectedEffect.skillName}</h2>
                    <div className="card-section">
                        {/* Pass the selectedCard to the CardCanvas component */}
                        <CardCanvas card={selectedCard} />
                    </div>
                    <p>Effect: {selectedEffect.effect}</p>
                    {/* Add more card details here if available in the data */}
                </div>
            )}
            {/* Button to select a random card */}
            <button onClick={selectRandomCard} disabled={loading || error || specificCards.length === 0}>
                Reveal Random Effect
            </button>
        </div>
    );
};

export default ChaosSeedPage;