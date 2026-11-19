# Fonts

Put self-hosted font files here (WOFF2 preferred). Self-hosting keeps the site fast and avoids outside requests.

Once the reference typefaces are chosen, add an `@font-face` block at the top of `css/style.css` pointing to these files with relative paths, for example `url("../assets/fonts/YourFont.woff2")`, then update `--font-body` and `--font-display` in `:root`.
