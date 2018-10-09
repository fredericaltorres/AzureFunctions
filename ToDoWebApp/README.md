
# React Cheat Sheet

https://ihatetomatoes.net/wp-content/uploads/2017/01/react-cheat-sheet.pdf

# React Project

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

This is a demo repo showing how to use redux-utils. It is initially set up to use the example from theis blog:
https://medium.com/@notrab/getting-started-with-create-react-app-redux-react-router-redux-thunk-d6a19259f71f

It also includes eMoney's standard UI tooling - prettier and eslint (using eslint-emoney-config)



# Jest Configuration

https://jestjs.io/docs/en/getting-started

```bash
npm install --save-dev jest
jest --init
npm install --dev babel-jest babel-core regenerator-runtime
```

# enzyme Configuration

https://airbnb.io/enzyme/
npm i --save-dev enzyme enzyme-adapter-react-16 enzyme-to-json

## NPM configuration

## File .babelrc

```js
{
    "presets": [
		"env",
		"react"
	],
	"plugins": [
		"transform-class-properties",
		"transform-object-rest-spread"
	],
	"env": {
		"production": {
			"presets": [
				[ "es2015", { "modules": false } ],
				"react"
			]
		}
	}
}
```