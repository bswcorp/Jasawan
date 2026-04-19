# Architecture SVG Explanation

## Overview
Diagram SVG menggambarkan aliran data dan titik kedaulatan antara Public Cloud (contoh: Azure IoT Hub), Sovereign Gateway, dan SKAI Edge Nodes. Diagram menekankan tiga pilar: transport terenkripsi (libp2p), store-and-forward untuk kondisi intermittent (DTN), dan kedaulatan kunci serta kebijakan (HSM dan OPA).

## Elemen utama
- **Public Cloud**: sumber telemetry dan commands. Hanya metadata atau Merkle root yang boleh di-anchoring ke cloud sesuai kebijakan.
- **Sovereign Gateway**: titik translasi protokol, pembuatan Aksara artifact, penandatanganan lokal, dan penegakan kebijakan OPA.
- **SKAI Edge Node Cluster**: penyimpanan lokal berbasis CRDT untuk eventual consistency; Raft untuk state kritis.
- **Fallback Communications**: jalur alternatif (cellular, satellite, LoRa) untuk memastikan pengiriman pesan kritis.

## Security and Governance
- **Local KMS/HSM**: private keys tidak pernah meninggalkan perangkat lokal.
- **OPA Policy Gate**: semua inbound/outbound artifact dievaluasi; pelanggaran memicu containment dan notifikasi Ethics Board.
- **Anchoring**: Merkle root dari snapshot dapat di-anchoring ke cloud hanya bila policy mengizinkan.

## Usage notes
- Gunakan SVG ini di README atau dokumentasi presentasi.
- Untuk versi presentasi, ekspor SVG ke PNG/SVG yang dioptimalkan; pastikan metadata sensitif tidak tertanam.
- Perbarui warna atau label sesuai brand guidelines sebelum publikasi.

## File locations
- `docs/bridge/ARCHITECTURE-SVG.svg`
- `docs/bridge/ARCHITECTURE-SVG-EXPLAIN.md`
