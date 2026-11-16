# Personal Research OS

Personal research notes and progress tracker. Built with vanilla HTML, CSS, and JavaScript for GitHub Pages.

## Pages

- **Home**: overview and latest activity
- **Projects** (`#/projects`): independent research objectives, each with a score and scrollable progress log
- **Topics** (`#/topics`): currently empty; reserved for independent learning progress
- **News & Notes** (`#/news`): standalone industry and business notes (0 XP), excluded from projects and topics
- **Details**: every progress entry has a permanent `#/task/<id>` route; projects and topics have detail pages

## Data

Progress entries live in `data/achievements.json`. Existing content and original IDs are retained.

```json
{
  "id": "unique-entry-id",
  "title": "Research note",
  "date": "2026-11-16",
  "type": "idea",
  "points": 5,
  "projectIds": ["event-impact-demand"],
  "topicIds": ["aviation", "causal-inference"],
  "summary": "Summary",
  "background": "Context",
  "process": "Progress",
  "result": "Outcome",
  "takeaway": "Learning",
  "references": []
}
```

- Add a project to `PROJECTS` or a topic to `TOPICS` in `app.js`, then link records using IDs.
- Entries can belong to multiple projects/topics; **the site-wide XP totals unique entries only**.
- A project's XP is its linked records' sum; a topic's XP is its linked records' sum. **Do not add topic scores together**, because entries can appear under several topics.
- Default score for new progress is 5 XP. News/industry notes have 0 XP; explicit per-entry values override the default.
- To record independent learning, use `projectIds: []` and one or more `topicIds`.
- Older `#/task/<id>` links remain valid. Legacy `#/ai` and `#/aviation` open Topics.

## Publish

GitHub Pages: Settings → Pages → Deploy from branch → main → /(root).

https://ningningzhang-nina.github.io/achievement-dashboard/

**Privacy:** repository content is public; never include confidential employer or customer information.
