require('dotenv').config();
const express = require('express');
const session = require('express-session');
const path = require('path');

const homeRoutes = require('./routes/home');
const productsRoutes = require('./routes/products');

const app = express();
const PORT = process.env.PORT || 3000;

// View engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Session
app.use(session({
    secret: process.env.SESSION_SECRET || 'your-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 30 * 60 * 1000 }
}));

// Routes
app.use('/', homeRoutes);
app.use('/products', productsRoutes);

// Error handling
app.use((req, res) => {
    res.status(404).send('Page not found');
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📊 Visit http://localhost:${PORT}/products to see the demo`);
});

process.on('SIGINT', async () => {
    console.log('\n🛑 Shutting down...');
    process.exit(0);
});