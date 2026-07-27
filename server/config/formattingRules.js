const formattingRules = {
  document: {
    allowedFormats: ["pdf", "docx"],
    maxFileSizeMB: 10,
  },

  page: {
    margins: {
      top: "1 inch",
      bottom: "1 inch",
      left: "1 inch",
      right: "1 inch",
    },
    pageNumbering: true,
  },

  font: {
    family: "Times New Roman",
    size: "12pt",
    weight: "Normal",
    color: "Black",
  },

  spacing: {
    lineSpacing: "1.5",
    paragraphSpacing: "6pt",
  },

  headings: {
    mainHeading: {
      size: "14pt",
      weight: "Bold",
    },
    subHeading: {
      size: "12pt",
      weight: "Bold",
    },
  },

  structure: {
    requiredSections: [
      "Abstract",
      "Introduction",
      "Literature Review",
      "Methodology",
      "Results",
      "Conclusion",
      "References",
    ],
  },

  references: {
    required: true,
  },

  headerFooter: {
    headerRequired: true,
    footerRequired: true,
  },
};

module.exports = formattingRules;