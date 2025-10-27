const { EventHubProducerClient } = require('@azure/event-hubs');

class EventHubService {
    constructor() {
        const connectionString = process.env.EVENTHUB_CONNECTION_STRING;
        const eventHubName = process.env.EVENTHUB_NAME;

        if (!connectionString || !eventHubName) {
            throw new Error('Event Hub connection string and name must be configured');
        }

        this.producerClient = new EventHubProducerClient(connectionString, eventHubName);
        console.log('✅ Event Hub Service initialized');
    }

    async sendEvent(userEvent) {
        try {
            const batch = await this.producerClient.createBatch();

            const eventData = {
                body: userEvent.toJSON()
            };

            const added = batch.tryAdd(eventData);

            if (!added) {
                throw new Error('Event is too large for the batch');
            }

            await this.producerClient.sendBatch(batch);

            console.log(`✅ Event sent: ${userEvent.eventType} - ${userEvent.productName}`);
            return true;
        } catch (error) {
            console.error(`❌ Error sending event: ${error.message}`);
            throw error;
        }
    }

    async close() {
        await this.producerClient.close();
    }
}

module.exports = EventHubService;