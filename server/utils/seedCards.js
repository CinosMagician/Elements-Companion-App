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
    text: '[icon:lightsmall] : Divine shield.\n Seraph can not be targeted for 1 turn.',
    hasFlavourText: false,
    imageUrl: '/assets/images/cardArt/seraph.png',
    element: 'Fire',
    cost: 9,
    type: 'Creature',
    attack: 10,
    health: 1
  },
  {
    name: 'Water Pillar',
    text: 'Each turn [icon:watersmall] is generated',
    hasFlavourText: false,
    imageUrl: '/assets/images/cardArt/waterpillar.png',
    element: 'Water',
    type: 'Permanent',
  },
  {
    name: 'Shortsword',
    text: 'Weapon: Deal 3 damages at the end of every turn',
    hasFlavourText: false,
    imageUrl: '/assets/images/cardArt/shortsword.png',
    element: 'none',
    cost: 1,
    type: 'Permanent',
  },
  {
    name: 'Catapult',
    text: '[icon:gravitysmall] [icon:gravitysmall] : Sacrifice the target creature and damage your opponent. Larger creatures inflict more damage.',
    hasFlavourText: false,
    imageUrl: '/assets/images/cardArt/catapult.png',
    element: 'Gravity',
    cost: 3,
    type: 'Permanent',
  },
  {
    name: 'Rustler',
    text: '[icon:lightsmall] : Photosynthesis.\n Gain  [icon:lifesmall] [icon:lifesmall] . This skill can be used multiple times per turn.',
    hasFlavourText: false,
    imageUrl: '/assets/images/cardArt/rustler.png',
    element: 'Life',
    cost: 1,
    type: 'Creature',
    attack: 1,
    health: 1
  },
  {
    name: 'Psion',
    text: "Psion's attacks deal spell damage.",
    hasFlavourText: false,
    imageUrl: '/assets/images/cardArt/psion.png',
    element: 'Aether',
    cost: 4,
    type: 'Creature',
    attack: 4,
    health: 4
  },
  {
    name: 'Stone Dragon',
    text: "This mighty dragon of stone is no joke, with its raw power in both its attack and defense.",
    hasFlavourText: true,
    imageUrl: '/assets/images/cardArt/stonedragon.png',
    element: 'Earth',
    cost: 10,
    type: 'Creature',
    attack: 8,
    health: 10
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
