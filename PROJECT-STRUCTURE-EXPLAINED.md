# Project Structure - Beginner's Guide (AI Generated)

## What is Project Structure?

Think of your project like a house. Just like a house has different rooms for different purposes (kitchen for cooking, bedroom for sleeping), your Node.js project has different folders for different types of code.

**Why does this matter?** Keeping code organized makes it easier to:
- 🔍 Find things when you need to change them
- 🐛 Fix bugs faster
- 👥 Work with other developers
- 📚 Understand what each part does

---

## Your Project Overview

```
RetailEventHubDemo/                    ← Your project folder (the house)
├── server.js                          ← Front door (starts everything)
├── package.json                       ← Instruction manual
├── .env.example                       ← Configuration template
├── models/                            ← Data blueprints (what things look like)
├── services/                          ← Workers (do specific jobs)
├── routes/                            ← Traffic controllers (handle requests)
└── views/                             ← What users see (web pages)
```

---

## 📖 File-by-File Explanation

### 🚪 Root Files (In the Main Folder)

#### `server.js` - The Starting Point
**What it is:** The main file that starts your application

**Think of it as:** The front door to your house - everything starts here

**What it does:**
- Starts the web server
- Connects all the pieces together
- Says "I'm ready to receive visitors!"

**When you need it:**
- Starting your app: `node server.js` or `npm start`
- This file runs first and sets up everything

---

#### `package.json` - The Instruction Manual
**What it is:** A file that lists all the tools (packages) your project needs

**Think of it as:** A shopping list for your project

**What's inside:**
```json
{
  "name": "retail-eventhub-demo",
  "dependencies": {
    "express": "^4.18.2",        ← Web server
    "ejs": "^3.1.9",             ← Template engine
    "@azure/event-hubs": "^5.11.0" ← Azure connection
  },
  "scripts": {
    "start": "node server.js"    ← What happens when you type 'npm start'
  }
}
```

**When you need it:**
- Running `npm install` reads this file and downloads everything listed
- Adding new packages: `npm install package-name` updates this file

**Tip:** This file is created automatically. You rarely edit it directly!

---

#### `.env.example` - Configuration Template
**What it is:** A template showing what secrets your app needs

**Think of it as:** A form with blank spaces to fill in

**What's inside:**
```env
EVENTHUB_CONNECTION_STRING=your-connection-string-here
EVENTHUB_NAME=retail-events
```

**How to use it:**
1. Copy it: `cp .env.example .env`
2. Fill in your Azure connection string
3. Don't share the `.env` file (it has secrets!)

**Tip:** The `.env.example` goes in Git, but `.env` doesn't (it's in `.gitignore`)

---

### 📦 `models/` Folder - Data Blueprints

**What it is:** Defines what your data looks like

**Think of it as:** Cookie cutters - they define the shape of things

#### `models/UserEvent.js`
**What it does:** Defines what an "event" looks like

**Example:**
```javascript
// When a user views a product, we create an event:
const event = new UserEvent(
  'ProductView',      // What happened
  'user-123',         // Who did it
  'P001',            // Which product
  'Laptop Pro 15',   // Product name
  1299.99            // Price
);

// Result: A structured piece of data we can send to Azure
```

**Real-world analogy:** Like a form at the doctor's office - every event has the same fields

---

#### `models/Product.js`
**What it does:** Defines what a "product" looks like

**Example:**
```javascript
// Every product has these properties:
const laptop = new Product(
  'P001',                    // ID
  'Laptop Pro 15',           // Name
  'High-performance laptop', // Description
  1299.99,                   // Price
  'Electronics',             // Category
  'https://image-url.jpg'    // Image
);
```

**Real-world analogy:** Like a product label - every item has the same info

**Tip:** Think of models as "templates" for your data

---

### ⚙️ `services/` Folder - The Workers

**What it is:** Code that does specific jobs

**Think of it as:** Helper workers in your house - cook, cleaner, delivery person

#### `services/eventHubService.js`
**What it does:** Sends events to Azure Event Hubs

**Think of it as:** A mail carrier who delivers messages to Azure

**When it's used:**
```javascript
// Someone views a product
const event = new UserEvent(...);

// Send it to Azure!
await eventHubService.sendEvent(event);
// 📤 Event is now on its way to Azure
```

**Real-world analogy:** Like dropping a letter in a mailbox

**Tip:** This is the MOST IMPORTANT file for Azure integration!

---

#### `services/productService.js`
**What it does:** Manages all the products in our store

**Think of it as:** A warehouse manager who knows where everything is

**What it contains:**
```javascript
// All products are stored here:
products = [
  { id: 'P001', name: 'Laptop', price: 1299.99 },
  { id: 'P002', name: 'Mouse', price: 29.99 },
  { id: 'P003', name: 'Keyboard', price: 149.99 }
];

// Get all products
productService.getAllProducts();

// Get one product
productService.getProductById('P001');
```

**Real-world analogy:** Like a catalog - you can look up products

**Tip:** In a real app, this would connect to a database. For learning, we keep it simple with an array!

---

### 🛣️ `routes/` Folder - Traffic Controllers

**What it is:** Code that handles different web addresses (URLs)

**Think of it as:** A receptionist who directs visitors to different rooms

#### `routes/home.js`
**What it does:** Handles the home page

**Example:**
```javascript
// When someone visits http://localhost:3000/
router.get('/', (req, res) => {
  res.render('home');  // Show them the home page
});
```

**URLs it handles:**
- `http://localhost:3000/` ✅

**Real-world analogy:** When you walk into a building, the receptionist shows you to the lobby

---

#### `routes/products.js`
**What it does:** Handles everything related to products

**Example:**
```javascript
// When someone visits http://localhost:3000/products
router.get('/products', (req, res) => {
  const products = productService.getAllProducts();
  await eventHubService.sendEvent(pageViewEvent);  // Track the visit!
  res.render('products', { products });
});

// When someone clicks "Buy Now"
router.post('/products/:id/purchase', (req, res) => {
  await eventHubService.sendEvent(purchaseEvent);  // Track the purchase!
  res.redirect('/products');
});
```

**URLs it handles:**
- `GET /products` - Show all products
- `GET /products/P001` - Show one product
- `POST /products/P001/addToCart` - Add to cart
- `POST /products/P001/purchase` - Buy item

**Real-world analogy:** Like different departments in a store - each handles different requests

**Tip:** This is where the magic happens! Every user action creates an event that goes to Azure.

---

### 🎨 `views/` Folder - What Users See

**What it is:** HTML templates that become web pages

**Think of it as:** The decoration and layout of your rooms - what visitors actually see

**File type:** `.ejs` (Embedded JavaScript - HTML with code mixed in)

#### `views/home.ejs`
**What it is:** The home page HTML

**Example:**
```html
<h1>Welcome to Our Retail Store!</h1>
<p>Explore our amazing products</p>
<a href="/products">Browse Products</a>
```

**What users see:** Landing page with welcome message

---

#### `views/products/index.ejs`
**What it is:** The product listing page

**Example:**
```html
<h1>Our Products</h1>
<% products.forEach(product => { %>
  <div class="product-card">
    <h3><%= product.name %></h3>
    <p>$<%= product.price %></p>
    <button>Add to Cart</button>
  </div>
<% }); %>
```

**What users see:** Grid of all products with prices

**Special notation:**
- `<% code %>` - Run JavaScript code
- `<%= variable %>` - Show a variable's value

---

#### `views/products/details.ejs`
**What it is:** Individual product page

**Example:**
```html
<h1><%= product.name %></h1>
<img src="<%= product.imageUrl %>">
<p><%= product.description %></p>
<h3>$<%= product.price %></h3>
<form method="POST" action="/products/<%= product.id %>/purchase">
  <button>Buy Now</button>
</form>
```

**What users see:** Full product details with buy button

---

## 🔄 How Everything Works Together

Let's follow what happens when a user clicks "Buy Now":

```
1. 👤 USER
   Clicks "Buy Now" button on website
   ↓

2. 🌐 BROWSER
   Sends request to: POST /products/P001/purchase
   ↓

3. 🚪 SERVER.JS
   Receives request, looks at URL
   "This is a /products URL, send to products router"
   ↓

4. 🛣️ ROUTES/PRODUCTS.JS
   router.post('/:id/purchase', ...)
   "Someone wants to buy product P001"
   ↓

5. ⚙️ SERVICES/PRODUCTSERVICE.JS
   Gets product details: "P001 is a Laptop, costs $1299.99"
   ↓

6. 📦 MODELS/USEREVENT.JS
   Creates event object with all the details
   ↓

7. ⚙️ SERVICES/EVENTHUBSERVICE.JS
   Sends event to Azure Event Hubs
   "📤 Sending: User bought Laptop for $1299.99"
   ↓

8. ☁️ AZURE EVENT HUBS
   Stores the event in the cloud
   ✅ Event recorded!
   ↓

9. 🛣️ ROUTES/PRODUCTS.JS
   Redirects user back to products page
   ↓

10. 🎨 VIEWS/PRODUCTS/INDEX.EJS
    Shows "Successfully purchased Laptop!"
    ↓

11. 👤 USER
    Sees success message
```

---

## Common Student Questions

### Q: "Do I need to understand all of this?"

**A:** Not right away! Here's what's important at different stages:

**Just Getting Started:**
- Know where `server.js` is (to start the app)
- Know where `.env` is (to add connection string)
- That's it!

**Making Changes:**
- Understand `routes/` (to see where URLs are handled)
- Understand `views/` (to change what users see)

**Deep Understanding:**
- Understand `services/` (to see how Azure works)
- Understand `models/` (to modify data structure)

---

### Q: "Why so many folders? Can't it all be in one file?"

**A:** Sure, but it would be a mess! Imagine a house with no rooms - everything in one big space:
- 🍳 Cooking, 😴 sleeping, 🚿 showering all in one room = chaos!

Same with code:
- Easier to find things when organized
- Multiple people can work without conflicts
- Bugs are easier to isolate
- Professional standard everywhere

---

### Q: "What's the difference between `.js` and `.ejs`?"

**A:** Great question!

**`.js` files** (JavaScript)
- Pure code
- Located in: `models/`, `services/`, `routes/`, `server.js`
- Example: `productService.js`

**`.ejs` files** (Embedded JavaScript)
- HTML with JavaScript mixed in
- Located in: `views/`
- Example: `home.ejs`
- Think: "HTML with superpowers"

---

### Q: "Where do I add new products?"

**A:** Open `services/productService.js` and add to the array:

```javascript
this.products = [
  // ... existing products ...
  new Product(
    'P007',                    // New ID
    'Wireless Headphones',     // Name
    'Noise-canceling headphones', // Description
    199.99,                    // Price
    'Electronics',             // Category
    'https://image-url.jpg'    // Image
  )
];
```

The product will automatically appear on the website!

---

### Q: "How do I know if it's working?"

**A:** Look for these signs:

**✅ Starting up:**
```bash
npm start
# Should see:
✅ Event Hub Service initialized
🚀 Server running on http://localhost:3000
```

**✅ Events being sent:**
```bash
# In the console while browsing:
✅ Event sent: PageView - Product Listing Page
✅ Event sent: ProductView - Laptop Pro 15
✅ Event sent: AddToCart - Wireless Mouse
```

**✅ Azure Portal:**
- Event Hub metrics showing incoming messages

---
## 🎊 Summary

Think of your project as a **restaurant**:

- 🚪 **`server.js`** = Front door (entrance)
- 📋 **`package.json`** = Recipe book (ingredients list)
- 🎨 **`views/`** = Dining room (what customers see)
- 🛣️ **`routes/`** = Waiters (take orders, deliver food)
- ⚙️ **`services/`** = Kitchen (do the work)
- 📦 **`models/`** = Plates & containers (hold the food)
- 🔐 **`.env`** = Safe (keeps secrets)

Each part has a job. Together they make a working application!

---

