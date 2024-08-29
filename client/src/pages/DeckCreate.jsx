import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import { ADD_DECK } from '../utils/mutations';
import { GET_CARDS } from '../utils/queries';
import { useMyContext } from '../utils/UserContext'; // Use the custom hook
import CardCanvas from '../components/CardCanvas';
import DeckCardCanvas from '../components/DeckCardCanvas';
import FilterModal from '../components/FilterModal';
import './DeckScreens.css';

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
    const { state, setUser } = useMyContext(); // Destructure state and setUser from the context
    const [deckName, setDeckName] = useState('');
    const [deckCards, setDeckCards] = useState([]); // Initialize deck as empty
    const [selectedMark, setSelectedMark] = useState('life'); // Default to 'life'
    const [cards, setCards] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showFilterModal, setShowFilterModal] = useState(false);
    const [filteredCards, setFilteredCards] = useState([]);
    const [filters, setFilters] = useState({
        element: 'none',
        cost: '',
        type: '',
        attack: '',
        health: '',
    });

    const id = state.user.data._id;

    // Mutation for creating a new deck
    const [createDeck, { loading, error }] = useMutation(ADD_DECK);
    const { loading: cardLoading, error: cardError, data: cardData } = useQuery(GET_CARDS);

    useEffect(() => {
        if (!cardLoading && !cardError && cardData) {
            setCards(cardData.cards);
            setFilteredCards(cardData.cards); // Initially, all cards are shown
        }
    }, [cardLoading, cardError, cardData]);

    const handleCardClick = (card) => {
        setDeckCards(deckCards.filter((c, i) => i !== deckCards.indexOf(card)));
    };

    const handleCardInsertClick = (card) => {
        const cardName = card.name.toLowerCase();
        
        // Functional update to ensure the state is current
        setDeckCards(prevDeckCards => {
            const cardCount = prevDeckCards.filter(c => c._id === card._id).length;
    
            if (prevDeckCards.length === 60) {
                alert("You can only have up to 60 cards in the deck.");
                console.log(deckCards);
                return prevDeckCards;
            }
    
            if (cardName.includes("pillar") || cardName.includes("pendulum") || cardCount < 6) {
                console.log(deckCards);
                const updatedDeck = [...prevDeckCards, card];
                // Sort the deck based on the order of the cards in the filtered library
                updatedDeck.sort((a, b) => 
                    filteredCards.findIndex(c => c._id === a._id) - filteredCards.findIndex(c => c._id === b._id)
                );
                return updatedDeck;
            } else {
                alert("You can only have up to 6 copies of this card in the deck.");
                console.log(deckCards);
                return prevDeckCards;
            }
        });
    };
    

    const handleSaveDeck = async () => {
        if (deckCards.length < 30) {
            alert("Deck must have at least 30 cards.");
            return;
        }
        try {
            await createDeck({
                variables: {
                    userId: state.user.data._id,
                    name: deckName,
                    element: selectedMark,
                    cardIds: deckCards.map(card => card._id)
                }
            });
            navigate(`/decks/${id}`); // Redirect after successful creation
            window.location.reload();
        } catch (err) {
            console.error('Error creating deck:', err.graphQLErrors || err.networkError || err.message);
            console.error('Error creating deck:', err);
        }
    };

    const handleMarkSelect = (mark) => {
        setSelectedMark(mark);
        setShowModal(false); // Close the modal after selection
    };

    const handleSearch = (e) => {
        const searchQuery = e.target.value.toLowerCase();
        const searchedCards = cards.filter((card) =>
            card.name.toLowerCase().includes(searchQuery)
        );
        setFilteredCards(searchedCards);
    };

    const handleFilterSubmit = () => {
        const filtered = cards.filter((card) => {
            return (
                (filters.element === 'none' || card.element === filters.element) &&
                (filters.cost === '' || card.cost === parseInt(filters.cost)) &&
                (filters.type === '' || card.type === filters.type) &&
                (filters.attack === '' || card.attack === parseInt(filters.attack)) &&
                (filters.health === '' || card.health === parseInt(filters.health))
            );
        });
        setFilteredCards(filtered);
        setShowFilterModal(false);
    };

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters({
            ...filters,
            [name]: value,
        });
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
                {/* Deck Display */}
                <div style={{ border: '1px solid #ccc', padding: '10px', width: '70%', height: "fit-content" }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(10, 1fr)', gap: '10px' }}>
                        {deckCards.map((card, index) => (
                            <div key={index} onClick={() => handleCardClick(card)} style={{ cursor: 'pointer' }} className='card-deck'>
                              <DeckCardCanvas card={card}/>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Search & Filter Section */}
                <div className="library-container">
                    <div className="search-filter-container">
                        <input
                            type="text"
                            className="search-bar"
                            placeholder="Search cards..."
                            onChange={handleSearch} // Update filteredCards based on search query
                        />
                        <button
                            className="filter-button"
                            onClick={() => setShowFilterModal(true)}
                        >
                            Filter
                        </button>
                    </div>

                    <div className="card-grid-deck">
                        {filteredCards.map((card) => (
                            <div
                                key={card._id}
                                className="card-deck"
                                onClick={() => handleCardInsertClick(card)}
                            >
                                <CardCanvas card={card} />
                            </div>
                        ))}
                    </div>

                    <FilterModal
                        show={showFilterModal}
                        filters={filters}
                        handleFilterChange={handleFilterChange}
                        handleFilterSubmit={handleFilterSubmit}
                        handleClose={() => setShowFilterModal(false)}
                    />
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
                        <button onClick={() => setShowModal(false)} style={{ marginTop: '20px', padding: '10px 20px', backgroundColor: '#333', color: '#fff', border: 'none', cursor: 'pointer' }}>
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DeckCreate;
