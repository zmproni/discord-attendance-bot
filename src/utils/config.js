'use strict';
const json = require('json');

class Config {
  _filename = "config.js"

  constructor() {
    const data = json.read(root() + this._filename);
    
  }

}
