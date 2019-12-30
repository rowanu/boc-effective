CFN_TEMPLATE_PATTERN ?= *.template
OUTPUT_TEMPLATE ?= out.yaml
S3_BUCKET ?= rowanudell-2019-deployment
STACK_PREFIX ?= boc-effective

.PHONY: src/actions.json # Force update
src/actions.json:
	node fetch.js

dist:
	npm run build

.PHONY: install
install:
	npm install

.PHONY: clean
clean:
	rm -rf dist/

.PHONY: test
test:
	npm run test

.PHONY: lint
lint: cfn-lint vue-lint

.PHONY: vue-lint
vue-lint:
	npm run lint

.PHONY: cfn-lint
cfn-lint:
	yamllint --strict ${CFN_TEMPLATE_PATTERN}
	cfn-lint -t ${CFN_TEMPLATE_PATTERN}

.PHONY: site
site:
	aws cloudformation deploy \
		--stack-name ${STACK_PREFIX}-site \
		--no-fail-on-empty-changeset \
		--template-file site.template

.PHONY: pipeline
pipeline:
	aws cloudformation deploy \
		--capabilities CAPABILITY_IAM \
		--stack-name ${STACK_PREFIX}-pipeline \
		--template-file pipeline.template
