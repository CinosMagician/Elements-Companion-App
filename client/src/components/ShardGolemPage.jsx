import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_CARDS } from '../utils/queries';
import CardCanvas from './CardCanvas'; // Import your CardCanvas component
import DeckCardCanvas from './DeckCardCanvas';
import "./ShardGolemPage.css"

const ShardGolemPage = () => {
    const { loading: cardLoading, error: cardError, data: cardData } = useQuery(GET_CARDS);
    const [specificCards, setSpecificCards] = useState([]);

    const shortName = 'Shard of ';

    const cardNames = [
      `${shortName}Integrity`,
      `${shortName}Serendipity`,
      `${shortName}Sacrifice`,
      `${shortName}Focus`,
      `${shortName}Gratitude`,
      `${shortName}Bravery`,
      `${shortName}Patience`,
      `${shortName}Divinity`,
      `${shortName}Freedom`,
      `${shortName}Readiness`,
      `${shortName}Void`,
      `${shortName}Wisdom`,
    ];

    console.log(cardNames);

    const [shards, setShards] = useState({
        Integrity: 1,
        Serendipity: 0,
        Sacrifice: 0,
        Focus: 0,
        Gratitude: 0,
        Bravery: 0,
        Patience: 0,
        Divinity: 0,
        Freedom: 0,
        Readiness: 0,
        Void: 0,
        Wisdom: 0,
    });

    useEffect(() => {
        if (!cardLoading && !cardError && cardData) {
            // Filter and sort cards based on the order defined in cardNames
            const filteredCards = cardData.cards
                .filter(card => cardNames.includes(card.name))
                .sort((a, b) => {
                    // Sort according to the order in cardNames
                    return cardNames.indexOf(a.name) - cardNames.indexOf(b.name);
                });

            setSpecificCards(filteredCards);
            console.log(filteredCards);
        }
    }, [cardLoading, cardError, cardData]); // Added dependencies to the useEffect

    const [card, setCard] = useState(null);

    // Increment function to increase shard count
    const increment = (shardName, amount) => {
        const shardKey = shardName.replace('Shard of ', ''); // Extract the key
        setShards((prev) => ({
            ...prev,
            [shardKey]: Math.min(prev[shardKey] + amount, 8), // Max limit set to 8
        }));
    };

    // Decrement function to decrease shard count
    const decrement = (shardName, amount) => {
        const shardKey = shardName.replace('Shard of ', ''); // Extract the key
        setShards((prev) => ({
            ...prev,
            [shardKey]: Math.max(prev[shardKey] - amount, 0), // Minimum limit set to 0
        }));
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setShards((prev) => ({
            ...prev,
            [name]: Number(value),
        }));
    };

    const calculateStatsAndSkills = () => {
        let totalAttack = 0;
        let totalHealth = 0;
        let passiveSkills = [];
        let activeSkill = '';

        // Passive Skills
        if (shards.Freedom > 0) passiveSkills.push('Airborne');
        if (shards.Void > 0) {
            passiveSkills.push(shards.Void > 1 ? 'Voodoo' : 'Devourer');
        }
        if (shards.Focus > 1) passiveSkills.push('Momentum');
        if (shards.Gratitude > 1) passiveSkills.push('Adrenaline');
        if (shards.Wisdom > 1) passiveSkills.push('Immaterial');

        // Active Skills
        const totalShards = Object.values(shards).reduce((a, b) => a + b, 0);
        const shardEntries = Object.entries(shards).filter(([_, count]) => count > 0);

        shardEntries.forEach(([shard, count]) => {
            switch (shard) {
                case 'Integrity':
                    if (count >= 6) activeSkill = '[icon:earthsmall] [icon:earthsmall] : Petrify';
                    else if (count >= 4) activeSkill = '[icon:earthsmall] : Guard';
                    else if (count >= 2) activeSkill = '[icon:earthsmall] : Stone Form';
                    else if (count >= 1) activeSkill = '[icon:earthsmall] : Burrow';
                    break;
                case 'Serendipity':
                    if (count >= 6) activeSkill = '[icon:earthsmall] [icon:earthsmall] [icon:earthsmall] [icon:earthsmall] : Antimatter';
                    else if (count >= 5) activeSkill = 'Scramble';
                    else if (count >= 4) activeSkill = '[icon:earthsmall] [icon:earthsmall] : Improve';
                    else if (count >= 3) activeSkill = '[icon:earthsmall] [icon:earthsmall] : Paradox';
                    else if (count >= 2) activeSkill = '[icon:earthsmall] [icon:earthsmall] : Mutation';
                    else if (count >= 1) activeSkill = '[icon:earthsmall] : Dead/Alive';
                    break;
                case 'Sacrifice':
                    if (count >= 6) activeSkill = 'Deadly Venom';
                    else if (count >= 5) activeSkill = '[icon:earthsmall] [icon:earthsmall] : Aflatoxin';
                    else if (count >= 4) activeSkill = 'Venom';
                    else if (count >= 3) activeSkill = 'Scavenger';
                    else if (count >= 1) activeSkill = '[icon:earthsmall] : Infection';
                    break;
                case 'Focus':
                    if (count >= 6) activeSkill = '[icon:earthsmall] [icon:earthsmall] [icon:earthsmall] [icon:earthsmall] : Black Hole';
                    else if (count >= 3) activeSkill = '[icon:earthsmall] [icon:earthsmall] [icon:earthsmall] : Devour';
                    break;
                case 'Gratitude':
                    if (count >= 6) activeSkill = '[icon:earthsmall] [icon:earthsmall] [icon:earthsmall] [icon:earthsmall] : Mitosis';
                    else if (count >= 5) activeSkill = '[icon:earthsmall] [icon:earthsmall] : Adrenaline';
                    else if (count >= 1) activeSkill = '[icon:earthsmall] [icon:earthsmall] : Growth';
                    break;
                case 'Bravery':
                    if (count >= 6) activeSkill = '[icon:earthsmall] [icon:earthsmall] : Rage';
                    else if (count >= 5) activeSkill = '[icon:earthsmall] [icon:earthsmall] [icon:earthsmall] : Destroy';
                    else if (count >= 3) activeSkill = 'Fiery';
                    else if (count >= 2) activeSkill = '[icon:earthsmall] : Ablaze';
                    break;
                case 'Patience':
                    if (count >= 6) activeSkill = '[icon:earthsmall] [icon:earthsmall] [icon:earthsmall] [icon:earthsmall] : Nymph';
                    else if (count >= 4) activeSkill = '[icon:earthsmall] [icon:earthsmall] [icon:earthsmall] : Freeze';
                    else if (count >= 2) activeSkill = '[icon:earthsmall] [icon:earthsmall] : Steam';
                    break;
                case 'Divinity':
                    if (count >= 6) activeSkill = '[icon:earthsmall] [icon:earthsmall] [icon:earthsmall] [icon:earthsmall] : Luciferin';
                    else if (count >= 3) activeSkill = '[icon:earthsmall] [icon:earthsmall] : Endow';
                    else if (count >= 1) activeSkill = '[icon:earthsmall] : Heal';
                    break;
                case 'Freedom':
                    if (count >= 6) activeSkill = '[icon:earthsmall] [icon:earthsmall] : Unstable Gas';
                    else if (count >= 4) activeSkill = '[icon:earthsmall] [icon:earthsmall] : Dive';
                    else if (count >= 3) activeSkill = '[icon:earthsmall] [icon:earthsmall] : Sniper';
                    else if (count >= 2) activeSkill = '[icon:earthsmall] [icon:earthsmall] : Queen';
                    break;
                case 'Readiness':
                    if (count >= 6) activeSkill = '[icon:earthsmall] [icon:earthsmall] : Precognition';
                    else if (count >= 4) activeSkill = 'Neurotoxin';
                    else if (count >= 3) activeSkill = '[icon:earthsmall] [icon:earthsmall] [icon:earthsmall] [icon:earthsmall] : Deja Vu';
                    else if (count >= 2) activeSkill = '[icon:earthsmall] [icon:earthsmall] : Scarab';
                    break;
                case 'Void':
                    if (count >= 6) activeSkill = '[icon:earthsmall] [icon:earthsmall] [icon:earthsmall] : Steal';
                    else if (count >= 5) activeSkill = '[icon:earthsmall] [icon:earthsmall] : Liquid Shadow';
                    else if (count >= 3) activeSkill = 'Vampire';
                    break;
                case 'Wisdom':
                    if (count >= 6) activeSkill = '[icon:earthsmall] [icon:earthsmall] : Immaterial';
                    else if (count >= 3) activeSkill = '[icon:earthsmall] [icon:earthsmall] : Lobotomize';
                    break;
                default:
                    break;
            }
        });

        // Stats Calculation
        Object.entries(shards).forEach(([shard, count]) => {
            switch (shard) {
                case 'Integrity':
                    totalAttack += 1 * Math.min(count, 6);
                    totalHealth += 4 * Math.min(count, 6);
                    break;
                case 'Focus':
                    totalAttack += 0 * Math.min(count, 6);
                    totalHealth += 6 * Math.min(count, 6);
                    break;
                case 'Bravery':
                    totalAttack += 3 * Math.min(count, 6);
                    totalHealth += 0 * Math.min(count, 6);
                    break;
                default:
                    totalAttack += 2 * count;
                    totalHealth += 2 * count;
                    break;
            }
        });

        const shardGolemData = {
            name: "Shard Golem",
            text: `${activeSkill}\n${passiveSkills.join(', ')}`,
            hasFlavourText: false,
            isToken: true,
            imageUrl: "/assets/images/cardArt/shardgolem.jpeg",
            element: "Earth",
            cost: 8,
            type: "Creature",
            attack: totalAttack,
            health: totalHealth,
        };

        setCard(shardGolemData);
    };

    return (
        <div>
            <h1>Shard Golem Creator</h1>
            <button className='genButton' onClick={calculateStatsAndSkills}>Generate Shard Golem</button>
            <div>
                {card && <CardCanvas card={card} />}
            </div>
            <div className="block-left-shards">
                {/* Existing dynamic counters */}
                {specificCards.map((card) => (
                    <div className="row" key={card.name}>
                        <button className="minus-button" onClick={() => decrement(card.name, 1)}>-</button>
                        <div className="icon-text-shards">
                            <DeckCardCanvas card={card} className="deck-card-canvas" />
                            <span className="text">{shards[card.name.replace('Shard of ', '')]}</span>
                        </div>
                        <button className="plus-button" onClick={() => increment(card.name, 1)}>+</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ShardGolemPage;