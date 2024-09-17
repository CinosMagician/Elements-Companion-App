import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { GET_CARDS } from '../utils/queries';
import CardCanvas from '../components/CardCanvas';
import './RandomEffects.css'; // Import CSS for custom styles

const RandomEffects = () => {
    const [specificCards, setSpecificCards] = useState([]);
    const { loading, error, data } = useQuery(GET_CARDS);
    const navigate = useNavigate(); // Initialize useNavigate

    // List of specific card names
    const cardNames = [
        'Chaos Seed', 'Singularity', 'Mutation', 'Pandemonium', 'Skull Shield', 'Skeleton',
        'Catapult', 'Shard Golem', 'Thorn Carapace', 'Adrenaline', 'Ice Bolt',
        'Ice Shield', 'Shard of Freedom', 'Fate Egg', 'Dusk Mantle'
    ];

    const cardUsecases = [
        {
            name: 'Chaos Seed',
            useCase: 'Used to randomly select the effect triggered by Chaos Seed'
        },
        {
            name: 'Singularity',
            useCase: 'Selects which random effect to apply to itself'
        },
        {
            name: 'Mutation',
            useCase: ''
        },
        {
            name: 'Pandemonium',
            useCase: ''
        },
        {
            name: 'Skull Shield',
            useCase: ''
        },
        {
            name: 'Catapult',
            useCase: 'Calculate the Damage when using Catapult'
        },
        {
            name: 'Shard Golem',
            useCase: ''
        },
        {
            name: 'Thorn Carapace',
            useCase: ''
        },
        {
            name: 'Skeleton',
            useCase: 'Find out what Creature Skeleton turns into'
        },
        {
            name: 'Adrenaline',
            useCase: ''
        },
        {
            name: 'Ice Bolt',
            useCase: ''
        },
        {
            name: 'Ice Shield',
            useCase: ''
        },
        {
            name: 'Shard of Freedom',
            useCase: ''
        },
        {
            name: 'Fate Egg',
            useCase: ''
        },
        {
            name: 'Dusk Mantle',
            useCase: ''
        }
    ];

    // Filter specific cards from the fetched data
    useEffect(() => {
        if (!loading && !error && data) {
            const filteredCards = data.cards.filter(card => cardNames.includes(card.name));
            setSpecificCards(filteredCards);
        }
    }, [loading, error, data]);

    // Function to handle navigation
    const handleCardClick = (cardName) => {
        // Generate path from card name
        const path = `/random/${cardName.toLowerCase().replace(/ /g, '_')}`;
        navigate(path);
    };

    // Function to find the use case for a given card name
    const getUseCase = (cardName) => {
        const card = cardUsecases.find(c => c.name === cardName);
        return card ? card.useCase : '';
    };

    if (loading) return <p>Loading cards...</p>;
    if (error) return <p>Error loading cards</p>;

    return (
        <div className="random-effects-container">
            {specificCards.map((card, index) => (
                <div 
                    key={index} 
                    className={`effect-row ${index % 2 === 0 ? 'left-card' : 'right-card'}`}
                    onClick={() => handleCardClick(card.name)} // Add click handler
                    style={{ cursor: 'pointer' }} // Indicate it's clickable
                >
                    <div className="card-section">
                        <CardCanvas card={card} />
                    </div>
                    <div className="text-section">
                        <h3>{card.name}</h3>
                        <p>{getUseCase(card.name)}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default RandomEffects;