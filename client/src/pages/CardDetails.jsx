import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';
import { GET_CARD } from "../utils/queries";

const CardDetails = () => {
    const { id } = useParams();
    const { loading, error, data } = useQuery(GET_CARD, {
      variables: { id },
    });
  
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error loading card details: {error.message}</p>;
  
    const { card } = data;
  
    return (
      <div style={{ padding: '20px' }}>
        <h1>{card.name}</h1>
        <img src={card.imageUrl} alt={card.name} style={{ width: '200px', height: 'auto' }} />
        <p><strong>Text:</strong> {card.text}</p>
        <p><strong>Cost:</strong> {card.cost}</p>
        <p><strong>Element:</strong> {card.element}</p>
      </div>
    );
  };
  
  export default CardDetails;