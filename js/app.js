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
