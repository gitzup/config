import { StringConfigValue } from "../src/StringConfigValue";
import { expect } from "chai";
import "mocha";

describe( "String config value", () => {

    it( "Rejects bad min/max length values", () => {
        expect( () => new StringConfigValue( {
            minLength: 5,
            maxLength: 4
        } ) ).to.throw( /minLength must be smaller than maxLength/ );
        expect( () => new StringConfigValue( { minLength: 4, maxLength: 5 } ) ).to.not.throw();
        expect( () => new StringConfigValue( { minLength: -5 } ) ).to.throw( /minLength must not be negative/ );
        expect( () => new StringConfigValue( { maxLength: -5 } ) ).to.throw( /maxLength must not be negative/ );
    } );

    it( "Accepts a default value", () => {
        expect( new StringConfigValue().value ).to.be.undefined;
        expect( new StringConfigValue( { default: "a" } ).value ).to.equal( "a" );
        expect( new StringConfigValue( { default: undefined } ).value ).to.be.undefined;
    } );

    it( "Validates the default value", () => {
        expect( () => new StringConfigValue( { minLength: 2, default: "a" } ).value ).to.throw( /must be longer than/ );
        expect( () => new StringConfigValue( {
            maxLength: 1,
            default: "ab"
        } ).value ).to.throw( /must not be longer than/ );
        expect( () => new StringConfigValue( { pattern: /^a$/, default: "b" } ).value ).to.throw( /must match/ );
    } );

    it( "Correctly parses environment variable value", () => {
        const cfg = new StringConfigValue();
        process.env[ "TEST_VAR" ] = "abc";
        cfg.refresh( "TEST_VAR" );
        expect( cfg.value ).to.equal( "abc" );
    } );

    it( "Fails on bad environment variable value", () => {
        const cfg = new StringConfigValue( { minLength: 5, maxLength: 10, pattern: /test/ } );
        process.env[ "TEST_VAR" ] = "abc";
        expect( () => cfg.refresh( "TEST_VAR" ) ).to.throw( /must be longer than/ );
        process.env[ "TEST_VAR" ] = "abcdefghijklmnop";
        expect( () => cfg.refresh( "TEST_VAR" ) ).to.throw( /must not be longer than/ );
        process.env[ "TEST_VAR" ] = "abcdef";
        expect( () => cfg.refresh( "TEST_VAR" ) ).to.throw( /must match/ );
    } );

    it( "Uses default value when environment variable is not defined", () => {
        const cfg = new StringConfigValue( { default: "abc" } );
        cfg.refresh( "TEST_UNKNOWN" );
        expect( cfg.value ).to.equal( "abc" );
    } );

    it( "Fails when no default value is set and environment variable is not defined", () => {
        expect( () => new StringConfigValue().refresh( "TEST_UNKNOWN" ) ).to.throw( /required/ );
    } );

} );
