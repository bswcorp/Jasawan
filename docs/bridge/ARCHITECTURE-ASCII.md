                                +----------------------+
                                |      Public Cloud    |
                                |   (Azure IoT Hub)    |
                                +----------+-----------+
                                           |
                                           | MQTT / HTTPS / AMQP
                                           |
                                +----------v-----------+
                                |   Sovereign Gateway  |
                                |  (Gateway Adapter)   |
                                |  - MQTT/HTTP ingest  |
                                |  - OPA policy gate   |
                                |  - Local KMS / HSM   |
                                |  - Aksara artifact   |
                                +---+---+---+---+---+--+
                                    |   |       |   |
            libp2p / encrypted      |   |       |   |   DTN bundles
            streams (peer-to-peer)  |   |       |   |   store-and-forward
                                    |   |       |   |
         +----------------+   +-----v---v--+ +--v----+   +----------------+
         |  SKAI Edge     |   |  SKAI Edge | | SKAI  |   |  Satellite /   |
         |  Node Cluster  |   |  Node      | | Node  |   |  Cellular Mesh  |
         |  (CRDT store)  |   |  (Raft ctl)| | (LoRa)|   |  (fallback)     |
         +-------+--------+   +------------+ +-------+   +----------------+
                 |                    |            |
                 | Merkle reconciliation / CRDT   |
                 | exchange on restore            |
                 +--------------------------------+

Key control and governance:
- **Local KMS/HSM**: private keys never leave gateway or secure element.
- **OPA Policy Gate**: all inbound/outbound artifacts evaluated; violations trigger containment.
- **Ethics Board Hook**: policy alerts and advisory workflow; manual override and audit.
- **Anchoring**: Merkle root anchoring to cloud only when policy allows.
