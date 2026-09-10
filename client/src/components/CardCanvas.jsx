import React, { useEffect, useRef } from 'react';

const localImageTesting = 'http://localhost:3001';
// used to access the images on local testing

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

            const isAbsoluteUrl = /^(https?:)?\/\//i.test(src);
            if (isAbsoluteUrl) {
                img.src = src;
            } else {
                // img.src = import.meta.env.VITE_BACKEND_URL+src;
                img.src = localImageTesting+src; 
                // used for local testing
            }
        });

        function drawIntenseShadowText(ctx, text, x, y, baseColor, shadowColor = "black") {
            ctx.save();

            ctx.fillStyle = shadowColor;

            // Multi-layer shadow for intensity
            for (let i = 1; i <= 3; i++) {
                ctx.shadowColor = shadowColor;
                ctx.shadowBlur = i * 3;
                ctx.shadowOffsetX = 0;
                ctx.shadowOffsetY = 0;

                ctx.fillText(text, x, y);
            }

            // Main text
            ctx.shadowBlur = 0;
            ctx.fillStyle = baseColor;
            ctx.fillText(text, x, y);

            ctx.restore();
        }

        const drawCard = async () => {
            try {
                let lowerCaseElement = card.element.toLowerCase()
                const cardUpped = card.isUpped;
                console.log(card);
                const backgroundSrc = card.element === 'None' ? `/assets/images/cardbacks/${cardUpped ? 'upped' : ''}normal.png` : `/assets/images/cardbacks/${cardUpped ? 'upped' : ''}${lowerCaseElement}.png`;
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
                    elementIcon = await loadImage(card.element === 'None' ? '/assets/images/icons/chromasmall.png' : `/assets/images/icons/${lowerCaseElement}small.png`);
                }

                ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
                ctx.drawImage(cardArt, 20, 42, 250, 250);

                if (elementIcon) {
                    ctx.drawImage(elementIcon, 257, 8, 25, 26);
                }

                if (typeIcon) {
                    ctx.drawImage(typeIcon, 240, 260, 25, 26);
                }

                const textColor = backgroundSrc.includes('light') ? '#FFFFFF' : '#FFFFFF';
                const textTitleColor = cardUpped ? '#000000' : '#FFFFFF';

                // ctx.font = '25px Gill Sans';
                // ctx.fillStyle = textColor;
                // ctx.shadowColor = '#000000';
                // ctx.shadowBlur = 2;
                // ctx.shadowOffsetX = 2;
                // ctx.shadowOffsetY = 2;
                // ctx.fillText(card.name, 10, 28);


                ctx.fillStyle = textTitleColor;
                ctx.font = '22px Verdana';
                ctx.shadowColor = '#000000';
                ctx.letterSpacing = '-1px';
                if (cardUpped) {
                    // Upgraded card → black text, no shadow
                    ctx.shadowBlur = 0;
                    ctx.shadowOffsetX = 0;
                    ctx.shadowOffsetY = 0;
                    ctx.fillText(card.name, 10, 28);
                } else {
                    // Normal card → white text with shadow
                    ctx.shadowBlur = 2;
                    ctx.shadowOffsetX = 2;
                    ctx.shadowOffsetY = 2;
                    ctx.fillText(card.name, 10, 28);
                }
                ctx.shadowColor = '#000000';
                ctx.shadowBlur = 2;
                ctx.shadowOffsetX = 2;
                ctx.shadowOffsetY = 2;

                await drawTextWithIcons(card.text, ctx, textColor, 25, 330, 275);

                if (card.cost && card.cost > 0) {
                    const costX = card.cost > 9 ? 230 : 240;
                    ctx.font = '25px Playfair';
                    ctx.fillStyle = textColor;
                    ctx.fillText(`${card.cost}`, costX, 28);
                    drawIntenseShadowText(ctx, `${card.cost}`, costX, 28, textColor);
                }
                if (card.type === 'Creature') {
                    if (card.attack !== null && card.health !== null) {
                        ctx.font = '25px Playfair';
                        
                        let attackX, attackY, dividerX, dividerY, healthX, healthY;

                        const baseY = 280;

                        // Attack/health positioning
                        if (card.attack >= 10 && card.health < 10) {
                            attackX = 212;
                            dividerX = 240;
                            healthX = 250;
                        } 
                        else if (card.attack < 10 && card.health < 10) {
                            attackX = 220;
                            dividerX = 240;
                            healthX = 250;
                        } 
                        else if (card.attack >= 10 && card.health >= 10) {
                            attackX = 202;
                            dividerX = 232;
                            healthX = 242;
                        } 
                        else { // card.attack < 10 && card.health >= 10
                            attackX = 210;
                            dividerX = 232;
                            healthX = 242;
                        }

                        attackY = baseY;
                        dividerY = baseY +1;
                        healthY = baseY;

                        // Draw values
                        ctx.fillText(`${card.attack}`, attackX, attackY);
                        drawIntenseShadowText(ctx, `${card.attack}`, attackX, attackY, textColor);
                        ctx.fillText('|', dividerX, dividerY);
                        drawIntenseShadowText(ctx, `|`, dividerX, dividerY, textColor);
                        ctx.fillText(`${card.health}`, healthX, healthY);
                        drawIntenseShadowText(ctx, `${card.health}`, healthX, healthY, textColor);
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
        
            ctx.font = card.hasFlavourText ? 'italic 20px "Gill Sans"' : '20px "Gill Sans"';
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

                                ctx.drawImage(iconImg, xOffset - 8, lineY - iconSize + 7, iconSize, iconSize);
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
