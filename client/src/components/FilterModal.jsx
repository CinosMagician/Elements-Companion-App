import React from 'react';
import './FilterModal.css'; // Import the CSS file for the modal

const FilterModal = ({
    show,
    filters,
    handleFilterChange,
    handleFilterSubmit,
    handleClose,
}) => {
    if (!show) return null; // If the modal shouldn't be shown, return null

    return (
      <div className="filter-modal">
        <div className="filter-modal-content">
          <h3>Filters</h3>
          <div className="filter-row">
            <label>Element:</label>
            <select
              name="element"
              value={filters.element}
              onChange={handleFilterChange}
            >
              <option value="none">All</option>
              <option value="None">No Element</option>
              <option value="Darkness">Darkness</option>
              <option value="Death">Death</option>
              <option value="Earth">Earth</option>
              <option value="Fire">Fire</option>
              <option value="Gravity">Gravity</option>
              <option value="Time">Time</option>
              <option value="Water">Water</option>
              <option value="Life">Life</option>
              <option value="Aether">Aether</option>
              <option value="Air">Air</option>
              <option value="Entropy">Entropy</option>
              <option value="Light">Light</option>
            </select>
          </div>
          <div className="filter-row">
            <label>Cost:</label>
            <input
              type="number"
              name="cost"
              value={filters.cost}
              onChange={handleFilterChange}
            />
          </div>
          <div className="filter-row">
            <label>Type:</label>
            <select
              name="type"
              value={filters.type}
              onChange={handleFilterChange}
            >
              <option value="">Any</option>
              <option value="Creature">Creature</option>
              <option value="Spell">Spell</option>
              <option value="Permanent">Permanent</option>
            </select>
          </div>
          <div className="filter-row">
            <label>Attack:</label>
            <input
              type="number"
              name="attack"
              value={filters.attack}
              onChange={handleFilterChange}
            />
          </div>
          <div className="filter-row">
            <label>Health:</label>
            <input
              type="number"
              name="health"
              value={filters.health}
              onChange={handleFilterChange}
            />
          </div>
          <button onClick={handleFilterSubmit}>Apply Filters</button>
          <button onClick={handleClose}>Close</button>
        </div>
      </div>
    );
};

export default FilterModal;