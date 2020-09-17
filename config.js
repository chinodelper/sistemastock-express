require('dotenv').config()

const port = process.env.PORT || 3000;
const dbname = process.env.DB_NAME;
const dbpass = process.env.DB_PASSWORD;
const secret = process.env.SECRET_TOKEN || 'secret_token';
const domain = process.env.DOMAIN || 'http://localhost:3000'

module.exports = {
    port,
    db: `mongodb+srv://${dbname}:${dbpass}@cluster0-iqdqk.mongodb.net/vaidonnasystem?retryWrites=true&w=majority`,
    secret,
    domain
}