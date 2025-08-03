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
  {
    name: "Altar",
    coords: [281, 706],
    desc: "Mysterious magical altar infused with magic from the old world.",
  },
  {
    name: "Player Housing",
    coords: [1645, 115],
    desc: "Home Sweet Home.",
  },
  {
    name: "Anvil, Furnace, and Arcane Fuser",
    coords: [1239, 1644],
    desc: "Anvil and Furnace are hot and ready for all your Forging needs. The Arcane Fuser is used to exchange Arcane Fragments.",
  },
  {
    name: "Stove",
    coords: [1897, 1316],
    desc: "A public place for Cooking.",
  },
  {
    name: "Terror Descent",
    coords: [1929, 840],
    desc: "Do you dare enter the 4 levels of the Terror Descent dungeon?",
  },
  {
    name: "Cavern of Paths",
    coords: [1961, 327],
    desc: "All adventures from Common to Transcendent. The enemies are waiting!",
  },
  {
    name: "Player Housing Crafting",
    coords: [1557, 285],
    desc: "If you own a home, you'll be able to enjoy your own Furnace, Anvil and Tanning station outside. You'll also have access to the rest of the crafting stations in your home.",
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
