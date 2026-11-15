# Achievement OS

Personal achievement dashboard for AI research and aviation systems.

## Preview

This is **version 0.1**. The current records are explicitly marked as **demo data** and are **not** verified personal achievements.

- Landing page: experimental dark editorial portfolio
- AI Lab: four vertical columns (ML / Deep Learning / Reinforcement Learning / LLM)
- Aviation: four vertical columns (RM / Dynamic Pricing / Simulation / Research)
- Each column independently scores and sorts latest achievements first
- Click any achievement to open a detailed record
- Responsive layout, keyboard focus, reduced-motion support

## GitHub Pages

Once the PR is merged, go to **Settings → Pages → Build and deployment → Deploy from a branch**, select **main** and **/(root)**. The project URL will be:

https://ningningzhang-nina.github.io/achievement-dashboard/

## Maintaining achievements

Edit \`data/achievements.json\` in GitHub. Each entry has:

\`\`\`json
{
  "id": "unique-slug",
  "section": "ai",
  "category": "ml",
  "title": "Task title",
  "date": "2026-11-15",
  "points": 10,
  "summary": "One sentence",
  "background": "Why",
  "process": "What was done",
  "result": "What was produced",
  "takeaway": "What was learned"
}
\`\`\`

AI categories: \`ml\`, \`dl\`, \`rl\`, \`llm\`.
Aviation categories: \`rm\`, \`dp\`, \`sim\`, \`research\`.

For real entries, remove \`"demo": true\`. The score totals are calculated from these records, never maintained separately.

**Privacy:** This repository is public. Do not upload internal algorithms, airline/customer data, unpublished confidential project details, or employer proprietary material.

## Design references

Inspired by the information hierarchy and restraint of [Brittany Chiang](https://brittanychiang.com/) and [Lee Robinson](https://leerob.com/); not a reproduction of either site.

## Technology

Plain HTML/CSS/JavaScript, zero build dependencies; compatible with GitHub Pages.
