const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/elementsthegame", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000, // Adjust the timeout to prevent long waits
  socketTimeoutMS: 45000, // Set a custom socket timeout (optional)
});

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB successfully!');
});

mongoose.connection.on('error', (err) => {
  console.error('Error connecting to MongoDB:', err.message);
});

module.exports = mongoose.connection;