const express = require('express');
const { uploadVideo } = require('../controllers/videoController');

const router = express.Router();

router.post('/upload', uploadVideo);

module.exports = router;
