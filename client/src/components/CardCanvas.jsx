import React, { useEffect, useRef } from 'react';

const CardCanvas = ({ card }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const loadImage = (src) => new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve(img);
            img.onerror = reject;
            img.src = src;
        });

        const drawCard = async () => {
            try {
                const background = await loadImage(card.element === 'none' ? '/assets/images/cardBacks/normal.png' : `/assets/images/cardBacks/${card.element}.png`);
                const cardArt = await loadImage(card.imageUrl);
                const icon = await loadImage(card.element === 'none' ? '/assets/images/icons/normalsmall.png' : `/assets/images/icons/${card.element}small.png`);

                ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
                ctx.drawImage(cardArt, 20, 42, 250, 250);
                ctx.drawImage(icon, 257, 8, 25, 26);

                let textColor = '#FFFFFF'; 
                if (background.src.includes('light')) { 
                    textColor = '#000000';
                }

                ctx.font = '25px Gill Sans';
                ctx.fillStyle = textColor;
                ctx.shadowColor = '#000000';  
                ctx.shadowBlur = 2;          
                ctx.shadowOffsetX = 2;        
                ctx.shadowOffsetY = 2;        
                ctx.fillText(card.name, 10, 28);

                drawTextWithIcons(card.text, ctx, textColor, 25, 330, 275);

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
            } catch (error) {
                console.error('Error loading images:', error);
            }
        };

        drawCard();
    }, [card]);

    const drawTextWithIcons = (text, ctx, textColor, x, y, maxWidth) => {
        const iconSize = 25; 
        const lineHeight = 30; 

        const lines = text.split('\n'); 
        ctx.font = '20px Gill Sans';
        ctx.fillStyle = textColor;

        function countIcons(text) {
            const iconRegex = /\[icon:[^\]]+\]/g; 
            const matches = text.match(iconRegex);
            return matches ? matches.length : 0;
        }

        lines.forEach((line, lineIndex) => {
            let words = line.split(' ');
            let lineText = '';
            let lineY = y + (lineIndex * lineHeight); 
            let xOffset = x;
            let iconCount = countIcons(text);
            let yOffset = iconCount > 2 ? 75 : 45;

            words.forEach((word, wordIndex) => {
                if (word.startsWith('[icon:')) {
                    const iconName = word.slice(6, -1); 
                    const iconImg = new Image();
                    iconImg.src = `/assets/images/icons/${iconName}.png`;

                    const iconPlaceholderWidth = iconSize; 
                    const iconXOffset = xOffset; 

                    xOffset += iconPlaceholderWidth; 

                    iconImg.onload = () => {
                        ctx.drawImage(iconImg, iconXOffset, lineY - yOffset, iconSize, iconSize);
                    };
                    
                    lineText = ' ';
                } else {
                    const testLine = lineText + word + ' ';
                    const metrics = ctx.measureText(testLine);
                    const testWidth = metrics.width;

                    if (testWidth > maxWidth - xOffset) {
                        ctx.fillText(lineText, xOffset, lineY);
                        lineText = word + ' ';
                        lineY += lineHeight; 
                        xOffset = x; 
                    } else {
                        lineText = testLine;
                    }
                }
            });

            ctx.fillText(lineText, xOffset, lineY);
        });
    };

    return (
        <canvas ref={canvasRef} width="289" height="443"></canvas>
    );
};

export default CardCanvas;
