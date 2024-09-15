import React from 'react';
import PropTypes from 'prop-types';

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

const TextWithIcons = ({ text, hasFlavourText, style }) => {
    const getTextWithIcons = () => {
        const iconRegex = /\[icon:([^\]]+)\]/g;
        const parts = [];
        let lastIndex = 0;

        // Process the text to find and replace [icon:name] with the corresponding icon
        text.split(iconRegex).forEach((part, index) => {
            if (index % 2 === 0) {
                // Text part
                if (part) {
                    parts.push(<span key={`text-${index}`}>{part}</span>);
                }
            } else {
                // Icon part
                const iconName = part.trim();
                if (icons[iconName]) {
                    parts.push(
                        <img
                            key={`icon-${index}`}
                            src={icons[iconName]}
                            alt={iconName}
                            style={style.icon}
                        />
                    );
                }
            }
        });

        return parts;
    };

    return (
        <div style={style.container}>
            <p style={style.label}>
                <strong>{hasFlavourText ? 'Flavour Text:' : 'Effect:'}</strong>
            </p>
            <p>{getTextWithIcons()}</p>
        </div>
    );
};

TextWithIcons.propTypes = {
    text: PropTypes.string.isRequired,
    hasFlavourText: PropTypes.bool.isRequired,
    style: PropTypes.shape({
        container: PropTypes.object,
        icon: PropTypes.object,
        label: PropTypes.object,
    }),
};

TextWithIcons.defaultProps = {
    style: {
        container: {},
        icon: {
            width: 25,
            height: 25,
            verticalAlign: 'middle',
            filter: 'drop-shadow(2px 2px 2px rgba(0, 0, 0, 0.5))', // Shadow effect
        },
        label: { fontWeight: 'bold' }, // Bold styling for the label
    },
};

export default TextWithIcons;
