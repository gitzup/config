import { expect } from "chai";
import "mocha";
import { EnumConfigValue } from "../src";

describe( "Enum config value", () => {

    const values = {
        "k1": "v1",
        "k2": "v2"
    };

    it( "Accepts a default value", () => {
        expect( new EnumConfigValue<string>( { values: {} } ).value ).to.be.undefined;
        expect( new EnumConfigValue<string>( { values, default: "v1" } ).value ).to.equal( "v1" );
        expect( new EnumConfigValue<string>( { values } ).value ).to.be.undefined;
    } );

    it( "Correctly parses environment variable value", () => {
        const cfg = new EnumConfigValue<string>( { values } );
        process.env[ "TEST_VAR" ] = "k1";
        cfg.refresh( "TEST_VAR" );
        expect( cfg.value ).to.equal( values[ "k1" ] );
    } );

    it( "Uses default value when environment variable is not defined", () => {
        const cfg = new EnumConfigValue<string>( { values, default: "v1" } );
        cfg.refresh( "TEST_UNKNOWN" );
        expect( cfg.value ).to.equal( "v1" );
    } );

    it( "Fails when no default value is set and environment variable is not defined", () => {
        expect( () => new EnumConfigValue<string>( { values } ).refresh( "TEST_UNKNOWN" ) ).to.throw( /required/ );
    } );

} );
