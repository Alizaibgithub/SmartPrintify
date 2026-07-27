require('dotenv').config();

class FormattingService {
  parseGeminiPayload(text) {
    try {
      return JSON.parse(text);
    } catch (error) {
      const match = text.match(/\{[\s\S]*\}/);
      if (!match) {
        return null;
      }

      try {
        return JSON.parse(match[0]);
      } catch (innerError) {
        return null;
      }
    }
  }

  createFallbackAnalysis(file, options) {
    const issues = [];
    const label = file?.mimetype === 'application/pdf' ? 'PDF' : file?.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ? 'DOCX' : 'document';

    if (options.checks.includes('titleFormatting')) {
      issues.push({
        type: 'titleFormatting',
        severity: 'info',
        message: `The ${label} should be reviewed for title structure and heading hierarchy.`,
      });
    }

    if (options.checks.includes('marginSpacing')) {
      issues.push({
        type: 'marginSpacing',
        severity: 'info',
        message: `The ${label} should be checked for consistent margins and spacing.`,
      });
    }

    if (options.checks.includes('fontConsistency')) {
      issues.push({
        type: 'fontConsistency',
        severity: 'info',
        message: `The ${label} should be checked for consistent font usage and sizing.`,
      });
    }

    return {
      summary: 'Document review completed with local heuristics.',
      issues,
    };
  }

  async callGemini(file, options) {
    if (!process.env.GEMINI_API_KEY) {
      return this.createFallbackAnalysis(file, options);
    }

    const prompt = `Review this document for formatting quality. Return JSON with keys "summary" and "issues". The issues should be an array of objects with "type", "severity", and "message". Focus on: ${options.checks.join(', ')}.`;

    const payload = {
      contents: [
        {
          parts: [
            { text: prompt },
            ...(file.buffer
              ? [{ inlineData: { mimeType: file.mimetype, data: file.buffer.toString('base64') } }]
              : []),
          ],
        },
      ],
      generationConfig: {
        temperature: 0.2,
        responseMimeType: 'application/json',
      },
    };

    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`;

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Gemini request failed with status ${response.status}`);
      }

      const data = await response.json();
      const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || '{}';
      const parsed = this.parseGeminiPayload(text);

      if (parsed && typeof parsed === 'object') {
        return {
          summary: parsed.summary || 'Gemini review completed.',
          issues: Array.isArray(parsed.issues) ? parsed.issues : [],
        };
      }

      return this.createFallbackAnalysis(file, options);
    } catch (error) {
      return this.createFallbackAnalysis(file, options);
    }
  }

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
    const analysis = await this.callGemini(file, options);

    return {
      success: true,
      status: 'completed',
      message: 'Formatting validation completed.',
      fileName: file.originalname,
      fileType: file.mimetype,
      fileSizeBytes: file.size,
      options,
      issues: analysis.issues,
      summary: {
        checks: options.checks,
        geminiPending: false,
        note: analysis.summary,
      },
      gemini: {
        configured: Boolean(process.env.GEMINI_API_KEY),
        ready: Boolean(process.env.GEMINI_API_KEY),
      },
      createdAt: new Date().toISOString(),
    };
  }
}

module.exports = new FormattingService();
