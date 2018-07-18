# config

Node.js utility for configuration.

## Installation 

```sh
npm install @gitzup/config --save
```

## Usage

Example:

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

## Contributing

Please see our [contributing](./CONTRIBUTING.md) document.
