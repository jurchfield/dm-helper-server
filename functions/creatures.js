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
  firestore
    .backup(db, creaturesCollection)
    .then(({ creatures }) => {
      const result = Object.keys(creatures)
        .map(id => Object.assign(creatures[id], getModifiers(creatures[id])))
        .sort((a, b) => {
          if(a.name < b.name) { return -1; }
          if(a.name > b.name) { return 1; }
          return 0;
      });
        
      return res.status(200).send(result);
    })
    .catch(err => res.status(500).send(err));
}

function getModifiers({
  dexterity,
  constitution,
  strength,
  charisma,
  intelligence,
  wisdom,
}) {
  return {
    dexterity_modifier: Math.floor((dexterity - 10) / 2),
    constitution_modifier: Math.floor((constitution - 10) / 2),
    strength_modifier: Math.floor((strength - 10) / 2),
    charisma_modifier: Math.floor((charisma - 10) / 2),
    intelligence_modifier: Math.floor((intelligence - 10) / 2),
    wisdom_modifier: Math.floor((wisdom - 10) / 2),
  }
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