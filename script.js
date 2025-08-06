// Initialize the map
const map = L.map('map', {
  crs: L.CRS.Simple,
  minZoom: -1,
  zoomAnimation: false
});

// Add a custom pane for fixed-size markers
map.createPane('fixedMarkerPane');
map.getPane('fixedMarkerPane').style.zIndex = 650;

// Force transform:none on zoom to prevent icon scaling
map.on('zoom', () => {
  const pane = map.getPane('fixedMarkerPane');
  if (pane) {
    pane.style.transform = 'none';
  }
});

// Define custom icons
const npcIcon = L.divIcon({
  className: 'custom-marker npc-marker',
  html: '<img src="talmuth-map/assets/npc.png" alt="NPC" />',
  iconSize: [36, 36],
  iconAnchor: [18, 36],
});

const locationIcon = L.divIcon({
  className: 'custom-marker location-marker',
  html: '<img src="talmuth-map/assets/location.png" alt="Location" />',
  iconSize: [36, 36],
  iconAnchor: [18, 36],
});

const questIcon = L.divIcon({
  className: 'custom-marker quest-marker',
  html: '<img src="talmuth-map/assets/quest.png" alt="Quest" />',
  iconSize: [36, 36],
  iconAnchor: [18, 36],
});

// Set up the background map image
const bounds = [[0, 0], [2048, 2048]];
const image = L.imageOverlay('assets/map.png?v=2', bounds).addTo(map);
map.fitBounds(bounds);

// Location data
const locations = [
  { name: "Guardian Arena", coords: [1759, 562], desc: "A mysterious gateway to elite challenges.", iconType: "location" },
  { name: "Royal Emporium", coords: [1287, 1060], desc: "Shop for Lost Relics, Collectibles, gear, cosmetics, and many other tradeables.", iconType: "location" },
  { name: "Engineering Bench", coords: [959, 534], desc: "Craft weapons and tools.", iconType: "location" },
  { name: "Alchemy Table", coords: [367, 1558], desc: "Brew powerful potions.", iconType: "location" },
  { name: "Sword & Stein Tavern", coords: [1155, 1348], desc: "Catch rumors, rest, or chat with travelers.", iconType: "location" },
  { name: "Altar", coords: [281, 706], desc: "Mysterious magical altar infused with magic from the old world.", iconType: "location" },
  { name: "Player Housing", coords: [1645, 115], desc: "Home Sweet Home.", iconType: "location" },
  { name: "Anvil, Furnace, and Arcane Fuser", coords: [1315, 1566], desc: "Anvil and Furnace are hot and ready for all your Forging needs. The Arcane Fuser is used to exchange Arcane Fragments.", iconType: "location" },
  { name: "Stove", coords: [1897, 1316], desc: "A public place for Cooking.", iconType: "location" },
  { name: "Terror Descent", coords: [1929, 840], desc: "Do you dare enter the 4 levels of the Terror Descent dungeon?", iconType: "location" },
  { name: "Cavern of Paths", coords: [1961, 327], desc: "All adventures from Common to Transcendent. The enemies are waiting!", iconType: "location" },
  { name: "Player Housing Crafting", coords: [1557, 285], desc: "Access all crafting stations if you own a home.", iconType: "location" },
  { name: "Flour Mill", coords: [319, 1732], desc: "Flour is ready to be picked up every so often here, up to 20 bags at a time.", iconType: "location" },
  {
    name: "Royal Emporium NPCs",
    coords: [1311, 1106],
    desc: "Oliver runs the Royal Emporium marketplace. Edmund Ironhand exchanges Capes and Tomes. Lavinia Dawnlight exchanges Mythical Relics. Gold Merchant exchanges Gold Dust for Gold Coins.",
    iconType: "npc"
  },
  {
    name: "Orin Thalios NPC",
    coords: [1007, 1160],
    desc: `Orin Thalios is a great, wise sage. He controls the Waygate and offers exchanges for Membership Orbs and Valor rewards for each season's Expedition.<br><br>
    <button class="inventory-btn" data-npc="orin">🧾 View Inventory</button>`,
    iconType: "npc"
  },
  { name: "Viola Nightbloom NPC", coords: [839, 1104], desc: "Viola Nightbloom's obsesses over Luneri and offers her magical buffs to anyone that places the crescent moon shaped currency in her tip jar.", iconType: "npc" },
  { name: "Salvage Captain Wren NPC", coords: [355, 1650], desc: "Salvage Captain Wren is an expert in the alchemical arts. She offers rewards for Arachnadon Fangs.", iconType: "npc" },
  { name: "Timberlord Thornsnap NPC", coords: [953, 608], desc: "Timberlord Thornsnap is a master engineer. He offers rewards in exchange for the rare Leafsong Resin.", iconType: "npc" },
  { name: "Fisherking Nautica NPC", coords: [1852, 1352], desc: "Fisherking Nautica is the king of fishing. He's on the lookout for Croakreaver Fins and will offer some nice rewards in exchange.", iconType: "npc" },
  { name: "Quarrymaster Grimstone NPC", coords: [1369, 1612], desc: "Quarrymaster Grimstone is a master smith. He'll pay handsomely for some Stoneheart Shards.", iconType: "npc" },
  { name: "Emera Crossing", coords: [1896, 1764], desc: "Exit to Emera Crossing zone.", iconType: "location" },
  { name: "Newbie Docks", coords: [527, 984], desc: "Where all new players start their new life in Talmuth.", iconType: "location" },
];

// Place all markers
locations.forEach(loc => {
  let iconToUse;
  if (loc.iconType === "npc") iconToUse = npcIcon;
  else if (loc.iconType === "quest") iconToUse = questIcon;
  else iconToUse = locationIcon;

  L.marker(loc.coords, {
    icon: iconToUse,
    pane: 'fixedMarkerPane'
  })
    .addTo(map)
    .bindPopup(`<strong>${loc.name}</strong><br>${loc.desc}`);
});

// Grid Coordinates on Click
map.on('click', function (e) {
  const x = Math.floor(e.latlng.lng);
  const y = Math.floor(e.latlng.lat);
  L.popup()
    .setLatLng(e.latlng)
    .setContent(`Y: ${y}<br>X: ${x}`)
    .openOn(map);
});

// Inventory Modal Data
const npcInventories = {
  orin: [
    { name: "Shop:" },
    { name: "30 Day Members Orb - 1,800 Luneri", desc: "Used for membership benefits." },
    { name: "60 Day Members Orb - 5,100 Luneri", desc: "Used for membership benefits." },
    { name: "90 Day Members Orb - 9,600 Luneri", desc: "Used for membership benefits." },
    { name: "180 Day Members Orb - 18,800 Luneri", desc: "Used for membership benefits." },
    { name: "" },
    { name: "Exchange:" },
    { name: "Seal of Arthraxis (E) for 4x Valor Triad (E)", desc: "Artifact - 25% more weapon damage to Arthropods." },
    { name: "Broodqueen's Oath (M) for 4x Valor Triad (M)", desc: "Staff - 15% chance to cause Poison." },
    { name: "Eldergleam Vault (M) for 1x Valorbound Seal (M)", desc: "Container - Chance for Arcane Fragments (M) and (T)." },
    { name: "Stormrazer (M) for 1x Valorbound Seal (M)", desc: "Longbow - 15% chance to cause Shock." },
    { name: "Swiftmark Ring (M) for 4x Valor Triad (M)", desc: "Artifact - Ranged and Magic weapons have 12% increased attack speed and weapon damage." }
  ]
};

// Inventory modal open/close
document.addEventListener("click", function (e) {
  if (e.target.classList.contains("inventory-btn")) {
    const npcKey = e.target.getAttribute("data-npc");
    openInventoryModal(npcKey);
  }

  if (e.target.classList.contains("modal-close") || e.target.id === "inventoryModal") {
    closeInventoryModal();
  }
});

function openInventoryModal(npcKey) {
  document.body.style.overflow = 'hidden';
  const modal = document.getElementById("inventoryModal");
  const modalItems = document.getElementById("modalItems");
  const modalTitle = document.getElementById("modalTitle");

  const items = npcInventories[npcKey] || [];

  modalTitle.textContent = `${npcKey.charAt(0).toUpperCase() + npcKey.slice(1)}'s Inventory`;

  modalItems.innerHTML = items.map(item => {
    if (!item.name && !item.desc) return `<hr class="inventory-divider" />`;
    if (item.name && !item.desc) return `<h3 class="inventory-section">${item.name}</h3>`;
    return `<div class="inventory-item"><strong>${item.name}</strong><br><span>${item.desc}</span></div>`;
  }).join("");

  modal.style.display = "block";
}

function closeInventoryModal() {
  document.body.style.overflow = '';
  document.getElementById("inventoryModal").style.display = "none";
}
