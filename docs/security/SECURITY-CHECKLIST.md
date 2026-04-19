# Security Checklist — Sovereign Gateway / SKAI PoC

## Tujuan
Checklist ini membantu memastikan aspek keamanan teknis, operasional, dan governance sebelum merge, deploy, atau pilot.

## Repository & CI
- **[ ]** Semua secrets disimpan di GitHub Secrets atau secret manager; tidak ada secret di repo.
- **[ ]** `.gitignore` mencakup file kunci, credential, dan artefak build sensitif.
- **[ ]** CI pipeline menjalankan: `go build`, `go test`, `opa test`, dan image build.
- **[ ]** CI menolak merge jika policy tests gagal atau ada high-severity vuln (konfigurasi strict mode).

## Dependencies
- **[ ]** Jalankan dependency audit (`go list -m -u all` / `govulncheck`) dan dokumentasikan hasil.
- **[ ]** Periksa lisensi semua dependensi; pastikan kompatibilitas lisensi.
- **[ ]** Kunci versi dependensi di `go.mod` dan update terjadwal.

## Code & Secrets Hygiene
- **[ ]** Tidak ada hardcoded endpoints, API keys, atau private keys.
- **[ ]** Gunakan environment variables untuk konfigurasi sensitif.
- **[ ]** Pastikan logging tidak menulis secrets atau payload sensitif.

## Policy & Governance
- **[ ]** OPA Rego rules diuji (`opa test`) untuk skenario deny/allow utama.
- **[ ]** Policy change workflow: sandbox → signed policy bundle → staged deploy.
- **[ ]** Ethics Board notification flow terdokumentasi dan diuji.

## Key Management & HSM
- **[ ]** Private keys dihasilkan dan disimpan di HSM/secure element; tidak pernah diekspor.
- **[ ]** Integrasi PKCS#11 / vendor SDK tervalidasi di dev environment.
- **[ ]** Prosedur Shamir backup terdokumentasi; recovery drill dijadwalkan.
- **[ ]** Akses admin HSM dibatasi dan diaudit.

## Transport & Network
- **[ ]** libp2p konfigurasi: stream encryption, authenticated peers (DID), dan peer discovery aman.
- **[ ]** DTN/store-and-forward queue terenkripsi at-rest.
- **[ ]** Firewall / network policy membatasi akses management plane.
- **[ ]** NAT traversal dan relay usage diaudit; fallback comms (cellular/satellite/LoRa) dikonfigurasi minimal exposure.

## Artifact Handling & Data Protection
- **[ ]** Aksara artifacts disimpan sebagai canonical JSON‑LD; raw glyphs dilindungi.
- **[ ]** Export of cultural artifacts memerlukan explicit consent; enforced by OPA.
- **[ ]** Minimal metadata leaves domain; PII/identifiers redacted before any cloud anchoring.

## Logging, Monitoring & Audit
- **[ ]** Audit logs append-only, signed, dan disimpan lokal; hash summary dapat di-anchor.
- **[ ]** Prometheus / alerting untuk critical metrics (uptime, queue length, HSM errors).
- **[ ]** Retention policy dan secure archival untuk forensic.

## Operational Security & Drills
- **[ ]** Runbook dan drill checklist tersedia dan diuji (Power 72h, Comm Blackout, Key Recovery).
- **[ ]** Regular key rotation policy dan signed update pipeline.
- **[ ]** Incident response playbook: containment, forensics, Ethics Board escalation.

## Pre-merge / Pre-deploy Gate
- **[ ]** Security review completed by security lead.
- **[ ]** OPA tests pass.
- **[ ]** Dependency audit and license check completed.
- **[ ]** HSM integration validated in staging.
- **[ ]** PR includes threat model notes for reviewers.

## Post-deploy
- **[ ]** Smoke tests: ingestion → artifact creation → delivery → verification.
- **[ ]** Run key recovery drill within 30 days of deployment.
- **[ ]** Schedule quarterly audits and update playbooks.

