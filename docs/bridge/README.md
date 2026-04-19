# Azure to SKAI Migration Bridge Design — Sovereign Gateway

## Purpose
Sovereign Gateway is an edge-first gateway that translates, secures, and synchronizes data between public cloud systems (example: Azure) and the SKAI JASAWAN sovereign edge fabric. It preserves local sovereignty by keeping keys and policy local, enabling offline operation, and mapping cultural data models such as Aksara Nusantara into verifiable, signed artifacts that travel across libp2p and DTN overlays.

## Components
- Gateway Adapter: translator for cloud protocols to SKAI artifacts.
- Sync Engine: queueing, DTN bundling, libp2p transport, Merkle reconciliation.
- Local KMS: HSM or secure element for signing and key protection.
- Policy Gate: OPA enforcement of Prohibited Uses.
- Telemetry & Audit: local Prometheus + signed append-only logs.

## Protocol Mapping
| Cloud Protocol | Gateway Function | SKAI Protocol |
|---|---|---|
| MQTT / AMQP | Ingest, auth mapping, sign | libp2p stream; DTN bundle |
| HTTPS REST | Ingest, validate, sign | libp2p stream; CRDT update |
| Azure IoT Twin | Translate twin state to CRDT | CRDT merge + Merkle anchoring |

## Aksara Nusantara Integration
Artifacts are wrapped in JSON-LD with glyphs, provenance, and signature. Transliteration only with explicit consent.

## Security Model
Keys in HSM, DID identities, OPA policy enforcement, Merkle anchoring optional.

## PoC Steps
Provision gateway host, deploy adapter + sync, configure MQTT, start libp2p node, simulate outage, validate reconciliation.
