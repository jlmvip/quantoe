import { getCoordinatesByAddress } from "./api.js";
import { calculateHaversineDistance } from "./distanceCalculator.js";
import { updateFareEstimates, showNotification } from "./notification.js";

//Orchestrates fetching coordinates and calculating the distance between two addresses
async function handleAddressSubmission() {
    const originInput = document.getElementById('ponto-de-partida');
    const destinationInput = document.getElementById('ponto-de-desembarque');

    if (!originInput || !destinationInput) {
        console.error('Elementos de entrada não encontrados no DOM.');
        return;
    }

    const origin = originInput.value;
    const destination = destinationInput.value;

    try {
        const originCoords = await getCoordinatesByAddress(origin);
        const destinationCoords = await getCoordinatesByAddress(destination);

        const distance = calculateHaversineDistance(
            originCoords.latitude, originCoords.longitude,
            destinationCoords.latitude, destinationCoords.longitude
        );

        updateFareEstimates(distance);
        showNotification('Localizações encontradas com sucesso!  🎉', 'success');
    }catch (error) {
        showNotification(error.message, 'error');
        console.error('Erro ao calcular distância', error);
    }
}

// Initializes form event listeners
function initializeFormListener() {
    const form = document.getElementById('form-quantoé');
    if (!form) {
        console.error('Formulário não encontrado no DOM!');
        return;
    }

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        handleAddressSubmission();
    });
}

initializeFormListener();