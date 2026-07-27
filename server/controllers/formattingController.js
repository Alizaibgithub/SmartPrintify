const formattingService = require('../services/formattingService');

exports.validateFormatting = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        status: 'error',
        message: 'No file uploaded.',
      });
    }

    const result = await formattingService.validateFormatting(req.file, req.body);
    return res.status(200).json(result);
  } catch (error) {
    const statusCode = error.message.includes('Invalid') || error.message.includes('Only') ? 400 : 500;

    return res.status(statusCode).json({
      success: false,
      status: 'error',
      message: error.message || 'Formatting validation failed.',
    });
  }
};
