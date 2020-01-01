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
    <h3 class="title is-3">Examples</h3>
    <p class="content">
      Here's an example policy.
    </p>

    <h4 class="title is-4">AWSLambdaBasicExecutionRole</h4>

    <pre>
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
}
    </pre>
    <h3 class="title is-3">AWS Managed Policies</h3>
    <div>
      To see what the AWS Managed Policies give you, see this
      community-maintained list:

      <a href="https://github.com/glassechidna/trackiam/tree/master/policies">
        AWS Managed Policies</a
      >

      Note that actual policy is in the "Document" field of the recorded data.
    </div>
  </div>
</template>

<script>
export default {
  name: 'Instructions',
}
</script>

<style scoped></style>
