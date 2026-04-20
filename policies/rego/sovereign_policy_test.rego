package sovereign.policy_test

import sovereign.policy

test_deny_illegal_tax {
  input := {"action": "tax", "meta": {"type": "illegal"}}
  not sovereign.policy.allow with input as input
  some msg
  sovereign.policy.deny[msg] with input as input
}

test_deny_riba {
  input := {"action": "finance", "meta": {"type": "riba"}}
  not sovereign.policy.allow with input as input
  some msg
  sovereign.policy.deny[msg] with input as input
}

test_allow_legal_tax {
  input := {"action": "tax", "meta": {"type": "legal"}}
  sovereign.policy.allow with input as input
}

test_allow_finance_non_riba {
  input := {"action": "finance", "meta": {"type": "profit_sharing"}}
  sovereign.policy.allow with input as input
}
