<template>
  <div id="instructions" class="container">
    <h2 class="title is-2">Instructions</h2>
    <p class="content">
      To learn more about IAM Policies, check out
      <a
        href="https://aws.amazon.com/blogs/security/back-to-school-understanding-the-iam-policy-grammar/"
        target="_blank"
        >this blog</a
      >.
    </p>
    <p class="content">
      Here are some example policies.
    </p>

    <h4 class="title is-4">AWSLambdaBasicExecutionRole</h4>
    <pre class="content is-small">
{
  "Statement": [
    {
      "Action": [
        "logs:*"
      ],
      "Effect": "Allow",
      "Resource": "arn:aws:logs:*:*:*"
    },
    {
      "Action": [
        "s3:GetObject",
        "s3:PutObject"
      ],
      "Effect": "Allow",
      "Resource": "arn:aws:s3:::*"
    }
  ],
  "Version": "2012-10-17"
}</pre
    >

    <h4 class="title is-4">AdministratorAccess</h4>
    <pre class="content is-small">
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": "*",
            "Resource": "*"
        }
    ]
}</pre
    >

    <h4 class="title is-4">Other AWS Managed Policies</h4>
    <div>
      To see what the AWS Managed Policies give you, see this
      community-maintained list:
      <a href="https://github.com/glassechidna/trackiam/tree/master/policies">
        AWS Managed Policies</a
      >. Note that actual policy is in the "Document" field of the data files.
    </div>
  </div>
</template>

<script>
export default {
  name: 'Instructions',
}
</script>

<style scoped></style>
