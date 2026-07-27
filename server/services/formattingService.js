require('dotenv').config();

class FormattingService {
  async validateFormatting(file, body = {}) {
    if (!file) {
      throw new Error('No file uploaded.');
    }

    const options = body.options ? JSON.parse(body.options) : {};

    return {
      message: 'Formatting validation request received.',
      fileName: file.originalname,
      options,
      issues: [
        'Title formatting check pending',
        'Spacing check pending',
      ],
      geminiConfigured: Boolean(process.env.GEMINI_API_KEY),
    };
  }
}

module.exports = new FormattingService();
