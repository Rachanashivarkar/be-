require('dotenv').config();
const express = require('express');
const { MongoClient } = require('mongodb');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB connection
const client = new MongoClient(process.env.MONGO_URI);

async function main() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");

    const db = client.db("contactDB");
    const contacts = db.collection("contacts");

    // Route to handle form submissions
    app.post("/submit-contact", async (req, res) => {
      try {
        const contactData = req.body;
        const result = await contacts.insertOne(contactData);
        res.status(201).json({ message: "Contact submitted", id: result.insertedId });
      } catch (error) {
        console.error("Error submitting contact:", error);
        res.status(500).json({ message: "Failed to submit contact" });
      }
    });

    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); // Exit the process if connection fails
  }
}

main().catch(error => console.error("An error occurred:", error));
