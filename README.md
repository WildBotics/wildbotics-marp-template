# WildBotics · Marp theme

A [Marp](https://marp.app) theme for WildBotics slides, so talks and training
materials can be written in Markdown, kept in Git, and exported to HTML, PDF,
PPTX or PNG. It follows the layouts of the Bristol Flight Lab template in the
WildBotics green and navy, with a curved edge taken from the ring around the
WildBotics logo.

The matching site theme is used on <https://wildbotics.github.io/>, so a
module's slides and its page look like the same course.

## Quick start

```bash
npm install
npm run build        # dist/slides.html  (self-contained, iframe-friendly)
npm run pdf          # dist/slides.pdf
npm run pptx         # dist/slides.pptx  (image-backed slides)
npm run watch        # rebuild HTML on save
npm run serve        # preview server for every .md in the repo
```

Exports need Google Chrome, Chromium or Edge. The VS Code
[Marp extension](https://marketplace.visualstudio.com/items?itemName=marp-team.marp-vscode)
previews decks live; point its `markdown.marp.themes` setting at
`themes/wildbotics.css`.

If you call `marp` yourself from a script or CI job, pass `--no-stdin`, or it
waits for input that never comes.

## Writing a deck

```markdown
---
marp: true
theme: wildbotics
paginate: true
header: "WildBotics · S1 Drone operator training"
footer: "your.email@example.org"
author: "Your Name"
---
```

Slides are separated by `---`. Pick a layout with a class directive:

| Class | Layout | Notes |
|---|---|---|
| *(none)* | Title and content | Green band with the wordmark, navy footer rule |
| `title` | Title slide | Graded green field, white text, a large curved picture area on the right, and the EU emblem. No footer or page number |
| `title-inverted` | Inverted title | White field, navy title, the mark on green. Good for a closing slide |
| `section` | Section header | `# Title` plus one `##` line, in a green band across the middle |
| `blank` | Blank | Footer rule only |
| `blank-logo` | Blank with logo | Colour wordmark plus footer rule |
| `acknowledgements` | Acknowledgements | Partner logos, the EU emblem and funding statement, and the WildBotics channels. Needs only a title |

```markdown
<!-- _class: section -->

# Part 2

## Into the field
```

`_class` with the underscore applies to that slide only.

### Columns

```html
<div class="columns">
<div>

Left column Markdown

</div>
<div>

Right column Markdown

</div>
</div>
```

Keep the blank lines inside each `<div>` so the Markdown is parsed. `columns-3`
gives three columns.

### Utilities

- `.callout` (grey box with a green rule), `.caption`, `.center`, `.small`,
  `.tiny`, `.muted`
- Colour spans `.green .navy .leaf .sky .bark .amber`
- `.tag` for module codes: `<span class="tag">R1</span>`, `<span class="tag navy">S1</span>`,
  `<span class="tag sky">T5</span>`. A list item that starts with a tag loses its bullet.

Images use Marp's [image syntax](https://marpit.marp.app/image-syntax):
`![center w:600](fig.svg)`, `![bg right:40%](photo.jpg)`. KaTeX maths, raw
HTML (`<iframe>`, `<video>`) and presenter notes (HTML comments, `P` in the
HTML deck) all work as in the Flight Lab template.

## The title picture

The title slide's picture area shows the WildBotics mark until you give it a
picture, which is scaled to cover the area and clipped to its curve:

```markdown
<!-- _class: title -->

# Your talk title

![hero](fieldwork.jpg)
```

The crop is centred. To move it, add
`<style scoped>section { --wb-hero-at: 30% 50%; }</style>` to the slide, with
the horizontal and vertical focus.

## Acknowledgements

End every public deck with the acknowledgements slide. The theme draws the
partner logos, the EU emblem, the funding statement and the WildBotics
channels, so the slide needs only a title:

```markdown
<!-- _class: acknowledgements -->

# Thank you
```

## Palette

| Token | Hex | From the logo |
|---|---|---|
| `--wb-green` | `#408A34` | "Wild", the leaf, the ring |
| `--wb-green-dark` | `#2F7328` | green for text on white (5.8:1) |
| `--wb-leaf` | `#8DC63F` | highlight stroke |
| `--wb-navy` | `#0D3A56` | "Botics", the outer arc |
| `--wb-sky` | `#4A90B8` | the river |
| `--wb-bark` | `#7A4A2A` | the bear |
| `--wb-amber` | `#E0A526` | accent |

White on `--wb-green` is 4.3:1, which is fine for the bold header and title text
it is used for, but not for small body text.

## Theme internals

- `src/wildbotics.css` is the editable theme. Bands, fields and rules are CSS
  gradients, so colours and sizes are custom properties at the top of the file.
- `npm run build:theme` inlines `assets/` as data URIs into
  `themes/wildbotics.css`, which is what Marp loads. Commit both.
- `assets/` holds the wordmark (colour and white), the illustrated mark, the
  curved edges and the title background, the EU emblems, the partner logos,
  and the social icons (credited in `assets/icons/README.md`). The PNGs are cut from the logo JPEG by
  `brand/make_artwork.py` in the WildBotics site's source repository; the SVGs are drawn by
  hand. Replace them with vector originals if a designer can supply them.

## Using the theme in another repo

```bash
npm install --save-dev @marp-team/marp-cli "github:WildBotics/wildbotics-marp-template#v0.1.0"
```

```yaml
# .marprc.yml
themeSet: node_modules/wildbotics-marp-template/themes
```

## Licence

The WildBotics name, logo and artwork belong to the WildBotics consortium and
are for WildBotics materials only. The layout design derives from the Bristol
Flight Lab template, by the same author. Decks you write with the theme are your
own content.
