import React, { useState } from 'react';
import './MaxHPModal.css'; // Add styling for the modal

const MaxHPModal = ({ isOpen, onClose, onConfirm, maxHP }) => {
    const [newMaxHP, setNewMaxHP] = useState(maxHP);

    const handleConfirm = () => {
        if (newMaxHP >= 1 && newMaxHP <= 999) {
            onConfirm(newMaxHP);
            onClose();
        } else {
            alert('Max HP must be between 1 and 999.');
        }
    };

    return isOpen ? (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Change Max HP</h2>
                <input
                    type="number"
                    value={newMaxHP}
                    onChange={(e) => setNewMaxHP(Number(e.target.value))}
                    min="1"
                    max="999"
                />
                <button onClick={handleConfirm}>Confirm</button>
                <button onClick={onClose}>Cancel</button>
            </div>
        </div>
    ) : null;
};

export default MaxHPModal;