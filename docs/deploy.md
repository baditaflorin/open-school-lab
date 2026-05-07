# Deploy

Live URL: https://baditaflorin.github.io/open-school-lab/

Deployment mode: Mode A, GitHub Pages only.

Publish source: `main` branch, `/docs` folder.

Manual publish:

```sh
make build
git add docs
git commit -m "chore: publish pages build"
git push origin main
```

Rollback:

```sh
git revert <publishing-commit-sha>
git push origin main
```

GitHub Pages does not support `_headers` or `_redirects`; SPA fallback is handled by copying `docs/index.html` to `docs/404.html`.
