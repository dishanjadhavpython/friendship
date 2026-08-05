data "aws_caller_identity" "current" {}

check "account_id_matches" {
  assert {
    condition     = var.expected_account_id == null || data.aws_caller_identity.current.account_id == var.expected_account_id
    error_message = "Authenticated as AWS account ${data.aws_caller_identity.current.account_id}, but expected_account_id is set to ${coalesce(var.expected_account_id, "")}. Refusing to proceed to avoid deploying to the wrong AWS account."
  }
}
