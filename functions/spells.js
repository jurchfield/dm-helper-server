const { firestore } = require('firebase-functions-helper');
const { constructListResponse, handleError } = require('./shared');

const spellsCollection = 'spells';

function POST(req, res, db) {
  res.status(403).send({ message: 'Post is forbidden' });
}

function PUT(req, res, db) {
  res.status(403).send({ message: 'Put is forbidden' });
}

function GET(req, res, db) {
  firestore
    .backup(db, spellsCollection)
    .then(({ spells }) => res.status(200).send(constructListResponse(spells)))
    .catch(err => handleError('Error fetching spells', res, err));
}

exports.handler = (req, res, db) => {
  return {
    POST,
    PUT,
    GET,
  }[req.method](req, res, db);
}