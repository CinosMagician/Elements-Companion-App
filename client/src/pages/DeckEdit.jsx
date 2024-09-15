import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import { GET_DECK, GET_CARDS } from '../utils/queries';
import { REMOVE_DECK, UPDATE_DECK } from '../utils/mutations';
import { useMyContext } from '../utils/UserContext'; // Use the custom hook
import CardCanvas from '../components/CardCanvas';
import DeckCardCanvas from '../components/DeckCardCanvas';
import FilterModal from '../components/FilterModal';
import './DeckScreens.css';

// Icons object
const icons = {
    darkness: '/assets/images/icons/darkness.png',
    death: '/assets/images/icons/death.png',
    earth: '/assets/images/icons/earth.png',
    fire: '/assets/images/icons/fire.png',
    gravity: '/assets/images/icons/gravity.png',
    time: '/assets/images/icons/time.png',
    water: '/assets/images/icons/water.png',
    life: '/assets/images/icons/life.png',
    aether: '/assets/images/icons/aether.png',
    air: '/assets/images/icons/air.png',
    entropy: '/assets/images/icons/entropy.png',
    light: '/assets/images/icons/light.png',
};

const DeckEdit = () => {
    const navigate = useNavigate();
    const { deckId } = useParams(); // Extract deckId from URL
    const { state } = useMyContext(); // Get user context
    const [deckName, setDeckName] = useState('');
    const [deckCards, setDeckCards] = useState([]);
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

    const id = state.user._id;

    // Query to get the deck data
    const { loading: deckLoading, error: deckError, data: deckData } = useQuery(GET_DECK, {
        variables: { _id: deckId },
    });

    // Query to get the cards data
    const { loading: cardLoading, error: cardError, data: cardData } = useQuery(GET_CARDS);

    // Mutation for updating the deck
    const [updateDeck, { loading: updateLoading, error: updateError }] = useMutation(UPDATE_DECK);

    // Mutation for removing the deck
    const [removeDeck] = useMutation(REMOVE_DECK);

    useEffect(() => {
        if (!deckLoading && !deckError && deckData) {
            console.log(deckData);
            const { name, element, cards } = deckData.deck;
            setDeckName(name);
            setSelectedMark(element.toLowerCase()); // Default to 'life' if element is undefined
            setDeckCards(cards);
            console.log(selectedMark)
        }
    }, [deckLoading, deckError, deckData]);    

    useEffect(() => {
        if (!cardLoading && !cardError && cardData) {
            setCards(cardData.cards);
            setFilteredCards(cardData.cards);
        }
    }, [cardLoading, cardError, cardData]);    

    const handleCardClick = (card) => {
        setDeckCards(deckCards.filter((c, i) => i !== deckCards.indexOf(card)));
    };

    const handleCardInsertClick = (card) => {
        const cardName = card.name.toLowerCase();
        
        setDeckCards(prevDeckCards => {
            const cardCount = prevDeckCards.filter(c => c._id === card._id).length;
    
            if (prevDeckCards.length === 60) {
                alert("You can only have up to 60 cards in the deck.");
                return prevDeckCards;
            }
    
            if (cardName.includes("pillar") || cardName.includes("pendulum") || cardCount < 6) {
                const updatedDeck = [...prevDeckCards, card];
                updatedDeck.sort((a, b) => 
                    filteredCards.findIndex(c => c._id === a._id) - filteredCards.findIndex(c => c._id === b._id)
                );
                return updatedDeck;
            } else {
                alert("You can only have up to 6 copies of this card in the deck.");
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
            await updateDeck({
                variables: {
                    deckId: deckId,
                    name: deckName,
                    element: selectedMark,
                    cardIds: deckCards.map(card => card._id)
                }
            });
            navigate(`/decks/${deckId}`); // Redirect after successful update
        } catch (err) {
            console.error('Error updating deck:', err);
        }
    };

    const handleDeleteDeck = async () => {
        try {
            await removeDeck({ variables: { deckId } });
            navigate(`/decks/${id}`); // Redirect after successful deletion
            window.location.reload();
        } catch (err) {
            console.error('Error deleting deck:', err);
        }
    };

    const handleMarkSelect = (mark) => {
        setSelectedMark(mark);
        setShowModal(false);
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

    if (deckLoading || cardLoading) return <p>Loading...</p>;
    if (deckError || cardError) return <p>Error: {deckError?.message || cardError?.message}</p>;

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
                            onChange={handleSearch}
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
                    disabled={updateLoading}  // Disable while loading
                >
                    Save Deck
                </button>
                <button 
                    onClick={handleDeleteDeck} 
                    style={{ padding: '10px 20px', backgroundColor: 'red', color: '#fff', border: 'none', cursor: 'pointer' }}
                    disabled={updateLoading}  // Disable while loading
                >
                    Delete Deck
                </button>
            </div>
            {updateError && <p>Error updating deck: {updateError.message}</p>}

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

export default DeckEdit;
