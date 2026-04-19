# Provisioning Scripts — Skeleton (safe examples)

## Goals
- Standardize provisioning.
- Ensure secure element provisioning and node registration.
- Keep scripts minimal and non‑sensitive.

## Example steps (manual / scriptable)
1. Flash base image:
   ```bash
   sudo dd if=skai-base.img of=/dev/mmcblk0 bs=4M status=progress && sync
