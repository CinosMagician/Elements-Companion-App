import React from 'react';
import PropTypes from 'prop-types';

// Import all icons here
import iconFire from '../assets/icons/firesmall.png';
import iconLife from '../assets/icons/lifesmall.png';
import iconAether from '../assets/icons/aethersmall.png';
import iconLight from '../assets/icons/lightsmall.png';
// Import other icons as needed

const icons = {
    firesmall: iconFire,
    lifesmall: iconLife,
    aethersmall: iconAether,
    lightsmall: iconLight,
    // Add other icons to the mapping
};

const TextWithIcons = ({ text, hasFlavourText, style }) => {
    // Function to replace [icon:name] with actual icon images
    const getTextWithIcons = () => {
        const iconRegex = /\[icon:([^\]]+)\]/g;
        const parts = [];
        let lastIndex = 0;

        text.replace(iconRegex, (match, iconName, index) => {
            if (index > lastIndex) {
                parts.push(text.substring(lastIndex, index));
            }
            if (icons[iconName]) {
                parts.push(<img key={index} src={icons[iconName]} alt={iconName} style={style.icon} />);
            }
            lastIndex = index + match.length;
            return match;
        });

        if (lastIndex < text.length) {
            parts.push(text.substring(lastIndex));
        }

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
        label: PropTypes.object, // Add style for the label
    }),
};

TextWithIcons.defaultProps = {
    style: {
        container: {},
        icon: { width: 25, height: 25, verticalAlign: 'middle' },
        label: { fontWeight: 'bold' }, // Default bold styling for the label
    },
};

export default TextWithIcons;
