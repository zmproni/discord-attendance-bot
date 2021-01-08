'use strict';
const json = require('./json');
const root = require('./root')

const filename = "config.json"

const config = () => {
  const data = json.read(root() + "/" + filename);
  return {
    command_prefix: data.command_prefix || "!",
    channel_id: data.channel_id,
    admin_role: data.admin_role || "Administrator",
    spreadsheet_id: data.spreadsheet_id,
  }
}

const writeConfig = (data) => {
  json.write(root() + "/" + filename, JSON.stringify(data, null, 2))
}

class Config {
  constructor() { }

  get command_prefix() {
    return config().command_prefix
  }

  get channel_id() {
    return config().channel_id
  }

  get admin_role() {
    return config().admin_role
  }

  get spreadsheet_id() {
    return config().spreadsheet_id
  }

  set command_prefix(prefix) {
    const data = config()
    data.command_prefix = prefix;
    writeConfig(data)
  }

  set channel_id(id) {
    const data = config()
    data.channel_id = id;
    writeConfig(data)
  }

  set admin_role(role) {
    const data = config()
    data.admin_role = role;
    writeConfig(data)
  }

  set spreadsheet_id(id) {
    const data = config()
    data.spreadsheet_id = id;
    writeConfig(data)
  }
}

module.exports = new Config();
