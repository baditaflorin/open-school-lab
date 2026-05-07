.PHONY: help install-hooks dev build test test-integration smoke lint fmt pages-preview clean hooks-pre-commit hooks-commit-msg hooks-pre-push data release

help:
	@grep -E '^[a-zA-Z_-]+:.*?## ' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "%-22s %s\n", $$1, $$2}'

install-hooks: ## Wire local git hooks
	git config core.hooksPath .githooks
	chmod +x .githooks/*

dev: ## Run the frontend dev server
	npm run dev

build: ## Build Pages-ready static site into docs/
	npm run build
	test -f docs/index.html
	cp docs/index.html docs/404.html

data: ## Mode A has no data pipeline
	@echo "Mode A: no static data pipeline is required."

test: ## Run unit tests
	npm run test

test-integration: ## No separate integration suite in v1
	@echo "No integration tests for Mode A v1."

smoke: build ## Build and run Playwright smoke tests
	npm run smoke

lint: ## Run linters and type checks
	npm run lint
	npm run fmt:check
	npx tsc --noEmit

fmt: ## Autoformat files
	npm run fmt

pages-preview: build ## Serve docs locally like GitHub Pages
	npx vite preview --host 127.0.0.1 --port 4173

hooks-pre-commit: ## Run pre-commit hook manually
	.githooks/pre-commit

hooks-commit-msg: ## Run commit-msg hook manually with MSG=.git/COMMIT_EDITMSG
	.githooks/commit-msg $${MSG:-.git/COMMIT_EDITMSG}

hooks-pre-push: ## Run pre-push hook manually
	.githooks/pre-push

release: build test smoke ## Create a local release candidate
	@echo "Tag with: git tag v0.1.0 && git push origin v0.1.0"

clean: ## Remove generated outputs
	rm -rf docs coverage
