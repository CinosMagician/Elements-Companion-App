import React, { useEffect, useRef } from 'react';

// const localImageTesting = 'http://localhost:3001';

const DeckCardCanvas = ({ card }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const loadImage = (src) => new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve(img);
            img.onerror = reject;
            // img.src = localImageTesting+src;
            img.src = src;
        });

        const drawCard = async () => {
            try {
                let lowerCaseElement = card.element.toLowerCase()
                const backgroundSrc = '/assets/images/icons/bigframe.png'
                const cardElementFrameSrc = card.element === 'None' ? '/assets/images/icons/normalBanner.png' : `/assets/images/icons/${lowerCaseElement}Banner.png`;
                const background = await loadImage(backgroundSrc);
                const cardElementFrame = await loadImage(cardElementFrameSrc);
                const cardArt = await loadImage(card.imageUrl);                

                ctx.drawImage(cardArt, 0, 0, canvas.width, 176);
                ctx.drawImage(cardElementFrame, 0, 0, canvas.width, 30);
                ctx.drawImage(background, 0, 0, canvas.width, canvas.height);


                const textColor = backgroundSrc.includes('light') ? '#000000' : '#FFFFFF';

                ctx.font = '20px Gill Sans';
                ctx.fillStyle = textColor;
                ctx.shadowColor = '#000000';
                ctx.shadowBlur = 2;
                ctx.shadowOffsetX = 2;
                ctx.shadowOffsetY = 2;
                ctx.fillText(card.name, 5, 22);

            } catch (error) {
                console.error('Error loading images:', error);
            }
        };

        drawCard();
    }, [card]);

    return (
        <canvas ref={canvasRef} width="178" height="178"></canvas>
    );
};

export default DeckCardCanvas;
