'use strict';

const path = require('path')

function root() {
  return path.dirname(require.main.filename || process.mainModule.filename);
}

module.exports = root
