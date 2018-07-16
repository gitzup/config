import { ConfigValue } from "./ConfigValue";

/**
 * Options for declaring a string-based configuration container.
 */
export interface EnumConfigValueOptions<T> {
    /**
     * List of valid values for the configuration value provider.
     */
    values: { [ key: string ]: T },

    /**
     * Default value for when the environment variable is not defined.
     */
    default?: T
}

/**
 * String-typed configuration value provider.
 */
export class EnumConfigValue<T> extends ConfigValue<T> {

    private _value?: T;

    constructor( readonly options: EnumConfigValueOptions<T> ) {
        super();
        this._value = this.options.default;
    }

    get value(): T {
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

        } else if( value in this.options.values ) {
            this._value = this.options.values[ value ];

        } else {
            throw new Error( `unsupported value '${value}' for '${environmentVariableName}` );
        }
    }
}
