const { v4: uuidv4 } = require('uuid');

class UserEvent {
    constructor(eventType, userId, productId = '', productName = '', price = 0, sessionId = '') {
        this.eventId = uuidv4();
        this.eventType = eventType;
        this.userId = userId;
        this.productId = productId;
        this.productName = productName;
        this.price = price;
        this.timestamp = new Date().toISOString();
        this.sessionId = sessionId;
    }

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

module.exports = UserEvent;