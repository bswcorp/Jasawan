# Jasawan
“Judge our skai infrastructure for your want.”
# Sovereign Titan Genesis (STG)

## Licensing
- Open Source License: [LICENSE](LICENSE)
- Commercial Agreement: [COMMERCIAL_LICENSE_AGREEMENT.md](COMMERCIAL_LICENSE_AGREEMENT.md)
- Exhibits: [docs/exhibits/](docs/exhibits/)
- Governance: [docs/governance/ETHICS_BOARD.md](docs/governance/ETHICS_BOARD.md)

For more information, visit [www.QuorumState.International](http://www.QuorumState.International).

# Sovereign Gateway for SKAI JASAWAN

**Purpose**  
Sovereign Gateway is an edge‑first gateway that translates, secures, and synchronizes data between public cloud systems (example: Azure) and the SKAI JASAWAN sovereign edge fabric. It preserves local sovereignty by keeping keys and policy local, enabling offline operation, and mapping cultural data models such as Aksara Nusantara into verifiable, signed artifacts that travel across libp2p and DTN overlays.

**Scope**  
- PoC: telemetry ingestion and command relay between Azure IoT and SKAI nodes.  
- Production: hardened gateway appliances with HSM, multi‑path comms, OPA policy enforcement, and Ethics Board hooks.

**High Level Flow**
1. Cloud publishes telemetry or commands to Gateway Adapter (MQTT/HTTPS).  
2. Gateway Adapter authenticates, signs, and translates payload into SKAI artifact (Aksara payload or binary bundle).  
3. Sync Engine queues and routes artifacts over libp2p overlay or DTN bundles to SKAI nodes.  
4. Local nodes apply CRDT merges or Raft entries; signed snapshots anchor state.  
5. Audit logs and minimal metadata may be anchored to cloud only when policy allows.

**Repository Layout**
- `docs/bridge/README.md` — detailed bridge design and bootstrap.  
- `gateway/adapter/` — Gateway Adapter skeleton (Dockerfile + minimal bridge).  
- `gateway/sync/` — Sync Engine skeleton.  
- `policies/` — OPA Rego templates for Prohibited Uses.  
- `docs/blueprint/` — SKAI blueprint, BOM, and test playbooks.  
- `docs/governance/ETHICS_BOARD.md` — Ethics Board charter and SOP.

**Key Principles**
- **Sovereignty**: private keys and policy remain local.  
- **Resilience**: store‑and‑forward, multi‑path comms, graceful degradation.  
- **Cultural Integrity**: Aksara Nusantara preserved as first‑class data model with verifiable signatures.  
- **Minimal Metadata**: only necessary metadata leaves local domain.

  # Azure to SKAI Migration Bridge Design

## Goals
- Provide a robust, auditable, and sovereign translation layer between cloud protocols and SKAI protocols.
- Preserve Aksara Nusantara as canonical representation for cultural data at gateway level.
- Ensure offline operation and secure reconciliation after connectivity restoration.

## Components
- **Gateway Adapter**: containerized translator for cloud protocols to SKAI artifacts.
- **Sync Engine**: queueing, DTN bundling, libp2p transport, Merkle reconciliation.
- **Local KMS**: HSM or secure element for signing and key protection.
- **Policy Gate**: OPA enforcement of Prohibited Uses and automatic containment.
- **Telemetry & Audit**: local Prometheus + signed append‑only logs.

## Protocol Mapping
| **Cloud Protocol** | **Gateway Function** | **SKAI Protocol** |
|---|---:|---|
| MQTT / AMQP | Ingest, auth mapping, sign | libp2p stream; DTN bundle |
| HTTPS REST | Ingest, validate, sign | libp2p stream; CRDT update |
| Azure IoT Twin | Translate twin state to CRDT | CRDT merge + Merkle anchoring |

## Aksara Nusantara Integration
- **Canonical Aksara Payload**: JSON‑LD wrapper with fields:
  - `id` (DID URI)
  - `script` = "AksaraNusantara"
  - `content` = base64 or UTF encoding of glyph sequence
  - `lang` = ISO code or local tag
  - `meta` = minimal metadata (timestamp, provenance hash)
  - `signature` = JWS signed by local HSM
- **Transliteration Layer**: optional reversible transliteration to Latin for analytics while preserving original glyphs.
- **Rendering**: nodes store glyph sequences and rendering hints; rendering performed locally to avoid exposing raw glyphs.

## Security Model
- **Keys**: private keys in HSM/secure element; Shamir backup across trusted nodes.
- **Identity**: DID for gateway and nodes; VC for attestation.
- **Policy**: OPA Rego rules run on every inbound/outbound artifact; violations trigger containment and Ethics Board notification.
- **Anchoring**: Merkle root of signed snapshots can be anchored to cloud only when policy permits.

## Sync and Reconciliation
- **Local Consensus**: Raft for critical control state; CRDT for collaborative data.
- **Merkle Reconciliation**: exchange roots, fetch missing chunks, apply CRDT merges.
- **DTN**: Bundle Protocol for long latency or intermittent links; store‑and‑forward semantics.

## Multi Path Communications
- Primary: cellular multi‑SIM or fiber where available.  
- Secondary: satellite fallback (Starlink/Iridium).  
- Tertiary: LoRa for critical low‑bandwidth messages.  
- Transport: libp2p overlay for peer discovery and encrypted streams.

## Governance Hooks
- **Ethics Board**: receives automated alerts; advisory decisions recorded in signed logs.
- **Policy Lifecycle**: Rego rules tested in sandbox, signed, and deployed as bundles.

## PoC Bootstrap Steps
1. Provision gateway host with Docker.  
2. Install HSM emulator or secure element.  
3. Deploy `gateway/adapter` and `gateway/sync` containers.  
4. Configure Azure IoT connection string in adapter env.  
5. Start libp2p node on gateway and a minimal SKAI node locally.  
6. Simulate cloud outage and validate store‑and‑forward and reconciliation.

## Metrics and Acceptance
- **RTO** for core services ≤ 15 minutes.  
- **Critical service uptime** on local power 72 hours.  
- **No critical data loss** after reconciliation.

  # Aksara Nusantara Data Model

## Rationale
Aksara Nusantara glyphs are cultural artifacts. Gateway must treat glyph sequences as canonical, signed, and non‑transformed unless explicit consent for transliteration is given.

## Canonical JSON‑LD Schema
- `@context`: URI for SKAI Aksara context
- `id`: DID URI for artifact
- `type`: "AksaraArtifact"
- `script`: "AksaraNusantara"
- `glyphs`: base64 of glyph sequence or UTF encoding
- `renderHints`: font id, size, direction
- `provenance`: { issuerDID, issuedAt, sourceHash }
- `signature`: JWS compact

## Example
```json
{
  "@context": "https://skai.jasawan/contexts/aksara.jsonld",
  "id": "did:skai:node123:artifact456",
  "type": "AksaraArtifact",
  "script": "AksaraNusantara",
  "glyphs": "BASE64_GLYPH_SEQUENCE",
  "renderHints": { "font": "aksara-keris-v1", "dir": "ltr" },
  "provenance": { "issuerDID": "did:skai:gw1", "issuedAt": "2026-04-19T03:00:00Z", "sourceHash": "sha256:..." },
  "signature": "eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9..."
}



---

### Gateway Adapter Skeleton and Rego Policy Template

```text
# Files provided in gateway skeleton
- gateway/adapter/Dockerfile
- gateway/adapter/main.py (minimal bridge pseudocode)
- gateway/sync/Dockerfile
- gateway/sync/sync.py (sync engine pseudocode)
- policies/prohibited_uses.rego
- docs/bridge/README.md (this file)


package skai.policy

default allow = false

# Deny mass surveillance ingestion
deny[msg] {
  input.action == "ingest"
  input.meta.purpose == "mass_surveillance"
  msg = "Prohibited: mass surveillance ingestion"
}

# Allow telemetry if provenance and signature valid
allow {
  input.action == "ingest"
  input.meta.provenance_valid == true
  not deny[_]
}


###Gateway Adapter Pseudocode (Python)

# main.py pseudocode
import paho.mqtt.client as mqtt
from libp2p import new_node  # pseudocode
from hsm import sign  # pseudocode
from dtn import bundle_create  # pseudocode
from opa_client import evaluate_policy  # pseudocode

def on_mqtt(client, userdata, msg):
    payload = msg.payload
    meta = extract_meta(payload)
    policy = evaluate_policy({"action":"ingest","meta":meta})
    if not policy.allow:
        log("policy deny", policy)
        return
    signed = sign(payload)
    artifact = create_aksara_artifact(payload, signed, meta)
    if should_use_dtn(meta):
        bundle = bundle_create(artifact)
        queue_for_dtn(bundle)
    else:
        libp2p_send(artifact)

# bootstrap libp2p node and mqtt client



