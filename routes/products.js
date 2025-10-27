const express = require('express');
const router = express.Router();
const ProductService = require('../services/productService');
const EventHubService = require('../services/eventHubService');
const UserEvent = require('../models/UserEvent');

const productService = new ProductService();
const eventHubService = new EventHubService();

function getOrCreateUserId(session) {
    if (!session.userId) {
        session.userId = require('uuid').v4();
    }
    return session.userId;
}

// List products
router.get('/', async (req, res) => {
    try {
        const products = productService.getAllProducts();
        const userId = getOrCreateUserId(req.session);

        const pageViewEvent = new UserEvent(
            'PageView',
            userId,
            'All',
            'Product Listing Page',
            0,
            req.session.id
        );

        await eventHubService.sendEvent(pageViewEvent);

        res.render('products/index', {
            products,
            message: req.session.message
        });

        delete req.session.message;
    } catch (error) {
        console.error('Error loading products:', error);
        res.status(500).send('Error loading products');
    }
});

// View product details
router.get('/:id', async (req, res) => {
    try {
        const product = productService.getProductById(req.params.id);

        if (!product) {
            return res.status(404).send('Product not found');
        }

        const userId = getOrCreateUserId(req.session);

        const viewEvent = new UserEvent(
            'ProductView',
            userId,
            product.id,
            product.name,
            product.price,
            req.session.id
        );

        await eventHubService.sendEvent(viewEvent);

        res.render('products/details', { product });
    } catch (error) {
        console.error('Error loading product:', error);
        res.status(500).send('Error loading product');
    }
});

// Add to cart
router.post('/:id/addToCart', async (req, res) => {
    try {
        const product = productService.getProductById(req.params.id);

        if (!product) {
            return res.status(404).send('Product not found');
        }

        const userId = getOrCreateUserId(req.session);

        const cartEvent = new UserEvent(
            'AddToCart',
            userId,
            product.id,
            product.name,
            product.price,
            req.session.id
        );

        await eventHubService.sendEvent(cartEvent);

        req.session.message = `${product.name} added to cart!`;
        res.redirect('/products');
    } catch (error) {
        console.error('Error adding to cart:', error);
        res.status(500).send('Error adding to cart');
    }
});

// Purchase
router.post('/:id/purchase', async (req, res) => {
    try {
        const product = productService.getProductById(req.params.id);

        if (!product) {
            return res.status(404).send('Product not found');
        }

        const userId = getOrCreateUserId(req.session);

        const purchaseEvent = new UserEvent(
            'Purchase',
            userId,
            product.id,
            product.name,
            product.price,
            req.session.id
        );

        await eventHubService.sendEvent(purchaseEvent);

        req.session.message = `Successfully purchased ${product.name}!`;
        res.redirect('/products');
    } catch (error) {
        console.error('Error processing purchase:', error);
        res.status(500).send('Error processing purchase');
    }
});

module.exports = router;