package sovereign.policy

default allow = false

# Pajak gelap ditolak
deny[msg] {
  input.action == "tax"
  input.meta.type == "illegal"
  msg = "Prohibited: pajak gelap"
}

# Riba ditolak
deny[msg] {
  input.action == "finance"
  input.meta.type == "riba"
  msg = "Prohibited: transaksi riba"
}

# Ekspor data tanpa consent ditolak
deny[msg] {
  input.action == "export"
  not input.meta.consent
  msg = "Prohibited: export tanpa consent"
}

# Allow jika sesuai aturan
allow {
  not deny[_]
}
