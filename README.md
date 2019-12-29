# effective

An online tool to expand an IAM Policy action wildcards, so that the effective
permissions are made explicit.

Useful for when working with AWS Managed Services, which use wildards
extensively.

## Vue Plugin

Effective functionality is a Vue plugin.

### Testing

It can be supplied an `allActions` option at installation for testing purposes.
If no array is supplied, it will download a list of valid IAM Actions from
https://awspolicygen.s3.amazonaws.com/js/policies.js.

### Development

For local development, actions are loaded from `public/policies.js`.

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
