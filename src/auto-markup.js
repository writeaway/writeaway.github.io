let id = 0;
/**
 * Checks if node can be used for redaxtor
 * @param node
 */
const checkNode = function (node) {
    if (!node || window.getComputedStyle(node, null).display != 'block'
        || node.tagName.toLowerCase() == 'script'
        || node.tagName.toLowerCase() == 'style'
        || node.tagName.toLowerCase() == 'noscript'
        || node.tagName.toLowerCase() == 'img') {
        return;
    }
    const validTags = ['b', 'strong', 'span', 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'li', 'ul', 'ol', 'i', 'em', 'a'];
    const validStyles = ['fontWeight', 'fontStyle', 'textDecoration'];
    let children = node.querySelectorAll('*');

    for (let i = 0; i < children.length; i++) {
        let child = children[i];
        if (validTags.indexOf(child.tagName.toLowerCase()) == -1) {
            return `${child.tagName} tag is not allowed`;
        }
        if (child.style) {
            for (let styleRule in Object.keys(child.style)) {
                if (validStyles.indexOf(styleRule) == -1) {
                    return `${styleRule} style must not present on subnodes`;
                }
            }
        }
        if (window.getComputedStyle(node.display, null).position == 'absolute') {
            return `No absolute positioned nodes`;
        }
    }
    console.log('Node valid', node);
};

const checkLayer = function (redaxtor, node) {
    if (!node || !node.children) {
        return;
    }
    for (let i = 0; i < node.children.length; i++) {
        if (!checkNode(node.children[i])) {
            redaxtor.addPiece(node.children[i], {
                type: 'html',
                id: 'auto-' + (id++)
            });
        } else {
            checkLayer(node.children[i])
        }
    }
};

module.exports = function (redaxtor, scanArea) {
    checkLayer(redaxtor, scanArea);
};