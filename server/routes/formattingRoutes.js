const express = require('express');
const multer = require('multer');
const formattingController = require('../controllers/formattingController');

const router = express.Router();
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
});

router.post('/validate', upload.single('file'), formattingController.validateFormatting);

module.exports = router;
