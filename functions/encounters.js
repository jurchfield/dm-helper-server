const { firestore } = require('firebase-functions-helper');
const { constructListResponse, handleError } = require('./shared');

const encountersCollection = 'encounters';

function POST({ body }, res, db, uid) {
  try {
    firestore.createNewDocument(db, encountersCollection, Object.assign(body, { uid }));
    res.status(200).send({ message: 'Created a new encounter' });
  } catch (err) {
    handleError('Error creating encounter', res, err);
  }
}

function PUT(req, res, db) {
  try {
    firestore
      .updateDocument(db, encountersCollection, req.query.id, JSON.parse(req.body));
    res.status(200).send({ message: 'Updated encounter' });
  } catch (err) {
    handleError('Error updating encounter', res, err);
  }
}

function GET(req, res, db, uid) {
  firestore
    .queryData(db, encountersCollection, ['uid', '==', uid])
    .then((encounters) => res.status(200).send(constructListResponse(encounters)))
    .catch(err => handleError('Error fetching encounters', res, err));
}

exports.handler = (req, res, db, auth) => {
  const token = req.header('Token');

  if (!token) return res.status(401).send({ message: 'Please log in or create an account to use encounters' });

  return auth
    .verifyIdToken(token)
    .then(({ uid }) => {
      return {
        POST,
        PUT,
        GET,
      }[req.method](req, res, db, uid);
    })
    .catch(error  => handleError('Error verifying token. Please log in again', res, error));
}