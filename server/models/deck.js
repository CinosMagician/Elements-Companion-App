const mongoose = require('mongoose');

// Define the Deck schema
const deckSchema = new mongoose.Schema({
  // Name of the deck
  name: {
    type: String,
    required: true
  },
  // List of cards in the deck
  cards: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Card',
    required: true
  }],
  // Default element of the deck
  element: {
    type: String,
    required: true
  },
  // Reference to the user who created the deck
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  // Ensure the array has at least 30 cards and no more than 60
  validate: {
    validator: function(deck) {
      return deck.cards.length >= 30 && deck.cards.length <= 60;
    },
    message: 'A deck must contain between 30 and 60 cards.'
  }
});

// Create the Deck model from the schema
const Deck = mongoose.model('Deck', deckSchema);

module.exports = Deck;