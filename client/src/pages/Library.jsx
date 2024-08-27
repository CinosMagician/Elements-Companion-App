import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_CARDS } from '../utils/queries';
import { useNavigate } from 'react-router-dom';
import CardCanvas from '../components/CardCanvas';
import FilterModal from '../components/FilterModal';
import './Library.css';

const Library = () => {
    const { loading: cardLoading, error: cardError, data: cardData } = useQuery(GET_CARDS);
    const [cards, setCards] = useState([]);
    const [filteredCards, setFilteredCards] = useState([]);
    const [filters, setFilters] = useState({
        element: 'none',
        cost: '',
        type: '',
        attack: '',
        health: '',
    });
    const [showFilterModal, setShowFilterModal] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (!cardLoading && !cardError && cardData) {
            setCards(cardData.cards);
            setFilteredCards(cardData.cards); // Initially, all cards are shown
        }
    }, [cardLoading, cardError, cardData]);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters({
            ...filters,
            [name]: value,
        });
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

    const handleSearch = (e) => {
        const searchQuery = e.target.value.toLowerCase();
        const searchedCards = cards.filter((card) =>
            card.name.toLowerCase().includes(searchQuery)
        );
        setFilteredCards(searchedCards);
    };

    const handleClick = (cardId) => {
        navigate(`/card/${cardId}`);
    };

    if (cardLoading) return <p>Loading...</p>;
    if (cardError) return <p>Error loading cards: {cardError.message || 'Unknown error'}</p>;

    return (
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

            <div className="card-grid">
                {filteredCards.map((card) => (
                    <div
                        key={card._id}
                        className="card"
                        onClick={() => handleClick(card._id)}
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
    );
};

export default Library;
