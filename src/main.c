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

#include "stdlib/math/base/special/kernel_sin.h"

static const double S1 = -1.66666666666666324348e-01; // 0xBFC55555, 0x55555549
static const double S2 = 8.33333333332248946124e-03;  // 0x3F811111, 0x1110F8A6
static const double S3 = -1.98412698298579493134e-04; // 0xBF2A01A0, 0x19C161D5
static const double S4 = 2.75573137070700676789e-06;  // 0x3EC71DE3, 0x57B1FE7D
static const double S5 = -2.50507602534068634195e-08; // 0xBE5AE5E6, 0x8A2B9CEB
static const double S6 = 1.58969099521155010221e-10;  // 0x3DE5D93A, 0x5ACFD57C

/**
* Computes the sine of a number on [-π/4, π/4].
*
* @param x    input value (in radians, assumed to be bounded by `~pi/4` in magnitude)
* @param y    tail of `x`
* @return	  sine value
*
* @example
* double out = stdlib_base_kernel_sin( 0.5, 0.0 );
*/
double stdlib_base_kernel_sin( const double x, const double y ) {
	double z;
	double r;
	double v;
	double w;

	z = x * x;
	w = z * z;
	r = S2 + (z * (S3 + (z*S4))) + (z * w * (S5 + (z*S6)));
	v = z * x;
	if ( y == 0.0 ) {
		return x + (v * (S1 + (z*r)));
	}
	return x - (((z*((0.5*y) - (v*r))) - y) - (v*S1));
}
