#!/usr/bin/env bash
# Builds the site and publishes it to the AWS infrastructure provisioned by
# terraform/ — run `terraform apply` in terraform/ at least once first.
# Requires AWS credentials (aws configure, or the usual AWS_* env vars).
set -euo pipefail

cd "$(dirname "${BASH_SOURCE[0]}")"

if ! command -v aws >/dev/null 2>&1; then
  echo "AWS CLI not found. Install it (e.g. 'brew install awscli') and run 'aws configure' first." >&2
  exit 1
fi

echo "Building..."
npm run build

BUCKET=$(terraform -chdir=terraform output -raw s3_bucket_name)
DISTRIBUTION_ID=$(terraform -chdir=terraform output -raw cloudfront_distribution_id)
URL=$(terraform -chdir=terraform output -raw cloudfront_domain_name)

echo "Syncing dist/ to s3://$BUCKET ..."
aws s3 sync dist/ "s3://$BUCKET/" --delete

echo "Invalidating CloudFront cache..."
aws cloudfront create-invalidation --distribution-id "$DISTRIBUTION_ID" --paths "/*" >/dev/null

echo "Deployed: $URL"
