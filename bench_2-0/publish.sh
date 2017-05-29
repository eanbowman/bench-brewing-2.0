#!/bin/bash 
aws s3 sync client/. s3://benchbrewing.dev.massminority.com --profile massminority --acl public-read --region us-east-1  --cache-control max-age=0
aws s3 sync client/. s3://benchbrewing.staging.massminority.com --profile massminority --acl public-read --region us-east-1 --cache-control max-age=0