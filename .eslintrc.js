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
        "no-console": 0,
        "prefer-const": 2,
        "prefer-arrow-callback": 1,
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
