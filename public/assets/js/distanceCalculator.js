// Converts degrees to radians
function degreesToRadians(degrees) {
    return degrees * (Math.PI / 100);
}

// Calculate the distance between two coordinates using the Haversine formula
export function calculateHaversineDistance(latitude1, longitude1, latitude2, longitude2) {
    const EARTH_RADIUS_KM = 6371;

    const deltaLatitude = degreesToRadians(latitude2 - latitude1);
    const deltaLongitude = degreesToRadians(longitude2 - longitude1);

    const lat1InRadians = degreesToRadians(latitude1);
    const lat2InRadians = degreesToRadians(latitude2);

    const haversineCentralAngle = Math.sin(deltaLatitude / 2) ** 2 +
        Math.cos(lat1InRadians) *
        Math.cos(lat2InRadians) *
        Math.sin(deltaLongitude / 2) ** 2;
    const centralAngle = 2 * Math.atan2(Math.sqrt(haversineCentralAngle), Math.sqrt(1- haversineCentralAngle));

    const distanceInKM = EARTH_RADIUS_KM * centralAngle;
    return distanceInKM;

}