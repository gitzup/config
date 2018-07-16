import { ConfigValue } from "./ConfigValue";

/**
 * Options for declaring a string-based configuration container.
 */
export interface IntegerConfigValueOptions {
    /**
     * Minimal valid value.
     */
    min?: number,

    /**
     * Maximal valid value.
     */
    max?: number,

    /**
     * Default value for when the environment variable is not defined.
     */
    default?: number
}

/**
 * String-typed configuration value provider.
 */
export class IntegerConfigValue extends ConfigValue<number> {

    private _value?: number;

    constructor( readonly options: IntegerConfigValueOptions ) {
        super();
        if( typeof this.options.min !== "undefined" && typeof this.options.max !== "undefined" && this.options.min > this.options.max ) {
            throw new Error( `min must be lower than max` );
        } else if( typeof this.options.default !== "undefined" ) {
            this._value = this.validateValue( this.options.default );
        } else {
            this._value = undefined;
        }
    }

    get value(): number {
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
            try {
                this._value = this.validateValue( parseInt( value ) );
            } catch( e ) {
                throw new Error( `invalid integer '${value}' provided for '${environmentVariableName}'` );
            }
        }
    }

    private validateValue( value: number ): number {
        if( this.options.min != null && value < this.options.min ) {
            throw new Error( `must be greater than or equal to ${this.options.min}` );
        } else if( this.options.max != null && value > this.options.max ) {
            throw new Error( `must be less than or equal to ${this.options.max}` );
        } else {
            return value;
        }
    }
}
