const { firestore } = require('firebase-functions-helper');

const charactersCollection = 'characters';

function POST(req, res, db) {
  firestore.createNewDocument(db, charactersCollection, req.body);
  res.status(200).send('Create a new character');
}

function PUT(req, res, db) {
  firestore
    .updateDocument(db, charactersCollection, req.params.characterId, req.body);
  res.status(200).send('Update a new character');
}

function GET(req, res, db) {
  firestore
    .backup(db, charactersCollection)
    .then(({ characters }) => res.status(200).send(Object.keys(characters).map(id => characters[id])))
    .catch(err => res.status(500).send(err));
}

exports.handler = (req, res, db, auth) => {
  const token = req.header('Token');

  if (!token) return res.status(401).send({ message: 'No token. Please log in to use characters' });

  return auth
  .verifyIdToken(token)
  .then(({ uid }) => ({
      POST,
      PUT,
      GET,
    })[req.method](req, res, db, uid))
  .catch(error  => res.status(500).send({ message: 'Error verifying token. Please log in again', error }));
}