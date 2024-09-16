import React, { useState } from 'react';
import CardCanvas from './CardCanvas'; // Import your CardCanvas component

const ShardGolemPage = () => {
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
    const [card, setCard] = useState(null);

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

        const cardData = {
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

        setCard(cardData);
    };

    return (
        <div>
            <h1>Shard Golem Creator</h1>
            <div>
            {card && <CardCanvas card={card} />}
            </div>
            {Object.keys(shards).map((shard) => (
                <div key={shard}>
                    <label>
                        {shard}:
                        <input
                            type="number"
                            name={shard}
                            value={shards[shard]}
                            min="0"
                            max="8" // Max hand size limit
                            onChange={handleChange}
                        />
                    </label>
                </div>
            ))}
            <button onClick={calculateStatsAndSkills}>Generate Shard Golem</button>

        </div>
    );
};

export default ShardGolemPage;
