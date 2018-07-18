import { ConfigValue } from "./ConfigValue";

/**
 * Options for declaring a string-based configuration container.
 */
export interface CalculatedConfigValueOptions<T> {
    /**
     * Function to be invoked whenever the value is needed.
     */
    getter: () => T
}

/**
 * String-typed configuration value provider.
 */
export class CalculatedConfigValue<T> extends ConfigValue<T> {

    constructor( readonly options: CalculatedConfigValueOptions<T> ) {
        super();
    }

    get value(): T {
        return this.options.getter();
    }

    refresh( environmentVariableName: string ): void {
        // no-op
    }
}
