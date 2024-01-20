document.addEventListener('DOMContentLoaded', function () {
    function getRandomValue(min, max) {
        return (Math.random() * (max - min) + min);
    }

    function getSinusoidalValue(min, max, period) {
        const currentTime = new Date().getTime();
        const sineValue = Math.sin(currentTime / period);
        const scaledValue = (sineValue + 1) / 2; // Asigurăm că valorile sunt între 0 și 1
        return scaledValue * (max - min) + min;
    }

    function updateServerStatus() {
        const statusIndicator = document.getElementById('serverStatus');
        statusIndicator.style.backgroundColor = 'green';
    }

    function updateFloorStatistics(floorId, floorValueId, floorPingValueId, floorJitterValueId, floorPacketLossValueId) {
        const floorValueElement = document.getElementById(floorValueId);
        const floorPingValueElement = document.getElementById(floorPingValueId);
        const floorJitterValueElement = document.getElementById(floorJitterValueId);
        const floorPacketLossValueElement = document.getElementById(floorPacketLossValueId);

        const currentDate = new Date();
        const currentHour = currentDate.getHours();

        const isDaytime = currentHour >= 8 && currentHour < 23.5;

        const minValues = {
            floorValue: isDaytime ? 30 : 70,
            floorPingValue: isDaytime ? 45 : 12,
            floorJitterValue: isDaytime ? 4 : 1,
            floorPacketLossValue: isDaytime ? 4 : 0
        };

        const maxValues = {
            floorValue: isDaytime ? 55 : 100,
            floorPingValue: isDaytime ? 140 : 40,
            floorJitterValue: isDaytime ? 12 : 2,
            floorPacketLossValue: isDaytime ? 8 : 2
        };


        const period = 10000;


        const adjustmentFactor = {
            floorValue: getRandomValue(0.8, 1.2),
            floorPingValue: getRandomValue(0.8, 1.2),
            floorJitterValue: getRandomValue(0.8, 1.2),
            floorPacketLossValue: getRandomValue(0.8, 1.2)
        };

        const floorValue = getSinusoidalValue(minValues.floorValue, maxValues.floorValue, period) * adjustmentFactor.floorValue;
        const floorPingValue = getSinusoidalValue(minValues.floorPingValue, maxValues.floorPingValue, period) * adjustmentFactor.floorPingValue;
        const floorJitterValue = getSinusoidalValue(minValues.floorJitterValue, maxValues.floorJitterValue, period) * adjustmentFactor.floorJitterValue;
        const floorPacketLossValue = getSinusoidalValue(minValues.floorPacketLossValue, maxValues.floorPacketLossValue, period) * adjustmentFactor.floorPacketLossValue;

        floorValueElement.textContent = floorValue.toFixed(2);
        floorPingValueElement.textContent = floorPingValue.toFixed(2);
        floorJitterValueElement.textContent = floorJitterValue.toFixed(2);
        floorPacketLossValueElement.textContent = floorPacketLossValue.toFixed(2);
    }

    function updateStatistics() {
        updateServerStatus();

        // Actualizează statistici pentru fiecare etaj
        updateFloorStatistics('groundFloorBox', 'groundFloorValue', 'groundFloorPingValue', 'groundFloorJitterValue', 'groundFloorPacketLossValue');
        updateFloorStatistics('firstFloorBox', 'firstFloorValue', 'firstFloorPingValue', 'firstFloorJitterValue', 'firstFloorPacketLossValue');
        updateFloorStatistics('secondFloorBox', 'secondFloorValue', 'secondFloorPingValue', 'secondFloorJitterValue', 'secondFloorPacketLossValue');
        updateFloorStatistics('thirdFloorBox', 'thirdFloorValue', 'thirdFloorPingValue', 'thirdFloorJitterValue', 'thirdFloorPacketLossValue');
        updateFloorStatistics('fourthFloorBox', 'fourthFloorValue', 'fourthFloorPingValue', 'fourthFloorJitterValue', 'fourthFloorPacketLossValue');
    }

    setInterval(updateStatistics, 2000); // Actualizare la fiecare 2 secunde
});
