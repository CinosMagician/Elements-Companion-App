import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { ADD_DECK } from '../utils/mutations';

// Import icons
import iconFire from '../assets/icons/fire.png';
import iconLife from '../assets/icons/life.png';
import iconAether from '../assets/icons/aether.png';
import iconLight from '../assets/icons/light.png';
import iconWater from '../assets/icons/water.png';
import iconGravity from '../assets/icons/gravity.png';
import iconDeath from '../assets/icons/death.png';
import iconTime from '../assets/icons/time.png';
import iconEntropy from '../assets/icons/entropy.png';
import iconDarkness from '../assets/icons/darkness.png';
import iconAir from '../assets/icons/air.png';
import iconEarth from '../assets/icons/earth.png';

// Icons object
const icons = {
    darkness: iconDarkness,
    death: iconDeath,
    earth: iconEarth,
    fire: iconFire,
    gravity: iconGravity,
    time: iconTime,
    water: iconWater,
    life: iconLife,
    aether: iconAether,
    air: iconAir,
    entropy: iconEntropy,
    light: iconLight,
};

const DeckCreate = () => {
    const navigate = useNavigate();

    // State for new deck
    const [deckName, setDeckName] = useState('');
    const [selectedMark, setSelectedMark] = useState('life'); // Default to 'life'
    const [cards, setCards] = useState([]);
    const [showModal, setShowModal] = useState(false);

    // Mutation for creating a new deck
    const [createDeck, { loading, error }] = useMutation(ADD_DECK);

    const handleCardClick = (card) => {
        setCards(cards.filter(c => c._id !== card._id));
    };

    const handleSaveDeck = async () => {
        if (cards.length < 30) {
            alert("Deck must have at least 30 cards.");
            return;
        }
        try {
            await createDeck({
                variables: {
                    name: deckName,
                    element: selectedMark,
                    cards: cards.map(card => card._id) // Assuming cards are referenced by IDs
                }
            });
            navigate('/decks'); // Redirect after successful creation
        } catch (err) {
            console.error('Error creating deck:', err);
        }
    };

    const handleMarkSelect = (mark) => {
        setSelectedMark(mark);
        setShowModal(false); // Close the modal after selection
    };

    return (
        <div style={{ padding: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                <input 
                    type="text" 
                    value={deckName} 
                    onChange={(e) => setDeckName(e.target.value)} 
                    placeholder="Deck Name" 
                    style={{ fontSize: '24px', marginRight: '10px', flex: 1 }}
                />
                <button 
                    onClick={() => setShowModal(true)} 
                    style={{ border: 'none', background: 'none', padding: '0', cursor: 'pointer' }}
                >
                    <img 
                        src={icons[selectedMark]} 
                        alt={selectedMark} 
                        style={{ width: '50px', height: '50px' }} 
                    />
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
                    disabled={loading}  // Disable while loading
                >
                    Save Deck
                </button>
            </div>
            {error && <p>Error creating deck: {error.message}</p>}

            {/* Modal for selecting mark */}
            {showModal && (
                <div style={{ position: 'fixed', top: '0', left: '0', right: '0', bottom: '0', backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px', width: '80%', maxWidth: '600px' }}>
                        <h2>Select an Element</h2>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
                            {Object.keys(icons).map((key) => (
                                <div 
                                    key={key} 
                                    onClick={() => handleMarkSelect(key)} 
                                    style={{ cursor: 'pointer', textAlign: 'center' }}
                                >
                                    <img src={icons[key]} alt={key} style={{ width: '60px', height: '60px' }} />
                                    <p>{key.charAt(0).toUpperCase() + key.slice(1)}</p>
                                </div>
                            ))}
                        </div>
                        <button 
                            onClick={() => setShowModal(false)} 
                            style={{ marginTop: '20px', padding: '10px 20px', backgroundColor: 'lightcoral', color: '#fff', border: 'none', cursor: 'pointer' }}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DeckCreate;
