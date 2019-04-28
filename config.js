module.exports = {
    port: process.env.PORT || 3000,
    db: process.env.MONDODB || 'mongodb://localhost:27017/db',
    SECRET_TOKEN: 'mecagoenelrey'
}