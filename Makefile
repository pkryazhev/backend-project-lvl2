install:
	npm ci

genDiff:
	node bin/gendiff.js

lint:
	npx eslint .

test:
	npm test

publish:
	npm publish --dry-run

test-coverage:
	npm test -- --coverage