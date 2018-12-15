const { firestore } = require('firebase-functions-helper');

const weaponsCollection = 'equipment';

function POST(req, res, db) {
  firestore.createNewDocument(db, weaponsCollection, req.body);

  res.status(200).send('Created a new item');
}

function PUT(req, res, db) {
  res.status(403).send({ message: 'Put is forbidden at this time :(' });
}

function GET(req, res, db) {
  firestore
    .queryData(db, weaponsCollection, [ 'equipment_category', '==', 'Weapon' ])
    .then((equipment) => res.status(200).send(Object.keys(equipment).map(id => equipment[id])))
    .catch(err => res.status(500).send(err));
}

exports.handler = (req, res, db) => {
  return {
    POST,
    PUT,
    GET,
  }[req.method](req, res, db);
}