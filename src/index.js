"use strict";
var Redaxtor = require('../../redaxtor/src/index');
var RedaxtorMedium = require('../../redaxtor-medium/src/index');
var RedaxtorCodemirror = require('../../redaxtor-codemirror/src/index');

require('../../redaxtor/dist/redaxtor.css');
require('../../redaxtor-medium/dist/medium-editor.css');
require('../../redaxtor-medium/dist/redaxtor-medium.css');

require('../node_modules/codemirror/lib/codemirror.css');

var components = {
    html: RedaxtorMedium.HTMLEditor,
    image: RedaxtorMedium.IMGTagEditor,
    background: RedaxtorMedium.BackgroundImageEditor,
    source: RedaxtorCodemirror
};

class RedaxtorBundle extends Redaxtor {
    constructor(options) {
        options.pieces.components = components;
        super(options);
    }
}

module.exports = RedaxtorBundle;
