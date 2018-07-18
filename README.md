# config

Node.js utility for configuration.

## Installation 

```sh
npm install @gitzup/config --save
```

## Usage

Place the following in a `app.js` file:

```javascript
const config = require( '@gitzup/config' )( {
    key1: new StringConfigValue( { default: "val1" } ),
    path1: {
        key2: new IntegerConfigValue( { default: 17 } ),
        key3: new IntegerConfigValue( { default: 29 } ),
    }
});
config.print();
```

Then run this:

```sh
$ KEY1=custom-val
$ PATH1_KEY2=999
$ node ./app.js
  -> key1....................................custom-val 
  -> path1.key2..............................999 
  -> path1.key3..............................29 
```

## Contributing

Please see our [contributing](./CONTRIBUTING.md) document.
