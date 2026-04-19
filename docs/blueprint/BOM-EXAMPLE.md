# BOM Example — SKAI Node & Gateway (Estimasi Harga + Depresiasi)

**Metode depresiasi**: Straight‑Line (SL)  
**Salvage value**: 10% dari cost  
**Useful life**: 5 years

Rumus depresiasi per tahun:


\[
\text{Depresiasi per tahun} = \frac{\text{Cost} - \text{Salvage}}{\text{Useful life}} = \frac{\text{Cost} - 0.10\cdot\text{Cost}}{5} = 0.18\cdot\text{Cost}
\]



## BOM — Node kelas komunitas (contoh)
| **Item** | **Unit Price (USD)** | **Qty** | **Total (USD)** | **Annual Depreciation (USD)** |
|---|---:|---:|---:|---:|
| Raspberry Pi CM4 (board) | 60 | 1 | 60 | 10.80 |
| Secure Element (ATECC608A) | 10 | 1 | 10 | 1.80 |
| SSD / eMMC 64GB | 20 | 1 | 20 | 3.60 |
| LoRa concentrator HAT | 120 | 1 | 120 | 21.60 |
| MPPT controller | 150 | 1 | 150 | 27.00 |
| LiFePO4 battery bank | 400 | 1 | 400 | 72.00 |
| Enclosure (weatherproof + EMI) | 80 | 1 | 80 | 14.40 |
| **Subtotal Node** |  |  | **840** | **151.20** |

## BOM — Gateway komunitas (contoh)
| **Item** | **Unit Price (USD)** | **Qty** | **Total (USD)** | **Annual Depreciation (USD)** |
|---|---:|---:|---:|---:|
| Industrial SBC (ECC RAM) | 250 | 1 | 250 | 45.00 |
| NVMe SSD 1TB | 120 | 1 | 120 | 21.60 |
| Multi‑SIM cellular modem | 200 | 1 | 200 | 36.00 |
| Satellite terminal (fallback) | 600 | 1 | 600 | 108.00 |
| UPS + inverter (Victron/Growatt) | 800 | 1 | 800 | 144.00 |
| Faraday enclosure (gateway) | 200 | 1 | 200 | 36.00 |
| **Subtotal Gateway** |  |  | **2170** | **390.60** |

## Total contoh (node + gateway)
| **Category** | **Total Cost (USD)** | **Annual Depreciation (USD)** |
|---|---:|---:|
| Node subtotal | 840 | 151.20 |
| Gateway subtotal | 2170 | 390.60 |
| **Grand Total** | **3010** | **541.80** |

### Contoh perhitungan book value setelah n tahun
Rumus book value setelah \(n\) tahun:


\[
\text{BookValue}_n = \text{Cost} - n \cdot \text{DepresiasiPerTahun}
\]


Contoh: BookValue Node setelah 3 tahun:


\[
\text{BookValue}_3 = 840 - 3 \cdot 151.20 = 385.60\ \text{USD}
\]



> **Catatan**: angka di atas adalah estimasi. Untuk tender/anggaran final, minta penawaran vendor lokal dan sesuaikan salvage value serta masa pakai sesuai kebijakan akuntansi organisasi.
