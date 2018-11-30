/**
* Copyright 2012-2018, Plotly, Inc.
* All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/

'use strict';

var Lib = require('../../lib');
var Registry = require('../../registry');

module.exports = function handleXYDefaults(traceIn, traceOut, layout, coerce) {
    var x = coerce('x');
    var y = coerce('y');
    var len;

    var handleCalendarDefaults = Registry.getComponentMethod('calendars', 'handleTraceDefaults');
    handleCalendarDefaults(traceIn, traceOut, ['x', 'y'], layout);

    if(x) {
        var xlen = Lib.maxRowLength(x);
        if(y) {
            len = Math.min(xlen, Lib.maxRowLength(y));
        } else {
            len = xlen;
            coerce('y0');
            coerce('dy');
        }
    } else {
        if(!y) return 0;

        len = Lib.maxRowLength(y);
        coerce('x0');
        coerce('dx');
    }

    traceOut._length = len;

    return len;
};
