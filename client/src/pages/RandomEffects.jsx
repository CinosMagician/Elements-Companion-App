import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_CARDS } from '../utils/queries';
import CardCanvas from '../components/CardCanvas';
import './RandomEffects.css'; // Import CSS for custom styles

const RandomEffects = () => {
    const [specificCards, setSpecificCards] = useState([]);
    const { loading, error, data } = useQuery(GET_CARDS);

    // List of specific card names
    const cardNames = [
        'Chaos Seed', 'Singularity', 'Mutation', 'Pandemonium', 'Skull Shield',
        'Catapult', 'Shard Golem', 'Thorn Carapace', 'Adrenaline', 'Ice Bolt',
        'Ice Shield', 'Shard of Freedom', 'Fate Egg', 'Dusk Mantle'
    ];

    // Filter specific cards from the fetched data
    useEffect(() => {
        if (!loading && !error && data) {
            const filteredCards = data.cards.filter(card => cardNames.includes(card.name));
            setSpecificCards(filteredCards);
        }
    }, [loading, error, data]);

    if (loading) return <p>Loading cards...</p>;
    if (error) return <p>Error loading cards</p>;

    return (
        <div className="random-effects-container">
            {specificCards.map((card, index) => (
                <div 
                    key={index} 
                    className={`effect-row ${index % 2 === 0 ? 'left-card' : 'right-card'}`}
                >
                    {index % 2 === 0 ? (
                        <>
                            <div className="card-section">
                                <CardCanvas card={card} />
                            </div>
                            <div className="text-section">
                                <h3>{card.name}</h3>
                                <p>{/* Add description text related to the card's effect */}</p>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="text-section">
                                <h3>{card.name}</h3>
                                <p>{/* Add description text related to the card's effect */}</p>
                            </div>
                            <div className="card-section">
                                <CardCanvas card={card} />
                            </div>
                        </>
                    )}
                </div>
            ))}
        </div>
    );
};

export default RandomEffects;