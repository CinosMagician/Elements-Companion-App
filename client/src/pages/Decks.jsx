import React from 'react';
import { useQuery } from '@apollo/client';
import { useParams, useNavigate } from 'react-router-dom';
import { GET_DECKS } from '../utils/queries';

export default function Decks() {
  const { loading, error, data } = useQuery(GET_DECKS);
  const navigate = useNavigate();

  const { id } = useParams();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // Function to navigate to deck detail page
  const goToDeck = (deckId) => {
    navigate(`/decks/${deckId}`);
  };

  // Function to navigate to create deck page
  const goToCreateDeck = () => {
    navigate(`/decks/${id}/create`);
  };

  return (
    <div>
      <h1>Your Decks</h1>
      <button onClick={goToCreateDeck}>Create New Deck</button>
      <div>
        {data.decks.length === 0 ? (
          <p>No decks found</p>
        ) : (
          data.decks.map((deck) => (
            <button key={deck.id} onClick={() => goToDeck(deck.id)}>
              {deck.name}
            </button>
          ))
        )}
      </div>
    </div>
  );
}
