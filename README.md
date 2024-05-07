# Demo-Application
Demo Application



--------AWS Application Hosting API Gateway-------------------- 

What we are going to do: 
We will host any application code to GitHub 
We will create one workflow: .github/workflows> ecs.yml
We need to store some repo secrets to the github repo setting like: AWS_ACCESS_KEY_ID, AWS_SECRET_KEY, AWS_DEFAULT_REGION, AWS_ACCOUNT_ID

This .yml will create set of resources in aws account that are, 
a. IAM role (with ECS , ECR, API permission)
b. ECR service with docker image (mentioned in the Docker file )
c. With this ECR image will create one ECS cluster
d. ECS cluster will have service and task also one task definition 
e. Create separate VPC , Application LoadBalancer, Target Group 
f. Create Api Gateway > Resource> Deploy stages

---------------------------------------------------


IAM Role should have below policy : 

{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "execute-api:Invoke"
            ],
            "Resource": [
                "arn:aws:execute-api:us-east-1:891377199948:wkw9cusu0l/*/POST/*",
                "arn:aws:execute-api:us-east-1:891377199948:lwy0aom7xk/*/POST/*"
            ]
        }
    ]
}


----------------------------------------------------------------


{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "ecs:RunTask",
                "ecs:StopTask",
                "ecs:DescribeTasks",
                "ecs:ListTasks",
                "ecs:DescribeTaskDefinition",
                "ecs:RegisterTaskDefinition",
                "ecs:UpdateService",
                "ecs:CreateService",
                "ecs:DeleteService"
            ],
            "Resource": [
                "arn:aws:ecs:us-east-1:891377199948:cluster/demo-cluster1",
                "arn:aws:ecs:us-east-1:891377199948:service/demo-cluster1/demo_service_new05"
            ]
        },
        {
            "Effect": "Allow",
            "Action": [
                "ecr:GetAuthorizationToken",
                "ecr:GetDownloadUrlForLayer",
                "ecr:BatchGetImage"
            ],
            "Resource": "*"
        },
        {
            "Effect": "Allow",
            "Action": [
                "logs:CreateLogGroup",
                "logs:CreateLogStream",
                "logs:PutLogEvents"
            ],
            "Resource": "arn:aws:logs:*:*:*"
        }
    ]
}
