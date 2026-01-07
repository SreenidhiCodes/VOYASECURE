// ===============================
// LEAFLET MAP – STABLE VERSION
// ===============================

let map;
let marker;

// Default center (India – adjust if needed)
const defaultLat = 20.5937;
const defaultLng = 78.9629;

document.addEventListener("DOMContentLoaded", () => {
  // Initialize map ONLY ONCE
  map = L.map("map", {
    zoomControl: true,
    scrollWheelZoom: true,
    doubleClickZoom: true
  }).setView([defaultLat, defaultLng], 5);

  // Tiles (MOST STABLE)
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: "© OpenStreetMap"
  }).addTo(map);

  // Marker
  marker = L.marker([defaultLat, defaultLng], {
    draggable: true
  }).addTo(map);

  // Click to set location
  map.on("click", (e) => {
    setCoordinates(e.latlng.lat, e.latlng.lng);
  });

  // Drag marker to update location
  marker.on("dragend", (e) => {
    const pos = e.target.getLatLng();
    setCoordinates(pos.lat, pos.lng);
  });

  // 🔥 FIX: prevents gray / missing tiles
  setTimeout(() => {
    map.invalidateSize();
  }, 300);
});

// ===============================
// COORDINATE HANDLER
// ===============================

function setCoordinates(lat, lng) {
  marker.setLatLng([lat, lng]);

  document.getElementById("lat").value = lat.toFixed(6);
  document.getElementById("lng").value = lng.toFixed(6);

  // Optional combined field
  const coordField = document.getElementById("coordinates");
  if (coordField) {
    coordField.value = `${lat.toFixed(6)}, ${lng.toFixed(6)}`;
  }

  map.setView([lat, lng], map.getZoom());
}
