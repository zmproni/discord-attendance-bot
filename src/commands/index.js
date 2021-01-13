// Dont add help.js, circular dependency
module.exports = [
  require('./nickname'),
  require('./amend'),
  require('./attend'),
  require('./schedule'),
  require('./check'),
  require('./remove'),
  require('./leave'),
  require('./absent')
]
