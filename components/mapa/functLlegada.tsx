/*import * as Location from 'expo-location';

// Función para calcular distancia entre dos coordenadas
function getDistanceFromLatLonInMeters(lat1, lon1, lat2, lon2) {
  const R = 6371000; // Radio de la Tierra en metros
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // en metros
}

// Punto objetivo (por ejemplo: una tienda o punto de interés)
const objetivo = { latitude: 8.9833, longitude: -79.5167 }; // Panamá City
const radio = 100; // 100 metros

// Verificar si estás dentro del radio
async function checkProximidad() {
  const { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== 'granted') {
    alert('Permiso de ubicación denegado');
    return;
  }

  const location = await Location.getCurrentPositionAsync({});
  const { latitude, longitude } = location.coords;

  const distancia = getDistanceFromLatLonInMeters(
    latitude,
    longitude,
    objetivo.latitude,
    objetivo.longitude
  );

  if (distancia <= radio) {
    alert('¡Estás dentro del área!');
  } else {
    console.log('Aún estás lejos');
  }
}
*/