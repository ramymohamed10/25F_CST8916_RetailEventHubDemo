const Product = require('../models/Product');

class ProductService {
    constructor() {
        this.products = [
            new Product('P001', 'Laptop Pro 15', 'High-performance laptop', 1299.99, 'Electronics', 'https://images.unsplash.com/photo-1758612214882-03f8a1d7211f?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=627'),
            new Product('P002', 'Wireless Mouse', 'Ergonomic wireless mouse', 29.99, 'Accessories', 'https://images.unsplash.com/photo-1660491083562-d91a64d6ea9c?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=627'),
            new Product('P003', 'Mechanical Keyboard', 'RGB mechanical keyboard', 149.99, 'Accessories', 'https://images.unsplash.com/photo-1558050032-160f36233a07?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=627'),
            new Product('P004', '27" Monitor', '4K Ultra HD monitor', 399.99, 'Electronics', 'https://images.unsplash.com/photo-1658044552340-42456e3cc071?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=627'),
            new Product('P005', 'USB-C Hub', '7-in-1 USB-C hub', 49.99, 'Accessories', 'https://plus.unsplash.com/premium_photo-1761043248662-42f371ad31b4?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=627'),
            new Product('P006', 'Webcam HD', '1080p HD webcam', 79.99, 'Electronics', 'https://images.unsplash.com/photo-1626581795188-8efb9a00eeec?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=627')
        ];
    }

    getAllProducts() {
        return this.products;
    }

    getProductById(id) {
        return this.products.find(p => p.id === id);
    }
}

module.exports = ProductService;