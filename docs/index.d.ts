import { WriteAwayCore, IOptions } from '@writeaway/core';
import 'style.less';
import { RedaxtorSeoData } from '@writeaway/plugin-seo';
export declare const components: {
    html: import("../../core/dist").IComponent<{
        html: string;
    }>;
    image: import("../../core/dist").IComponent<import("../../plugin-medium/src/types").RedaxtorImageData>;
    background: import("../../core/dist").IComponent<import("../../plugin-medium/src/types").RedaxtorImageData>;
    source: import("../../core/dist").IComponent<import("../../plugin-codemirror/src/types").RedaxtorCodeMirrorData>;
    seo: import("../../core/dist").IComponent<RedaxtorSeoData>;
};
declare class WriteAwaySampleBundle extends WriteAwayCore {
    /**
     * Attaches invisible div handling SEO editing
     */
    attachSeo(data: Partial<RedaxtorSeoData>): void;
    constructor(options: IOptions);
    beforeUnload(): void;
    /**
     * Scans html pieces for invalid internal html and reverts them to source editor if needed
     */
    static checkHtmlPiecesCompartibility(node: Element | Document): void;
}
declare const writeaway: WriteAwaySampleBundle;
export default writeaway;
