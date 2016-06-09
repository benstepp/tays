lint:
	@node_modules/.bin/eslint "lib/**/*.js" "test/**/*.js"

setup:
	@docker-compose -f docker/docker-compose.yml build
	@docker-compose -f docker/docker-compose.yml up -d

test:
	@node_modules/.bin/mocha \
		'test/**/*_test.js' \
    --harmony-proxies \
    --reporter dot \
    --require test/test_helper.js

testwatch:
	@docker-compose -f docker/docker-compose.yml up

coverage:
	@node_modules/.bin/istanbul cover _mocha \
		-- 'test/**/*_test.js' \
		--harmony-proxies \
		--reporter dot \
		--require test/test_helper.js;
	@open coverage/lcov-report/index.html

build:
	@rm -rf dist &> /dev/null || true
	@node_modules/.bin/babel lib --out-dir dist/ --source-maps inline

.PHONY: lint test coverage build
