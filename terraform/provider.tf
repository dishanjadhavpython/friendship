provider "aws" {
  region = var.aws_region

  default_tags {
    tags = {
      Project   = "happy-friendship-day"
      ManagedBy = "terraform"
    }
  }
}
