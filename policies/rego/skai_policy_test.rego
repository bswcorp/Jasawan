package skai.policy_test

import data
import skai.policy

test_deny_mass_surveillance {
  input := {
    "action": "ingest",
    "meta": {"purpose": "mass_surveillance", "provenance_valid": true}
  }
  not skai.policy.allow with input as input
  some msg
  skai.policy.deny[msg] with input as input
}

test_deny_export_without_consent {
  input := {
    "action": "export",
    "artifact": {"type": "AksaraArtifact"},
    "meta": {"consent_for_export": false, "provenance_valid": true}
  }
  not skai.policy.allow with input as input
  some msg
  skai.policy.deny[msg] with input as input
}

test_allow_ingest_with_provenance {
  input := {
    "action": "ingest",
    "meta": {"purpose": "telemetry", "provenance_valid": true}
  }
  skai.policy.allow with input as input
}

test_allow_export_with_consent {
  input := {
    "action": "export",
    "artifact": {"type": "AksaraArtifact"},
    "meta": {"consent_for_export": true, "provenance_valid": true}
  }
  skai.policy.allow with input as input
}

test_reject_missing_provenance {
  input := {
    "action": "ingest",
    "meta": {"purpose": "telemetry", "provenance_valid": false}
  }
  not skai.policy.allow with input as input
}
