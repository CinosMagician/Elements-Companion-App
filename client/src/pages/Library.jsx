import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_CARDS } from "../utils/queries";
import { useNavigate } from 'react-router-dom';
import CardCanvas from '../components/CardCanvas';
import './Library.css'; // Import CSS file for styling

const Library = () => {
    const { loading: cardLoading, error: cardError, data: cardData } = useQuery(GET_CARDS);
    const [cards, setCards] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (!cardLoading && !cardError && cardData) {
            setCards(cardData.cards); // Assuming cardData.cards is an array of card objects
        }
    }, [cardLoading, cardError, cardData]);

    if (cardLoading) return <p>Loading...</p>;
    if (cardError) return <p>Error loading cards: {cardError.message || 'Unknown error'}</p>;

    const handleClick = (cardId) => {
        navigate(`/card/${cardId}`); // Navigate to the card detail page
    };

    return (
        <div className="card-grid">
            {cards.map((card) => (
                <div key={card._id} className="card" onClick={() => handleClick(card._id)}>
                    <CardCanvas card={card} />
                </div>
            ))}
        </div>
    );
}

export default Library;
