# effective

## Vue Plugin

Effective is a Vue plugin.

It can be supplied an `allActions` option at installation for testing purposes.
If no array is supplied, it will download a list of valid IAM Actions from
https://awspolicygen.s3.amazonaws.com/js/policies.js.

### Development

For local development, actions are loaded from `public/policies.js`.

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your unit tests
```
npm run test:unit
```

### Run your end-to-end tests
```
npm run test:e2e
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## References

* https://awspolicygen.s3.amazonaws.com/js/policies.js
