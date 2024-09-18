import React, { useState } from 'react';
import './Modal.css'; // Ensure your CSS file is correctly imported

const RemoveQuantaModal = ({ isOpen, onClose, onConfirm, totalQuanta }) => {
    const [quantity, setQuantity] = useState(1);

    const handleConfirm = () => {
        if (quantity < 1 || quantity > 900) {
            alert('Quantity must be between 1 and 900.');
            return;
        }
        if (quantity > totalQuanta) {
            alert('Not enough quanta to remove.');
            return;
        }
        onConfirm(quantity);
        onClose();
    };

    return isOpen ? (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Remove Random Quanta</h2>
                <p>Total Quanta: {totalQuanta}</p>
                <input
                    type="number"
                    value={quantity}
                    min="1"
                    max="900"
                    onChange={(e) => setQuantity(Number(e.target.value))}
                />
                <button onClick={handleConfirm}>Confirm</button>
                <button onClick={onClose}>Cancel</button>
            </div>
        </div>
    ) : null;
};

export default RemoveQuantaModal;