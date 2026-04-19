# Gateway Runbook — Sovereign Gateway SKAI

## Purpose
Panduan operasional harian untuk Gateway SKAI: bootstrap, update, recovery, dan audit.

## Bootstrap Steps
1. Flash signed base image ke SBC.
2. Provision secure element (HSM/ATECC).
3. Set hostname dan node-id.
4. Deploy container: adapter, sync engine, OPA policy.
5. Join libp2p mesh; verifikasi peer discovery.
6. Jalankan smoke test: telemetry ingestion, artifact delivery.

## Daily Ops
- Monitor telemetry via Prometheus lokal.
- Review audit logs (append-only, signed).
- Cek status baterai dan power supply.
- Apply OTA signed updates (canary → rollout).
- Review OPA policy changes sebelum deploy.

## Incident Response
- **Comm blackout**: aktifkan DTN store-and-forward; log queue.
- **Power outage**: switch ke solar+battery; monitor discharge curve.
- **Policy violation**: OPA auto-containment; Ethics Board notified.
- **Hardware fault**: failover ke node cadangan; escalate ke ops team.

## Recovery
- Gunakan signed snapshots untuk restore state.
- Lakukan Merkle reconciliation antar node.
- Verifikasi signature dan DID sebelum rejoin mesh.

## Audit & Governance
- Ethics Board review bulanan.
- Publish hash summary logs ke publik (tanpa data sensitif).
- Test key recovery (Shamir shares) setiap kuartal.
