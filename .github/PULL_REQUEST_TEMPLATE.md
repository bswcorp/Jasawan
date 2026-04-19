## Ringkasan Perubahan
Tuliskan ringkasan singkat perubahan yang diajukan dan tujuan PR ini.

**Jenis perubahan**: (pilih) `feat` / `fix` / `docs` / `chore` / `ci` / `security`

---

## Perubahan Utama
- Daftar file/fitur utama yang ditambahkan atau diubah.
- Penjelasan singkat kenapa perubahan ini diperlukan.

---

## Checklist Pra-Merge (wajib)
- [ ] Branch dibuat dari `main` atau branch release yang sesuai.
- [ ] Tidak ada secrets atau credential di commit.
- [ ] Semua file sensitif di `.gitignore`.
- [ ] `go build` berhasil.
- [ ] `go test` lulus (atau ada alasan jelas jika ada test yang di-skip).
- [ ] `opa test` lulus untuk policy yang relevan.
- [ ] Dependency audit dilakukan dan hasil dicatat.
- [ ] HSM/PKCS#11 calls masih placeholder atau tervalidasi di staging.
- [ ] Dokumentasi (README, runbook, ops) diperbarui bila perlu.

---

## Security & Governance (wajib)
- **Security reviewer**: @security-lead
- **Governance / Ethics reviewer**: @ethics-board-rep
- **Infra reviewer**: @infra-team

- [ ] Threat model / security notes ditambahkan di PR description.
- [ ] Jika ada perubahan policy (Rego), sertakan test vectors dan hasil `opa test`.
- [ ] Jika ada HSM integration, sertakan langkah validasi di staging.

---

## Testing & Verifikasi
- Langkah-langkah untuk mereproduksi pengujian lokal:
  1. `go mod tidy`
  2. `go build ./...`
  3. `go test ./...`
  4. `opa test policies/rego`
  5. (Opsional) `docker build -t <image> gateway-libp2p-go`

- Hasil pengujian lokal / CI:
  - Build: pass / fail
  - Unit tests: pass / fail
  - OPA tests: pass / fail
  - Docker build: pass / fail

---

## Catatan untuk Reviewer
- Periksa placeholder (endpoints, DID, SIGNATURE_PLACEHOLDER).
- Fokus pada: HSM calls, policy enforcement, data exfiltration risk.
- Jika setuju, merge sebagai draft → lakukan staging deploy → run drills.

---

## Release Notes (singkat)
Tuliskan catatan rilis singkat yang akan muncul di changelog.

