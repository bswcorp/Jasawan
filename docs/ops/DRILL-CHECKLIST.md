# Drill Checklist — SKAI Resilience

## Drill A — Power Outage 72h
- [ ] Inventory baseline snapshot
- [ ] Switch off grid
- [ ] Run on solar+battery
- [ ] Monitor uptime core services
- [ ] Verify 72h survival

## Drill B — Comm Blackout
- [ ] Ensure DTN agents active
- [ ] Isolate gateway backbone
- [ ] Send store-and-forward messages
- [ ] Restore backbone
- [ ] Run Merkle reconciliation

## Drill C — Radiation / Bitflip
- [ ] Inject faults (bitflip)
- [ ] ECC detection
- [ ] Snapshot recovery
- [ ] Verify no critical data loss

## Drill D — EMP / Faraday Recovery
- [ ] Controlled EMI test
- [ ] Power cycle node
- [ ] Verify boot integrity
- [ ] Check signed snapshots
- [ ] Rejoin mesh

## Drill E — Policy & Ethics Trigger
- [ ] Simulate prohibited use
- [ ] OPA auto-containment
- [ ] Ethics Board notification
- [ ] Audit log recorded

## Post-Drill
- [ ] Collect forensic logs
- [ ] Root cause analysis
- [ ] Update playbooks
- [ ] Community debrief
