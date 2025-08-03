// Initialize the map
const map = L.map('map', {
  crs: L.CRS.Simple,
  minZoom: -1,
});

// Adjust based on your final image size
const bounds = [[0, 0], [2048, 2048]];
const image = L.imageOverlay('assets/talmuth-map.png', bounds).addTo(map);
map.fitBounds(bounds);

// Add NPCs or Locations
const locations = [
  {
    name: "Guardian Arena",
    coords: [320, 510],
    desc: "A mysterious gateway to elite challenges.",
  },
  {
    name: "Royal Emporium",
    coords: [1020, 990],
    desc: "Shop for gear, cosmetics, and tradeables.",
  },
  {
    name: "Engineering Bench",
    coords: [1430, 670],
    desc: "Craft gadgets and machines.",
  },
  {
    name: "Alchemy Table",
    coords: [1875, 1450],
    desc: "Brew powerful potions using rare ingredients.",
  },
  {
    name: "Tavern",
    coords: [1040, 1200],
    desc: "Catch rumors, rest, or chat with travelers.",
  },
];

// Add markers
locations.forEach(loc => {
  L.marker(loc.coords)
    .addTo(map)
    .bindPopup(`<strong>${loc.name}</strong><br>${loc.desc}`);
});
