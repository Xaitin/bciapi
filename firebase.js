const admin = require('firebase-admin');
const { cert } = require('firebase-admin/app');
const serviceAccount = require('./invenstory-a9e70-8fcf89cccd95.json');
admin.initializeApp({
    credential: cert(serviceAccount)
});

const db=admin.firestore();

module.exports = db;