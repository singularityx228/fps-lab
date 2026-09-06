/* FPS LAB SECURITY DETERRENTS
 * Important: this file intentionally contains no calculator/auth logic.
 * It only adds browser-side deterrents. Client-side source can never be
 * made completely secret because the browser must receive the code.
 */
(function () {
    "use strict";

    /* =========================================================
       FPS LAB - DOMAIN LOCK
       The calculator is allowed only on the official FPS Lab URL.
       If the project is copied to another website/domain, the visitor
       is sent back to the original FPS Lab site.

       Local development is allowed so testing is not broken.
       This does not touch calculator/auth logic.
       ========================================================= */
    (function enforceDomainLock() {
        var OFFICIAL_ORIGIN = "https://sdfsgedsfhstjhfghfda.github.io";
        var OFFICIAL_PATH = "/fps-lab";
        var host = String(window.location.hostname || "").toLowerCase();
        var protocol = String(window.location.protocol || "").toLowerCase();
        var pathname = String(window.location.pathname || "").toLowerCase().replace(/\/+$/, "");
        var isLocal =
            host === "localhost" ||
            host === "127.0.0.1" ||
            host === "[::1]";

        var isOfficial =
            protocol === "https:" &&
            window.location.origin.toLowerCase() === OFFICIAL_ORIGIN &&
            (pathname === OFFICIAL_PATH || pathname.indexOf(OFFICIAL_PATH + "/") === 0);

        if (!isOfficial && !isLocal) {
            try {
                window.location.replace(OFFICIAL_ORIGIN + OFFICIAL_PATH + "/");
            } catch (_) {
                window.location.href = OFFICIAL_ORIGIN + OFFICIAL_PATH + "/";
            }
            return;
        }
    })();

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
