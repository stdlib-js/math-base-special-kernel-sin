/**
* @license Apache-2.0
*
* Copyright (c) 2022 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var resolve = require( 'path' ).resolve;
var tape = require( 'tape' );
var isnan = require( '@stdlib/math-base-assert-is-nan' );
var linspace = require( '@stdlib/array-base-linspace' );
var rempio2 = require( '@stdlib/math-base-special-rempio2' );
var PI = require( '@stdlib/constants-float64-pi' );
var sin = require( '@stdlib/math-base-special-sin' );
var tryRequire = require( '@stdlib/utils-try-require' );


// VARIABLES //

var kernelSin = tryRequire( resolve( __dirname, './../lib/native.js' ) );
var opts = {
	'skip': ( kernelSin instanceof Error )
};


// TESTS //

tape( 'main export is a function', opts, function test( t ) {
	t.ok( true, __filename );
	t.strictEqual( typeof kernelSin, 'function', 'main export is a function' );
	t.end();
});

tape( 'the function returns `NaN` if provided `NaN` for either parameter', opts, function test( t ) {
	var v = kernelSin( NaN, 0.0 );
	t.equal( isnan( v ), true, 'returns NaN' );

	v = kernelSin( 4.0, NaN );
	t.equal( isnan( v ), true, 'returns NaN' );

	v = kernelSin( NaN, NaN );
	t.equal( isnan( v ), true, 'returns NaN' );
	t.end();
});

tape( 'the function evaluates the sine for input values on the interval `[-pi/4, pi/4]`', opts, function test( t ) {
	var values;
	var out;
	var x;
	var i;

	values = linspace( -PI/4.0, PI/4.0, 1000 );
	for ( i = 0; i < values.length; i++ ) {
		x = values[ i ];
		out = kernelSin( x, 0.0 );
		t.strictEqual( out, sin( x ), 'returns expected value' );
	}
	t.end();
});

tape( 'the function can be used to compute the sine for input values outside of `[-pi/4, pi/4]` after argument reduction via `rempio2` (positive)', opts, function test( t ) {
	var values;
	var out;
	var x;
	var y;
	var n;
	var i;

	values = linspace( 40.0*PI/4.0, 200*PI/4.0, 1000 );
	y = [ 0.0, 0.0 ];
	for ( i = 0; i < values.length; i++ ) {
		x = values[ i ];
		n = rempio2( x, y );
		switch ( n & 3 ) {
		case 0:
			out = kernelSin( y[ 0 ], y[ 1 ] );
			t.strictEqual( out, sin( x ), 'returns expected value' );
			break;
		case 2:
			out = -kernelSin( y[ 0 ], y[ 1 ] );
			t.strictEqual( out, sin( x ), 'returns expected value' );
			break;
		default:
			break;
		}
	}
	t.end();
});

tape( 'the function can be used to compute the sine for input values outside of `[-pi/4, pi/4]` after argument reduction via `rempio2` (negative)', opts, function test( t ) {
	var values;
	var out;
	var x;
	var y;
	var n;
	var i;

	values = linspace( -200.0*PI/4.0, -40.0*PI/4.0, 1000 );
	y = [ 0.0, 0.0 ];
	for ( i = 0; i < values.length; i++ ) {
		x = values[ i ];
		n = rempio2( x, y );
		switch ( n & 3 ) {
		case 0:
			out = kernelSin( y[ 0 ], y[ 1 ] );
			t.strictEqual( out, sin( x ), 'returns expected value' );
			break;
		case 2:
			out = -kernelSin( y[ 0 ], y[ 1 ] );
			t.strictEqual( out, sin( x ), 'returns expected value' );
			break;
		default:
			break;
		}
	}
	t.end();
});
