install:
	npm install
start:
	npx babel-node src/gendiff.js
publish:
	npm publish --dry-run
lint:
	npx eslint .
