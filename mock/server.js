// @ts-nocheck

const bodyParser = require('body-parser'); // middleware to auto-parse POST bodies
const dotenv = require('dotenv');
const express = require('express');
const helmet = require('helmet'); // sets HTTP headers for better security
const path = require('path');

// TODO: can we call this within main() instead of before?
const configureDotenv = () => {
    process.env.ENVIRONMENTAL_VARIABLE_FILE_PATH = path.resolve('./env/', `env.${process.env.DOTENV_FILE || 'localhost'}`);
    dotenv.config({ path: process.env.ENVIRONMENTAL_VARIABLE_FILE_PATH });

    if (process.env.MOCK_USER) {
        process.env.ENVIRONMENTAL_VARIABLE_MOCK_USER_FILE_PATH = path.resolve('./env/', `env.user.${process.env.MOCK_USER}`);
        dotenv.config({ path: process.env.ENVIRONMENTAL_VARIABLE_MOCK_USER_FILE_PATH });
    }
};

configureDotenv();

const controllerMocks = require('./controllers/controllerMocks');

const app = express();

async function main() {
    console.log('ENVIRONMENTAL_VARIABLE_FILE_PATH in server.js.main(): ', process.env.ENVIRONMENTAL_VARIABLE_FILE_PATH);

    app.set('port', process.env.PORT);
    app.use(helmet()); // safer http header defaults
    app.use(
        bodyParser.json({
            limit: '150mb',
        })
    );
    app.use(
        bodyParser.urlencoded({
            limit: '150mb',
            extended: false,
        })
    );

    app.use(helmet.noCache(), express.static('public'));
    app.use('/api', controllerMocks);
    app.use('/*', (req, res, next) => {
        // res.sendFile(__dirname + '/public/index.html');
        res.send('Unknown request');
    });

    // error handler
    app.use(function errorHandler(err, req, res, next) {
        res.locals.errorMessage = err.errorMessage;
        res.locals.error = req.app.get('env') === 'development' ? err : {};

        if (process.env.NODE_ENV !== 'production') {
            console.error('error in server.js.errorHandler', err);
        }

        res.status(err.status || 500).json({
            msg: process.env.NODE_ENV !== 'production' ? err.errorMessage : 'There was an error.',
            code: err.status || 500,
        });
    });

    return app.listen(app.get('port'), console.log(`mock server is up and running! http://localhost:${app.get('port')}/api/user`));
}

module.exports = main();
