# HSM Integration Guide

## Purpose
Securely store private keys used to sign SKAI artifacts. Keys never leave HSM; signing via HSM API. Backup via Shamir Secret Sharing.

## Patterns
- **PKCS#11 HSM**: use pkcs11 library to sign digests.
- **ATECC608A**: provision unique keypair, sign via I2C.
- **YubiHSM/Nitrokey**: vendor SDK for signing.

## Shamir Backup
Split recovery secret into N shares, threshold T. Distribute to custodians. Test recovery regularly.

## Example (Go pseudocode)
```go
digest := sha256.Sum256(payload)
sig, _ := hsm.Sign(digest[:])
