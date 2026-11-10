# Motion

Delete first. Looping pulses on things that are not live, shimmer on headings, breathing glows, parallax, `transition-all`, `hover:scale` on cards and a fade on every section all go. Motion stays when it gives feedback or explains where something came from or went. Tune what stays with these values.

## Curves

- Things entering: ease-out, like `cubic-bezier(0.22, 1, 0.36, 1)`.
- Things already on screen moving somewhere else: ease-in-out.
- Everyday UI gets no spring bounce or overshoot. Springs are for things people throw or drag.
- Anything under a finger or cursor (drag, swipe, scrub) follows it 1:1 with no easing. Easing starts on release.
- A long move travels on a slight arc.

## Durations

| Use | Duration |
| --- | --- |
| Hover, press, toggles | 120 to 180ms |
| Dropdowns, menus, popovers, tooltips | 150 to 250ms |
| Sheets, page entrances, layout changes | 300 to 500ms |
| Exits | about 20% shorter than the matching entrance |
| Stagger between list rows | 30 to 50ms, six rows at most, then the rest arrive together |

## Origin

- A popover, menu or tooltip grows from its trigger (`transform-origin` at the trigger), starting near `scale(0.95)` with opacity. It never starts from `scale(0)` or from the center of the screen.
- It leaves back toward the trigger.
- When one state replaces another, the new one comes in as the old one leaves, with no blank frame between.
- An element present in both states moves as one object (the same `layoutId` in Motion, or a view transition).

## Feedback

- Buttons scale to 0.97 on press.
- A moving knob (toggle, slider thumb) stretches about 12% along its travel, then settles.
- Success gets one pulse, once.
- Secondary details settle a beat after the main element lands.
- Icons swap with a crossfade plus a little scale and blur, from about `scale(0.8)` and `blur(2px)`.
- Reveals and color changes can wipe with a mask or `clip-path`.
- A drag past its boundary rubber-bands, then returns.

## Implementation

- Animate `transform`, `opacity`, `filter`, `clip-path` and color. Never width, height, top or left.
- Animations are interruptible: a second click mid-transition reverses from the current position.
- Honor `prefers-reduced-motion`.
