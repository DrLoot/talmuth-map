// detect touch support
const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

// Initialize the map with no zoom-scaling of markers
const map = L.map('map', {
  crs: L.CRS.Simple,
  minZoom: -2,
  maxZoom: 2,
  zoomSnap: isTouch ? 0 : 1,
  zoomDelta: isTouch ? 0.25 : 1,   // smaller increments on touch
  scrollWheelZoom: !isTouch,          // wheel only on desktop
  wheelDebounceTime: 40,
  wheelPxPerZoomLevel: 240,
  zoomAnimation: false,
  markerZoomAnimation: false,
  touchZoom: true
});

// start fully zoomed out
map.setView([1024, 1024], -2)

// Define custom icons
const npcIcon = L.divIcon({
  className: 'custom-marker npc-marker',
  html: '<img src="assets/npc.png" alt="NPC">',
  iconSize: [36, 36],
  iconAnchor: [18, 36],
});
const locationIcon = L.divIcon({
  className: 'custom-marker location-marker',
  html: '<img src="assets/location.png" alt="Location">',
  iconSize: [36, 36],
  iconAnchor: [18, 36],
});
const questIcon = L.divIcon({
  className: 'custom-marker quest-marker',
  html: '<img src="assets/quest.png" alt="Quest">',
  iconSize: [36, 36],
  iconAnchor: [18, 36],
});

// Background image
const bounds = [[0, 0], [2048, 2048]];
L.imageOverlay('assets/map.png?v=2', bounds).addTo(map);
map.fitBounds(bounds);

// Your location data
const locations = [
  { name: "Flour Mill", coords: [353, 1721], desc: "The Flour Mill provides 20 bags of flour that can be used in certain cooking recipes. Bags of flour respawn periodically.", iconType: "location" },
  { name: "Guardian Arena", coords: [1759, 562], desc: "A mysterious gateway to elite challenges.", iconType: "location" },
  { name: "Royal Emporium", coords: [1287, 1060], desc: "Shop for Lost Relics, Collectibles, gear, cosmetics, and many other tradeables.", iconType: "location" },
  { name: "Engineering Bench", coords: [959, 534], desc: "Craft weapons and tools.", iconType: "location" },
  { name: "Alchemy Table", coords: [367, 1558], desc: "Brew powerful potions.", iconType: "location" },
  { name: "Sword & Stein Tavern", coords: [1155, 1348], desc: "1st Floor: Purchase daily drawing lottery tickets, purchase supplies from the bartender, and purchase Valor contracts from Valor Contractor.<br><br>Basement: A crusher is used to crush bones and runes.<br><br>2nd Floor: Spinning Wheel to make bowstrings, Dreamscapemancer NPC to access Dreamscape, Armor Assembly Stand, rift to Cavern of Paths, and a player's stash.", iconType: "location" },
  { name: "Altar", coords: [281, 706], desc: "Mysterious magical altar infused with magic from the old world.", iconType: "location" },
  { name: "Player Housing", coords: [1645, 115], desc: "Home Sweet Home. Collectible cosmetics can be used to change the style of your house.<br><br>Purchasing a home unlocks all production stations and the Tanning Table on your property.", iconType: "location" },
  { name: "Anvil, Furnace, and Arcane Fuser", coords: [1315, 1566], desc: "Anvil and Furnace are hot and ready for all your Forging needs. The Arcane Fuser is used to exchange Arcane Fragments.", iconType: "location" },
  { name: "Stove", coords: [1897, 1316], desc: "A public place for Cooking.", iconType: "location" },
  { name: "Terror Descent", coords: [1929, 840], desc: "Do you dare enter the 4 levels of the Terror Descent dungeon?", iconType: "location" },
  { name: "Cavern of Paths", coords: [1961, 327], desc: "All adventures from Common to Transcendent. The enemies are waiting!", iconType: "location" },

  // NPCs
  { name: "Enjinious Blocksmith", coords: [1433, 1200], desc: "Enjinious Blocksmith runs the Enjin Multiverse Event Leaderboards. He'll reward you with a Multiverse Mystery Box in exchange for 2 Multiverse Medallions.", iconType: "npc" },
  { name: "Oliver Greenfield", coords: [1614, 305], desc: "Oliver also flips homes! Unlock Talmuth Homeowner for 2x Arcane Fragment (E), 2x Arcane Fragment (L), 1,000,000 Gold.", iconType: "npc" },
  {
    name: "Oliver Greenfield",
    coords: [1254, 1072],
    desc: "Oliver Greenfield runs the Royal Emporium marketplace inside the Royal Emporium.",
    iconType: "npc"
  },
  {
    name: "Seraphina the Bartender",
    coords: [1205, 1334],
    desc: `Seraphina had to close down her General Store, but a timely job opening as a bartender was the perfect new job!<br><br>
               <button class="inventory-btn" data-npc="seraphina">🧾 View Inventory</button>`,
    iconType: "npc"
  },
  {
    name: "Valor Contract Guy",
    coords: [1164, 1397],
    desc: `Valor Contract Guy exhanges his highly sought-after Valor contracts for Arcane Fragments and Valor Tokens.<br><br>
               <button class="inventory-btn" data-npc="valor">🧾 View Inventory</button>`,
    iconType: "npc"
  },
  {
    name: "Currency Merchant",
    coords: [1318, 1029],
    desc: `The Currency Merchant is located inside the Royal Emporium and offers gold and Luneri exchanges.<br><br>
               <button class="inventory-btn" data-npc="currencymerchant">🧾 View Inventory</button>`,
    iconType: "npc"
  },
  {
    name: "Edmund Ironhand",
    coords: [1367, 1031],
    desc: `Edmund Ironhand is located inside the Royal Emporium and offers a variety of Capes and Tomes.<br><br>
               <button class="inventory-btn" data-npc="edmund">🧾 View Inventory</button>`,
    iconType: "npc"
  },
  {
    name: "Lavinia Dawnlight",
    coords: [1368, 1063],
    desc: `Lavinia Dawnlight is located inside the Royal Emporium and offers some Relic exchanges and upgrades.<br><br>
               <button class="inventory-btn" data-npc="lavinia">🧾 View Inventory</button>`,
    iconType: "npc"
  },
  {
    name: "Orin Thalios NPC",
    coords: [1007, 1160],
    desc: `Orin Thalios is a great, wise sage. He controls the Waygate and offers exchanges for Membership Orbs and Valor rewards for each season's Expedition.<br><br>
           <button class="inventory-btn" data-npc="orin">🧾 View Inventory</button>`,
    iconType: "npc"
  },
  {
    name: "Viola Nightbloom NPC",
    coords: [839, 1104],
    desc: `Viola Nightbloom obsesses over Luneri and offers magical buffs to anyone that drops the crescent moon currency in her tip jar.<br><br>
           <button class="inventory-btn" data-npc="viola">🧾 View Inventory</button>`,
    iconType: "npc"
  },
  {
    name: "Salvage Captain Wren NPC",
    coords: [355, 1650],
    desc: `Salvage Captain Wren is an expert in the alchemical arts. She offers rewards for Arachnadon Fangs.<br><br>
    <button class="inventory-btn" data-npc="wren">🧾 View Inventory</button>`,
    iconType: "npc"
  },
  {
    name: "Timberlord Thornsnap NPC",
    coords: [953, 608],
    desc: `Timberlord Thornsnap is a master engineer. He offers rewards in exchange for the rare Leafsong Resin.<br><br>
    <button class="inventory-btn" data-npc="thornsnap">🧾 View Inventory</button>`,
    iconType: "npc"
  },
  {
    name: "Fisherking Nautica NPC",
    coords: [1852, 1352],
    desc: `Fisherking Nautica is the king of fishing. He's on the lookout for Croakreaver Fins and will offer some nice rewards in exchange.<br><br>
    <button class="inventory-btn" data-npc="nautica">🧾 View Inventory</button>`,
    iconType: "npc"
  },

  {
    name: "Quarrymaster Grimstone NPC",
    coords: [1369, 1612],
    desc: `Quarrymaster Grimstone is a master smith. He'll pay handsomely for some Stoneheart Shards.<br><br> 
    <button class="inventory-btn" data-npc="grimstone">🧾 View Inventory</button>`,
    iconType: "npc"
  },

  // Exits / Zones
  { name: "Emera Crossing", coords: [1896, 1764], desc: "Exit to Emera Crossing zone. Unlocked after completing The Miner's Passage Quest. Quest becomes available at level 24.", iconType: "location" },
  { name: "Newbie Docks", coords: [527, 984], desc: "Where all new players start their adventure!", iconType: "location" }
];

// Place all markers into the fixed pane so they never scale
locations.forEach(loc => {
  const iconToUse = loc.iconType === 'npc'
    ? npcIcon
    : loc.iconType === 'quest'
      ? questIcon
      : locationIcon;

  L.marker(loc.coords, {
    icon: iconToUse,
  })
    .addTo(map)
    .bindPopup(`<strong>${loc.name}</strong><br>${loc.desc}`);
});

// Show grid coords on click
map.on('click', e => {
  const x = Math.floor(e.latlng.lng);
  const y = Math.floor(e.latlng.lat);
  L.popup()
    .setLatLng(e.latlng)
    .setContent(`Y: ${y}<br>X: ${x}`)
    .openOn(map);
});

// Inventory modal data & handlers (unchanged)
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
    { name: "Stormrazer (M) for 1x Valorbound Seal (M)", desc: "Longbow - 15% chance to cause Shock." }
  ],
  viola: [
    { name: "Character/Gathering/Production buff - 100 Luneri", desc: "Each buff provides a 5% experience gain." },
    { name: "Colossus buff - 200 Luneri", desc: "Provides a 30% damage buff to any Colossus." }
  ],
  wren: [
    { name: "20x Ancient Flask (U) for 2x Arcane Fragment (U)", desc: "Ancient Flasks are used in Alchemy." },
    { name: "Wren's Trove (R) for 20x Arachnadon Fang (U).", desc: "Wren's Trove has a chance to reward a variety of potions, gold, Greater Tome of Scavenging, and a Scavenger's Lens which has a chance to provide 20% Scavenging Experience." }
  ],
  thornsnap: [
    { name: "Thornsap Coffer (R) for 20x Leafsong Resin (U).", desc: "Thornsnap Coffer has a chance to reward a variety of tools, gold, Greater Tome of Woodcutting, and a Sylvan Grip which has a chance to provide 20% Woodcutting Experience." }
  ],
  grimstone: [
    { name: "Grimstone Cache (R) for 20x Stoneheart Shard (U).", desc: "Grimstone Cache has a chance to reward a variety of armors, gold, Greater Tome of Mining, and a Miner's Hat which has a chance to provide 20% Mining Experience." }
  ],
  nautica: [
    { name: "Mystic Kraken Ink (M) for 5,000,000 Gold.", desc: "Mystic Kraken Ink (M) is a part needed to craft the Abyssal Dominator." },
    { name: "Nautica's Strongbox (R) for 20x Croakrever Fin (U).", desc: "Nautica's Strongbox has a chance to reward a variety of cooked fish, gold, Greater Tome of Fishing, and a Fisherman's Friend which has a chance to provide 20% Fishing Experience." }
  ],
  currencymerchant: [
    { name: "Small Coin Pouch (U) for Gold Dust (R).", desc: "A small pouch, stuffed with golden coins, what else could a wandering adventurer ask for?" },
    { name: "Luneri Bond (E) for 100 Luneri.", desc: "A bond that contains 100 Luneri." }
  ],
  edmund: [
    { name: "Capes:" },
    { name: "Paragon's Cape of Combat (T) for 5000x Malignant Cores (R).", desc: "Requires Adventure Level 120. Stitched from the banners of vanquished foes and lined with the hides of monsters, this cape is a testament to unmatched martial prowess." },
    { name: "Paragon's Cape of Fishing (T) for 5000x Nature's Core (R).", desc: "Requires Fishing Level 120. Woven from the scales of mythical sea beasts and imbued with the essence of the ocean's tides, this cape carries the scent of salt and the whisper of ancient waves." },
    { name: "Paragon's Cape of Mining (T) for 5000x Nature's Core (R).", desc: "Requires Mining Level 120. Forged from the dust of shattered mountains and threaded with veins of purest Lunarite, this cape marks the wearer as a master of the underground realms." },
    { name: "Paragon's Cape of Scavenging (T) for 5000x Nature's Core (R).", desc: "Requires Scavenging Level 120. Crafted from remnants of forgotten treasures and enchanted to glimmer with the light of bygone ages, this cape celebrates those who can see value where others see ruin." },
    { name: "Paragon's Cape of Woodcutting (T) for 5000x Nature's Core (R).", desc: "Requires Woodcutting Level 120. Fashioned from leaves of the Eternal Grove and threads of living bark, this cape is a living tribute to the forests." },
    { name: "" },
    { name: "Tomes:" },
    { name: "Greater Tome of Combat (E) for 10x Malignant Cores (R).", desc: "Consume to receive a large amount of Adventure XP." },
    { name: "Tome of Combat (R) for 3x Malignant Cores (R).", desc: "Consume to receive a small amount Adventure XP." },
    { name: "Greater Gathering Tomes of Combat (E) for 20x Nature's Core (R).", desc: "Your choice of any gathering skill. Consume to receive a large amount of XP in the chosen skill." },
    { name: "Tomes of Gathering (E) for 7x Nature's Core (R).", desc: "Your choice of any gathering skill. Consume to receive a small amount of XP in the chosen skill." }
  ],
  seraphina: [
    { name: "Large Flask (C) - 50 Gold.", desc: "Alchemy item." },
    { name: "Medium Flask (C) - 50 Gold.", desc: "Alchemy item." },
    { name: "Vial (C) - 50 Gold.", desc: "Alchemy item." },
    { name: "Holy Grey Ale (U) - 1,000 Gold.", desc: "Alchemy item." },
    { name: "Flask of Mead (C) - 30 Gold.", desc: "Alchemy and Cooking item." },
    { name: "Jug of Water (C) - 25 Gold.", desc: "Engineering and Cooking item." }
  ],
  valor: [
    { name: "Bronze Valor Contract (E) - 3x Arcane Fragment (U).", desc: "Rewards a random easy bounty contract." },
    { name: "Bronze Valor Contract (E) - 15x Valor Token (L).", desc: "Rewards a random easy bounty contract." },
    { name: "Silver Valor Contract (E) - 3x Arcane Fragment (U).", desc: "Rewards a random medium bounty contract." },
    { name: "Silver Valor Contract (E) - 30x Valor Token (L).", desc: "Rewards a random medium bounty contract." },
    { name: "Gold Valor Contract (E) - 3x Arcane Fragment (U).", desc: "Rewards a random hard bounty contract." },
    { name: "Gold Valor Contract (E) - 60x Valor Token (L).", desc: "Rewards a random hard bounty contract." },
  ],
  lavinia: [
    { name: "Exchange:" },
    { name: "Abyssal Dominator (M) for Deepwater Pearl (M) and Luminous Coral Shard (M) and Mystic Kraken Ink (M) and Shadowed Leviathan Scale (M).", desc: "Artifact - +12% melee, ranged and magic weapon damage." },
    { name: "Cartographer's Compass (M) for Cartographer's Compass Casing (M) and Cartographer's Compass Core (M) and Cartographer's Compass Face (M) and Cartographer's Compass Needle (M).", desc: "Artifact - Reveals the entire map and regenerates +8 energy every second up to 5000 energy." },
    { name: "Titan Takedown (L) for Celestial Alloy Ingot (L) and Guardian's Essence Shard (L) and Guardian's Rune Stone (L).", desc: "Artifact - 40% increased weapon damage to Guardians." },
    { name: "" },
    { name: "Upgrades:" },
    { name: "Randomly receive Empowered Abyssal Dominator (M) or Supreme Abyssal Dominator (T) for 2x Abyssal Dominator (M).", desc: "Chance - 90% for Empowered, 10% for Supreme." },
    { name: "Randomly receive Empowered Moonlit Valor (L) or Supreme Moonlit Valor (M) for 3x Moonlit Valor (L).", desc: "Chance - 90% for Empowered, 10% for Supreme." },
    { name: "Randomly receive Empowered Titan Takedown (L) or Supreme Titan Takedown (M) for 3x Titan Takedown (L).", desc: "Chance - 90% for Empowered, 10% for Supreme." }
  ]
};

document.addEventListener("click", e => {
  if (e.target.classList.contains("inventory-btn")) {
    openInventoryModal(e.target.dataset.npc);
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
    if (!item.name && !item.desc) return `<hr class="inventory-divider">`;
    if (item.name && !item.desc) return `<h3 class="inventory-section">${item.name}</h3>`;
    return `<div class="inventory-item"><strong>${item.name}</strong><br><span>${item.desc}</span></div>`;
  }).join("");
  modal.style.display = "block";
}

function closeInventoryModal() {
  document.body.style.overflow = '';
  document.getElementById("inventoryModal").style.display = "none";
}
