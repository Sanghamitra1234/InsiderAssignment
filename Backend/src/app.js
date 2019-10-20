const express = require('express');
var cors = require('cors')
const bodyParser = require("body-parser");
const router = require('./routes/route');
const myErrorLogger = require('./utilities/errorlogger')
const myRequestLogger = require('./utilities/requestlogger')

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use(myRequestLogger);
app.use(express.static('public'));
app.use('/', router);
app.use(myErrorLogger);

app.listen(3000);
console.log("Server listening in port 3000");