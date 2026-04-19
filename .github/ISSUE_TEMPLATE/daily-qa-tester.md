---
name: Daily Check — QA Tester
about: Testing and verification tasks for PoC
title: "Daily Check — QA Tester — {{date}}"
labels: ["daily-check","qa"]
assignees: []
---

## Daily Checklist
- [ ] Run unit tests: `go test ./...`
- [ ] Run policy tests: `opa test policies/rego`
- [ ] Execute E2E smoke: publish MQTT → artifact → sign → libp2p delivery
- [ ] Verify OPA denies `mass_surveillance` and export without consent
- [ ] Record latency, errors, and test results in test report
- [ ] Open issues for regressions and tag priority

## Notes
- Test results summary:
- Issues created:
