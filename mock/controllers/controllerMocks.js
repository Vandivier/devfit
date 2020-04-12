// @ts-nocheck
const proxy = require('http-proxy-middleware');
const router = require('express').Router();

const serviceMocks = require('../services/serviceMocks');
const mapMockResponse = serviceMocks.mapMockResponse;
const stubResponse = serviceMocks.stubResponse;

router.get('/profile', (req, res) => mapMockResponse(req, res));
router.get('/posts', (req, res) => mapMockResponse(req, res));
router.get('/post/*', (req, res) => mapMockResponse(req, res));
router.get('/tags', (req, res) => mapMockResponse(req, res));

router.post('/login', (req, res) => stubResponse(req, res));
router.post('/register', (req, res) => stubResponse(req, res));

router.all('/comment*', (req, res) => stubResponse(req, res));
router.all('/user', (req, res) => mapMockResponse(req, res));

// router.use('/*', proxy({ target: process.env.PROXY, changeOrigin: true }));

module.exports = router;
