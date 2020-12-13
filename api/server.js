require('dotenv').config();

const server = require('./src');
const hostname = '127.0.0.1';
const port = process.env.PORT || 3300;

server.listen(port, hostname, () => {
    console.log('App listening on', port)
});