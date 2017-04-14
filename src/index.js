"use strict";
var WriteAway = require('../../redaxtor/src/index');
var WriteAwayDefaultApi = require('../../redaxtor/src/Redaxtor').defaultMinimumApi;
var WriteAwayMedium = require('../../redaxtor-medium/src/index');
var WriteAwayCodemirror = require('../../redaxtor-codemirror/src/index');
var WriteAwaySeo = require('../../redaxtor-seo/src/index');

require('../../redaxtor/src/styles/redaxtor.less');
require('../../redaxtor-medium/src/medium-editor.less');
require('../../redaxtor-medium/src/redaxtor-medium.less');
require('../../redaxtor-seo/src/google-preview.less');

require('../node_modules/codemirror/lib/codemirror.css');
require('../spiral-specific.css');

var components = {
    html: WriteAwayMedium.HTMLEditor,
    image: WriteAwayMedium.IMGTagEditor,
    background: WriteAwayMedium.BackgroundImageEditor,
    source: WriteAwayCodemirror,
    seo: WriteAwaySeo
};

class WriteAwayBundle extends WriteAway {
    attachSeo(data) {
        setTimeout(() => {
            let div = document.createElement('div');
            div.innerHTML = "";
            div.style.display = "none";
            div.className = "edit-seo-div";
            this.addPiece(div, {
                id: "seo",
                name: "Edit SEO",
                type: "seo",
                data: {
                    html: (data && data.html)
                    || "",
                    title: (data && data.title)
                    || (document.querySelector('title') && document.querySelector('title').innerHTML)
                    || "",
                    description: (data && data.description)
                    || (document.querySelector('meta[name="description"]') && document.querySelector('meta[name="description"]').getAttribute("content"))
                    || "",
                    keywords: (data && data.keywords)
                    || (document.querySelector('meta[name="keywords"]') && document.querySelector('meta[name="keywords"]').getAttribute("content"))
                    || ""
                }
            });
            document.querySelector('body').appendChild(div);
        });
    };

    constructor(options) {
        options.pieces.components = components;
        options.pieceNameGroupSeparator = ':';
        WriteAwayBundle.checkHtmlPiecesCompartibility(document);
        super(options);

        if (options.editorActive == undefined || options.editorActive == null) {
            this.setEditorActive(WriteAwayBundle.getCookie('r_editorActive') == 'true');
        }
        if (options.navBarCollapsed == undefined || options.navBarCollapsed == null) {
            this.setNavBarCollapsed(WriteAwayBundle.getCookie('r_navBarCollapsed') == 'true');
        }

        this.onUnload = this.beforeUnload.bind(this);
        window.addEventListener("beforeunload", this.onUnload);
    }

    /**
     * beforeUnload listner
     * @param event
     */
    beforeUnload(event) {
        WriteAwayBundle.setCookie('r_editorActive', this.isEditorActive());
        WriteAwayBundle.setCookie('r_navBarCollapsed', this.isNavBarCollapsed())
    }

    static setCookie(name, value) {
        let options = {};

        value = encodeURIComponent(value);

        let updatedCookie = name + "=" + value;

        for (let propName in options) {
            updatedCookie += "; " + propName;
            let propValue = options[propName];
            if (propValue !== true) {
                updatedCookie += "=" + propValue;
            }
        }

        document.cookie = updatedCookie;
    }

    static getCookie(name) {
        var matches = document.cookie.match(new RegExp(
            "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ));
        return matches ? decodeURIComponent(matches[1]) : undefined;
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
            if (piece.querySelector('script')) {
                //Script is not expected to be editable at the moment
                piece.setAttribute("data-piece", "source");
                piece.setAttribute("data-nonupdateable", "1");
            }
        }
    }
}

WriteAwayBundle.defaultApi = WriteAwayDefaultApi;
WriteAwayBundle.autoMarkup = require('./auto-markup');

module.exports = WriteAwayBundle;
