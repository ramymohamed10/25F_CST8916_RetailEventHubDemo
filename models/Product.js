/* -------------------------------------------------
   Product Model
   --------------
   This class defines what a "Product" looks like.
   It acts as a blueprint for creating product objects.
-------------------------------------------------- */
class Product {
    // The constructor is a special method that runs
    // whenever we create a new Product using "new Product(...)"
    constructor(id, name, description, price, category, imageUrl) {
        // Unique product ID (e.g., "P001")
        this.id = id;

        // Name of the product (e.g., "Laptop Pro 15")
        this.name = name;

        // Short description of the product
        this.description = description;

        // Price of the product (number, not a string)
        this.price = price;

        // Category to group similar items (e.g., "Electronics")
        this.category = category;

        // Image URL used to display the product picture
        this.imageUrl = imageUrl;
    }
}

/* -------------------------------------------------
   Export this class so other files can use it.
   Example: const Product = require('./models/Product');
-------------------------------------------------- */
module.exports = Product;
