import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import CardCanvas from './CardCanvas';
import CardSearch from './CardSearch';
import { GET_CARDS } from '../utils/queries';
import DeckCardCanvas from './DeckCardCanvas';

const MutationPage = () => {
    const { loading, error, data } = useQuery(GET_CARDS);
    const [selectedCard, setSelectedCard] = useState(null);
    const [attack, setAttack] = useState(0);
    const [health, setHealth] = useState(0);
    const [mutatedCard, setMutatedCard] = useState({
        name: 'Mutation',
        text: 'Mutate the target creature into an abomination, unless it dies... or turn into something weird.',
        hasFlavourText: false,
        imageUrl: '/assets/images/cardArt/mutation.jpeg', // Replace with the correct path to the Mutation card image
        element: 'Entropy',
        type: 'Spell', // Assuming the original card is a spell; change if different
        cost: 2, // Set the appropriate cost for the Mutation card
        attack: 0, // Since it's a spell, attack and health might be irrelevant
        health: 0
    });

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

    // Get a random creature card excluding specific names
    const getRandomCreatureCard = () => {
        // Filter out the excluded cards
        const validCreatures = data.cards.filter(
            (card) =>
                card.type === 'Creature' &&
                card.isToken !== true &&
                !['Chimera', 'Fate Egg', 'Devonian Dragon', 'Scarab', 'Immortal'].includes(card.name)
        );

        // Pick a random creature card
        const randomIndex = getRandomInt(0, validCreatures.length - 1);
        return validCreatures[randomIndex];
    };

    // Mutation Logic
    const mutateCreature = () => {
        const chance = Math.random();

        if (chance < 0.1) { // 10% chance to die
            setMutatedCard({
                name: `Deceased`,
                text: 'The creature has died.',
                hasFlavourText: false,
                imageUrl: '/assets/images/cardArt/boneyard.jpeg',
                element: "Death",
                type: "Creature"
            });
        } else if (chance < 0.5) { // 40% chance to become a Mutant
            const randomCard = getRandomCreatureCard();

            // List of possible mutant abilities
            const abilities = [
              `[icon:${randomCard.element}small] : Hatch\nThis creature will hatch into another random mutant`,
              `[icon:${randomCard.element}small] [icon:${randomCard.element}small] : Freeze\nFreeze the target creature`,
              `[icon:${randomCard.element}small] : Burrow\nThe ${randomCard.name} cannot be targeted, but its damage is halved.`,
              `[icon:${randomCard.element}small] [icon:${randomCard.element}small] : Destroy\nDestroy the targeted permanent`,
              `[icon:${randomCard.element}small] [icon:${randomCard.element}small] : Steal\nSteal a permanent`,
              `[icon:${randomCard.element}small] [icon:${randomCard.element}small] : Dive\nThe damage is doubled for 1 turn.`,
              `[icon:${randomCard.element}small] : Heal\nHeal the target creature up to 5 HP`,
              "Momentum: The creature ignores shield effects",
              `[icon:${randomCard.element}small] [icon:${randomCard.element}small] : Paradox\nKill the target creature if its attack is higher than its defence`,
              `[icon:${randomCard.element}small] : Lycanthropy\nThe ${randomCard.name} gains +5/+5 permanently. Can only be used Once.`,
              `Scavenger\nEvery time a creature dies, ${randomCard.name} gains +1/+1`,
              `[icon:${randomCard.element}small] : Infection\nInflict 1 poison damage to a target creature.`,
              `[icon:${randomCard.element}small] : Gravity Pull\nThe damage inflicted to you is redirected on ${randomCard.name}.`,
              `Devour\nAbsorb 1 quantum from your opponent per turn and return a  [icon:${randomCard.element}small] to you`,
              `[icon:${randomCard.element}small] : Mutation\nthe target creature into an abomination, unless it dies... or turn into someting weird.`,
              `[icon:${randomCard.element}small] : Growth\nThe ${randomCard.name} gains +2/+2`,
              `[icon:${randomCard.element}small] : Ablaze\nThe ${randomCard.name} gains +2/+0`,
              `[icon:${randomCard.element}small] : Poison\nInflict 1 poison damage to the opponent.`,
              `[icon:${randomCard.element}small] : Deja Vu\nRemove this ability, then ${randomCard.name} creates a copy of itself`,
              `[icon:${randomCard.element}small] [icon:${randomCard.element}small] : Immaterial\nThe target creature is now immortal (untargetable).`,
              `[icon:${randomCard.element}small] [icon:${randomCard.element}small] : Endow\n Gain the target weapon's ability and +X/+2. X is the weapon's attack.`,
              `[icon:${randomCard.element}small] [icon:${randomCard.element}small] : Guard (Do not attack)\nDelay the target creature for 1 turn (cumulative) and attack it unless it is airborne.`,
              `[icon:${randomCard.element}small] [icon:${randomCard.element}small] : Mitosis\nGenerate a daughter creature.`,
            ];

            // Get a random ability from the list
            const getRandomAbility = () => {
                const randomIndex = getRandomInt(0, abilities.length - 1);
                return abilities[randomIndex];
            };


            const randomAttackBoost = getRandomInt(0, 4);
            const randomHealthBoost = getRandomInt(0, 4);
            const randomAbility = getRandomAbility();

            setMutatedCard({
                name: randomCard.name, // Use the name of the random creature
                text: `${randomAbility}`,
                hasFlavourText: false,
                imageUrl: randomCard.imageUrl, // Use the image of the random creature
                cost: randomCard.cost, // Use the cost of the random creature
                element: randomCard.element, // Use the element of the random creature
                type: "Creature",
                attack: randomCard.attack + randomAttackBoost, // Mutant stats
                health: randomCard.health + randomHealthBoost, // Mutant stats
            });
        } else { // 50% chance to turn into Abomination
            setMutatedCard({
                name: 'Abomination',
                text: 'A hideous mutation of the original creature.',
                hasFlavourText: true,
                imageUrl: '/assets/images/cardArt/abomination.jpeg',
                cost: 5,
                element: 'Entropy',
                type: "Creature",
                attack: 5,
                health: 5
            });
        }
    };

    const hatchMutantCreature = () => {
            const randomCard = getRandomCreatureCard();

            // List of possible mutant abilities
            const abilities = [
                `[icon:${randomCard.element}small] : Hatch\nThis creature will hatch into another random mutant`, `[icon:${randomCard.element}small] [icon:${randomCard.element}small] : Freeze`, `[icon:${randomCard.element}small] : Burrow`, `[icon:${randomCard.element}small] [icon:${randomCard.element}small] : Destroy`, `[icon:${randomCard.element}small] [icon:${randomCard.element}small] : Steal`, `[icon:${randomCard.element}small] [icon:${randomCard.element}small] : Dive`, `[icon:${randomCard.element}small] : Heal`, 
                'Momentum', `[icon:${randomCard.element}small] [icon:${randomCard.element}small] : Paradox`, `[icon:${randomCard.element}small] : Lycanthropy`, 'Scavenger', `[icon:${randomCard.element}small] : Infection`, 
                `[icon:${randomCard.element}small] : Gravity Pull`, 'Devour', `[icon:${randomCard.element}small] [icon:${randomCard.element}small] : Mutation`, `[icon:${randomCard.element}small] : Growth`, `[icon:${randomCard.element}small] : Ablaze`, `[icon:${randomCard.element}small] : Poison`, 
                `[icon:${randomCard.element}small] : Deja Vu`, `[icon:${randomCard.element}small] [icon:${randomCard.element}small] : Immaterial`, `[icon:${randomCard.element}small] [icon:${randomCard.element}small] : Endow`, `[icon:${randomCard.element}small] [icon:${randomCard.element}small] : Guard`, `[icon:${randomCard.element}small] [icon:${randomCard.element}small] : Mitosis`
            ];

            // Get a random ability from the list
            const getRandomAbility = () => {
                const randomIndex = getRandomInt(0, abilities.length - 1);
                return abilities[randomIndex];
            };


            const randomAttackBoost = getRandomInt(0, 4);
            const randomHealthBoost = getRandomInt(0, 4);
            const randomAbility = getRandomAbility();

            setMutatedCard({
                name: randomCard.name, // Use the name of the random creature
                text: `${randomAbility}`,
                hasFlavourText: false,
                imageUrl: randomCard.imageUrl, // Use the image of the random creature
                cost: randomCard.cost, // Use the cost of the random creature
                element: randomCard.element, // Use the element of the random creature
                type: "Creature",
                attack: randomCard.attack + randomAttackBoost, // Mutant stats
                health: randomCard.health + randomHealthBoost, // Mutant stats
            });
        }
    // Handle loading and error states
    if (loading) return <div>Loading cards...</div>;
    if (error) return <div>Error loading cards: {error.message}</div>;

    return (
        <div>
            <h1>Creature Mutation</h1>
            {/* Pass fetched data to CardSearch */}
            {/* <CardSearch cards={data.cards} onSelect={handleCardSelect} /> */}


                <div>
                    {/* <h2>Selected Creature</h2> */}
                    {/* <div><DeckCardCanvas card={selectedCard}/></div> */}
                    <button onClick={mutateCreature}>Mutate Creature</button>
                    <button onClick={hatchMutantCreature}>Hatch Mutant Creature</button>
                </div>

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