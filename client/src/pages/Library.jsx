import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_CARDS } from "../utils/queries";
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

const Library = () => {
    const { loading: cardLoading, error: cardError, data: cardData } = useQuery(GET_CARDS);
    const [cards, setCards] = useState([]);
    const navigate = useNavigate(); // Initialize the useNavigate hook

    useEffect(() => {
        if (!cardLoading && !cardError && cardData) {
            setCards(cardData.cards); // Assuming cardData.cards is an array of card objects
        }
    }, [cardLoading, cardError, cardData]);

    useEffect(() => {
        if (cards.length > 0) {
            cards.forEach((card, index) => {
                loadCardImages(card, index);
            });
        }
    }, [cards]);

    if (cardLoading) return <p>Loading...</p>;
    if (cardError) return <p>Error loading cards: {cardError.message || 'Unknown error'}</p>;

    function loadCardImages(card, index) {
        const cardCanvas = document.getElementById(`cardCanvas${index}`);
        if (!cardCanvas) {
            console.error('Canvas element not found');
            return;
        }
        const ctx = cardCanvas.getContext('2d');
        if (!ctx) {
            console.error('Canvas context not found');
            return;
        }
    
        const background = new Image();
        const cardArt = new Image();
        const icon = new Image();
    
        const element = card.element.toLowerCase();
        background.src = element === 'none'
            ? '/assets/images/cardBacks/normal.png'
            : `/assets/images/cardBacks/${element}.png`;
        cardArt.src = card.imageUrl;
        icon.src = element === 'none'
            ? '/assets/images/icons/normalsmall.png'
            : `/assets/images/icons/${element}small.png`;
    
        const loadImages = () => {
            return new Promise((resolve, reject) => {
                let imagesLoaded = 0;
                const totalImages = 3;
                const checkIfAllLoaded = () => {
                    imagesLoaded++;
                    if (imagesLoaded === totalImages) resolve();
                };
                background.onload = checkIfAllLoaded;
                cardArt.onload = checkIfAllLoaded;
                icon.onload = checkIfAllLoaded;
                background.onerror = cardArt.onerror = icon.onerror = (error) => {
                    reject(error);
                };
            });
        };
    
        loadImages().then(() => {
            drawCard(card, ctx, background, cardArt, icon);
        }).catch((error) => {
            console.error('Error loading images:', error);
        });
    }
    
    function drawCard(card, ctx, background, cardArt, icon) {
        if (!ctx) {
            console.error('Canvas context is invalid');
            return;
        }
    
        ctx.drawImage(background, 0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.drawImage(cardArt, 50, 50, 150, 150);
        ctx.drawImage(icon, 450, 20, 50, 50);
    
        ctx.font = '30px Arial';
        ctx.fillStyle = '#FFFFFF';
        ctx.fillText(card.name, 50, 230);
    
        ctx.font = '20px Arial';
        ctx.fillStyle = '#FFFFFF';
        ctx.fillText(card.text, 50, 270, 400);
    
        ctx.fillText(`Cost: ${card.cost}`, 50, 350);
    }

    const handleClick = (cardId) => {
        navigate(`/card/${cardId}`); // Navigate to the card detail page
    };

    return (
        <div>
            {cards.map((card, index) => (
                <div key={card.id} onClick={() => handleClick(card.id)}>
                    <canvas id={`cardCanvas${index}`} width="512" height="768"></canvas>
                </div>
            ))}
        </div>
    );
}

export default Library;