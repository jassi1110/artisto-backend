const express = require('express');
const app = express();
const cors = require('cors');
const {PythonShell} =require('python-shell');
const epl = require('express-pino-logger');
const formidable = require('express-formidable');
const logger = require('./pino.setup')
const artist = require('../modules/artist/artist.route');

require('dotenv').config()

exports.runserver = () => {
    app.use(express.urlencoded({ "extended": true }));
    app.use(express.json())
    app.use(formidable())
    app.use(cors());

    const eplMiddleware = epl({
        logger: logger,
        useLevel: "http"
    })

    app.use(eplMiddleware)

    port = process.env.PORT
    app.get('/api/v1', (req, res) => {
        res.send("Welcome to the Artisto-Backend");
    })

    app.use('/api/V1/artist', artist)


    app.listen(`${port}`, () => {
        console.log(`http://localhost:${port}/api/v1`)
    })
}
