exports.sortByName = (arr) => {
  return arr
    .sort((a, b) => {
      if(a.name < b.name) { return -1; }
      if(a.name > b.name) { return 1; }
      return 0;
    });
}

exports.constructListResponse = (res) => {
  return Object.keys(res)
    .map(id => res[id])
    .sort((a, b) => {
      if(a.name < b.name) { return -1; }
      if(a.name > b.name) { return 1; }
      return 0;
    });
}

exports.handleError = (message, res, err = new Error('No further information')) => {
  return res.status(500).send({ message, error: err.message });
}