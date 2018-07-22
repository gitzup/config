import { createConfig, StringConfigValue } from "../src";
import { expect } from "chai";
import "mocha";

describe( "Configuration Factory", () => {

    for( const env of [ "prd", "prod", "production" ] ) {
        it( `Sets production mode for '${env}'`, () => {
            process.env[ "NODE_ENV" ] = env;
            expect( createConfig( {} ).env.value ).to.equal( "production" );
            expect( createConfig( {} ).prod.value ).to.equal( true );
            expect( createConfig( {} ).dev.value ).to.equal( false );
        } );
    }

    for( const env of [ undefined, "", "dev", "devel", "development" ] ) {
        it( `Sets development mode for '${env}'`, () => {
            process.env[ "NODE_ENV" ] = env;
            expect( createConfig( {} ).env.value ).to.equal( "development" );
            expect( createConfig( {} ).prod.value ).to.equal( false );
            expect( createConfig( {} ).dev.value ).to.equal( true );
        } );
    }

    it( "Adds print method to config", () => expect( createConfig( {} ).print ).is.a( "function" ) );
    it( "Print method doesn't throw", () => expect( createConfig( {} ).print ).to.not.throw() );

    it( "Supports basic configuration", () => {
        process.env[ "TEST_K1" ] = "v1";
        expect( createConfig( { test_k1: new StringConfigValue() } ).test_k1.value ).to.equal( "v1" );
    } );

    it( "Supports recursive configuration", () => {
        process.env[ "TEST_K1" ] = "v1";
        expect( createConfig( { test: { k1: new StringConfigValue() } } ).test.k1.value ).to.equal( "v1" );
    } );

} );
