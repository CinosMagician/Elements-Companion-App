import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@apollo/client';
// import { GET_DECK } from "../utils/queries";

const DeckEdit = () => {
    const { userId, deckId } = useParams();
    const navigate = useNavigate();

    // Redirect if no deckId is provided
    useEffect(() => {
        if (!deckId) {
            navigate('/error'); // or any other route you want to redirect to
        }
    }, [deckId, navigate]);

    const { loading, error, data } = useQuery(GET_DECK, { 
        variables: { _id: deckId }, 
        skip: !deckId  // Skip the query if deckId is not available
    });

    const [deckName, setDeckName] = useState('');
    const [selectedMark, setSelectedMark] = useState('');
    const [cards, setCards] = useState([]);

    useEffect(() => {
        if (data && data.deck) {
            setDeckName(data.deck.name);
            setSelectedMark(data.deck.mark || '');
            setCards(data.deck.cards);
        }
    }, [data]);

    const handleCardClick = (card) => {
        setCards(cards.filter(c => c._id !== card._id));
    };

    const handleSaveDeck = () => {
        if (cards.length < 30) {
            alert("Deck must have at least 30 cards.");
            return;
        }
        // Save deck logic (probably via a mutation)
    };

    const handleDeleteDeck = () => {
        // Delete deck logic (probably via a mutation)
    };

    if (!deckId) return <p>Deck ID is required.</p>;  // Safety check in case deckId is missing

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error loading deck data.</p>;

    return (
        <div style={{ padding: '20px' }}>
            <div>
                <input 
                    type="text" 
                    value={deckName} 
                    onChange={(e) => setDeckName(e.target.value)} 
                    placeholder="Deck Name" 
                    style={{ fontSize: '24px', marginBottom: '20px' }}
                />
                <button 
                    onClick={() => setSelectedMark('MarkValue')} 
                    style={{ marginLeft: '10px' }}
                >
                    {selectedMark || 'Select Mark'}
                </button>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ border: '1px solid #ccc', padding: '10px', width: '70%' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '10px' }}>
                        {cards.map((card) => (
                            <div key={card._id} onClick={() => handleCardClick(card)} style={{ cursor: 'pointer' }}>
                                <img src={card.imageUrl} alt={card.name} style={{ width: '100%' }} />
                                <p>{card.name}</p>
                                <p>{card.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <div style={{ width: '25%', padding: '10px', border: '1px solid #ccc' }}>
                    <input type="text" placeholder="Search Cards..." style={{ width: '100%', marginBottom: '10px' }} />
                    <button onClick={() => {}} style={{ width: '100%' }}>Filter</button>
                    {/* Render filtered cards here if needed */}
                </div>
            </div>
            <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between' }}>
                <button 
                    onClick={handleSaveDeck} 
                    style={{ padding: '10px 20px', backgroundColor: 'limegreen', color: '#fff', border: 'none', cursor: 'pointer' }}
                >
                    Save Deck
                </button>
                <button 
                    onClick={handleDeleteDeck} 
                    style={{ padding: '10px 20px', backgroundColor: 'red', color: '#fff', border: 'none', cursor: 'pointer' }}
                >
                    Delete Deck
                </button>
            </div>
        </div>
    );
};

export default DeckEdit;