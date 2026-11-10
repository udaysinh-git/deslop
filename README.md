# deslop

An agent skill that removes AI slop from writing and interfaces. One skill covers three jobs:

- Prose: rewrites text that sounds generated (fake contrasts, one-line closers, dashes, forced threes, inflated wording, bold labels, chatbot filler) and keeps every fact.
- UI: audits a screen for generated-looking design (purple gradients, glows, emoji icons, pill badges, three-card grids), writes a direction from the product, deletes before restyling, and fixes spacing, color, type, layout and details in order.
- UX: checks the things models skip, such as choices per screen, target size, response time, missing states and error recovery, plus motion rules with exact values.

The whole skill is about 300 lines. `SKILL.md` holds the shared procedure, and the agent reads only the reference file the task needs.

## Install

```bash
npx skills add udaysinh-git/deslop
```

Add `-g` to install it for every project. To install by hand, copy `skills/deslop` into `~/.claude/skills/` (or your agent's skills folder).

## Use

```text
/deslop this README
/deslop the login page
```

It also triggers on its own when you ask an agent to humanize text, clean up a generated screen, or write copy or UI that will be published.

## Layout

```
skills/deslop/
  SKILL.md              shared procedure and rules
  references/prose.md   writing tells, method, voice, UI copy
  references/ui.md      visual tells, direction, passes, starting values
  references/ux.md      UX checks, states, details models skip
  references/motion.md  curves, durations, origin, feedback
```

## Credits

- The writing patterns draw on Wikipedia's [Signs of AI writing](https://en.wikipedia.org/wiki/Wikipedia:Signs_of_AI_writing), maintained by WikiProject AI Cleanup.
- The UI workflow is adapted from [unslop](https://github.com/heydamir/unslop) by Damir Sokolovsky (CC BY 4.0) and from [charles-unslop](https://github.com/LemonFace0309/charles-skills) by Charles Liu, which also builds on Emil Kowalski's design skills. Changes: condensed into one reference, merged with the prose and UX material, values retuned.
- The motion values and several UX rules come from Charles Liu's "Removing AI Slop" video series.
- The UX checks use the well-known laws collected at [Laws of UX](https://lawsofux.com).

## License

MIT. The parts adapted from unslop keep their CC BY 4.0 attribution above.
