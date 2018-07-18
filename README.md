# ts-config

Node.js utility for configuration.

## Installation 

```sh
npm install @gitzup/ts-config --save
```

## Usage

Place the following in a `app.js` file:

```javascript
const createConfig = require( '@gitzup/ts-config' );
const config = createConfig( {
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

### Running tests 

```sh
npm run test
```

### Releasing

```sh
$ npm version <version-spec> -m "[release] %s"
$ npm publish --access public"
```
