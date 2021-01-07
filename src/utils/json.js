'use strict';

const fs = require('fs')

module.exports = function read ( path ) {
  const data = fs.readFileSync(path);
  return JSON.parse(data);
}

module.exports = function writeRoot( json, path ) {
  return write( root() + path || "" ,json)
}
