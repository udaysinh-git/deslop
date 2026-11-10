# UI

Judge the rendered screen at the size people will see it. If it ships to a phone or a thumbnail, judge it there too.

## Tells

Audit against this list. Each line gives the tell and its fix.

| Group | Tell | Fix |
| --- | --- | --- |
| Color | Purple to blue gradients, gradient text, colored glows and shadows, neon borders, blurred blobs behind content | One neutral surface. An accent only where it means something. |
| Color | Five tints of one hue for text; everything highlighted | Three text roles from one ramp; the accent used once or twice per screen. |
| Color | Glass cards over a flat background | A plain raised surface. Glass needs something behind it worth seeing. |
| Type | Weights 800 to 900, uppercase labels with wide tracking, one random italic word in a headline, mono used as a vibe | Weights 400 to 500, sentence case, emphasis by size or color, mono for code and figures only. |
| Type | Mixed number formats, digits that jitter | One format, `tabular-nums`. |
| Icons | Emoji as icons, ✨ for anything AI, icons in mixed sizes and colors | One line set, one size, one stroke, a text color. Third-party logos keep their real colors. |
| Spacing | `mt-[13px]`, rows of different heights, groups closer to neighbors than to their own items | A 4px scale, one height and gap per set, tighter inside groups than between them. |
| Components | Pill badges everywhere (`New ✨`, `PRO`), everything a full pill, a sparkline in every stat card, dotted dividers | Remove, or one quiet text badge. Radius by size. A stat card is a number, its label and its change. |
| Structure | A divider where spacing would do, a card inside a card, two mechanisms for one job, a border plus shadow plus ring on one surface | Delete until each surface has one job and one depth cue. |
| Layout | Centered hero with a pill badge above it, three equal feature cards, bento grid, three or more buttons, avatar rows and star ratings as proof | Lay out by content, one primary action, show the real product, real proof or none. |
| Visuals | Glossy orbs, chrome blobs, glowing brains, robots, text baked into images, a hard-edged image that ignores the page color | The product itself or one concrete object from its world, blended into the page. |
| Motion | `animate-pulse` on things that are not live, `transition-all`, `hover:scale` on cards, everything fading in on scroll, bouncy springs | See motion.md. |
| Fallback | Grey page, Inter, white text, one brand-colored button on a product whose world is warm or loud | What a cleaned screen falls back to when nobody decided. Write a direction. |

## Direction

For a full pass, write five lines before touching anything. Derive them from what the product does, never from what is trending.

- Product: what it does and for whom, in one sentence.
- Character: two or three concrete words, like `calm, exact, a little warm`. Clean, modern, sleek, minimal and premium are banned because they describe every template.
- World: the place or material the product belongs to. A flight tracker lives in the sky, a tax tool near ruled ledgers. The world sets the neutral tint and the accent.
- Moment: the one place the screen spends its richness.
- Signature: one small detail only this product would have, used consistently.

Add a one-sentence concept that every later choice is checked against ("the invoice total is the page, and each paid line crosses itself off it"). It must hold in the empty, in-use and done states, and it must rule out at least one thing you would otherwise do.

If no product is named, ask. For a mock, assume one specific product, mark it `Product (assumed)`, and avoid defaulting to SaaS. For a real product you do not know, stay neutral and claim nothing. A real brand color stays. A violet gradient does not count as a brand.

## Subtract

Walk every icon, line, badge, caption, container and word twice, because deletions expose each other. The usual cuts: dividers that spacing replaces, subtitles that restate titles, wrappers around wrappers, the second of two mechanisms doing one job, a control floating beside its field (move it inside), and a step the system could do itself (auto-submit a complete code, autofill it from the message). Information people need is moved or shrunk, never lost.

## Passes

Run them in this order and finish each across the whole screen. Spacing changes how everything reads, copy length decides type and layout, and visuals and motion come last so they fit a screen that already works.

1. Spacing. Everything on the 4px scale. Same thing, same size. Icons in one column, labels on one line, numbers right-aligned. Then align by eye: optical center beats box center for icons and round shapes.
2. Color. One neutral ramp tinted toward the world, built in `oklch()`. One accent covering a few percent of the screen, its hue taken from the world. Apps and dashboards keep neutral surfaces and put color in the content. Text holds 4.5:1 against what is really behind it. Cream paper with earth tones is the newer default; use it only when the world asks for it.
3. Icons. One set, one size, one stroke.
4. Copy. See the UI copy section of prose.md.
5. Type. One interface family and at most one partner, used for one decision. Hierarchy from size and color. Headlines use `text-wrap: balance`, body lines run 45 to 75 characters.
6. Layout. Size by content: the main feature gets the most room. One primary action, visibly emphasized. No dead band at the largest viewport. Then run ux.md.
7. Details. Inner radius = outer radius - padding, never below 4. Control shape follows the character (technical: 2 to 6px; soft: large radii; editorial: underlines), and "because it's standard" is no reason. One depth cue per surface. Every state exists: hover, focus, pressed, disabled, loading, empty, error, success.
8. The moment. See below.
9. Motion. Delete by default, keep what gives feedback or explains a change, tune it with motion.md.

## The moment

Agents reach for a flat illustration of the product's world or a giant word above an ordinary form. Both look designed in a still and mean nothing. Sketch one idea of each kind and keep the one you can describe without its styling:

- Behavior: something the interface does that only this product would. The login card of a flight tracker leaves like a plane.
- Real content: the product's own data or output, drawn with care.
- Proportion: the important thing takes most of the screen.
- Type: one number or line set as the whole screen, where the number is the answer.
- A surface or object from the world.

Screens people stay on for minutes (apps, dashboards, settings) keep neutral surfaces, and their moment is content. Doorway screens seen for seconds (login, OTP, empty state, hero) may carry a field or an object if a stranger could guess why it is there, its palette has at most three hues from the world, it has real light and depth, and the UI on top stays quiet and legible. A gradient is slop as decoration and craft as material: a sky behind a flight tracker passes, an unexplained iridescent wash does not. Chrome, liquid metal and glossy 3D pass only when the object means something in this product. A borrowed real object must behave like one: paper does not fade in.

## Starting values

Keep a good existing system and fix how it is used. Otherwise start here and let the direction move it.

| Token | Value |
| --- | --- |
| Spacing scale | 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96, 128 |
| Gaps | 2 to 8 between related items, 12 to 24 between groups, 32 to 64 between sections |
| Row height | 32 compact, 36 default, 44 touch |
| Type sizes | 12 meta, 13 to 14 secondary, 14 to 15 body, 28 to 36 page title, 56 to 72 hero (36 to 44 on mobile) |
| Line height | 1.4 to 1.6 body, 1.0 to 1.15 display |
| Tracking | 0 under 16px, down to -0.03em at display sizes |
| Radius | 4 to 6 tags and small buttons, 8 to 10 inputs and buttons, 12 to 16 cards |
| Hairline | primary text color at 8% opacity |
| Dark surfaces | page `#141415`, card `#19191b`, raised `#232325`, text `#ededed` / `#a1a1a6` / `#85858b`; tint all of them slightly toward the world |
| Light surfaces | page `#fafafa`, card `#ffffff`, raised `#f4f4f5`, text `#171717` / `#525252` / `#737373`; same tinting |
| Shadows (light) | `0 1px 2px rgb(0 0 0 / .05)` small, `0 8px 24px rgb(0 0 0 / .06)` floating |
| Icons | 16 or 18px, stroke 1.5, secondary text color |

## Final checks

1. Swap in another product's name. If the screen still fits, push the copy, the moment and the signature further.
2. Ask what would make a designer suspect a model built this. Fix it and ask once more.
3. Name the one choice a competitor could not paste. No answer means the moment is not done.
4. Delete one more thing. If something breaks, put it back and stop.
