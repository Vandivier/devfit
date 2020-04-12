// @ts-nocheck

const createError = require('http-errors');
const EOL = require('os').EOL;
const fs = require('fs');
const path = require('path');

const defaultResponseMap = {
    'post-login': 'login',
    'post-register': 'register',
};

const globResponseMapKeys = Object.keys(defaultResponseMap).filter(key => key.endsWith('*'));
const globResponseMap = globResponseMapKeys.reduce((acc, s) => ({ ...acc, [s]: defaultResponseMap[s] }), {});
const getGlobResponseFileMatch = maybeGlobKey =>
    globResponseMapKeys.reduce((accVal, currKey) => (maybeGlobKey.includes(currKey.split('*')[0]) ? globResponseMap[currKey] : accVal), '');

const getResponseFileName = req => {
    const conventionalBase = req.url.slice(1).replace(/\//g, '-');
    const conventionalPrefix = `${req.method === 'GET' ? '' : req.method.toLowerCase() + '-'}`;
    const conventionalFileName = `${conventionalPrefix}${conventionalBase}`;

    return getGlobResponseFileMatch(conventionalFileName) || serviceThis.userResponseMap[conventionalFileName] || conventionalFileName;
};

const serviceThis = { userResponseMap: {} };

serviceThis.mockServerError = (req, res, next) => next(createError(500));

serviceThis.mapMockResponse = (req, res, next) => {
    const responseFileName = getResponseFileName(req);
    const shouldThrowWithCode = parseInt(responseFileName.split('THROWS-')[1]);
    const respondByRunningScript = responseFileName.split('SCRIPT-')[1];

    if (respondByRunningScript) {
        return require(`../mocks/${respondByRunningScript}.js`)(req, res, next);
    } else if (shouldThrowWithCode) {
        return next(createError(shouldThrowWithCode));
    } else {
        return res.json(require(`../mocks/${responseFileName}.json`));
    }
};

serviceThis.mapMockCypressResponse = (responseKey, responseVal) => {
    const responseFileName = responseVal;
    const shouldThrowWithCode = parseInt(responseFileName.split('THROWS-')[1]);
    const respondByRunningScript = responseFileName.split('SCRIPT-')[1];

    if (respondByRunningScript) {
        return require(`../mocks/${respondByRunningScript}.js)({ responseKey }`);
    } else if (shouldThrowWithCode) {
        return createError(shouldThrowWithCode);
    } else {
        return require(`../mocks/${responseFileName}.json`);
    }
};

serviceThis.parsePseudoEnv = username => {
    const envFile = path.resolve(__filename, `../../env/env.user.${username}`);
    const envLines = fs.readFileSync(envFile, 'utf8').split(EOL);
    let pseudoEnv = {};

    for (let i = 0; i < envLines.length; i++) {
        const currentSplitLine = envLines[i].split('=');
        pseudoEnv[currentSplitLine[0]] = currentSplitLine[1];
    }

    return pseudoEnv;
};

serviceThis.setMockUserResponseMap = pseudoEnv => {
    const userResponses = {};
    const propertyMap = pseudoEnv || process.env;

    Object.keys(propertyMap).forEach(key => {
        if (key.split('-')[0] === 'MOCK') {
            userResponses[key.split('MOCK-')[1]] = propertyMap[key];
        }
    });

    serviceThis.userResponseMap = { ...defaultResponseMap, ...userResponses };
    return serviceThis.userResponseMap;
};

serviceThis.stubResponse = (req, res) => res.json({ stubbed: true });
serviceThis.setMockUserResponseMap();
module.exports = serviceThis;
