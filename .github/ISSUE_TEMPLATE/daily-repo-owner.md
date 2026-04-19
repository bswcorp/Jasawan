---
name: Daily Check — Repo Owner
about: Daily operational checklist for the repository owner / project coordinator
title: "Daily Check — Repo Owner — {{date}}"
labels: ["daily-check","repo-owner"]
assignees: []
---

## Daily Checklist
- [ ] Pull latest main and rebase feature branches
- [ ] Verify branch `feature/sovereign-gateway` is up to date with `main`
- [ ] Run quick secret scan: `git grep -n "KEY\|SECRET\|PASSWORD"`
- [ ] Review open PRs and ensure PR body includes pre-merge checklist
- [ ] Assign reviewers: security, infra, ethics
- [ ] Update project board status (kanban): move cards as needed
- [ ] Communicate blockers to team channel

## Notes
- Blockers:
- Action items for today:
