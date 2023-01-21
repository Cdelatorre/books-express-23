module.exports.home = (req, res) => {
  res.send('has intentado acceder a la home pero no existe')
}

module.exports.about = (req, res) => {
  res.render('misc/about');
}