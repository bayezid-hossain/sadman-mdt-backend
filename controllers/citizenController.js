const driver = require('bigchaindb-driver');
const mongoose = require('mongoose');
const base58 = require('bs58');
const crypto = require('crypto');
const { Ed25519Sha256 } = require('crypto-conditions');
const API_PATH = 'http://0.0.0.0:9984/api/v1/';
const alice = new driver.Ed25519Keypair();
const axios = require('axios');
const conn = new driver.Connection(API_PATH);
const bigchain = mongoose.createConnection('mongodb://localhost/bigchain', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

bigchain.on(
  'error',
  console.error.bind(console, 'MongoDB connection error (db1):')
);
bigchain.once('open', async () => {
  console.log('Connected to bigchain (dmp)');

  // Define a dynamic Mongoose model for the 'assets' collection
  const AssetModel = bigchain.model(
    'Asset',
    new mongoose.Schema({}, { strict: false }),
    'assets'
  );

  // Retrieve all documents from the 'assets' collection
  try {
    // Retrieve all documents from the 'assets' collection using await
    const assets = await AssetModel.find({
      'data.type': 'tag',
      id: '56c8a705165d12df3f4263bc2c25153a79f1b0a1ef10d4e0d4b6f454470c10fe',
    });

    // Handle the results
    console.log('All assets:', assets);
  } catch (err) {
    console.error('Error fetching assets:', err);
  } finally {
    // Close the database connection when done
    bigchain.close();
  }
});
// Construct a transaction payload

// Controller function to store person information
async function storePersonInfo(req, res) {
  const personInfo = req.body; // JSON request body containing person information
  console.log(personInfo);
  const tx = driver.Transaction.makeCreateTransaction(
    // Define the asset to store, in this example it is the current temperature
    // (in Celsius) for the city of Berlin.
    { ...personInfo, type: 'citizen' },

    // Metadata contains information about the transaction itself
    // (can be `null` if not needed)
    { what: 'Person Info' },

    // A transaction needs an output
    [
      driver.Transaction.makeOutput(
        driver.Transaction.makeEd25519Condition(alice.publicKey)
      ),
    ],
    alice.publicKey
  );
  const txSigned = driver.Transaction.signTransaction(tx, alice.privateKey);

  try {
    const Tx = await conn.postTransactionCommit(txSigned);
    conn.searchAssets(Tx.id).then((assets) => res.status(200).json(assets));
  } catch (error) {
    console.error('Error storing person information:', error);
    res.status(500).json({ error: 'Failed to store person information' });
  }
}
async function getAllCitizen(req, res) {
  try {
    // Use the BigchainDB HTTP API to query assets based on the search criteria
    conn.searchAssets('citizen').then((assets) => res.status(200).json(assets));
  } catch (error) {
    console.error('Error retrieving person information by name:', error);
    res.status(500).json({ error: 'Failed to retrieve person information' });
  }
}
async function getPersonByName(req, res) {
  const personName = req.params.name; // Extract the name parameter from the URL

  try {
    const assets = response.data;

    // Return the matching assets as the response
    res.status(200).json(assets);
  } catch (error) {
    console.error('Error retrieving person information by name:', error);
    res.status(500).json({ error: 'Failed to retrieve person information' });
  }
}

module.exports = { storePersonInfo, getPersonByName, getAllCitizen };
