// Load environment variables from the .env file (e.g., PORT, SESSION_SECRET)
require('dotenv').config();

// Import required packages
const express = require('express');               // Web framework for building the server
const session = require('express-session');       // Handles user sessions (like login tracking)
const path = require('path');                     // Helps with file and directory paths

// Import route modules (these files define what happens for specific URLs)
const homeRoutes = require('./routes/home');      // Routes for homepage and related pages
const productsRoutes = require('./routes/products'); // Routes for product-related pages

// Create an Express application
const app = express();

// Set the port number (from .env or default to 3000)
const PORT = process.env.PORT || 3000;

/* ---------------------------
   VIEW ENGINE CONFIGURATION
---------------------------- */
// Set EJS as the view engine (for rendering dynamic HTML)
app.set('view engine', 'ejs');
// Tell Express where to find the view templates (views folder)
app.set('views', path.join(__dirname, 'views'));

/* ---------------------------
   MIDDLEWARE SETUP
---------------------------- */
// Middleware to parse incoming JSON data
app.use(express.json());
// Middleware to parse form data (from POST requests)
app.use(express.urlencoded({ extended: true }));
// Middleware to serve static files (CSS, JS, images) from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

/* ---------------------------
   SESSION CONFIGURATION
---------------------------- */
// Enable sessions for storing data per user (e.g., login state)
app.use(session({
    secret: process.env.SESSION_SECRET || 'your-secret-key', // Used to sign the session ID cookie
    resave: false,               // Don’t save session if it wasn’t modified
    saveUninitialized: true,     // Save new sessions even if not modified yet
    cookie: { maxAge: 30 * 60 * 1000 } // Session expires after 30 minutes
}));

/* ---------------------------
   ROUTES
---------------------------- */
// Use the imported route modules
app.use('/', homeRoutes);            // Handle all routes starting with '/'
app.use('/products', productsRoutes); // Handle all routes starting with '/products'

/* ---------------------------
   ERROR HANDLING
---------------------------- */
// Handle 404 (page not found) errors
app.use((req, res) => {
    res.status(404).send('Page not found');
});

// Handle general server errors (status code 500)
app.use((err, req, res, next) => {
    console.error(err.stack);           // Log the error for debugging
    res.status(500).send('Something went wrong!');
});

/* ---------------------------
   START THE SERVER
---------------------------- */
// Start listening for incoming requests
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📊 Visit http://localhost:${PORT}/products to see the demo`);
});

/* ---------------------------
   GRACEFUL SHUTDOWN
---------------------------- */
// Handle shutdown signal (e.g., Ctrl + C)
process.on('SIGINT', async () => {
    console.log('\n🛑 Shutting down...');
    process.exit(0);
});
