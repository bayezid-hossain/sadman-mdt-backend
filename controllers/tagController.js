const driver = require('bigchaindb-driver');
const base58 = require('bs58');
const crypto = require('crypto');
const { Ed25519Sha256 } = require('crypto-conditions');
const API_PATH = 'http://0.0.0.0:9984/api/v1/';
const bip39 = require('bip39');
const alice = new driver.Ed25519Keypair();
const axios = require('axios');

const conn = new driver.Connection(API_PATH);
// Construct a transaction payload

// Controller function to store person information
async function createTag(req, res) {
  const tagInfo = req.body; // JSON request body containing person information
  const tx = driver.Transaction.makeCreateTransaction(
    // Define the asset to store, in this example it is the current temperature
    // (in Celsius) for the city of Berlin.
    { ...tagInfo, type: 'tag' },

    // Metadata contains information about the transaction itself
    // (can be `null` if not needed)
    { what: 'Tag' },

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
    conn.postTransactionCommit(txSigned).then((retrievedTx) => {
      res
        .status(200)
        .send(`Transaction ${retrievedTx.id} successfully posted.`);
    });
  } catch (error) {
    console.error('Error storing tag information:', error);
    res.status(500).json({ error: 'Failed to store tag information' });
  }
}
async function getTags(req, res) {
  try {
    // Use the BigchainDB HTTP API to query assets based on the search criteria
    conn.searchAssets('tag').then((assets) => res.status(200).json(assets));
  } catch (error) {
    console.error('Error retrieving person information by name:', error);
    res.status(500).json({ error: 'Failed to retrieve person information' });
  }
}
async function getTagById(req, res) {
  try {
    // Use the BigchainDB HTTP API to query assets based on the search criteria
    conn
      .searchAssets(req.params.id)
      .then((assets) => res.status(200).json(assets));
  } catch (error) {
    console.error('Error retrieving person information by name:', error);
    res.status(500).json({ error: 'Failed to retrieve person information' });
  }
}

module.exports = { getTags, createTag, getTagById };
