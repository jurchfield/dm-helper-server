const { firestore } = require('firebase-functions-helper');
const { constructListResponse, handleError } = require('./shared');

const racesCollection = 'races';

function POST({ body }, res, db) {
  res.status(403).send({ message: 'Post is forbidden' });
}

function PUT(req, res, db) {
  res.status(403).send({ message: 'Put is forbidden at this time :(' });
}

function GET(req, res, db) {
  firestore
    .backup(db, racesCollection)
    .then(({ races }) => res.status(200).send(constructListResponse(races)))
    .catch(err => handleError('Error fetching races', res, err));
}

exports.handler = (req, res, db) => {
  return {
    POST,
    PUT,
    GET,
  }[req.method](req, res, db);
}