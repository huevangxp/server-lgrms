const bodyParser = require('body-parser');
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
require('dotenv').config();
const app = express();

// import file
const upload = require('./controllers/upload.image.controller');
const router = require('./routes/routes');

const port = process.env.PORT || 3000;
//use library
app.use(cors());
// app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true, parameterLimit: 50000000 }));

// use file import
app.use('/api/v1/', router);
app.use('/api/v1/', upload);

app.listen(port, () => {
    console.log("Server running on port : " + port);
})