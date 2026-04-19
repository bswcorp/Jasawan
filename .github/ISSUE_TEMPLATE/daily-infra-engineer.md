---
name: Daily Check — Infra Engineer
about: CI, staging infra, and build verification tasks
title: "Daily Check — Infra Engineer — {{date}}"
labels: ["daily-check","infra"]
assignees: []
---

## Daily Checklist
- [ ] Confirm CI workflow runs for feature branch
- [ ] Inspect build logs for Go and Docker; resolve failures
- [ ] Ensure runners have required caches and resources
- [ ] Sync GitHub Secrets with secret manager
- [ ] Verify staging VMs/SBCs are reachable and healthy
- [ ] Monitor disk, network, and queue metrics on staging

## Notes
- CI failures:
- Infra actions required:
