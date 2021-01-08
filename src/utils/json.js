'use strict';

const fs = require('fs')

function read ( path ) {
  const data = fs.readFileSync(path);
  return JSON.parse(data);
}

function write( path, data ) {
  return fs.writeFileSync(path, data)
}

module.exports = {
  read,
  write
}
