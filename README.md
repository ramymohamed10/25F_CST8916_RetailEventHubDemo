# Retail Event Hub Demo - Azure Deployment Lab

Deploy a Node.js application to Azure App Service and stream events to Azure Event Hubs

## What You'll Build

A live retail website on Azure that tracks user actions in real-time and streams data to Azure Event Hubs.

**Live Demo:** Your app will run at `https://your-app-name.azurewebsites.net`

---

## Quick Start

### Step 1: Fork This Repository

1. Click the **"Fork"** button at the top right of this page
2. This creates your own copy of the repository
3. Clone your fork to your computer:

---

### Step 2: Create Azure Event Hub

1. **Login to Azure Portal:** https://portal.azure.com

2. **Create Resource Group:**
   - Search "Resource groups" → Click "+ Create"
   - Name: `rg-retail-lab`
   - Region: `Canada Central`
   - Click "Review + create" → "Create"

3. **Create Event Hubs Namespace:**
   - Search "Event Hubs" → Click "+ Create"
   - Resource group: `rg-retail-lab`
   - Namespace name: `eh-retail-[yourname]-[3digits]` (must be unique)
   - Location: Same as resource group
   - Pricing tier: **Basic**
   - Click "Review + create" → "Create"
   - Wait 2-3 minutes

4. **Create Event Hub:**
   - Open your namespace → "Event Hubs" (left menu)
   - Click "+ Event Hub"
   - Name: `retail-events`
   - Partition count: `1`
   - Click "Create"

5. **Get Connection String:**
   - In namespace → "Shared access policies" (left menu)
   - Click "RootManageSharedAccessKey"
   - Copy "Connection string–primary key"
   - **SAVE THIS** - you'll need it in Step 4!

---

### Step 3: Test Locally (Optional but Recommended)

```bash
# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env file and add your connection string
# (Use any text editor: VS Code, nano, notepad, etc.)

# Start the application
npm start

# Open in browser: http://localhost:3000
```

**Success?** You should see products and console showing events being sent!

---

### Step 4: Deploy to Azure

#### Deploy via Azure Portal 

**Step 4.1: Create App Service**

1. **Search for App Services:**
   - In Azure Portal search bar, type "App Services"
   - Click "App Services" from results

2. **Create New App Service:**
   - Click "+ Create" or "+ Create app service"
   - Fill in the form:

   **Basics Tab:**
   - **Subscription:** Your Azure subscription
   - **Resource Group:** `rg-retail-lab` (select existing)
   - **Name:** `retail-app-[yourname]-[3digits]` (must be globally unique)
     - Example: `retail-app-smith-123`
   - **Publish:** `Code`
   - **Runtime stack:** `Node 18 LTS`
   - **Operating System:** `Linux`
   - **Region:** Same as your resource group (e.g., East US)
   
   **App Service Plan:**
   - Click "Create new"
   - **Name:** `plan-retail-lab`
   - **Pricing plan:** Click "Explore pricing plans"
     - Select **Basic B1** (or Free F1 for testing)
     - Click "Select"

3. **Review and Create:**
   - Click "Review + create"
   - Verify all settings
   - Click "Create"
   - Wait 1-2 minutes for deployment

4. **Go to Resource:**
   - Click "Go to resource" when deployment completes

---

**Step 4.2: Configure Deployment from GitHub**

1. **Open Deployment Center:**
   - In your App Service, scroll down the left menu
   - Click "Deployment Center"

2. **Select Source:**
   - Source: Select **GitHub**
   - Click "Authorize" if prompted (sign in to GitHub)
   - Click "Continue"

3. **Configure Build:**
   - Organization: Select your GitHub username
   - Repository: Select `RetailEventHubDemo`
   - Branch: Select `main` (or `master`)
   - Click "Save" at the top

4. **Wait for Deployment:**
   - Azure will automatically build and deploy your app
   - This may take 3-5 minutes
   - You'll see logs appear in the Deployment Center

---

**Step 4.3: Configure Environment Variables**

1. **Open Configuration:**
   - In your App Service left menu, click "Configuration"
   - Under "Application settings" tab

2. **Add Environment Variables:**
   
   Click "+ New application setting" for each of these:

   **Setting 1:**
   - **Name:** `EVENTHUB_CONNECTION_STRING`
   - **Value:** Paste your connection string from Step 2
   - Click "OK"

   **Setting 2:**
   - **Name:** `EVENTHUB_NAME`
   - **Value:** `retail-events`
   - Click "OK"

3. **Save Configuration:**
   - Click "Save" at the top
   - Click "Continue" when warned about restart
   - Wait 1 minute for app to restart

---

**Step 4.4: Verify Deployment**

1. **Get Your App URL:**
   - In your App Service "Overview" page
   - Look for "Default domain"
   - Example: `retail-app-smith-123.azurewebsites.net`
   - Click the URL or copy it

2. **Test Your App:**
   - The URL should open your retail website
   - You should see the home page
   - Click "Browse Products"
   - Interact with products

**Success!** Your app is live on Azure!

---
### Step 5: Test Your Deployment

1. **Open your app:**
   ```
   https://retail-app-[yourname]-[3digits].azurewebsites.net
   ```

2. **Interact with products:**
   - Browse products
   - View product details
   - Add items to cart
   - Make a purchase

3. **Verify events in Azure:**
   - Go to Azure Portal
   - Navigate to your Event Hub: `retail-events`
   - Click "Overview"
   - See "Incoming Messages" graph increase!


**Success!** Your app is live and streaming events to Azure!

---

## Project Structure

```
RetailEventHubDemo/
├── server.js              # Main application
├── package.json           # Dependencies
├── .env.example          # Environment template
├── models/
│   ├── UserEvent.js      # Event model
│   └── Product.js        # Product model
├── services/
│   ├── eventHubService.js # Azure Event Hub client
│   └── productService.js  # Product data
├── routes/
│   ├── home.js           # Home page routes
│   └── products.js       # Product routes
└── views/
    ├── home.ejs          # Home page
    └── products/
        ├── index.ejs     # Product listing
        └── details.ejs   # Product details
```

---

## What Events Are Tracked?

| Event Type | Trigger | Data Captured |
|-----------|---------|---------------|
| `PageView` | Visit products page | Page name, timestamp |
| `ProductView` | Click on product | Product ID, name, price |
| `AddToCart` | Click "Add to Cart" | Product ID, name, price |
| `Purchase` | Click "Buy Now" | Product ID, name, price |

### Event JSON Structure

```json
{
  "eventId": "uuid",
  "eventType": "ProductView",
  "userId": "uuid",
  "productId": "P001",
  "productName": "Laptop Pro 15",
  "price": 1299.99,
  "timestamp": "2024-01-15T10:30:00Z",
  "sessionId": "session-uuid"
}
```

---
## View Application Logs

### In Azure Portal:

1. **Navigate to your App Service**
2. **Open Log Stream:**
   - Scroll down left menu
   - Click "Log stream"
   - Select "Application logs"
3. **Watch Real-Time Logs:**
   - See events being sent to Event Hubs
   - View any errors
   - Monitor application activity

**To Enable Detailed Logging:**
1. App Service → "App Service logs" (left menu)
2. **Application Logging:** Turn "On" 
3. **Level:** Select "Information" or "Verbose"
4. Click "Save"
5. Return to "Log stream" to see logs


## Create Event Consumer (Optional)
In the previous steps, your web app was sending user activity data (like page views, add-to-cart, and purchases) to Azure Event Hubs.
Now we’ll build the other side of the system — the Event Consumer 🎧.

- The consumer is a small Node.js program that listens to the Event Hub in real time and displays any events your app sends. You can think of it as a live dashboard or a receiver that watches what’s happening in your store.

This part is optional, but it helps you see the flow of data:
- The web app acts as the producer, sending events.
- The consumer acts as the listener, receiving those events.
### Step 4.1: Create Consumer Project

Open a **NEW terminal window** (while the app running):

```bash
# Navigate to parent directory
cd ..

# Create consumer directory
mkdir EventConsumer
cd EventConsumer

# Initialize project
npm init -y

# Install packages
npm install @azure/event-hubs dotenv
```

---

### Step 4.2: Configure Consumer

Create `.env` file:

```
EVENTHUB_CONNECTION_STRING=YOUR_CONNECTION_STRING_HERE
EVENTHUB_NAME=retail-events
```

Replace with your actual connection string!

---

### Step 4.3: Create Consumer Code

Create `consumer.js`:

```javascript
require('dotenv').config();
const { EventHubConsumerClient } = require('@azure/event-hubs');

const connectionString = process.env.EVENTHUB_CONNECTION_STRING;
const eventHubName = process.env.EVENTHUB_NAME;
const consumerGroup = '$Default';

async function main() {
    console.log('🎧 Event Hub Consumer Started');
    console.log('📡 Listening for events...\n');

    const consumerClient = new EventHubConsumerClient(
        consumerGroup,
        connectionString,
        eventHubName
    );

    const subscription = consumerClient.subscribe({
        processEvents: async (events, context) => {
            for (const event of events) {
                try {
                    const eventBody = event.body;
                    
                    console.log('\n═══ Event Received ═══');
                    console.log(`Type: ${eventBody.eventType}`);
                    console.log(`Product: ${eventBody.productName}`);
                    
                    if (eventBody.price) {
                        console.log(`Price: $${eventBody.price.toFixed(2)}`);
                    }
                    
                    const timestamp = new Date(eventBody.timestamp);
                    console.log(`Time: ${timestamp.toLocaleTimeString()}`);
                    console.log(`Partition: ${context.partitionId}`);
                    console.log('═══════════════════════\n');
                } catch (error) {
                    console.error('Error:', error);
                }
            }
        },
        processError: async (error, context) => {
            console.error(`Error on partition ${context.partitionId}:`, error);
        }
    });

    process.on('SIGINT', async () => {
        console.log('\n🛑 Shutting down...');
        await subscription.close();
        await consumerClient.close();
        process.exit(0);
    });
}

main().catch(console.error);
```

Update `package.json` to add start script:

```json
{
  "scripts": {
    "start": "node consumer.js"
  }
}
```

---

### Step 4.4: Run Consumer

```bash
npm start
```

You should see:
```
🎧 Event Hub Consumer Started
📡 Listening for events...
```

### Step 4.5: Generate Events

With consumer running:
1. Go back to web browser
2. Perform actions (view, add to cart, purchase)
3. Watch **BOTH terminals**:
   - Web app: "Event sent"
   - Consumer: "Event Received"
---
