import { WriteAwayCore, IOptions } from '@writeaway/core';
import 'style.less';
import { WriteAwaySeoData } from '@writeaway/plugin-seo';
/**
 * Declare which editors will be controlling which piece types
 */
export declare const components: {
    html: import("../../core/dist").IComponent<{
        html: string;
    }>;
    image: import("../../core/dist").IComponent<import("../../plugin-medium/src/types").WriteAwayImageData>;
    background: import("../../core/dist").IComponent<import("../../plugin-medium/src/types").WriteAwayImageData>;
    source: import("../../core/dist").IComponent<import("../../plugin-codemirror/src/types").WriteAwayCodeMirrorData>;
    seo: import("../../core/dist").IComponent<WriteAwaySeoData>;
};
declare class WriteAwaySampleBundle extends WriteAwayCore {
    /**
     * Creates a fake div handling SEO editing. Alternatively a button can be rendered in that div to show SEO editor.
     */
    attachSeo(data: Partial<WriteAwaySeoData>): void;
    constructor(options: IOptions);
    beforeUnload(): void;
    /**
     * Scans html for invalid internal html and reverts them to source editor if needed
     */
    static checkHtmlPiecesCompartibility(node: Element | Document): void;
}
declare const writeaway: WriteAwaySampleBundle;
export default writeaway;
