const { firestore } = require('firebase-functions-helper');

const spellsCollection = 'spells';

function POST(req, res, db) {
  firestore.createNewDocument(db, spellsCollection, req.body);

  res.status(200).send('Created a new spell');
}

function PUT(req, res, db) {
  res.status(403).send({ message: 'Put is forbidden at this time :(' });
}

function GET(req, res, db) {
  firestore
    .backup(db, spellsCollection)
    .then(({ spells }) => res.status(200).send(Object.keys(spells).map(id => spells[id])))
    .catch(err => res.status(500).send(err));
}

exports.handler = (req, res, db) => {
  return {
    POST,
    PUT,
    GET,
  }[req.method](req, res, db);
}