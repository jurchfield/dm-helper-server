const { firestore } = require('firebase-functions-helper');
const { handleError, constructListResponse } = require('./shared');

const classesCollection = 'classes';

function POST({ body }, res, db) {
  res.status(403).send({ message: 'Post is forbidden at this time :(' });
}

function PUT(req, res, db) {
  res.status(403).send({ message: 'Put is forbidden at this time :(' });
}

function GET(req, res, db) {
  firestore
    .backup(db, classesCollection)
    .then(({ classes }) => res.status(200).send(constructListResponse(classes)))
    .catch(err => handleError('Error fetching classes', res, err));
}

exports.handler = (req, res, db) => {
  return {
    POST,
    PUT,
    GET,
  }[req.method](req, res, db);
}