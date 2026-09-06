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

    // Sağ tık menüsü: kaynak/inceleme menülerine erişimi zorlaştırır.
    document.addEventListener("contextmenu", function (event) {
        event.preventDefault();
    }, true);

    document.addEventListener("keydown", function (event) {
        const key = String(event.key || "").toLowerCase();
        const code = String(event.code || "").toLowerCase();
        const ctrl = event.ctrlKey || event.metaKey;
        const shift = event.shiftKey;
        const alt = event.altKey;

        // F12 / function-key DevTools variants.
        const devToolsFunctionKey = key === "f12" || code === "f12";

        // Ctrl/Cmd + Shift + I/J/C/K/S/U: DevTools/source-related browser shortcuts.
        const devToolsShortcut =
            ctrl && shift && ["i", "j", "c", "k", "s", "u"].includes(key);

        // Ctrl/Cmd + U: View Source.
        const viewSourceShortcut = ctrl && key === "u";

        // Ctrl/Cmd + S: Save page.
        const savePageShortcut = ctrl && key === "s";

        // Ctrl/Cmd + P: printing can expose/save the rendered page.
        const printShortcut = ctrl && key === "p";

        // Ctrl/Cmd + Shift + P: command/print-related browser shortcut.
        const commandShortcut = ctrl && shift && key === "p";

        // Alt + Shift + I is a DevTools shortcut in some Chromium environments.
        const alternateDevToolsShortcut = alt && shift && key === "i";

        if (
            devToolsFunctionKey ||
            devToolsShortcut ||
            viewSourceShortcut ||
            savePageShortcut ||
            printShortcut ||
            commandShortcut ||
            alternateDevToolsShortcut
        ) {
            event.preventDefault();
            event.stopPropagation();
            event.stopImmediatePropagation();
            return false;
        }
    }, true);

    // Block common source-saving/printing routes without touching normal inputs.
    window.addEventListener("beforeprint", function (event) {
        event.preventDefault();
    });

    // Prevent dragging page assets out to another application.
    document.addEventListener("dragstart", function (event) {
        const target = event.target;
        if (target && target.tagName === "IMG") {
            event.preventDefault();
        }
    }, true);

})();
