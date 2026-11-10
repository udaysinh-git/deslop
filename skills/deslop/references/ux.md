# UX

Generated screens look plausible and work badly. Run these checks in the layout pass and again on the finished screen. The law behind each check is named so you can look it up.

## Checks

| Check | Pass when | Law |
| --- | --- | --- |
| Few choices | One primary action per screen. Long option lists are grouped or cut. | Hick |
| Big, near targets | Touch targets are at least 44px, padded if the visible element is smaller. The key action sits where the thumb or cursor already is. | Fitts |
| Familiar patterns | Navigation, search and standard icons are where people expect them. Novelty goes into the moment. | Jakob |
| Grouping | Related things sit closer or share a surface. Spacing first, a surface second, lines last. | Proximity, common region |
| Chunks | Long numbers and codes are grouped (`4821 9930`). Long forms are split into short sections. | Miller |
| Fast response | Every action shows a reaction within 400ms: a pressed state, an optimistic update or a loading state. | Doherty |
| One standout | The primary action looks different from everything near it. | Von Restorff |
| Order | The most important items open a list or page, and the next most important close it. | Serial position |
| A good ending | The last screen of a flow (sent, paid, done) states the result clearly and gets the most care. | Peak-end |
| Visible progress | Multi-step flows show where you are and how much is left. | Goal gradient |
| The system does the work | Defaults are filled in, codes autofill, a complete input submits itself. Complexity moves into the product, not onto the user. | Tesler |
| Errors prevented | Inputs are constrained (numeric keypad, date picker), impossible actions are disabled, destructive ones are confirmed or undoable. | Poka-yoke |
| Errors recoverable | Undo beats "are you sure". Messages say what happened and what to do. Input is never wiped. | |
| Consistency | One style per role and one way to do each job across screens. | |
| Gradual depth | Advanced options sit behind a disclosure. | Progressive disclosure |
| Short path | Count the taps and fields for the main job, then cut one. | |

## States

A model draws the happy path and stops. Every screen and control needs each state that applies: empty, loading, partial, error, success, disabled, hover, focus and pressed. Skeletons match the real layout. A pending action shows on the button that was pressed.

## Details models skip

| Detail | Check |
| --- | --- |
| Layout shift | Images and async content have reserved space. Nothing jumps when data arrives. |
| Optimistic update | The UI shows the result at once and reconciles with the server after. |
| Focus | Visible focus rings, a sensible tab order, and focus returns to the trigger when a dialog closes. |
| Safe area | `env(safe-area-inset-*)` is respected, so nothing sits under the notch or home bar. |
| Affordance | A clickable thing looks clickable at rest, not only on hover. |
| Combo box | A long select becomes a searchable combo box. |
| Widows | No lone word on the last line of a headline (`text-wrap: balance`, or `pretty` for paragraphs). |
| Optical alignment | A play icon sits slightly right of true center. Text in a button is centered by eye. |
| Kerning and tracking | Check display-size pairs like `AV` and `To`. Tracking is 0 for small text. |
| Mixed fonts | A mono beside a sans matches its x-height or runs a size smaller. |
| Contrast | 4.5:1 for text, measured over the real background, images and gradients included. |
| Reduced motion | `prefers-reduced-motion` keeps opacity and color changes and drops movement. |
