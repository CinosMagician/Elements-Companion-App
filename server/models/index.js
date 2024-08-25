const User = require('./user');
const Card = require('./card');
const Deck = require('./deck');

// In Mongoose, we don't need to explicitly define relationships.
// The relationships are defined within the schema of each model.

module.exports = { User, Card, Deck };