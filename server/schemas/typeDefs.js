const { gql } = require('graphql-tag');

const typeDefs = gql`
  type User {
    _id: ID!    
    username: String!    
    decks: [Deck]
  }

  type Deck {
    _id: ID!                 # Unique identifier for the deck
    name: String!            # Name of the deck
    cards: [Card]!           # List of cards in the deck
    element: String!         # Default element of the deck
    user: User!              # User who created the deck
  }

  type Card {
    _id: ID!                 # Unique identifier for the card
    name: String!            # Name of the card
    text: String!            # Text displayed on the card
    hasFlavourText: Boolean! # Indicates if the card has flavor text
    isToken: Boolean         # Checks if card is playable in main deck
    imageUrl: String         # Card art image
    element: String!         # Element of the card
    cost: Int               # Cost to play the card
    type: String!            # Type of the card (creature, permanent, spell)
    attack: Int              # Attack value, if applicable
    health: Int              # Health value, if applicable
  }

  type Auth {
    token: ID!               
    user: User               
  }

  # Query type defines all the available queries
  type Query {
    me: User                 
    users: [User]            
    user(username: String!): User
    userID(_id: ID!) : User
    decks(userId: ID!): [Deck]            # Get all decks
    deck(_id: ID!): Deck     # Get a deck by ID
    cards: [Card]            # Get all cards
    card(_id: ID!): Card     # Get a card by ID
  }

  # Mutation type defines all the available mutations
  type Mutation {
    addUser(username: String!, password: String!): Auth 
    login(username: String!, password: String!): Auth 
    addDeck(name: String!, userId: ID!, element: String!, cardIds: [ID!]!): Deck
    updateDeck(deckId: ID!, name: String!, element: String!, cards: [ID!]): Deck # Mutation to update a deck
    removeDeck(deckId: ID!): Deck           # Mutation to remove a deck
    addCard(name: String!, text: String!, hasFlavourText: Boolean!, element: String!, cost: Int!, type: String!, attack: Int, health: Int): Card # Mutation to add a card
    updateCard(cardId: ID!, name: String, text: String, hasFlavourText: Boolean, imageUrl: String, element: String, cost: Int, type: String, attack: Int, health: Int): Card # Mutation to update a card
    removeCard(cardId: ID!): Card           # Mutation to remove a card
  }
`;

module.exports = typeDefs;
