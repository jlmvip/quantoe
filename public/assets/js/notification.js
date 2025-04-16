// Updates the UI with fare values based on the calculated distance.
export function updateFareEstimates(distanceInKM) {
    if (typeof distanceInKM !== 'number' || isNaN(distanceInKM)) {
        console.error('Distância inválida para updateFareEstimates:', distanceInKM);
        return;
    }

    const BASE_FARE = 1.35;
    const COST_PER_KM = 1.68;
    const MAX_VARIATION = 4.00;

    const minimumFare = (distanceInKM * COST_PER_KM) + BASE_FARE;
    const maximumFare = minimumFare + MAX_VARIATION;

    const minimumInput = document.getElementById('valor-minimo');
    const maximumInput = document.getElementById('valor-maximo');

    if (minimumInput && maximumInput) {
        minimumInput.value = `R$ ${minimumFare.toFixed(2).replace('.', ',')}`;
        maximumInput.value = `R$ ${maximumFare.toFixed(2).replace('.', ',')}`;
    }
}

export function showNotification(message, type = 'success') {
    const notificationElement = document.getElementById('notification');
    if (!notificationElement) return;

    notificationElement.textContent = message;
    notificationElement.className = type === 'error' ? 'error' : 'success';
    notificationElement.style.display = 'block';

    setTimeout(() => {
        notificationElement.style.display = 'none';
    }, 5000);
}