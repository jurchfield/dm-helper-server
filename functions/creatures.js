const { firestore } = require('firebase-functions-helper');

const creaturesCollection = 'creatures';

function POST(req, res, db) {
  firestore.createNewDocument(db, creaturesCollection, req.body);

  res.status(200).send('Created a new character');
}

function PUT(req, res, db) {
  firestore
    .updateDocument(db, creaturesCollection, req.params.characterId, req.body);
  res.status(200).send('Update a new character');
}

function GET(req, res, db) {
  // db
  // .collection("creatures")
  // .where("name", "==", "Horned Devil")
  // .get()
  // .then((snapshot) => {
  //   console.log(snapshot)
  //   const result = snapshot.map(doc => doc.data());
  //   return res.status(200).send(result);
  // })
  // .catch(err => res.status(500).send(err));
  firestore
    .backup(db, creaturesCollection)
    .then(({ creatures }) => res.status(200).send(Object.keys(creatures).map(id => creatures[id])))
    .catch(err => res.status(500).send(err));
}

function OPTIONS(req, res) {
  res.status(200);
}

exports.handler = (req, res, db) => {
  return {
    POST,
    PUT,
    GET,
    OPTIONS,
  }[req.method](req, res, db);
}