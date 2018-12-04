const axios = require('axios');

function modifyValue(val) {
  const url = val.replace('http://www.dnd5eapi.co/api/spells/', '')

  const id = url.match(/\d+/)[0];

  return `https://us-central1-dm-helper-1f262.cloudfunctions.net/spells?id=${id}`;
}

exports.handler = (req, res) => {
  if (req.method !== 'GET') return res.status(403);

  if (req.query.id) {
    axios.get(`http://www.dnd5eapi.co/api/spells/${req.query.id}`)
    .then(({ data }) => {
      return res.status(200).send(data)
    })
    .catch((e) => res.status(500).send(e));
  } else {
    axios.get('http://www.dnd5eapi.co/api/spells')
      .then(({ data: { results } }) => {
        return res.status(200).send(results.map(({ name, url }) => ({ label: name, value: modifyValue(url) })))
      })
      .catch((e) => res.status(500).send(e));
  }
  
}