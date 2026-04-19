package skai.policy

default allow = false

deny[msg] {
  input.action == "ingest"
  input.meta.purpose == "mass_surveillance"
  msg = "Prohibited: mass surveillance ingestion"
}

deny[msg] {
  input.action == "export"
  input.artifact.type == "AksaraArtifact"
  not input.meta.consent_for_export
  msg = "Prohibited: export of AksaraArtifact without explicit consent"
}

allow {
  input.action == "ingest"
  input.meta.provenance_valid == true
  not deny[_]
}

allow {
  input.action == "export"
  input.artifact.type == "AksaraArtifact"
  input.meta.consent_for_export == true
  input.meta.provenance_valid == true
}
