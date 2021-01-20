//ignore this for now
require("dotenv").config();
module.exports = {
  "type": "service_account",
  "project_id": process.env.KEYS_PROJECT_ID,
  "private_key_id": process.env.KEYS_PRIVATE_KEY_ID,
  "private_key": process.env.KEYS_PRIVATE_KEY,
  "client_email": process.env.KEYS_CLIENT_EMAIL,
  "client_id": process.env.KEYS_CLIENT_ID,
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": process.env.KEYS_CLIENT__X509_CERT_URL
}
