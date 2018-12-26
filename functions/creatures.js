const { firestore } = require('firebase-functions-helper');
const { sortByName, handleError } = require('./shared');

const creaturesCollection = 'creatures';

function POST(req, res, db) {
  res.status(403).send({ message: 'Post is forbidden' });
}

function PUT(req, res, db) {
  res.status(403).send({ message: 'Put is forbidden' });
}

function GET(req, res, db) {
  firestore
    .backup(db, creaturesCollection)
    .then(({ creatures }) => {
      const result = sortByName(Object.keys(creatures)
        .map(id => Object.assign(creatures[id], getModifiers(creatures[id]))));
        
      return res.status(200).send(result);
    })
    .catch(err => handleError('Error Fetching Creatures', res, err));
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