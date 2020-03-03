install:
	npm install
start:
	npx babel-node src/index.js ./src/before.json ./src/directory/after.json
publish:
	npm publish --dry-run
lint:
	npx eslint .
test:
	npm test
test-coverage:
	npm test -- --coverage
