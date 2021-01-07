'use strict';

const root = require('./root')
const fs = require('fs')

function read ( path ) {
  const data = fs.readFileSync(path);
  return JSON.parse(data);
}

function readRoot ( path ) {
  return read(root() + path || "");
}

function write ( json, path ) {
  const data = JSON.stringify(json);
  fs.writeFileSync(path, data);
}

function writeRoot( json, path ) {
  return write( root() + path || "" ,json)
}

module.exports = {
  read,
  readRoot,
  write,
  writeRoot,
}
