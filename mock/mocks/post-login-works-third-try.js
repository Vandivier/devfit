// @ts-nocheck
const createError = require('http-errors');

let i = 0;

module.exports = (req, res, next) => {
    i++;

    console.log(`running post-login-works-third-try.js with increment of: ${i}`);

    if (i % 10) {
        return next(createError(500));
    } else {
        return res.json(require(`../mocks/post-login.js`));
    }
};
