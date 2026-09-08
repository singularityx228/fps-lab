function getConfiguration() {

    return {

        platform:
            document.getElementById(
                "platform"
            ).value,

        game:
            document.getElementById(
                "game"
            ).value,

        gpu:
            document.getElementById(
                "gpu"
            ).value,

        cpu:
            document.getElementById(
                "cpu"
            ).value,

        gpuWatt:
            document.getElementById(
                "gpu-watt"
            ).value,

        cpuWatt:
            document.getElementById(
                "cpu-watt"
            ).value,

        // Otomatik sıcaklık tahmini için varsayılan değerler
        gpuTemp: null, // calculateTemperatures fonksiyonu tarafından hesaplanacak
        cpuTemp: null, // calculateTemperatures fonksiyonu tarafından hesaplanacak

        ram:
            Number(
                document.getElementById(
                    "ram"
                ).value
            ),

        resolution:
            document.getElementById(
                "resolution"
            ).value,

        quality:
            document.getElementById(
                "quality"
            ).value,

        rt:
            document.getElementById(
                "rt"
            ).value === "on",

        upscaling:
            document.getElementById(
                "upscaler"
            ).value,

        frameGeneration:
            document.getElementById(
                "fg"
            ).value

    };

}


function runCalculator() {

    const config =
        getConfiguration();


    const result =
        calculatePerformance(
            config
        );


    if (result) {

        updateResults(result);

    }

}


document.addEventListener(
    "DOMContentLoaded",
    function () {

        initializeFilters();

        // Platform değişikliği kontrolü
        const platformSelect = document.getElementById("platform");
        const laptopWattageGroup = document.getElementById("laptop-wattage-group");

        platformSelect.addEventListener("change", function() {
            if (this.value === "laptop") {
                laptopWattageGroup.hidden = false;
            } else {
                laptopWattageGroup.hidden = true;
            }
            runCalculator();
        });

        // Watt değişiklikleri
        const gpuWattSelect = document.getElementById("gpu-watt");
        const cpuWattSelect = document.getElementById("cpu-watt");

        gpuWattSelect.addEventListener("change", runCalculator);
        cpuWattSelect.addEventListener("change", runCalculator);


        const button =
            document.getElementById(
                "calculateButton"
            );


        button.addEventListener(
            "click",
            runCalculator
        );


        runCalculator();

    }
);


/* =========================================================
   FPS LAB - BEST-EFFORT SOURCE / DEVTOOLS PROTECTION
   Bu katman hesaplama motoruna dokunmaz ve form kontrollerini bozmaz.
   Tarayıcı tarafında %100 kaynak gizleme mümkün değildir.
   ========================================================= */
(function installSecurityGuards() {
    "use strict";

    function block(event) {
        event.preventDefault();
        event.stopPropagation();
        if (typeof event.stopImmediatePropagation === "function") {
            event.stopImmediatePropagation();
        }
        return false;
    }

    document.addEventListener("contextmenu", block, true);

    document.addEventListener("keydown", function (event) {
        const key = String(event.key || "").toLowerCase();
        const code = String(event.code || "").toLowerCase();
        const ctrl = event.ctrlKey || event.metaKey;
        const shift = event.shiftKey;
        const alt = event.altKey;

        if (key === "f12" || code === "f12") return block(event);

        if (ctrl && shift && ["i", "j", "c", "k", "s", "u"].includes(key)) {
            return block(event);
        }

        if (ctrl && ["u", "s", "p"].includes(key)) {
            return block(event);
        }

        if (ctrl && shift && key === "p") return block(event);
        if (alt && shift && key === "i") return block(event);
    }, true);

    document.addEventListener("dragstart", function (event) {
        if (event.target && event.target.tagName === "IMG") block(event);
    }, true);

    document.addEventListener("copy", function (event) {
        const target = event.target;
        const tag = target && target.tagName ? target.tagName : "";
        if (tag !== "INPUT" && tag !== "TEXTAREA" && !(target && target.isContentEditable)) {
            block(event);
        }
    }, true);

    // Load the isolated guard file with cache-busting so an older redirect script cannot remain cached.
    // A failure here must never stop FPS Lab from working.
    try {
        const securityScript = document.createElement("script");
        securityScript.src = "js/security-guard.js?v=20260908";
        securityScript.async = false;
        securityScript.onerror = function () {};
        document.head.appendChild(securityScript);
    } catch (_) {}
})();
