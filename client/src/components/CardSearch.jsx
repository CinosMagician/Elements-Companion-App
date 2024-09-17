import React, { useState } from 'react';
import DeckCardCanvas from './DeckCardCanvas';

const CardSearch = ({ cards, onSelect }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const cardsPerPage = 9; // 3x3 grid

    // Filter cards to match search term and criteria
    const filteredCards = cards
        .filter((card) => card.type === 'Creature') // Assuming 'type' field indicates creature
        .filter((card) => card.isToken !== true)
        .filter((card) => card.name.toLowerCase().includes(searchTerm.toLowerCase()));

    // Calculate pagination
    const totalPages = Math.ceil(filteredCards.length / cardsPerPage);
    const startIndex = (currentPage - 1) * cardsPerPage;
    const currentCards = filteredCards.slice(startIndex, startIndex + cardsPerPage);

    // Handle card selection
    const handleCardSelect = (card) => {
        onSelect(card); // Pass the selected card to the parent component
    };

    // Handle page change
    const goToPreviousPage = () => {
        setCurrentPage((prev) => Math.max(prev - 1, 1));
    };

    const goToNextPage = () => {
        setCurrentPage((prev) => Math.min(prev + 1, totalPages));
    };

    return (
        <div>
            <h2>Search Creature</h2>
            <input 
                type="text" 
                value={searchTerm} 
                onChange={(e) => setSearchTerm(e.target.value)} 
                placeholder="Search for a creature..."
            />

            <div className="card-grid-deck">
                {currentCards.map((card) => (
                    <div
                        key={card._id}
                        className="card-deck"
                        onClick={() => handleCardSelect(card)}
                    >
                        <DeckCardCanvas card={card} />
                    </div>
                ))}
            </div>

            <div className="pagination-controls">
                <button onClick={goToPreviousPage} disabled={currentPage === 1}>
                    Previous
                </button>
                <span>Page {currentPage} of {totalPages}</span>
                <button onClick={goToNextPage} disabled={currentPage === totalPages}>
                    Next
                </button>
            </div>
        </div>
    );
};

export default CardSearch;