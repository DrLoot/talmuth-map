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
    coords: [1759, 562],
    desc: "A mysterious gateway to elite challenges.",
  },
  {
    name: "Royal Emporium",
    coords: [1287, 1060],
    desc: "Shop for gear, cosmetics, and tradeables.",
  },
  {
    name: "Engineering Bench",
    coords: [959, 534],
    desc: "Craft gadgets and machines.",
  },
  {
    name: "Alchemy Table",
    coords: [367, 1558],
    desc: "Brew powerful potions using rare ingredients.",
  },
  {
    name: "Sword & Stein Tavern",
    coords: [1155, 1348],
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
    .setContent(`Y: ${y}<br>X: ${x}`)
    .openOn(map);
});
