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

A full pass starts with a written direction. Write it before touching anything, put it in a comment at the top of the file, and repeat it in the report. No direction, no edits: without one, a cleaned screen falls back to a serif headline on cream or charcoal with hairline rows, which is the current template.

```
Product:   tide tables for surfers on one stretch of coast.
Character: salty, exact, early-morning.
World:     harbour chalkboards, sea charts, low light. A dark blue-grey ramp, one buoy orange.
Moment:    today's tide curve fills the hero, drawn from the real numbers, with "now" marked on it.
Signature: every time in tabular figures, with a small tick at high water.
Concept:   the page is the tide board at the harbour mouth.
```

- Product says what it does and for whom. Derive everything else from it, never from what is trending.
- Character is two or three concrete words. Clean, modern, sleek, minimal and premium are banned because they describe every template.
- World is the place or material the product belongs to. It decides the neutral tint and the accent, so name the colors here.
- Moment names an element you will build, in words a developer could start from. "A strong hero" names nothing.
- Signature is one small detail used consistently.
- Concept is the sentence every later choice is checked against. It must hold in the empty, in-use and done states and rule out at least one thing you would otherwise do.

If two different products could share your direction, it is still generic. Rewrite it.

Light or dark is a decision, and light is not the default. A stated preference from the user or the project wins, so look for one before choosing. Otherwise keep the mode the screen already has. For a new screen, take it from where the product is used (a night sky, an editor, a cockpit: dark; a printed form, a kitchen counter: light) and give the reason in the World line. Never fill a page with pure white: the lightest page surface is tinted and stays under about 96% lightness.

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
7. Details. Inner radius = outer radius - padding, never below 4. Control shape follows the character (technical: 2 to 6px; soft: large radii; editorial: underlines), and "because it's standard" is no reason. One depth cue per surface. No dotted or dashed lines, chart gridlines included: use a faint solid hairline or nothing. A label never overlaps the thing it labels. Every state exists: hover, focus, pressed, disabled, loading, empty, error, success.
8. The moment. Build the one the direction named. See below.
9. Motion. Delete by default, keep what gives feedback or explains a change, tune it with motion.md.

## The moment

Every full pass builds one moment, and a long page may have two. A screen with tidy type and no moment is unfinished, however clean it is. Start from the kind of screen:

| Screen | Default moment |
| --- | --- |
| Landing page or hero for a tool | The product at work, built in HTML and CSS in the page: the one artifact the headline promises (an invoice, a diff with a comment, a booked week). It takes the largest area of the first screen. |
| Login, OTP, confirmation, empty state | A behavior or a surface from the world: the code tiles fill and submit themselves, the card of a flight tracker leaves like a plane, a sky sits behind it. |
| Dashboard or app screen | The main content drawn with care: one chart or table given two thirds of the width, with the single figure that matters set large. |
| A place, a person, a portfolio | Their real photographs or work, large. |
| Settings and plain forms | A state change done well. The signature carries the rest. |

Other routes when the default does not fit: proportion (the important thing takes most of the screen) or type (one number or line set as the whole screen, where the number is the answer). A flat illustration of the product's world and a giant word above an ordinary form are the two fakes: they look designed in a still and mean nothing.

Sample content inside a product preview is not a claim about the product. An example invoice to a made-up client is allowed and should be specific (a real-sounding name, line items that add up, a date). A made-up customer count, testimonial, statistic or feature is not allowed.

Three tests before you keep it:

- Describe it without its styling. "Large serif headline" fails. "The hero is this week's calendar with one slot already booked" passes.
- A stranger can guess why it is there.
- It is built, with its next state if it has one. A moment that exists only in the direction does not count.

Screens people stay on for minutes (apps, dashboards, settings) keep neutral surfaces, and their moment is content. Doorway screens seen for seconds (login, OTP, empty state, hero) may carry a field or an object if a stranger could guess why it is there, its palette has at most three hues from the world, it has real light and depth, and the UI on top stays quiet and legible. A gradient is slop as decoration and craft as material: a sky behind a flight tracker passes, an unexplained iridescent wash does not. Chrome, liquid metal and glossy 3D pass only when the object means something in this product. A borrowed real object must behave like one: paper does not fade in.

## Below the first screen

A good hero does not excuse the rest of the page. Identical ruled rows under it are the fallback again.

- Each section has one job and takes its shape from its content. Two neighboring sections never share a layout.
- Show, then tell. A feature is a small working piece of the product (the search with a query typed in, one row in its edited state) with a sentence beside it. A feature with nothing to show gets one sentence or gets cut.
- Carry the world down the page: the same tinted surfaces, the signature, and the hero's own data continuing (the record from the hero appears again in its next state).
- Vary the scale. One section is large and the next is compact. Equal weight everywhere reads as a template.
- Close on the primary action with the one line that earns it. "Ready to get started?" earns nothing.
- A short page is fine. Three sections with a job each beat eight that fill space. Never add pricing, FAQ, testimonials or platform claims you were not given facts for.

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
| Light surfaces | page `#f1f0ed`, card `#f7f6f3`, raised `#e8e7e3`, text `#171717` / `#525252` / `#6b6b6b`; same tinting, never pure white |
| Shadows (light) | `0 1px 2px rgb(0 0 0 / .05)` small, `0 8px 24px rgb(0 0 0 / .06)` floating |
| Icons | 16 or 18px, stroke 1.5, secondary text color |

## Finish gate

The pass is not done while any of these fails. Fix and recheck, up to two rounds, then report what still fails.

1. `node scripts/check.mjs <file>` reports no FAIL. It greps for the tells a model cannot see in its own output.
2. You looked at the render. `node scripts/shot.mjs <file>` writes screenshots at 1280 and 390 wide; open them and check for overlap, clipped text and empty bands. If you cannot render, say so in the report and do not claim the gate passed.
3. The direction is in the file, and each line names something only this product has.
4. You can point at the moment in the markup. If you cannot, build it now.
5. The fallback check: a serif headline, a cream or charcoal page, hairline rows and nothing else means the moment is missing. So does a strong hero with identical rows under it.
6. No dead band. At 1280px wide, no section is more than about 40% empty space with no job, and the first screen is composed as a whole.
7. Swap in another product's name. If the screen still fits, push the copy, the moment and the signature further.
8. The light or dark mode follows a stated preference, the input, or a reason given in the direction, in that order.
9. Delete one more thing. If something breaks, put it back and stop.
