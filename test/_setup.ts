import "mocha";

afterEach( function() {
    Object.keys( process.env )
          .filter( name => name.startsWith( "TEST_" ) )
          .forEach( name => delete process.env[ name ] );
} );
