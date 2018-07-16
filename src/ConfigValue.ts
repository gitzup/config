/**
 * Represents a configuration value container. Provides a getter for the actual value, and a refresh method.
 */
export abstract class ConfigValue<T> {

    /**
     * Gets the current configuration value.
     */
    abstract get value(): T;

    /**
     * Refresh the value of the configuration container by re-reading the specified environment variable. This method is called on startup by the configuration orchestrator but might be called in additional scenarios in the future.
     */
    abstract refresh( environmentVariableName: string ): void
}
