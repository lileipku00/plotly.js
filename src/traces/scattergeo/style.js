/**
* Copyright 2012-2017, Plotly, Inc.
* All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/

'use strict';

var d3 = require('d3');
var Drawing = require('../../components/drawing');
var Color = require('../../components/color');

var stylePoints = require('../scatter/style').stylePoints;

module.exports = function style(gd, calcTrace) {
    if(calcTrace) styleTrace(gd, calcTrace);
};

function styleTrace(gd, calcTrace) {
    var trace = calcTrace[0].trace;
    var s = calcTrace[0].node3;

    s.style('opacity', calcTrace[0].trace.opacity);

    stylePoints(s, trace, gd);

    // this part is incompatible with Drawing.lineGroupStyle
    s.selectAll('path.js-line')
        .style('fill', 'none')
        .each(function(d) {
            var path = d3.select(this);
            var trace = d.trace;
            var line = trace.line || {};

            path.call(Color.stroke, line.color)
                .call(Drawing.dashLine, line.dash || '', line.width || 0);

            if(trace.fill !== 'none') {
                path.call(Color.fill, trace.fillcolor);
            }
        });
}
