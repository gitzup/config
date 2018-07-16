import { ConfigValue } from "./ConfigValue";

/**
 * Options for declaring a string-based configuration container.
 */
export interface StringConfigValueOptions {
    /**
     * Minimum length for the configuration value.
     */
    minLength?: number,

    /**
     * Maximum length for the configuration value.
     */
    maxLength?: number,

    /**
     * Regular expression pattern that the configuration value must match.
     */
    pattern?: RegExp,

    /**
     * Whether values of this configuration are sensitive, and should not be logged or printed to the console. Useful
     * for passwords and credentials.
     */
    sensitive?: boolean,

    /**
     * Default value for when the environment variable is not defined.
     */
    default?: string
}

/**
 * String-typed configuration value provider.
 */
export class StringConfigValue extends ConfigValue<string> {

    private _value?: string;

    constructor( readonly options: StringConfigValueOptions ) {
        super();
        if( this.options.minLength && this.options.minLength < 0 ) {
            throw new Error( `minLength must not be negative` );
        } else if( this.options.maxLength && this.options.maxLength < 0 ) {
            throw new Error( `maxLength must not be negative` );
        } else if( this.options.minLength && this.options.maxLength && this.options.maxLength < this.options.minLength ) {
            throw new Error( `minLength must be smaller than maxLength` );
        } else if( typeof this.options.default !== "undefined" ) {
            this._value = this.validateValue( this.options.default );
        } else {
            this._value = undefined;
        }
    }

    get value(): string {
        return this._value;
    }

    refresh( environmentVariableName: string ): void {
        const value = process.env[ environmentVariableName ];
        if( !value ) {
            if( typeof this.options.default === "undefined" ) {
                throw new Error( `environment variable '${environmentVariableName}' is required` );
            } else {
                this._value = this.options.default;
            }
        } else {
            this._value = this.validateValue( value );
        }
    }

    private validateValue( value: string ): string {
        if( this.options.minLength && value.length < this.options.minLength ) {
            throw new Error( `must be longer than ${this.options.minLength} character` );
        } else if( this.options.maxLength && value.length > this.options.maxLength ) {
            throw new Error( `must not be longer than ${this.options.minLength} character` );
        } else if( this.options.pattern && this.options.pattern.exec( value ) === null ) {
            throw new Error( `must match '${this.options.pattern}'` );
        } else {
            return value;
        }
    }
}
