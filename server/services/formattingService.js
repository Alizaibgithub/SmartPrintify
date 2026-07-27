require('dotenv').config();

class FormattingService {
  parseOptions(input) {
    const defaults = {
      checks: ['titleFormatting', 'marginSpacing', 'fontConsistency'],
    };

    if (!input) {
      return defaults;
    }

    let parsed = input;

    if (typeof input === 'string') {
      try {
        parsed = JSON.parse(input);
      } catch (error) {
        throw new Error('Invalid options format.');
      }
    }

    if (typeof parsed !== 'object' || Array.isArray(parsed) || parsed === null) {
      throw new Error('Options must be a JSON object.');
    }

    return {
      ...defaults,
      ...parsed,
    };
  }

  async validateFormatting(file, body = {}) {
    if (!file) {
      throw new Error('No file uploaded.');
    }

    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ];

    if (!allowedTypes.includes(file.mimetype)) {
      throw new Error('Only PDF and DOCX files are supported.');
    }

    if (file.size > 10 * 1024 * 1024) {
      throw new Error('File size exceeds the 10MB limit.');
    }

    const options = this.parseOptions(body.options);

    return {
      success: true,
      status: 'received',
      message: 'Formatting validation request received.',
      fileName: file.originalname,
      fileType: file.mimetype,
      fileSizeBytes: file.size,
      options,
      issues: [],
      summary: {
        checks: options.checks,
        geminiPending: true,
      },
      gemini: {
        configured: Boolean(process.env.GEMINI_API_KEY),
        ready: false,
      },
      createdAt: new Date().toISOString(),
    };
  }
}

module.exports = new FormattingService();
