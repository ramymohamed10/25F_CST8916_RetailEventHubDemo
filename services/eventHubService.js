// Import the EventHubProducerClient class from Azure SDK
// This class allows us to send messages (events) to Azure Event Hubs
const { EventHubProducerClient } = require('@azure/event-hubs');

/* -------------------------------------------------
   EventHubService Class
   ---------------------
   This service handles the connection to Azure Event Hubs
   and sends events (such as "ProductView", "AddToCart", etc.)
   to the cloud for tracking and analytics.
-------------------------------------------------- */
class EventHubService {
    constructor() {
        // Get the connection string and Event Hub name from environment variables
        const connectionString = process.env.EVENTHUB_CONNECTION_STRING;
        const eventHubName = process.env.EVENTHUB_NAME;

        // Check if both values exist before connecting
        if (!connectionString || !eventHubName) {
            throw new Error('Event Hub connection string and name must be configured');
        }

        // Create a new EventHubProducerClient instance to send events
        this.producerClient = new EventHubProducerClient(connectionString, eventHubName);

        console.log('✅ Event Hub Service initialized');
    }

    /* -------------------------------------------------
       sendEvent(userEvent)
       ---------------------
       Sends a single user event (e.g., page view, purchase)
       to Azure Event Hubs for real-time tracking.
    -------------------------------------------------- */
    async sendEvent(userEvent) {
        try {
            // Create a batch to hold one or more events before sending
            const batch = await this.producerClient.createBatch();

            // Convert the userEvent object to a JSON format
            const eventData = {
                body: userEvent.toJSON()
            };

            // Try to add the event to the batch
            const added = batch.tryAdd(eventData);

            // If adding fails, the event might be too large
            if (!added) {
                throw new Error('Event is too large for the batch');
            }

            // Send the batch of events to Azure Event Hub
            await this.producerClient.sendBatch(batch);

            console.log(`✅ Event sent: ${userEvent.eventType} - ${userEvent.productName}`);
            return true; // Indicate success
        } catch (error) {
            // Handle and log any errors that occur during sending
            console.error(`❌ Error sending event: ${error.message}`);
            throw error; // Re-throw so it can be caught by the calling function
        }
    }

    /* -------------------------------------------------
       close()
       --------
       Gracefully closes the connection to the Event Hub.
       Should be called when the app is shutting down.
    -------------------------------------------------- */
    async close() {
        await this.producerClient.close();
    }
}

// Export the EventHubService class so other files can use it
module.exports = EventHubService;
