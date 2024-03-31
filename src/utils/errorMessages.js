const consoleFonts = require('./consoleFonts');

module.exports = {
    error: (message) => {
        return `${consoleFonts.error}${message}${consoleFonts.resetFont}`;
    },
    success: (message) => {
        return `${consoleFonts.success}${message}${consoleFonts.resetFont}`;
    },
    warning: (message) => {
        return `${consoleFonts.warning}${message}${consoleFonts.resetFont}`;
    }
}