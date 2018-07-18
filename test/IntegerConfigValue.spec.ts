import { IntegerConfigValue } from "../src/IntegerConfigValue";
import { expect } from "chai";
import "mocha";

describe( "Integer config value", () => {

    it( "Rejects bad min/max values", () => {
        expect( () => new IntegerConfigValue( { min: 5, max: 4 } ) ).to.throw( /min must be lower than max/ );
        expect( () => new IntegerConfigValue( { min: 4, max: 5 } ) ).to.not.throw();
    } );

    it( "Accepts a default value", () => {
        expect( new IntegerConfigValue().value ).to.be.undefined;
        expect( new IntegerConfigValue( { default: 2 } ).value ).to.equal( 2 );
        expect( new IntegerConfigValue( { default: undefined } ).value ).to.be.undefined;
    } );

    it( "Validates the default value", () => {
        expect( () => new IntegerConfigValue( { default: 2, min: 3 } ) ).to.throw( /must be greater than or equal to/ );
        expect( () => new IntegerConfigValue( { default: 2, max: 1 } ) ).to.throw( /must be less than or equal to/ );
    } );

    it( "Correctly parses environment variable value", () => {
        const cfg = new IntegerConfigValue();
        process.env[ "TEST_VAR" ] = "123";
        cfg.refresh( "TEST_VAR" );
        expect( cfg.value ).to.equal( 123 );
    } );

    it( "Fails on bad environment variable value", () => {
        const cfg = new IntegerConfigValue( { min: 5, max: 10 } );
        process.env[ "TEST_VAR" ] = "abc";
        expect( () => cfg.refresh( "TEST_VAR" ) ).to.throw( /invalid integer/ );
        process.env[ "TEST_VAR" ] = "4";
        expect( () => cfg.refresh( "TEST_VAR" ) ).to.throw( /must be greater than or equal to 5/ );
        process.env[ "TEST_VAR" ] = "11";
        expect( () => cfg.refresh( "TEST_VAR" ) ).to.throw( /must be less than or equal to 10/ );
    } );

    it( "Uses default value when environment variable is not defined", () => {
        const cfg = new IntegerConfigValue( { default: 123 } );
        cfg.refresh( "TEST_UNKNOWN" );
        expect( cfg.value ).to.equal( 123 );
    } );

    it( "Fails when no default value is set and environment variable is not defined", () => {
        expect( () => new IntegerConfigValue().refresh( "TEST_UNKNOWN" ) ).to.throw( /required/ );
    } );

} );
