install:
	npm install
start:
	npx babel-node src/index.js ./src/before.json ./src/directory/after.json
publish:
	npm publish --dry-run
lint:
	npx eslint .
test:
	npx babel-node src/workbook.js
