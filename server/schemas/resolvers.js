const { GraphQLError } = require('graphql');
const { User, Deck, Card } = require('../models'); // Assuming these models exist in your project
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    // Get the current user
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findById(context.user._id).populate("decks");
      }
      throw new GraphQLError("You need to be logged in!", {
        extensions: { code: "UNAUTHENTICATED" },
      });
    },
    // Get all users
    users: async () => {
      return User.find().populate("decks");
    },
    // Get a user by username
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate("decks");
    },
    // Get all decks
    decks: async () => {
      return Deck.find().populate("user cards");
    },
    // Get a deck by ID
    deck: async (parent, { _id }) => {
      try {
        const deck = await Deck.findById(_id).populate("user cards");
        if (!deck) {
          throw new GraphQLError("Deck not found", {
            extensions: { code: "NOT_FOUND" },
          });
        }
        return deck;
      } catch (error) {
        console.error("Error fetching deck:", error);
        throw new GraphQLError("Error fetching deck", {
          extensions: { code: "INTERNAL_SERVER_ERROR" },
        });
      }
    },
    // Get all cards
    cards: async () => {
      return Card.find();
    },
    // Get a card by ID
    card: async (parent, { _id }) => {
      try {
        const card = await Card.findById(_id);
        if (!card) {
          throw new GraphQLError("Card not found", {
            extensions: { code: "NOT_FOUND" },
          });
        }
        return card;
      } catch (error) {
        console.error("Error fetching card:", error);
        throw new GraphQLError("Error fetching card", {
          extensions: { code: "INTERNAL_SERVER_ERROR" },
        });
      }
    },
  },

  Mutation: {
    // Add a new user
    addUser: async (parent, { username, password }) => {
      const user = await User.create({ username, password });
      const token = signToken(user);
      return { token, user };
    },
    // Login a user
    login: async (parent, { username, password }) => {
      const user = await User.findOne({ username });

      if (!user) {
        throw new GraphQLError("No user found with this username", {
          extensions: { code: "UNAUTHENTICATED" },
        });
      }

      const correctPw = await user.checkPassword(password);

      if (!correctPw) {
        throw new GraphQLError("Incorrect credentials", {
          extensions: { code: "UNAUTHENTICATED" },
        });
      }

      const token = signToken(user);

      return { token, user };
    },
    // Add a new deck
    addDeck: async (parent, { name, element, cardIds }, context) => {
      if (context.user) {
        const deck = await Deck.create({
          name,
          element,
          cards: cardIds,
          user: context.user._id,
        });

        await User.findByIdAndUpdate(context.user._id, {
          $push: { decks: deck._id },
        });

        return Deck.findById(deck._id).populate("user cards");
      }
      throw new GraphQLError("You need to be logged in!", {
        extensions: { code: "UNAUTHENTICATED" },
      });
    },
    // Update a deck
    updateDeck: async (parent, { deckId, name, element, cardIds }, context) => {
      if (context.user) {
        const updatedDeck = await Deck.findOneAndUpdate(
          { _id: deckId, user: context.user._id },
          { name, element, cards: cardIds },
          { new: true } // Return the updated document
        ).populate("user cards");

        if (!updatedDeck) {
          throw new GraphQLError("Deck not found or you do not have permission to update it.", {
            extensions: { code: "FORBIDDEN" },
          });
        }

        return updatedDeck;
      }

      throw new GraphQLError("You need to be logged in!", {
        extensions: { code: "UNAUTHENTICATED" },
      });
    },
    // Remove a deck
    removeDeck: async (parent, { deckId }, context) => {
      if (context.user) {
        const deck = await Deck.findOneAndDelete({
          _id: deckId,
          user: context.user._id,
        });

        await User.findByIdAndUpdate(context.user._id, {
          $pull: { decks: deckId },
        });

        return deck;
      }
      throw new GraphQLError("You need to be logged in!", {
        extensions: { code: "UNAUTHENTICATED" },
      });
    },
    // Add a new card
    addCard: async (parent, { name, text, hasFlavourText, element, cost, type, attack, health }, context) => {
      if (context.user) {
        const card = await Card.create({
          name,
          text,
          hasFlavourText,
          element,
          cost,
          type,
          attack,
          health,
        });

        return card;
      }
      throw new GraphQLError("You need to be logged in!", {
        extensions: { code: "UNAUTHENTICATED" },
      });
    },
    // Update a card
    updateCard: async (parent, { cardId, name, text, hasFlavourText, element, cost, type, attack, health }, context) => {
      if (context.user) {
        const updatedCard = await Card.findOneAndUpdate(
          { _id: cardId },
          { name, text, hasFlavourText, element, cost, type, attack, health },
          { new: true } // Return the updated document
        );

        if (!updatedCard) {
          throw new GraphQLError("Card not found.", {
            extensions: { code: "NOT_FOUND" },
          });
        }

        return updatedCard;
      }
      throw new GraphQLError("You need to be logged in!", {
        extensions: { code: "UNAUTHENTICATED" },
      });
    },
    // Remove a card
    removeCard: async (parent, { cardId }, context) => {
      if (context.user) {
        const card = await Card.findOneAndDelete({ _id: cardId });

        if (!card) {
          throw new GraphQLError("Card not found.", {
            extensions: { code: "NOT_FOUND" },
          });
        }

        return card;
      }
      throw new GraphQLError("You need to be logged in!", {
        extensions: { code: "UNAUTHENTICATED" },
      });
    },
  },
};

module.exports = resolvers;