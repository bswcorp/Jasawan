# TEST PLAYBOOKS — SKAI Resilience Drills

## Overview
Playbooks ini dirancang untuk menguji ketahanan SKAI terhadap gangguan besar: power outage, comm blackout, radiation/bitflip, EMP/Faraday, dan policy triggers.

## Drill A — Power Outage 72h
1. Precheck: inventory, baseline snapshot, battery health.
2. Action: matikan grid; alihkan ke solar+battery.
3. Monitor: uptime layanan inti, battery discharge curve, telemetry.
4. Success: layanan inti berjalan 72 jam; data critical tersimpan.

## Drill B — Comm Blackout
1. Precheck: ensure DTN agents aktif.
2. Action: isolate gateway backbone.
3. Action: kirim pesan store‑and‑forward antar node.
4. Recovery: pulihkan backbone; jalankan Merkle reconciliation.
5. Success: tidak ada data loss; konflik CRDT termerge.

## Drill C — Radiation / Bitflip Simulation
1. Use fault injection tools to flip bits in memory/storage.
2. Verify ECC detection and snapshot recovery.
3. Success: ECC memperbaiki atau node pulih dari snapshot.

## Drill D — EMP / Faraday Recovery (simulasi aman)
1. Power cycle node dalam kondisi EMI terkontrol.
2. Verify boot integrity, signed snapshots, key availability.
3. Success: node boot, verifikasi signature, bergabung ke mesh.

## Drill E — Policy & Ethics Trigger
1. Simulate Prohibited Use detection.
2. OPA triggers automatic shutdown of risky modules.
3. Ethics Board receives notification.
4. Success: risky functions disabled; audit log tercatat.

## Post‑drill
- Forensic logs collection.
- Root cause analysis.
- Update playbooks and firmware.
- Community debrief and training.
