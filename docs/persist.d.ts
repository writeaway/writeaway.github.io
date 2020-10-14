/**
 * Set cookies
 * @param {string} name
 * @param {*} value
 */
export declare const setCookie: (name: string, value: string) => void;
/**
 * Gets a document cookies
 * @param {string} name
 * @return {*}
 */
export declare const getCookie: (name: string) => string | undefined;
export declare const globMeta: () => {
    [id: string]: string;
} | undefined;
export declare const VAR_E_ACTIVE = "r_editorActive";
export declare const VAR_E_COLLAPSED = "r_navBarCollapsed";
export declare const VAR_E_EXPERT = "r_expert";
export declare const VAR_WA = "writeaway";
