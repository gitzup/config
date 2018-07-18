import { BooleanConfigValue } from "../src/BooleanConfigValue";
import { expect } from "chai";
import "mocha";

describe( "Boolean config value", () => {

    it( "Accepts a default value", () => {
        expect( new BooleanConfigValue().value ).to.be.undefined;
        expect( new BooleanConfigValue( { default: true } ).value ).to.be.true;
        expect( new BooleanConfigValue( { default: false } ).value ).to.be.false;
    } );

    it( "Correctly parses environment variable value", () => {
        const booleans: any = {
            "on": true,
            "off": false,
            "yes": true,
            "no": false,
            "1": true,
            "0": false,
            "true": true,
            "false": false
        };
        const cfg = new BooleanConfigValue();
        for( const k of Object.keys( booleans ) ) {
            process.env[ "TEST_VAR" ] = k;
            cfg.refresh( "TEST_VAR" );
            expect( cfg.value ).to.equal( booleans[ k ] );
        }
    } );

    it( "Uses default value when environment variable is not defined", () => {
        const cfg = new BooleanConfigValue( { default: true } );
        cfg.refresh( "TEST_UNKNOWN" );
        expect( cfg.value ).to.be.true;
    } );

    it( "Fails when no default value is set and environment variable is not defined", () => {
        expect( () => new BooleanConfigValue().refresh( "TEST_UNKNOWN" ) ).to.throw( /required/ );
    } );

} );
