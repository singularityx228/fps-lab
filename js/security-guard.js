/* FPS LAB SECURITY DETERRENTS
 * Important: this file intentionally contains no calculator/auth logic.
 * It only adds browser-side deterrents. Client-side source can never be
 * made completely secret because the browser must receive the code.
 */
(function () {
    "use strict";

    function block(event) {
        event.preventDefault();
        event.stopPropagation();
        if (typeof event.stopImmediatePropagation === "function") {
            event.stopImmediatePropagation();
        }
        return false;
    }

    // Context menu / common browser source actions.
    document.addEventListener("contextmenu", block, true);

    document.addEventListener("keydown", function (event) {
        var key = String(event.key || "").toLowerCase();
        var code = String(event.code || "").toLowerCase();
        var ctrl = event.ctrlKey || event.metaKey;
        var shift = event.shiftKey;
        var alt = event.altKey;

        if (key === "f12" || code === "f12") return block(event);

        if (ctrl && shift && ["i", "j", "c", "k", "s", "u"].indexOf(key) !== -1) {
            return block(event);
        }

        if (ctrl && ["u", "s", "p"].indexOf(key) !== -1) {
            return block(event);
        }

        if (ctrl && shift && key === "p") return block(event);
        if (alt && shift && key === "i") return block(event);
    }, true);

    // Discourage dragging page images/assets outside the page.
    document.addEventListener("dragstart", function (event) {
        if (event.target && event.target.tagName === "IMG") block(event);
    }, true);

    // Make copying page UI less convenient without touching form fields.
    document.addEventListener("copy", function (event) {
        var target = event.target;
        var tag = target && target.tagName ? target.tagName : "";
        if (tag !== "INPUT" && tag !== "TEXTAREA" && !(target && target.isContentEditable)) {
            block(event);
        }
    }, true);
})();
