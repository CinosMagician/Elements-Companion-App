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
            img.src = import.meta.env.VITE_BACKEND_URL+src;
        });

        const drawCard = async () => {
            try {
                let lowerCaseElement = card.element.toLowerCase()
                const backgroundSrc = card.element === 'None' ? '/assets/images/cardbacks/normal.png' : `/assets/images/cardbacks/${lowerCaseElement}.png`;
                const background = await loadImage(backgroundSrc);
                const cardArt = await loadImage(card.imageUrl);
                
                let typeIcon = null;
                if (card.type === 'Permanent') {
                    typeIcon = await loadImage('/assets/images/icons/permanent.png');
                } else if (card.type === 'Spell') {
                    typeIcon = await loadImage('/assets/images/icons/spell.png');
                }

                let elementIcon = null;
                if (card.cost && card.cost > 0) {
                    elementIcon = await loadImage(card.element === 'None' ? '/assets/images/icons/normalsmall.png' : `/assets/images/icons/${lowerCaseElement}small.png`);
                }

                ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
                ctx.drawImage(cardArt, 20, 42, 250, 250);

                if (elementIcon) {
                    ctx.drawImage(elementIcon, 257, 8, 25, 26);
                }

                if (typeIcon) {
                    ctx.drawImage(typeIcon, 240, 260, 25, 26);
                }

                const textColor = backgroundSrc.includes('light') ? '#000000' : '#FFFFFF';

                ctx.font = '25px Gill Sans';
                ctx.fillStyle = textColor;
                ctx.shadowColor = '#000000';
                ctx.shadowBlur = 2;
                ctx.shadowOffsetX = 2;
                ctx.shadowOffsetY = 2;
                ctx.fillText(card.name, 10, 28);

                await drawTextWithIcons(card.text, ctx, textColor, 25, 330, 275);

                if (card.cost && card.cost > 0) {
                    const costX = card.cost > 9 ? 230 : 240;
                    ctx.font = '20px Gill Sans';
                    ctx.fillStyle = textColor;
                    ctx.fillText(`${card.cost}`, costX, 28);
                }
                if (card.type === 'Creature') {
                    if (card.attack !== null && card.health !== null) {
                        ctx.font = '22px Gill Sans';
                        if (card.attack > 9) {
                            ctx.fillText(`${card.attack}`, 210, 280);
                            ctx.fillText('|', 240, 278);
                        } else {
                            ctx.fillText(`${card.attack}`, 220, 280);
                        }

                        if (card.health > 9) {
                            ctx.fillText(`${card.health}`, 240, 280);
                            ctx.fillText('|', 235, 278);
                        } else {
                            ctx.fillText(`${card.health}`, 250, 280);
                        }

                        if (card.health < 10 && card.attack < 10) {
                            ctx.fillText('|', 240, 278);
                        }
                    }
                }
            } catch (error) {
                console.error('Error loading images:', error);
            }
        };

        const drawTextWithIcons = async (text, ctx, textColor, x, y, maxWidth) => {
            const iconSize = 25;
            const lineHeight = 30;
            const iconRegex = /\[icon:([^\]]+)\]/g;
            const lines = text.split('\n');
        
            ctx.font = card.hasFlavourText ? '20px Gill Sans Italic' : '20px Gill Sans';
            ctx.fillStyle = textColor;

            for (let lineIndex = 0; lineIndex < lines.length; lineIndex++) {
                let line = lines[lineIndex];
                let lineY = y + (lineIndex * lineHeight);
                let xOffset = x;

                const parts = line.split(iconRegex);

                for (let i = 0; i < parts.length; i++) {
                    if (i % 2 === 0) {
                        const textPart = parts[i];
                        const words = textPart.split(' ');

                        for (let word of words) {
                            const testLine = word + ' ';
                            const metrics = ctx.measureText(testLine);
                            const testWidth = metrics.width;

                            if (xOffset + testWidth > maxWidth) {
                                lineY += lineHeight;
                                xOffset = x;
                            }

                            ctx.fillText(word + ' ', xOffset, lineY);
                            xOffset += testWidth;
                        }
                    } else {
                        const iconName = parts[i].trim();
                        if (iconName) {
                            try {
                                const iconImg = await loadImage(`/assets/images/icons/${iconName}.png`);

                                if (xOffset + iconSize > maxWidth) {
                                    lineY += lineHeight;
                                    xOffset = x;
                                }

                                ctx.drawImage(iconImg, xOffset - 8, lineY - iconSize + 10, iconSize, iconSize);
                                xOffset += iconSize - 8;
                            } catch {
                                // Handle icon loading error if needed
                            }
                        }
                    }
                }
            }
        };

        drawCard();
    }, [card]);

    return (
        <canvas ref={canvasRef} width="289" height="443"></canvas>
    );
};

export default CardCanvas;
