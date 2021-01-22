function proxy(app) {
  app.get(/^\/$/, (req, res) => res.redirect('/discover'))

  app.head(/^\/discover$/, (req, res) => res.status(200).end())
}

module.exports = proxy
