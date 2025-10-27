// Import the Express library
const express = require('express');

// Create a new router instance for handling product-related routes
const router = express.Router();

// Import required services and models
const ProductService = require('../services/productService');   // Handles product data (e.g., list, find by ID)
const EventHubService = require('../services/eventHubService'); // Sends events to Azure Event Hub
const UserEvent = require('../models/UserEvent');               // Represents a user activity event (like view or purchase)

// Create instances of the services
const productService = new ProductService();
const eventHubService = new EventHubService();

/* -------------------------------------------------
   Helper Function: Get or Create a Unique User ID
-------------------------------------------------- */
// This function checks if the user's session already has a userId.
// If not, it generates one using the 'uuid' library.
// This helps us track user actions anonymously.
function getOrCreateUserId(session) {
    if (!session.userId) {
        session.userId = require('uuid').v4(); // Generate a unique ID
    }
    return session.userId;
}

/* -------------------------------------------------
   ROUTE 1: List all products (GET /products)
-------------------------------------------------- */
router.get('/', async (req, res) => {
    try {
        // Get all products from the ProductService
        const products = productService.getAllProducts();

        // Get or create a user ID for event tracking
        const userId = getOrCreateUserId(req.session);

        // Create a new "PageView" event object
        const pageViewEvent = new UserEvent(
            'PageView',           // Type of event
            userId,               // Unique user ID
            'All',                // Product ID (here it's "All" since viewing all products)
            'Product Listing Page', // Product name or page name
            0,                    // Price (0 because it's not a product)
            req.session.id        // Session ID
        );

        // Send this event to Azure Event Hub
        await eventHubService.sendEvent(pageViewEvent);

        // Render the products page (views/products/index.ejs)
        // Pass the product list and any session message to the template
        res.render('products/index', {
            products,
            message: req.session.message
        });

        // Clear the session message after displaying it once
        delete req.session.message;
    } catch (error) {
        console.error('Error loading products:', error);
        res.status(500).send('Error loading products');
    }
});

/* -------------------------------------------------
   ROUTE 2: View product details (GET /products/:id)
-------------------------------------------------- */
router.get('/:id', async (req, res) => {
    try {
        // Find a product by its ID (from the URL parameter)
        const product = productService.getProductById(req.params.id);

        // If product doesn’t exist, send a 404 error
        if (!product) {
            return res.status(404).send('Product not found');
        }

        // Get or create user ID
        const userId = getOrCreateUserId(req.session);

        // Create a "ProductView" event (user viewed a product)
        const viewEvent = new UserEvent(
            'ProductView',
            userId,
            product.id,
            product.name,
            product.price,
            req.session.id
        );

        // Send this event to Event Hub
        await eventHubService.sendEvent(viewEvent);

        // Render the product details page (views/products/details.ejs)
        res.render('products/details', { product });
    } catch (error) {
        console.error('Error loading product:', error);
        res.status(500).send('Error loading product');
    }
});

/* -------------------------------------------------
   ROUTE 3: Add a product to the cart (POST /products/:id/addToCart)
-------------------------------------------------- */
router.post('/:id/addToCart', async (req, res) => {
    try {
        // Find the product by ID
        const product = productService.getProductById(req.params.id);

        // If product doesn’t exist, send a 404 error
        if (!product) {
            return res.status(404).send('Product not found');
        }

        // Get or create user ID
        const userId = getOrCreateUserId(req.session);

        // Create an "AddToCart" event
        const cartEvent = new UserEvent(
            'AddToCart',
            userId,
            product.id,
            product.name,
            product.price,
            req.session.id
        );

        // Send this event to Event Hub
        await eventHubService.sendEvent(cartEvent);

        // Set a success message to show on the next page
        req.session.message = `${product.name} added to cart!`;

        // Redirect back to the products page
        res.redirect('/products');
    } catch (error) {
        console.error('Error adding to cart:', error);
        res.status(500).send('Error adding to cart');
    }
});

/* -------------------------------------------------
   ROUTE 4: Purchase a product (POST /products/:id/purchase)
-------------------------------------------------- */
router.post('/:id/purchase', async (req, res) => {
    try {
        // Find the product by ID
        const product = productService.getProductById(req.params.id);

        // If product doesn’t exist, send a 404 error
        if (!product) {
            return res.status(404).send('Product not found');
        }

        // Get or create user ID
        const userId = getOrCreateUserId(req.session);

        // Create a "Purchase" event
        const purchaseEvent = new UserEvent(
            'Purchase',
            userId,
            product.id,
            product.name,
            product.price,
            req.session.id
        );

        // Send this event to Event Hub
        await eventHubService.sendEvent(purchaseEvent);

        // Set a success message for the user
        req.session.message = `Successfully purchased ${product.name}!`;

        // Redirect back to the product listing
        res.redirect('/products');
    } catch (error) {
        console.error('Error processing purchase:', error);
        res.status(500).send('Error processing purchase');
    }
});

/* -------------------------------------------------
   EXPORT ROUTER
-------------------------------------------------- */
// Export this router so it can be used in app.js
module.exports = router;
