const { firestore } = require('firebase-functions-helper');
const { constructListResponse, handleError } = require('./shared');

const traitsCollection = 'traits';

function POST({ body }, res, db) {
  res.status(403).send({ message: 'Post is forbidden' });
}

function PUT(req, res, db) {
  res.status(403).send({ message: 'Put is forbidden' });
}

function GET(req, res, db) {
  firestore
    .backup(db, traitsCollection)
    .then(({ traits }) => res.status(200).send(constructListResponse(traits)))
    .catch(err => handleError('Error fetching traits', res, err));
}

exports.handler = (req, res, db) => {
  return {
    POST,
    PUT,
    GET,
  }[req.method](req, res, db);
}