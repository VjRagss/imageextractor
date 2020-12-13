const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const app = express();
const bodyParser = require('body-parser');
const expressip = require('express-ip');
var useragent = require('express-useragent');

const Routes = require('./routes/route');

app.use(cors());
app.use(helmet());
app.use(helmet.hidePoweredBy({ setTo: 'PHP 4.2.0' }));

app.use(useragent.express());

app.use('/uploads', express.static('uploads'))

app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

app.use(expressip().getIpInfoMiddleware);

app.get("/", (req, res) => {
    res.send("Rest API started...");
});

app.use('/api', Routes);

module.exports = app;


