import { ConfigValue } from "./ConfigValue";

/**
 * Options for declaring a string-based configuration container.
 */
export interface BooleanConfigValueOptions {
    /**
     * Default value for when the environment variable is not defined.
     */
    default?: boolean
}

/**
 * String-typed configuration value provider.
 */
export class BooleanConfigValue extends ConfigValue<boolean> {

    private _value?: boolean;

    constructor( readonly options: BooleanConfigValueOptions = {} ) {
        super();
        if( typeof this.options.default !== "undefined" ) {
            this._value = this.options.default;
        } else {
            this._value = undefined;
        }
    }

    get value(): boolean {
        return this._value;
    }

    refresh( environmentVariableName: string ): void {
        const value = process.env[ environmentVariableName ];
        if( value == null ) {
            if( typeof this.options.default === "undefined" ) {
                throw new Error( `environment variable '${environmentVariableName}' is required` );
            } else {
                this._value = this.options.default;
            }
        } else {
            this._value = [ "true", "yes", "on", "1" ].includes( value.toLowerCase() );
        }
    }
}
