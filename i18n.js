module.exports = {
    locales: ["id", "en"],
    defaultLocale: "id",
    localeDetection: false,
    pages: {
        "*": ["common", "stats", "navbar"],
        "/": ["home"],
        "/pokemon": ["homepage"],
    },
};
