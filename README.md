# effective

An online tool to expand an IAM Policy action wildcards, so that the effective
permissions are made explicit.

Useful for when working with AWS Managed Services, which use wildards
extensively.

## AWS Actions


AWS Actions are downloaded from `https://awspolicygen.s3.amazonaws.com/js/policies.js`.

They are stored in `src/actions.json`, and they must be present for things to work.
Actions are updated when new services/features are available, and can be updated with `make actions`.

## Vue Plugin

IAM logic is encapsulated in a Vue plugin.

## Vue CLI Commands

```
# Project setup
npm install

# Compiles and hot-reloads for development
npm run serve

# Compiles and minifies for production
npm run build

# Run your unit tests
npm run test:unit

# Run your end-to-end tests
npm run test:e2e

# Lints and fixes files
npm run lint
```

See [Configuration Reference](https://cli.vuejs.org/config/).
