import { expect } from "chai";
import "mocha";
import { CalculatedConfigValue } from "../src/CalculatedConfigValue";

describe( "Calculated config value", () => {

    it( "Value property calls getter", () => {
        expect( new CalculatedConfigValue( { getter: () => "v1" } ).value ).to.equal( "v1" );
        expect( new CalculatedConfigValue( { getter: () => "v2" } ).value ).to.equal( "v2" );
    } );

    it( "Refresh has no effect", () => {
        let cfg = new CalculatedConfigValue( { getter: () => "v1" } );
        expect( cfg.value ).to.equal( "v1" );
        cfg.refresh( "TEST_K1" );
        expect( cfg.value ).to.equal( "v1" );
    } );

} );
