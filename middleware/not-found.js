const notFound = (req, res) => {
  res.status(404).send(`Router doesn't exist`);
};

module.exports = notFound;
