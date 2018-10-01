module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true
    },
    "globals" : {
        "__TEST__": true,
        "expect": true,
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaFeatures": {
            "experimentalObjectRestSpread": true,
            "jsx": true
        },
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
        //"indent": [ "error", 4 ],
        "indent": [ 2, "tab" ],
        "linebreak-style": [
            "error",
            "windows"
        ],
        "quotes": [
            "error",
            "double"
        ],
        "semi": [
            "error",
            "always"
        ]
    }
};