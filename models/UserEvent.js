// Import the 'uuid' library to generate unique IDs for each event
// v4() creates a random unique identifier (e.g., "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d")
const { v4: uuidv4 } = require('uuid');

/* -------------------------------------------------
   UserEvent Class
   ----------------
   This class defines what a "user event" looks like.
   Each time a user views a product, adds to cart, or buys something,
   we create one of these events and send it to Azure Event Hubs.
-------------------------------------------------- */
class UserEvent {
    // Constructor runs every time we create a new UserEvent
    constructor(eventType, userId, productId = '', productName = '', price = 0, sessionId = '') {
        // Unique identifier for this event
        this.eventId = uuidv4();

        // Type of event (e.g., "PageView", "ProductView", "AddToCart", "Purchase")
        this.eventType = eventType;

        // The ID assigned to this user (stored in session)
        this.userId = userId;

        // The product the event is related to (if any)
        this.productId = productId;
        this.productName = productName;

        // Price of the product (0 if not applicable)
        this.price = price;

        // The exact date and time when the event occurred (ISO format)
        this.timestamp = new Date().toISOString();

        // The session ID from Express (helps group actions from the same browsing session)
        this.sessionId = sessionId;
    }

    /* -------------------------------------------------
       toJSON()
       ---------
       Converts this UserEvent object into a plain
       JavaScript object for sending to Azure Event Hubs.
       This ensures only the important data is sent.
    -------------------------------------------------- */
    toJSON() {
        return {
            eventId: this.eventId,
            eventType: this.eventType,
            userId: this.userId,
            productId: this.productId,
            productName: this.productName,
            price: this.price,
            timestamp: this.timestamp,
            sessionId: this.sessionId
        };
    }
}

/* -------------------------------------------------
   Export the class so it can be used elsewhere
   Example:
   const UserEvent = require('./models/UserEvent');
-------------------------------------------------- */
module.exports = UserEvent;
