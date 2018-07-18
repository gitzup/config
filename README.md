# config

[![Build Status](https://travis-ci.com/gitzup/config.svg?branch=master)](https://travis-ci.com/gitzup/config)
[![codecov](https://codecov.io/gh/gitzup/config/branch/master/graph/badge.svg)](https://codecov.io/gh/gitzup/config)

Node.js utility for configuration.

## Installation 

```sh
npm install @gitzup/config --save
```

## Usage

#### Getting Started

```javascript

// create a configuration object
const config = require( '@gitzup/config' )( {
    key1: new StringConfigValue( { default: "val1" } ),
    path1: {
        key2: new IntegerConfigValue( { default: 17 } ),
        key3: new IntegerConfigValue( { default: 29 } ),
    }
});

// pretty-print all key/value paths
console.info(); 
console.info( "Pretty print (useful for application startup):" ); 
config.print();

// access and print the "key1" config key
console.info(); 
console.info( "Custom/manual access (to access configuration during runtime):" ); 
console.info( "  -> Configuration key 'key1' is: " + config.key1.value );
console.info( "  -> Configuration key 'path1.key2' is: " + config.path1.key2.value );
```

Output:

```sh
$ KEY1=custom-val
$ PATH1_KEY2=999
$ node ./app.js

Pretty print (useful for application startup):
  -> key1....................................custom-val 
  -> path1.key2..............................999 
  -> path1.key3..............................29 

Custom/manual access (how to access configuration during runtime):
  -> Configuration key 'key1' is: custom-val 
  -> Configuration key 'path1.key2' is: 999 
```

#### Configuration Value Providers

The config hash must be composed of keys (strings) and value providers, where each provider must be an instance of one of the classes below. The providers can be configured by a hash provided to their constructor - see each provider for the options it supports. 

* `BooleanConfigValue` accepts `true`, `1`, `on` & `yes` as truthy values; everything else will cause `false` to be returned.

  Options:
  - `default`: an optional value to use when the environment variable is not set. If not provided, then the environment variable is required to be set. 

* `CalculatedConfigValue` does not read environment variables at all, instead always calls a getter function and returns its result. This is useful for including things in your config hash that are inferred from other configuration values or from something else entirely.

  Options:
  - `getter`: required function to invoke when a value is requested.

* `EnumConfigValue` accepts a hash of acceptable key/value pairs, and expects the environment variable it is mapped to have a value that equal one of the _keys_ in the given hash; that key's value will be returned. This enables a level of indirection between the actual environment variable value and the actual value returned by this provider.

  Options:
  - `values`: required hash of key/values that together comprise the set of valid options for the environment variable. Each *key* in this hash is a valid value; if that key is indeed the value of the variable, the key's value will be returned as this provider's value.
  - `default`: an optional value to use when the environment variable is not set. If not provided, the environment variable must be set.

* `IntegerConfigValue` reads integer values from the environment variable (currently does not really validate it's an integer rather than a decimal number).

  Options:
  - `min`: optional minimum value for the number.
  - `max`: optional maximum value for the number.
  - `default`: an optional value to use when the environment variable is not set. If not provided, the environment variable must be set.

* `StringConfigValue` reads a string from the environment variable.

  Options:
  - `minLength`: optional minimum length for the value.
  - `maxLength`: optional maximum length for the value.
  - `pattern`: optional pattern that must match the value.
  - `sensitive`: if `true`, the value will be _masked_ when printed by the `print` function.
  - `default`: an optional value to use when the environment variable is not set. If not provided, the environment variable must be set.

These objects are used as values to keys in the config hash. When the hash is passed to the factory (what you get from the `require` statement) these objects are populated with the parsed values from the environment.

#### Special keys

The returned configuration hash will always contain the following key/value pairs:

- `env` will always be either `production` (if `NODE_ENV` is one of `prd`, `prod` or `production`) or `development` (anything else or empty).

- `prod` will be `true` if `env === 'production'`
 
- `dev` will be `true` if `env === 'development'`
 
- `print` will be a function that pretty-prints the configuration hash to the logger (see `slf4ts` package).

## Contributing

Please see our [contributing](./CONTRIBUTING.md) document.

#### Resources

Coverage setup:
- https://azimi.me/2016/09/30/nyc-mocha-typescript.1.html
- https://istanbul.js.org/docs/tutorials/typescript/
