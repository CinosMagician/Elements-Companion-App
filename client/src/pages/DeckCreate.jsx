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
    const { state, setUser } = useMyContext(); 
    const [deckName, setDeckName] = useState('');
    const [deckCards, setDeckCards] = useState([]); 
    const [selectedMark, setSelectedMark] = useState('life'); 
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

    const [currentPage, setCurrentPage] = useState(1);
    const cardsPerPage = 9; // Display 9 cards per page (3x3 grid)

    const id = state.user.data._id;

    // Mutation for creating a new deck
    const [createDeck, { loading, error }] = useMutation(ADD_DECK);
    const { loading: cardLoading, error: cardError, data: cardData } = useQuery(GET_CARDS);

    useEffect(() => {
        if (!cardLoading && !cardError && cardData) {
            console.log('Raw card data:', cardData.cards);
            const nonTokenCards = cardData.cards.filter(card => card.isToken === false || card.isToken == null);
            console.log('Non-token cards:', nonTokenCards);
            setCards(nonTokenCards);
            setFilteredCards(nonTokenCards); // Initially, all non-token cards are shown
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
            card.name.toLowerCase().includes(searchQuery) && card.isToken !== true // Exclude token cards
        );
        setFilteredCards(searchedCards);
        setCurrentPage(1); // Reset to first page when searching
    };
    

    const handleFilterSubmit = () => {
        const filtered = cards.filter((card) => {
            return (
                card.isToken !== true && // Exclude token cards
                (filters.element === 'none' || card.element === filters.element) &&
                (filters.cost === '' || card.cost === parseInt(filters.cost)) &&
                (filters.type === '' || card.type === filters.type) &&
                (filters.attack === '' || card.attack === parseInt(filters.attack)) &&
                (filters.health === '' || card.health === parseInt(filters.health))
            );
        });
        setFilteredCards(filtered);
        setShowFilterModal(false);
        setCurrentPage(1); // Reset to first page when filtering
    };    

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters({
            ...filters,
            [name]: value,
        });
    };

    // Calculate the current cards to display based on pagination
    const indexOfLastCard = currentPage * cardsPerPage;
    const indexOfFirstCard = indexOfLastCard - cardsPerPage;
    const currentCards = filteredCards.slice(indexOfFirstCard, indexOfLastCard);

    const handleNextPage = () => {
        if (currentPage < Math.ceil(filteredCards.length / cardsPerPage)) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
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
                        {currentCards.map((card) => (
                            <div
                                key={card._id}
                                className="card-deck"
                                onClick={() => handleCardInsertClick(card)}
                            >
                                <CardCanvas card={card} />
                            </div>
                        ))}
                    </div>

                    {/* Filter Modal */}
                    <FilterModal
                        show={showFilterModal}
                        filters={filters}
                        handleFilterChange={handleFilterChange}
                        handleFilterSubmit={handleFilterSubmit}
                        handleClose={() => setShowFilterModal(false)}
                    />
                    
                    {/* Pagination Controls */}
                    <div className="pagination-controls">
                        <button 
                            onClick={handlePrevPage} 
                            disabled={currentPage === 1}
                            style={{ padding: '10px', marginRight: '10px', cursor: 'pointer' }}
                        >
                            Previous
                        </button>
                        <button 
                            onClick={handleNextPage} 
                            disabled={currentPage === Math.ceil(filteredCards.length / cardsPerPage)}
                            style={{ padding: '10px', cursor: 'pointer' }}
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>

            {/* Save Deck Button */}
            <button
                onClick={handleSaveDeck}
                style={{
                    marginTop: '20px',
                    backgroundColor: '#007bff',
                    color: '#fff',
                    padding: '10px 20px',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer'
                }}
            >
                Save Deck
            </button>

            {/* Modal for selecting Mark */}
            {showModal && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 9999
                }}>
                    <div style={{
                        backgroundColor: 'white',
                        padding: '20px',
                        borderRadius: '10px',
                        display: 'grid',
                        gridTemplateColumns: 'repeat(4, 1fr)',
                        gap: '10px',
                        maxWidth: '600px',
                        textAlign: 'center'
                    }}>
                        {Object.entries(icons).map(([key, icon]) => (
                            <div
                                key={key}
                                onClick={() => handleMarkSelect(key)}
                                style={{
                                    cursor: 'pointer',
                                    padding: '10px',
                                    border: selectedMark === key ? '2px solid #007bff' : '2px solid transparent',
                                    borderRadius: '10px'
                                }}
                            >
                                <img src={icon} alt={key} style={{ width: '50px', height: '50px' }} />
                                <p>{key.charAt(0).toUpperCase() + key.slice(1)}</p>
                            </div>
                        ))}
                        <button onClick={() => setShowModal(false)}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DeckCreate;
