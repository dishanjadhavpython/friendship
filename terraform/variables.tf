variable "aws_region" {
  description = "AWS region for the S3 bucket. CloudFront itself is a global service."
  type        = string
  default     = "us-east-1"
}

variable "bucket_name_prefix" {
  description = "Prefix for the S3 bucket name. A random 8-character suffix is appended because S3 bucket names must be globally unique across all AWS accounts."
  type        = string
  default     = "happy-friendship-day"

  validation {
    condition     = can(regex("^[a-z0-9][a-z0-9.-]{1,61}[a-z0-9]$", var.bucket_name_prefix))
    error_message = "bucket_name_prefix must be lowercase letters, numbers, dots, or hyphens, and start/end with a letter or number."
  }
}

variable "cloudfront_price_class" {
  description = "CloudFront price class. PriceClass_100 (US/Canada/Europe) is cheapest; PriceClass_All covers every edge location."
  type        = string
  default     = "PriceClass_100"

  validation {
    condition     = contains(["PriceClass_100", "PriceClass_200", "PriceClass_All"], var.cloudfront_price_class)
    error_message = "cloudfront_price_class must be one of PriceClass_100, PriceClass_200, PriceClass_All."
  }
}

variable "expected_account_id" {
  description = "If set, refuses to plan/apply unless authenticated against this AWS account ID — a guard against accidentally deploying to the wrong account. Set via terraform.tfvars (gitignored), not committed."
  type        = string
  default     = null
}
