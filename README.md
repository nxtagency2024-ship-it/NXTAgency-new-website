# NXT Agency website

A static site built with HTML, CSS, and vanilla JavaScript. It runs on GitHub Pages with no build step and no server.

## Files

- `index.html`: the whole site on one page. Sections are hero (`#top`), services, portfolio, why NXT, packages, and contact (`#contact`). Menu links jump to these sections.
- `css/style.css`: all styles. The colors and fonts at the top are placeholders.
- `js/config.js`: all content you edit (services, portfolio, packages, sounds, form settings)
- `js/main.js`: startup screen, sound system, navigation, form handling. You shouldn't need to edit this.
- `assets/`: sounds, images, fonts, and the logo. Each folder has its own README.

## Matched to the screen recording

The look follows the reference recording (`ScreenRecording_11-12-2026_16-51-54_1.mp4`), which is a phone capture:

- **Colors** were sampled from the recording: white background with faint scanlines, black type and buttons, black menu panel, and a green status dot (`#23BE56`). See `:root` in `css/style.css`.
- **Startup**: a terminal-style boot sequence types out, then the title, subtitle, and START SYSTEM button appear. The startup sound plays on that click.
- **Hero**: status line, large uppercase headline, a typing line with a block cursor, and a full-width black button.
- **Menu**: full-screen black panel with monospace items. Tapping an item scrolls to its section.
- **Sections**: boxed panels with monospace `> NAME.EXT` labels.

Left out on purpose, because they belong to the reference company:

- Its logo (the cube mark). Use the NXT logo in `assets/logo/logo.svg` instead.
- Its copy, client names, project names, and statistics (such as its counters and revenue figures). The NXT content in `js/config.js` is unchanged, so review it before launch.
- Its newsletter section. Add one later if you want it.

Fonts are placeholders. The recording's headline font looks like a heavy grotesk, and its labels look like a monospace face. Check both against the recording and add the real files to `assets/fonts/`.

## Things to fill in

1. **Colors and fonts.** Replace the `:root` values in `css/style.css` with the exact values sampled from the screen recording. Everything reads from those variables. Pages and layouts are not yet matched to the recording, so expect a second pass.
2. **Form.** Create a form at [Formspree](https://formspree.io) or [Web3Forms](https://web3forms.com), then paste the endpoint into `formEndpoint` in `js/config.js`. Web3Forms also needs its key in `formExtraFields`. Until this is set, the form shows a clear "not connected" message instead of pretending to send.
3. **Email.** Set `contactEmail` in `js/config.js`.
4. **Sounds.** Add files to `assets/sounds/` using the names listed in that folder's README.
5. **Logo.** Save the official logo as `assets/logo/logo.svg`.
6. **Portfolio.** Replace the three placeholder projects in `projects`.
7. **Packages.** Replace the placeholder names, prices, summaries, and included items in `packages`. Prices stay as placeholders until you set them.
8. **Budget ranges.** Replace `budgetRanges` with your actual ranges.
9. **Copy review.** The homepage "Why work with NXT Agency" points (one team, clear pricing, support after launch) are my suggestions. Confirm they match how you actually work.
10. **Social preview.** Add an `og:image` to the pages once you have an image, using a full URL.

## Deploying to GitHub Pages

1. Put these files in a GitHub repository. The files should sit at the top level of the repo, or in a `docs/` folder.
2. In the repo, go to **Settings → Pages**, choose the branch and folder, and save.
3. Your site will be at `https://<username>.github.io/<repo>/`.

All links and asset paths are relative, so the site works under a repo subpath. Don't add a leading `/` to any path.

## Notes

- **Sound** only plays after a visitor interacts with the page, because browsers block autoplay. The startup sound plays when the visitor clicks the start button. The ON/OFF choice is remembered for the browser session.
- **Startup screen** runs once per browser session on the home page.
- **Motion** is reduced automatically for visitors who have reduced-motion turned on in their system settings.
- **Not tested in a browser yet.** The code has been reviewed but not run. Test the startup screen, sound toggle, form, and mobile menu after deploying.
