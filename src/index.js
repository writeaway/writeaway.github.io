"use strict";
var Redaxtor = require('../../redaxtor/src/index');
var RedaxtorMedium = require('../../redaxtor-medium/src/index');
var RedaxtorCodemirror = require('../../redaxtor-codemirror/src/index');

require('../../redaxtor-medium/dist/medium-editor.css');
require('../../redaxtor-medium/dist/redaxtor-medium.css');
//require('style!css?-url!codemirror/lib/codemirror.css');

var components = {
    html: RedaxtorMedium,
    source: RedaxtorCodemirror
};

class RedaxtorBundle extends Redaxtor {
    constructor(options) {
        options.pieces.components = components;
        super(options);
    }
}

module.exports = RedaxtorBundle;
