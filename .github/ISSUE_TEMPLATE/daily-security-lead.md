---
name: Daily Check — Security Lead
about: Daily security audit and policy verification tasks
title: "Daily Check — Security Lead — {{date}}"
labels: ["daily-check","security"]
assignees: []
---

## Daily Checklist
- [ ] Run dependency audit: `go list -m -u all` and note critical updates
- [ ] Check CI results for `opa test` and unit tests
- [ ] Review any Rego changes and confirm test vectors exist
- [ ] Verify no hardcoded credentials in recent commits
- [ ] Update SECURITY-CHECKLIST.md if new findings arise
- [ ] Mark PRs that require threat model updates

## Notes
- Findings / vulnerabilities:
- Recommended mitigations:
