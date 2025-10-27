// Import the Express library
const express = require('express');

// Create a new router object
// Routers let us organize our routes (URLs) into separate files
const router = express.Router();

/* ---------------------------
   DEFINE ROUTES
---------------------------- */

// Handle GET requests to the homepage ('/')
// When someone visits http://localhost:3000/,
// this function runs and renders the 'home.ejs' view
router.get('/', (req, res) => {
    res.render('home'); // Render the 'home' view from the 'views' folder
});

/* ---------------------------
   EXPORT THE ROUTER
---------------------------- */
// Export this router so it can be used in the main server file (server.js)
module.exports = router;
