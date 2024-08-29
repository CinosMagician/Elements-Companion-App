import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { useMyContext } from '../utils/UserContext';
import { GET_DECKS, GET_USERID } from '../utils/queries';

const Decks = () => {
  const { state } = useMyContext(); // Destructure state from the context
  const id = state.user.data._id; // User ID from context
  const navigate = useNavigate();

  // Fetch user data
  const { loading: loadingUser, error: errorUser, data: userData } = useQuery(GET_USERID, {
    variables: { id },
    skip: !id // Skip if id is not available
  });

  // Fetch decks data
  const { loading: loadingDecks, error: errorDecks, data: deckData } = useQuery(GET_DECKS, {
    variables: { userId: id },
    skip: !id // Skip if id is not available
  });

  const [userDecks, setUserDecks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!loadingUser && !loadingDecks) {
      try {
        // Combine userData and deckData handling
        if (userData?.userID?.decks) {
          setUserDecks(userData.userID.decks);
        } else if (deckData?.decks) {
          setUserDecks(deckData.decks);
        } else {
          setUserDecks([]);
        }
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }
  }, [loadingUser, loadingDecks, userData, deckData]);

  const handleCreateDeck = () => {
    navigate(`/decks/${id}/create`);
  };

  const handleDeckClick = (deckId) => {
    navigate(`/decks/${id}/${deckId}`);
  };

  console.log('User Data:', userData);
  console.log('Deck Data:', deckData);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>Your Decks</h1>
      <button onClick={handleCreateDeck}>Create New Deck</button>
      <div>
        {userDecks.length === 0 ? (
          <p>No decks found</p>
        ) : (
          userDecks.map((deck) => (
            <button key={deck._id} onClick={() => handleDeckClick(deck._id)}>
              {deck.name}
            </button>
          ))
        )}
      </div>
    </div>
  );
};

export default Decks;
