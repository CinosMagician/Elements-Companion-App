import React from 'react';
import PropTypes from 'prop-types';

// Import all icons here
import iconFire from '../assets/icons/firesmall.png';
import iconLife from '../assets/icons/lifesmall.png';
import iconAether from '../assets/icons/aethersmall.png';
import iconLight from '../assets/icons/lightsmall.png';
import iconWater from '../assets/icons/watersmall.png';
import iconNormal from '../assets/icons/normalsmall.png';
import iconGravity from '../assets/icons/gravitysmall.png';
import iconDeath from '../assets/icons/deathsmall.png';
import iconTime from '../assets/icons/timesmall.png';
import iconEntropy from '../assets/icons/entropysmall.png';
// Import other icons as needed

const icons = {
    firesmall: iconFire,
    lifesmall: iconLife,
    aethersmall: iconAether,
    lightsmall: iconLight,
    watersmall: iconWater,
    normalsmall: iconNormal,
    gravitysmall: iconGravity,
    deathsmall: iconDeath,
    timesmall: iconTime,
    entropysmall: iconEntropy,
    // Add other icons to the mapping
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
