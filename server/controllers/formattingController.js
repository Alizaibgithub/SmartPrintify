const formattingService = require('../services/formattingService');

exports.validateFormatting = async (req, res) => {
  try {
    const result = await formattingService.validateFormatting(req.file, req.body);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message || 'Formatting validation failed.' });
  }
};
