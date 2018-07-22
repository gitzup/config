import { ILoggerInstance, LoggerFactory } from "slf4ts-api";
import { ConfigValue } from "./ConfigValue";
import { StringConfigValue } from "./StringConfigValue";
import { CalculatedConfigValue } from "./CalculatedConfigValue";

const logger: ILoggerInstance = LoggerFactory.getLogger( "config" );

/**
 * Iterate over all properties in given object, and any property whose value is an instance of Configuration will have
 * its value refreshed from a corresponding environment variable. The name of the environment variable will be
 * calculated from the property path (starting from the root).
 *
 * So for an object containing <code>{ foo: { bar: 1 } }</code> the value for the property path "foo.bar" will be read
 * from the environment variable "FOO_BAR".
 *
 * Also, this function expects that property values are either hashes or instances of the Configuration interface. For
 * hashes, this function simply recurses (updating the context property path accordingly), and for instances of the
 * Configuration interface, it will apply the value by reading it from the appropriate environment variable, and then
 * call the Configuration object's "refresh" method.
 *
 * @param {T} obj the target object or hash to iterate properties in
 * @param {string} path the context property path (for the root object, this should be the empty string)
 * @return {T} simply returns the passed object (but its properties have been possibly updated from the environment)
 */
function refreshConfiguration<T extends { [ key: string ]: any }>( obj: T, path: string = "" ): T {
    for( let name in obj ) {
        if( obj.hasOwnProperty( name ) && ( path || ![ "get", "print", "env", "prod", "dev" ].includes( name ) ) ) {
            const propertyPath = ( path ? path + "." : "" ) + name;
            const type: any = obj[ name ];
            if( "refresh" in type ) {
                type.refresh( propertyPath.toUpperCase().replace( /\./g, "_" ) );
            } else if( "value" in type ) {
                // no-op; this is a readonly configuration.
            } else if( typeof type === "object" ) {
                refreshConfiguration( type, propertyPath );
            } else {
                throw new Error( `illegal schema type specified at: ${propertyPath}` );
            }
        }
    }
    return obj;
}

/**
 * Prints the configuration values to console.
 */
function printConfig<T extends { [ key: string ]: any }>( obj: T, path: string = "" ): T {
    for( let name in obj ) {
        if( ( path || name !== "print" ) && obj.hasOwnProperty( name ) ) {
            const propertyPath = ( path ? path + "." : "" ) + name;
            const type: any = obj[ name ];
            let value: any = "";
            if( type instanceof ConfigValue ) {
                if( type instanceof StringConfigValue && type.options.sensitive ) {
                    value = "************";
                } else {
                    value = type.value;
                }
                logger.info( `  -> ${propertyPath.padEnd( 40, "." )}${value}` );
            } else if( typeof type === "object" ) {
                printConfig( type, propertyPath );
            } else {
                throw new Error( `illegal schema type specified at: ${propertyPath}` );
            }
        }
    }
    return obj;
}

export * from "./BooleanConfigValue";
export * from "./CalculatedConfigValue";
export * from "./ConfigValue";
export * from "./EnumConfigValue";
export * from "./IntegerConfigValue";
export * from "./StringConfigValue";

export default function( _config: any ): any {
    const nodeEnv = process.env[ "NODE_ENV" ];
    const env: "production" | "development" = nodeEnv && [ "production", "prod", "prd" ].indexOf( nodeEnv ) >= 0 ? "production" : "development";
    _config[ "env" ] = new CalculatedConfigValue( { getter: () => env } );
    _config[ "prod" ] = new CalculatedConfigValue( { getter: () => env === "production" } );
    _config[ "dev" ] = new CalculatedConfigValue( { getter: () => env !== "production" } );
    _config[ "print" ] = printConfig.bind( _config );
    refreshConfiguration( _config );
    return _config;
}
