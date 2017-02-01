"use strict";
var Redaxtor = require('../../redaxtor/src/index');
var RedaxtorDefaultApi = require('../../redaxtor/src/Redaxtor').defaultMinimumApi;
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
        RedaxtorBundle.checkHtmlPiecesCompartibility(document);
        super(options);
    }

    /**
     * Scans html pieces for invalid internal html and reverts them to source editor if needed
     * @param node
     */
    static checkHtmlPiecesCompartibility(node) {
        /**
         * In Spiral html pieces are marked up as data-piece="html", collect them
         */
        let pieces = node.querySelectorAll('[data-piece="html"]');
        for (let i = 0; i < pieces.length; i++) {
            let piece = pieces[i];
            if (piece.querySelector('iframe')) {
                //We have invalid piece data, fallback to source
                piece.setAttribute("data-piece", "source");
            }
            if(piece.querySelector('script')) {
                //Script is not expected to be editable at the moment
                piece.setAttribute("data-piece", "source");
                piece.setAttribute("data-nonupdateable", "1");
            }
        }
    }
}

RedaxtorBundle.defaultApi = RedaxtorDefaultApi;

module.exports = RedaxtorBundle;
