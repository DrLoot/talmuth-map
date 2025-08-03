// Initialize the map
const map = L.map('map', {
  crs: L.CRS.Simple,
  minZoom: -1,
});

// Adjust based on your final image size
const bounds = [[0, 0], [2048, 2048]];
const image = L.imageOverlay('assets/map.png?v=2', bounds).addTo(map);
map.fitBounds(bounds);

// Add NPCs or Locations
const locations = [
  {
    name: "Guardian Arena",
    coords: [1600, 530],
    desc: "A mysterious gateway to elite challenges.",
  },
  {
    name: "Royal Emporium",
    coords: [1210, 1110],
    desc: "Shop for gear, cosmetics, and tradeables.",
  },
  {
    name: "Engineering Bench",
    coords: [830, 550],
    desc: "Craft gadgets and machines.",
  },
  {
    name: "Alchemy Table",
    coords: [350, 1590],
    desc: "Brew powerful potions using rare ingredients.",
  },
  {
    name: "Sword & Stein Tavern",
    coords: [1110, 1310],
    desc: "Catch rumors, rest, or chat with travelers.",
  },
];

// Add markers
locations.forEach(loc => {
  L.marker(loc.coords)
    .addTo(map)
    .bindPopup(`<strong>${loc.name}</strong><br>${loc.desc}`);
});
// Grid Coordinates Overlay
map.on('click', function (e) {
  const x = Math.floor(e.latlng.lng);
  const y = Math.floor(e.latlng.lat);
  L.popup()
    .setLatLng(e.latlng)
    .setContent(`X: ${x}<br>Y: ${y}`)
    .openOn(map);
});
