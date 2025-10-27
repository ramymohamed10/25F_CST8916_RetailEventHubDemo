// Import the Product model (used to create product objects)
const Product = require('../models/Product');

/* -------------------------------------------------
   ProductService Class
   --------------------
   This service acts like a mini "database" for products.
   It stores a list of sample products and provides 
   functions to access them.
-------------------------------------------------- */
class ProductService {

    // The constructor runs once when the service is created.
    // Here, we create a list of sample products for demo purposes.
    constructor() {
        this.products = [
            // Each product is an instance of the Product model
            new Product(
                'P001',
                'Laptop Pro 15',
                'High-performance laptop',
                1299.99,
                'Electronics',
                'https://images.unsplash.com/photo-1758612214882-03f8a1d7211f?auto=format&fit=crop&q=80&w=627'
            ),
            new Product(
                'P002',
                'Wireless Mouse',
                'Ergonomic wireless mouse',
                29.99,
                'Accessories',
                'https://images.unsplash.com/photo-1660491083562-d91a64d6ea9c?auto=format&fit=crop&q=80&w=627'
            ),
            new Product(
                'P003',
                'Mechanical Keyboard',
                'RGB mechanical keyboard',
                149.99,
                'Accessories',
                'https://images.unsplash.com/photo-1558050032-160f36233a07?auto=format&fit=crop&q=80&w=627'
            ),
            new Product(
                'P004',
                '27" Monitor',
                '4K Ultra HD monitor',
                399.99,
                'Electronics',
                'https://images.unsplash.com/photo-1658044552340-42456e3cc071?auto=format&fit=crop&q=80&w=627'
            ),
            new Product(
                'P005',
                'USB-C Hub',
                '7-in-1 USB-C hub',
                49.99,
                'Accessories',
                'https://plus.unsplash.com/premium_photo-1761043248662-42f371ad31b4?auto=format&fit=crop&q=80&w=627'
            ),
            new Product(
                'P006',
                'Webcam HD',
                '1080p HD webcam',
                79.99,
                'Electronics',
                'https://images.unsplash.com/photo-1626581795188-8efb9a00eeec?auto=format&fit=crop&q=80&w=627'
            )
        ];
    }

    /* -------------------------------------------------
       getAllProducts()
       ----------------
       Returns the full list of products.
       Used to display all products on the store page.
    -------------------------------------------------- */
    getAllProducts() {
        return this.products;
    }

    /* -------------------------------------------------
       getProductById(id)
       ------------------
       Finds and returns a single product by its ID.
       Used to show details for one product.
       If no match is found, it returns undefined.
    -------------------------------------------------- */
    getProductById(id) {
        return this.products.find(p => p.id === id);
    }
}

// Export the ProductService class so other files can use it
module.exports = ProductService;
