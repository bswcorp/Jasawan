---
name: Daily Check — Dev Lead
about: Development tasks for libp2p, adapter, and HSM integration
title: "Daily Check — Dev Lead — {{date}}"
labels: ["daily-check","dev"]
assignees: []
---

## Daily Checklist
- [ ] Review PRs for code quality and placeholders (HSM/OPA)
- [ ] Ensure OPA call is integrated before signing in adapter
- [ ] Replace SIGNATURE_PLACEHOLDER with HSM stub in staging
- [ ] Harden libp2p host creation (security, transports, discovery)
- [ ] Run local smoke tests:
  - `MODE=node go run main.go` (node)
  - `go run main.go` (gateway)
- [ ] Document reproduction steps for any bugs

## Notes
- Blockers:
- Tasks to hand off:
