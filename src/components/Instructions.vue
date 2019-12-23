<template>
  <div id="instructions">
    <h1>Instructions</h1>
    <p>
      Paste or edit
    </p>
    <h2>Example</h2>
    <p>
      Here's an example policy. AWSLambdaBasicExecutionRole
    </p>

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
    <h2>AWS Managed Policies</h2>
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
