import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import './Library.css'; // Import CSS file for styling

const HardLibrary = () => {
    const navigate = useNavigate(); // Initialize the useNavigate hook

    // Hardcoded card data for testing
    const [cards] = useState([
        // Original cards
        { id: 1, name: 'Empathic Bond', text: 'Every creature in your possession heals you for 1 HP at the end of every turn', hasFlavourText: false, imageUrl: '/assets/images/cardArt/empathicbonds.png', element: 'Life', cost: 5, type: 'Permanent' },
        { id: 2, name: 'Fractal', text: "Fill your hand with copies of the target creature's card. All the remaining aether quanta is consumed.", hasFlavourText: false, imageUrl: '/assets/images/cardArt/fractal.png', element: 'Aether', cost: 10, type: 'Spell' },
        { id: 3, name: 'Seraph', text: '[icon:lightsmall] : Divine shield. Seraph can not be targeted for 1 turn.', hasFlavourText: false, imageUrl: '/assets/images/cardArt/seraph.png', element: 'Fire', cost: 9, type: 'Creature', attack: 10, health: 1 },
    
        // Repeated cards with new IDs
        { id: 4, name: 'Empathic Bond', text: 'Every creature in your possession heals you for 1 HP at the end of every turn', hasFlavourText: false, imageUrl: '/assets/images/cardArt/empathicbonds.png', element: 'Life', cost: 5, type: 'Permanent' },
        { id: 5, name: 'Fractal', text: "Fill your hand with copies of the target creature's card. All the remaining aether quanta is consumed.", hasFlavourText: false, imageUrl: '/assets/images/cardArt/fractal.png', element: 'Aether', cost: 10, type: 'Spell' },
        { id: 6, name: 'Seraph', text: '[icon:lightsmall] : Divine shield. Seraph can not be targeted for 1 turn.', hasFlavourText: false, imageUrl: '/assets/images/cardArt/seraph.png', element: 'Fire', cost: 9, type: 'Creature', attack: 10, health: 1 },
    
        { id: 7, name: 'Empathic Bond', text: 'Every creature in your possession heals you for 1 HP at the end of every turn', hasFlavourText: false, imageUrl: '/assets/images/cardArt/empathicbonds.png', element: 'Life', cost: 5, type: 'Permanent' },
        { id: 8, name: 'Fractal', text: "Fill your hand with copies of the target creature's card. All the remaining aether quanta is consumed.", hasFlavourText: false, imageUrl: '/assets/images/cardArt/fractal.png', element: 'Aether', cost: 10, type: 'Spell' },
        { id: 9, name: 'Seraph', text: '[icon:lightsmall] : Divine shield. Seraph can not be targeted for 1 turn.', hasFlavourText: false, imageUrl: '/assets/images/cardArt/seraph.png', element: 'Fire', cost: 9, type: 'Creature', attack: 10, health: 1 },
    
        { id: 10, name: 'Empathic Bond', text: 'Every creature in your possession heals you for 1 HP at the end of every turn', hasFlavourText: false, imageUrl: '/assets/images/cardArt/empathicbonds.png', element: 'Life', cost: 5, type: 'Permanent' },
        { id: 11, name: 'Fractal', text: "Fill your hand with copies of the target creature's card. All the remaining aether quanta is consumed.", hasFlavourText: false, imageUrl: '/assets/images/cardArt/fractal.png', element: 'Aether', cost: 10, type: 'Spell' },
        { id: 12, name: 'Seraph', text: '[icon:lightsmall] : Divine shield. Seraph can not be targeted for 1 turn.', hasFlavourText: false, imageUrl: '/assets/images/cardArt/seraph.png', element: 'Fire', cost: 9, type: 'Creature', attack: 10, health: 1 },
    
        { id: 13, name: 'Empathic Bond', text: 'Every creature in your possession heals you for 1 HP at the end of every turn', hasFlavourText: false, imageUrl: '/assets/images/cardArt/empathicbonds.png', element: 'Life', cost: 5, type: 'Permanent' },
        { id: 14, name: 'Fractal', text: "Fill your hand with copies of the target creature's card. All the remaining aether quanta is consumed.", hasFlavourText: false, imageUrl: '/assets/images/cardArt/fractal.png', element: 'Aether', cost: 10, type: 'Spell' },
        { id: 15, name: 'Seraph', text: '[icon:lightsmall] : Divine shield. Seraph can not be targeted for 1 turn.', hasFlavourText: false, imageUrl: '/assets/images/cardArt/seraph.png', element: 'Fire', cost: 9, type: 'Creature', attack: 10, health: 1 },
    
        { id: 16, name: 'Empathic Bond', text: 'Every creature in your possession heals you for 1 HP at the end of every turn', hasFlavourText: false, imageUrl: '/assets/images/cardArt/empathicbonds.png', element: 'Life', cost: 5, type: 'Permanent' },
        { id: 17, name: 'Fractal', text: "Fill your hand with copies of the target creature's card. All the remaining aether quanta is consumed.", hasFlavourText: false, imageUrl: '/assets/images/cardArt/fractal.png', element: 'Aether', cost: 10, type: 'Spell' },
        { id: 18, name: 'Seraph', text: '[icon:lightsmall] : Divine shield. Seraph can not be targeted for 1 turn.', hasFlavourText: false, imageUrl: '/assets/images/cardArt/seraph.png', element: 'Fire', cost: 9, type: 'Creature', attack: 10, health: 1 },
    
        { id: 19, name: 'Empathic Bond', text: 'Every creature in your possession heals you for 1 HP at the end of every turn', hasFlavourText: false, imageUrl: '/assets/images/cardArt/empathicbonds.png', element: 'Life', cost: 5, type: 'Permanent' },
        { id: 20, name: 'Fractal', text: "Fill your hand with copies of the target creature's card. All the remaining aether quanta is consumed.", hasFlavourText: false, imageUrl: '/assets/images/cardArt/fractal.png', element: 'Aether', cost: 10, type: 'Spell' },
        { id: 21, name: 'Seraph', text: '[icon:lightsmall] : Divine shield. Seraph can not be targeted for 1 turn.', hasFlavourText: false, imageUrl: '/assets/images/cardArt/seraph.png', element: 'Fire', cost: 9, type: 'Creature', attack: 10, health: 1 },
    
        { id: 22, name: 'Empathic Bond', text: 'Every creature in your possession heals you for 1 HP at the end of every turn', hasFlavourText: false, imageUrl: '/assets/images/cardArt/empathicbonds.png', element: 'Life', cost: 5, type: 'Permanent' },
        { id: 23, name: 'Fractal', text: "Fill your hand with copies of the target creature's card. All the remaining aether quanta is consumed.", hasFlavourText: false, imageUrl: '/assets/images/cardArt/fractal.png', element: 'Aether', cost: 10, type: 'Spell' },
        { id: 24, name: 'Seraph', text: '[icon:lightsmall] : Divine shield. Seraph can not be targeted for 1 turn.', hasFlavourText: false, imageUrl: '/assets/images/cardArt/seraph.png', element: 'Fire', cost: 9, type: 'Creature', attack: 10, health: 1 },
    ]);
    

    useEffect(() => {
        if (cards.length > 0) {
            cards.forEach((card, index) => {
                loadCardImages(card, index);
            });
        }
    }, [cards]);

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
                console.log('Background Image URL:', background.src);
                console.log('Card Art URL:', cardArt.src);
                console.log('Icon URL:', icon.src);
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


        function drawTextWithIcons(text, x, y, maxWidth) {
            const iconSize = 25; // Size of the icon
            const lineHeight = 30; // Height of each line
        
            const lines = text.split('\n'); // Split text by new lines
            ctx.font = '20px Gill Sans';
            ctx.fillStyle = textColor;

            function countIcons(text) {
                const iconRegex = /\[icon:[^\]]+\]/g; // Regular expression to match [icon:name]
                const matches = text.match(iconRegex);
                return matches ? matches.length : 0;
            }
        
            lines.forEach((line, lineIndex) => {
                let words = line.split(' ');
                let lineText = '';
                let lineY = y + (lineIndex * lineHeight); // Adjust line height if needed
                let xOffset = x;
                let iconCount = countIcons(card.text);
                let yOffset = 0;

                if (iconCount > 2) {
                    yOffset = 75;
                } else {
                    yOffset = 45;
                };
        
                words.forEach((word, wordIndex) => {
                    if (word.startsWith('[icon:')) {
                        // Handle icon placeholder
                        const iconName = word.slice(6, -1); // Extract icon name
                        const iconImg = new Image();
                        iconImg.src = `/assets/images/icons/${iconName}.png`;
        
                        // Draw icon after placeholder text
                        const iconPlaceholderWidth = iconSize; // Add a bit of extra space for padding
                        const iconXOffset = xOffset; // Save xOffset for the icon
        
                        xOffset += iconPlaceholderWidth; // Move xOffset to account for icon space
        
                        // Draw the icon
                        iconImg.onload = () => {
                            ctx.drawImage(iconImg, iconXOffset, lineY - (yOffset), iconSize, iconSize);
                        };
                        
                        // Reset lineText for next text after icon
                        lineText = ' ';
                    } else {
                        // Accumulate text
                        const testLine = lineText + word + ' ';
                        const metrics = ctx.measureText(testLine);
                        const testWidth = metrics.width;
        
                        if (testWidth > maxWidth - xOffset) {
                            // If the text exceeds maxWidth, draw current text and start a new line
                            ctx.fillText(lineText, xOffset, lineY);
                            lineText = word + ' ';
                            lineY += lineHeight; // Move to next line
                            xOffset = x; // Reset xOffset for new line
                        } else {
                            lineText = testLine;
                        }
                    }
                });
        
                // Draw remaining text in the line after processing all words
                ctx.fillText(lineText, xOffset, lineY);
            });
        }
        
              
        

        ctx.drawImage(background, 0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.drawImage(cardArt, 20, 42, 250, 250);
        ctx.drawImage(icon, 257, 8, 25, 26);

        let textColor = '#FFFFFF'; // Default to white
        if (background.src.includes('light')) { // Example condition for light backgrounds
            textColor = '#000000'; // Use black text
        }

        ctx.font = '25px Gill Sans';
        ctx.fillStyle = textColor;
        ctx.shadowColor = '#000000';  // Shadow color
        ctx.shadowBlur = 2;          // Shadow blur radius
        ctx.shadowOffsetX = 2;        // Horizontal shadow offset
        ctx.shadowOffsetY = 2;        // Vertical shadow offset
        ctx.fillText(card.name, 10, 28);

        drawTextWithIcons(card.text, 25, 330, 275);

        let costX = card.cost > 9 ? 230 : 240;
        ctx.font = '20px Gill Sans';
        ctx.fillStyle = textColor;
        ctx.fillText(`${card.cost}`, costX, 28);

        if (card.attack && card.health) {
            ctx.font = '22px Gill Sans';
            ctx.fillText(`${card.attack}`, 220, 280);
            ctx.fillText(`|`, 248, 278);
            ctx.fillText(`${card.health}`, 255, 280);
        }
    }

    const handleClick = (cardId) => {
        navigate(`/card/${cardId}`); // Navigate to the card detail page
    };



    return (
        <div className="card-grid">
            {cards.map((card, index) => (
                <div key={card.id} className="card" onClick={() => handleClick(card.id)}>
                    <canvas id={`cardCanvas${index}`} width="289" height="443"></canvas>
                </div>
            ))}
        </div>
    );
}

export default HardLibrary;
