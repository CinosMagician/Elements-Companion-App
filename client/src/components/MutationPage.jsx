import React, { useState } from 'react';
import { useQuery } from '@apollo/client'; // Import useQuery from Apollo
import CardCanvas from './CardCanvas'; // Assuming this component is used to render the cards
import CardSearch from './CardSearch'; // Assuming this component allows searching and selecting cards
import { GET_CARDS } from '../utils/queries';

const MutationPage = () => {
    const { loading, error, data } = useQuery(GET_CARDS); // Fetch card data
    const [selectedCard, setSelectedCard] = useState(null);
    const [attack, setAttack] = useState(0);
    const [health, setHealth] = useState(0);
    const [mutatedCard, setMutatedCard] = useState(null);

    // Handle card selection from CardSearch
    const handleCardSelect = (card) => {
        setSelectedCard(card);
        setAttack(card.attack);
        setHealth(card.health);
        setMutatedCard(null); // Reset the mutation result
    };


    // Get a random integer between min and max (inclusive)
    const getRandomInt = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    // List of possible mutant abilities
    const abilities = [
        'Hatch', 'Freeze', 'Burrow', 'Destroy', 'Steal', 'Dive', 'Heal', 
        'Momentum', 'Paradox', 'Lycanthropy', 'Scavenger', 'Infection', 
        'Gravity Pull', 'Devour', 'Mutation', 'Growth', 'Ablaze', 'Poison', 
        'Deja Vu', 'Immaterial', 'Endow', 'Guard', 'Mitosis'
    ];

    // Get a random ability from the list
    const getRandomAbility = () => {
        const randomIndex = getRandomInt(0, abilities.length - 1);
        return abilities[randomIndex];
    };

    // Mutation Logic
    const mutateCreature = () => {
        const chance = Math.random();

        if (chance < 0.1) { // 10% chance to die
            setMutatedCard({
                name: `Deceased`,
                text: 'The creature has died.',
                hasFlavourText: false,
                imageUrl: 'assets/images/cardArt/boneyard.jpeg',
                element: death,
                type: "Creature"
            });
        } else if (chance < 0.5) { // 40% chance to become a Mutant
            const randomAttackBoost = getRandomInt(0, 4);
            const randomHealthBoost = getRandomInt(0, 4);
            const randomAbility = getRandomAbility();
            setMutatedCard({
                name: 'Mutant',
                text: `${randomAbility}`,
                hasFlavourText: false,
                imageUrl: 'assets/images/cardArt/fallenelf.jpeg',
                cost: selectedCard.cost,
                element: selectedCard.element,
                type: "Creature",
                attack: attack + randomAttackBoost,
                health: health + randomHealthBoost
            });
        } else { // 50% chance to turn into Abomination
            setMutatedCard({
                name: 'Abomination',
                text: 'A hideous mutation of the original creature.',
                hasFlavourText: true,
                imageUrl: 'assets/images/cardArt/abomination.jpeg',
                cost: 5,
                element: 'Entropy',
                type: "Creature",
                attack: 5,
                health: 5
            });
        }
    };

    // Handle loading and error states
    if (loading) return <div>Loading cards...</div>;
    if (error) return <div>Error loading cards: {error.message}</div>;

    return (
        <div>
            <h1>Creature Mutation</h1>
            {/* Pass fetched data to CardSearch */}
            <CardSearch cards={data.cards} onSelect={handleCardSelect} /> {/* Component to select a creature */}

            {selectedCard && (
                <div>
                    <h2>Selected Creature</h2>
                    <div>Name: {selectedCard.name}</div>
                    <div>Element: {selectedCard.element}</div>
                    <div>Cost: {selectedCard.cost}</div>
                    <div>
                        Attack: 
                        <input 
                            type="number" 
                            value={attack} 
                            onChange={(e) => setAttack(parseInt(e.target.value, 10))} 
                        />
                    </div>
                    <div>
                        Health: 
                        <input 
                            type="number" 
                            value={health} 
                            onChange={(e) => setHealth(parseInt(e.target.value, 10))} 
                        />
                    </div>
                    <button onClick={mutateCreature}>Mutate Creature</button>
                </div>
            )}

            {mutatedCard && (
                <div>
                    <h2>Mutation Result</h2>
                    <CardCanvas card={mutatedCard} />
                </div>
            )}
        </div>
    );
};

export default MutationPage;