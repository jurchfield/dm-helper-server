const { firestore } = require('firebase-functions-helper');
const { constructListResponse } = require('./shared');

const equipmentCollection = 'equipment';

function POST({ body }, res, db) {
  firestore.createNewDocument(db, equipmentCollection, body);

  res.status(200).send({ message: 'Created a new item' });
}

function PUT(req, res, db) {
  res.status(403).send({ message: 'Put is forbidden at this time :(' });
}

function GET(req, res, db) {
  firestore
    .backup(db, equipmentCollection)
    .then(({ equipment }) => res.status(200).send(constructListResponse(equipment)))
    .catch(err => res.status(500).send(err));
}

exports.handler = (req, res, db) => {
  return {
    POST,
    PUT,
    GET,
  }[req.method](req, res, db);
}