require("dotenv").config();
module.exports = {
  installed: {
    client_id: "process.env.GS_CLIENT_ID",
    client_email: "process.env.GS_CLIENT_EMAIL",
    project_id: "process.env.GS_PROJECT_ID",
    private_key: "process.env.GS_PRIVATE_KEY",
    auth_uri: "process.env.GS_AUTH_URI",
    token_uri: "process.env.GS_TOKEN_URI",
    auth_provider_x509_cert_url: "process.env.GS_AUTH_PROVIDER_X509_CERT_URL",
    client_x509_cert_url: "process.env.GS_CLIENT_X509_CERT_URL"
  }
}
