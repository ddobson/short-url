module.exports = {
    "env": {
        "node": true,
        "es6": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaFeatures": {
            "experimentalObjectRestSpread": true
        },
        "sourceType": "module"
    },
    "rules": {
        "prefer-const": 2,
        "prefer-arrow-callback": 1,
        "indent": [
            "error",
            2
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "never"
        ],
        "no-var": 2,
        "dot-notation": [
            "warn"
        ],
        "object-curly-spacing": [
            "warn",
            "always"
        ],
    }
};
