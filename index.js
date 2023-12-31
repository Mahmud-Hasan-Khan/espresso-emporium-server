const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

require('dotenv').config();

const { MongoClient, ServerApiVersion } = require('mongodb');

// middleware
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('espresso-emporium server is running')
})


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_SECRET_KEY}@cluster0.bjwj9uc.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);






app.listen(port, () => {
    console.log(`espresso-emporium server is running on port ${port}`);
})