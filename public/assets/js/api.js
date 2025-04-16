const NOMINATIM_BASE_URL = 'https://nominatim.openstreetmap.org/search';

// Fetches geographic coordinates (latitude and longitude) for a given address using OpenStreetMap's Nominatim API.
export async function getCoordinatesByAddress(address) {
    if (!address || typeof address !== 'string' || address.trim() === '') {
        throw new Error('Endereço inválido. Por favor, forneça um endereço não vazio.');
    }
    const url = `${NOMINATIM_BASE_URL}?q=${encodeURIComponent(address)}&format=json`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Erro ao buscar o endereço: ${response.status} ${response.statusText}`);
        }

        const results = await response.json();
        if (results.length === 0) {
            throw new Error(`Nenhum resultado encontrado para: "${address}".`);
        }

        const {lat, lon} = results[0];
        return { latitude: parseFloat(lat), longitude: parseFloat(lon)};
    }catch (error) {
        throw new Error(`Erro ao obter coordenadas: ${error.message}`);
    }
}