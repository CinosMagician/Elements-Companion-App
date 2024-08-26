const mongoose = require('mongoose');
const Card = require('../models/card');  // Adjust the path as necessary

// Define the card data
const cardData = [
  {
    name: 'Empathic Bond',
    text: 'Every creature in your possession heals you for 1 HP at the end of every turn',
    hasFlavourText: false,
    imageUrl: '/assets/images/cardArt/empathicbonds.png',
    element: 'Life',
    cost: 5,
    type: 'Permanent'
  },
  {
    name: "Fractal",
    text: "Fill your hand with copies of the target creature's card. All the remaining aether quanta is consumed.",
    hasFlavourText: false,
    imageUrl: '/assets/images/cardArt/fractal.png',
    element: 'Aether',
    cost: 10,
    type: 'Spell'
  },
  {
    name: 'Seraph',
    text: '[icon:lightsmall] : Divine shield. Seraph can not be targeted for 1 turn.',
    hasFlavourText: false,
    imageUrl: '/assets/images/cardArt/seraph.png',
    element: 'Fire',
    cost: 9,
    type: 'Creature',
    attack: 10,
    health: 1
  },
  // Add more cards as needed
];

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/elementsthegame', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const seedCards = async () => {
  try {
    // Clear the existing cards
    await Card.deleteMany({});
    console.log('Old card data removed.');

    // Insert the new card data
    await Card.insertMany(cardData);
    console.log('New card data seeded.');

    // Close the connection
    mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding card data:', error);
    mongoose.connection.close();
  }
};

seedCards();
