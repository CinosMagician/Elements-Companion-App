const mongoose = require("mongoose");

// Define the event schema
const cardSchema = new mongoose.Schema({
  // Name of the card
  name: {
    type: String,
    required: true,
  },
  // for the text displayed at the bottom of the card, used for effects, but can use flavour text for vanilla cards (flav text in Italics)
  text: {
    type: String,
    required: true,
  },
  hasFlavourText: {
    type: Boolean,
    required: true,
  },
  imageUrl: {
    type: String,
    required: false,
  },
  // determines the card element (cardback and cost type)
  element: {
    type: String,
    required: true,
  },
  // how much quanta it costs to play
  cost: {
    type: Number,
    required: true,
  },
  // Determine the card's type, creature, permanent or spell.
  type: {
    type: String,
    required: true,
  },
  //   if a creature, how much attack
  attack: {
    type: Number,
    required: false,
  },
  //   if a creature, how much health.
  health: {
    type: Number,
    required: false,
  },
});

// Create the Card model from the schema
const Card = mongoose.model("Card", cardSchema);

module.exports = Card;
