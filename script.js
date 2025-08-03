// Initialize the map
const map = L.map('map', {
  crs: L.CRS.Simple,
  minZoom: -1,
});

// Define custom icons
const npcIcon = L.icon({
  iconUrl: 'assets/npc.png',
  iconSize: [36, 36],
  iconAnchor: [18, 36],
  popupAnchor: [0, -36],
});

const locationIcon = L.icon({
  iconUrl: 'assets/building.png',
  iconSize: [36, 36],
  iconAnchor: [18, 36],
  popupAnchor: [0, -36],
});

const questIcon = L.icon({
  iconUrl: 'assets/quest.png',
  iconSize: [36, 36],
  iconAnchor: [18, 36],
  popupAnchor: [0, -36],
});

// Set up the background map image
const bounds = [[0, 0], [2048, 2048]];
const image = L.imageOverlay('assets/map.png?v=2', bounds).addTo(map);
map.fitBounds(bounds);

// Add NPCs or Locations
const locations = [
  {
    name: "Guardian Arena",
    coords: [1759, 562],
    desc: "A mysterious gateway to elite challenges.",
    iconType: "location",
  },
  {
    name: "Royal Emporium",
    coords: [1287, 1060],
    desc: "Shop for Lost Relics, Collectibles, gear, cosmetics, and many other tradeables.",
    iconType: "location",
  },
  {
    name: "Engineering Bench",
    coords: [959, 534],
    desc: "Craft weapons and tools.",
    iconType: "location",
  },
  {
    name: "Alchemy Table",
    coords: [367, 1558],
    desc: "Brew powerful potions.",
    iconType: "location",
  },
  {
    name: "Sword & Stein Tavern",
    coords: [1155, 1348],
    desc: "Catch rumors, rest, or chat with travelers.",
    iconType: "location",
  },
  {
    name: "Altar",
    coords: [281, 706],
    desc: "Mysterious magical altar infused with magic from the old world.",
    iconType: "location",
  },
  {
    name: "Player Housing",
    coords: [1645, 115],
    desc: "Home Sweet Home.",
    iconType: "location",
  },
  {
    name: "Anvil, Furnace, and Arcane Fuser",
    coords: [1239, 1644],
    desc: "Anvil and Furnace are hot and ready for all your Forging needs. The Arcane Fuser is used to exchange Arcane Fragments.",
    iconType: "location",
  },
  {
    name: "Stove",
    coords: [1897, 1316],
    desc: "A public place for Cooking.",
    iconType: "location",
  },
  {
    name: "Terror Descent",
    coords: [1929, 840],
    desc: "Do you dare enter the 4 levels of the Terror Descent dungeon?",
    iconType: "location",
  },
  {
    name: "Cavern of Paths",
    coords: [1961, 327],
    desc: "All adventures from Common to Transcendent. The enemies are waiting!",
    iconType: "location",
  },
  {
    name: "Player Housing Crafting",
    coords: [1557, 285],
    desc: "Access all crafting stations if you own a home.",
    iconType: "location",
  },
  {
    name: "Flour Mill",
    coords: [319, 1732],
    desc: "Flour is ready to be picked up every so often here, up to 20 bags at a time.",
    iconType: "location",
  },
  {
    name: "Royal Emporium NPCs",
    coords: [1311, 1106],
    desc: "Oliver runs the Royal Emporium marketplace. Edmund Ironhand exchanges Capes and Tomes. Lavinia Dawnlight exchanges Mytical Relics.",
    iconType: "npc",
  },
];

// Place all markers with dynamic icon selection
locations.forEach(loc => {
  let iconToUse = undefined;

  if (loc.iconType === "npc") iconToUse = npcIcon;
  if (loc.iconType === "quest") iconToUse = questIcon;

  L.marker(loc.coords, iconToUse ? { icon: iconToUse } : {})
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
