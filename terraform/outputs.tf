output "s3_bucket_name" {
  description = "S3 bucket holding the built site. deploy.sh reads this to know where to sync dist/."
  value       = aws_s3_bucket.site.bucket
}

output "cloudfront_distribution_id" {
  description = "CloudFront distribution ID. deploy.sh reads this to invalidate the cache after a deploy."
  value       = aws_cloudfront_distribution.site.id
}

output "cloudfront_domain_name" {
  description = "Live URL for the site."
  value       = "https://${aws_cloudfront_distribution.site.domain_name}"
}

# To add a custom domain later: request/validate an ACM certificate in
# us-east-1 (CloudFront requires it there regardless of aws_region), add it
# plus `aliases` to the aws_cloudfront_distribution, replace the
# viewer_certificate block with acm_certificate_arn + minimum_protocol_version,
# and point a Route53 (or your DNS provider's) record at cloudfront_domain_name.
