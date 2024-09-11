require('dotenv').config(); // Load environment variables from .env file
const express = require("express");
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const path = require("path");
const { typeDefs, resolvers } = require("./schemas");
const { authMiddleware } = require("./utils/auth");
const db = require("./config/connection");
const cors = require('cors'); // Import CORS middleware

const PORT = process.env.PORT || 3001;
const app = express();

// Create a new Apollo server and pass in schema data
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const startApolloServer = async () => {
  // Start the Apollo Server
  await server.start();

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  // Apply CORS middleware before applying GraphQL middleware
  app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000', // Use environment variable or default to localhost
    methods: 'GET,POST,DELETE,PUT',
    credentials: true,
  }));

  // Apply GraphQL middleware to express server
  app.use(
    "/graphql",
    expressMiddleware(server, {
      context: authMiddleware,
    })
  );

  // Serve static files from the "server/assets" directory
  app.use('/assets', express.static(path.join(__dirname, 'assets')));

  // Serve static files in production
  if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../client/dist")));

    // Catch-all route to serve index.html for any unmatched routes
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "../client/dist/index.html"));
    });
  }

  // Start the Express server
  db.once("open", () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
    });
  });
};

// Call the function to start the server
startApolloServer();