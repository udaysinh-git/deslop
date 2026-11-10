---
name: deslop
description: "Remove AI slop from writing and interfaces. Use for prose (rewrite or review text that sounds AI-written: not-X-but-Y contrasts, one-line closers, dashes, forced threes, inflated or sales wording, bold labels, chatbot filler), for UI (a screen that looks AI-generated, vibe-coded or templated: purple gradients, gradient text, glows, glass cards, emoji icons, pill badges, centered heroes, three-card grids, fake proof, uneven spacing, bouncy or pulsing motion) for UX (too many choices, missing states, slow or absent feedback, unrecoverable errors) and for chat replies that should be brief and human (answer first, no filler, whole sentences). Trigger on humanize, unslop, deslop, de-AI, polish, 'be brief', 'less fluff', 'sounds like ChatGPT', 'looks like AI made it', and whenever you write copy or build UI that will be published."
license: MIT
---

# Deslop

A model picks the most likely option at every decision. Each choice is defensible, and the sum is a watermark: prose that fits any subject, a screen that fits any product. No single phrase or gradient gives it away, so patching one changes nothing. Walk the whole thing.

Slop removal has two halves. First remove the defaults. Then make sure what is left belongs to this writer or this product, because clean and generic is only the next template.

## Pick the reference

| Working on | Read |
| --- | --- |
| Prose: posts, docs, READMEs, commit and PR text, messages | [references/prose.md](references/prose.md) |
| A screen, page or component | [references/ui.md](references/ui.md), then [references/ux.md](references/ux.md) |
| Animation and transitions | [references/motion.md](references/motion.md) |
| Words on a screen | the UI copy section of prose.md |
| Replies in a conversation | [references/chat.md](references/chat.md) |

A real interface needs all of them. Read only what the task touches.

## Procedure

1. Look at the real thing, and look for stated preferences (a writing sample, a brand, dark or light, a design system) in the conversation and the project. Read the whole text. For UI, render it and look at it at the size people will see it: `node scripts/shot.mjs <file-or-url>` writes the screenshots. Code hides what a screenshot shows.
2. Audit. List every tell with its location, strongest first.
3. Set the scope from the audit. Tells everywhere: do the full pass. A few tells in otherwise good work: fix only those. None: say so, offer at most three exact refinements, and stop. Never change good work to make it different.
4. Subtract before you rewrite or restyle. For each sentence, element and word ask what breaks if it is gone. "Nothing" means delete it. "It adds interest" is the reason the model put it there.
5. Fix what remains, in the order the reference gives. For UI this includes writing the direction first and building the moment it names; removing tells without those two steps only produces a cleaner template.
6. Recheck. Rewrites reintroduce tells, so run `node scripts/check.mjs <file>` (prose or UI, it picks by extension) and fix every FAIL. Then run the swap test below and, for UI, the finish gate in ui.md.
7. Report what changed and why, in a line per change. For UI, include the direction and name the moment.

## Rules that hold everywhere

- Keep the facts. Never add a name, number, quote, claim, feature or testimonial that the source or the user did not give you. If a line needs a detail you lack, ask or write a plainer line.
- The swap test. Put a competitor's name on it. If the headline, paragraph or screen still fits, it is generic: rewrite it with this subject's own nouns, data and behavior.
- One emphasis per unit. One accent color, one primary action, one emphatic sentence. When everything is highlighted, nothing is.
- Uniform treatment is the tell. Bold on every bullet, the same card three times, a fade on every section, a closing line after every paragraph. People apply a treatment where it means something.
- Weigh a tell by how rarely a careful person does it on purpose. A purple glow or "it's not X, it's Y" justifies an edit alone. A single dash or a rounded card needs company.
- Deliberate choices win. A writing sample, a brand color or an existing design system overrides the defaults here.
- Half-fixed is worse than untouched. Finish a pass across the whole text or screen before starting the next.

## Output

For pasted text, return the rewrite and a short list of what changed. For a file, edit the prose in place and leave code, commands, paths and data alone. For UI, show the audit and the direction first and wait for a yes unless told to just do it, then report each change with the problem it fixed ("auto-submit on the sixth digit: one less tap"). When another task calls this skill for a commit, PR or doc, return only the final text.
