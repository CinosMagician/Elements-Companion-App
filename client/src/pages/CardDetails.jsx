import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_CARD } from "../utils/queries";
import TextWithIcons from '../components/TextWithIcons';
import CardCanvas from '../components/CardCanvas';
import './CardDetails.css';

const CardDetails = () => {
    const { id } = useParams();
    const { loading, error, data } = useQuery(GET_CARD, {
        variables: { _id: id },
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error loading card details: {error.message}</p>;

    const { card } = data;

    return (
        <div className="card-details-container">
            <div className="card-info">
                <h1>{card.name}</h1>
                <p><strong>Element:</strong> {card.element}</p>
                {card.cost && <p><strong>Cost:</strong> {card.cost}</p>}
                <TextWithIcons text={card.text} hasFlavourText={card.hasFlavourText} />
                <p><strong>Type:</strong> {card.type}</p>
                {card.type === 'Permanent' && card.attack && card.health && <p><strong>Animated Weapon Stats:</strong></p>}
                {card.attack !== null && <p><strong>Attack:</strong> {card.attack}</p>}
                {card.health !== null && <p><strong>Health:</strong> {card.health}</p>}
            </div>
            <div className="card-canvas">
                <CardCanvas card={card} />
            </div>
        </div>
    );
};

export default CardDetails;
