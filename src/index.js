"use strict";
var Redaxtor = require('../../redaxtor/src/index');
var RedaxtorDefaultApi = require('../../redaxtor/src/Redaxtor').defaultMinimumApi;
var RedaxtorMedium = require('../../redaxtor-medium/src/index');
var RedaxtorCodemirror = require('../../redaxtor-codemirror/src/index');
var RedaxtorSeo = require('../../redaxtor-seo/src/index');

require('../../redaxtor/dist/redaxtor.css');
require('../../redaxtor-medium/dist/medium-editor.css');
require('../../redaxtor-medium/dist/redaxtor-medium.css');

require('../node_modules/codemirror/lib/codemirror.css');
require('../seo.css');

var components = {
    html: RedaxtorMedium.HTMLEditor,
    image: RedaxtorMedium.IMGTagEditor,
    background: RedaxtorMedium.BackgroundImageEditor,
    source: RedaxtorCodemirror,
    seo: RedaxtorSeo
};

class RedaxtorBundle extends Redaxtor {
    attachSeo(data) {
        setTimeout(() => {
            let div = document.createElement('div');
            div.innerHTML = "Edit SEO Meta";
            div.className = "edit-seo-div";
            this.addPiece(div, {
                id: "seo",
                name: "SEO Meta",
                type: "seo",
                data: {
                    html: (data && data.html)
                    || "",
                    title: (data && data.title)
                    || (document.querySelector('title') && document.querySelector('title').innerHTML)
                    || "",
                    description: (data && data.description)
                    || (document.querySelector('meta[name="description"]') && document.querySelector('meta[name="description"]').innerHTML)
                    || "",
                    keywords: (data && data.keywords)
                    || (document.querySelector('meta[name="keywords"]') && document.querySelector('meta[name="keywords"]').innerHTML)
                    || ""
                }
            });
            document.querySelector('body').appendChild(div);
        });
    };

    constructor(options) {
        options.pieces.components = components;
        RedaxtorBundle.checkHtmlPiecesCompartibility(document);
        super(options);

        if (options.editorActive == undefined || options.editorActive == null) {
            this.setEditorActive(RedaxtorBundle.getCookie('r_editorActive') == 'true');
        }
        if (options.navBarCollapsed == undefined || options.navBarCollapsed == null) {
            this.setNavBarCollapsed(RedaxtorBundle.getCookie('r_navBarCollapsed') == 'true');
        }

        this.onUnload = this.beforeUnload.bind(this);
        window.addEventListener("beforeunload", this.onUnload);
    }

    /**
     * beforeUnload listner
     * @param event
     */
    beforeUnload(event) {
        RedaxtorBundle.setCookie('r_editorActive', this.isEditorActive());
        RedaxtorBundle.setCookie('r_navBarCollapsed', this.isNavBarCollapsed())
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

RedaxtorBundle.defaultApi = RedaxtorDefaultApi;

module.exports = RedaxtorBundle;
