# SKAI BLUEPRINT — JASAWAN

## Ringkasan
SKAI adalah infrastruktur sovereign edge‑first yang bernafas: node lokal, mesh multi‑path, energy autonomy, self‑healing, dan governance berbasis OPA + Ethics Board.

## Arsitektur singkat
- Edge Sovereign Fabric: node komunitas dengan compute, storage, secure element.
- Multi‑Path Backbone: LoRa, Wi‑Fi mesh, multi‑SIM cellular, satellite fallback.
- Energy Autonomy: PV + MPPT + LiFePO4 + UPS.
- Resilience: ECC, snapshots, CRDT, DTN store‑and‑forward.
- Governance: OPA policy engine; Ethics & Sovereignty Board hooks.

## Komponen inti
- Hardware hardened: SBC (ARM/RISC‑V), secure element, SSD/NVMe, shielding.
- Networking: BATMAN‑adv, libp2p, DTN (Bundle Protocol).
- Data & Sync: CRDT + Merkle reconciliation; Raft untuk state kritis.
- Security: local KMS/HSM; DID + Verifiable Credentials.
- Observability: Prometheus lokal; logs lokal; remote aggregation optional.

## Deployment & Operasional
- Site survey → procure BOM → provisioning → bootstrap mesh → policy load → smoke tests → drills.
- Daily ops: monitoring, firmware signed updates, battery checks, audit log review.

## Testing & Drills
Lihat `docs/blueprint/TEST-PLAYBOOKS.md` untuk drill lengkap: Power Outage 72h, Comm Blackout, Radiation/Bitflip, EMP/Faraday recovery, Policy trigger.

## Governance
Ethics Board charter dan SOP di `docs/governance/ETHICS_BOARD.md`.

## Referensi implementasi
- Provisioning skeleton ada di `docs/ops/PROVISIONING-SCRIPTS.md`.
- BOM contoh dan nilai depresiasi ada di `docs/blueprint/BOM-EXAMPLE.md`.
- 
