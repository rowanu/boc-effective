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
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "logs:CreateLogGroup",
        "logs:CreateLogStream",
        "logs:PutLogEvents"
      ],
      "Resource": "*"
    }
  ]
}
      </pre
    >
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
