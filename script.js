// Initialize the map
const map = L.map('map', {
  crs: L.CRS.Simple,
  minZoom: -1,
});

// Load your custom image map
const bounds = [[0,0], [2048,2048]];
const image = L.imageOverlay('assets/map.png', bounds).addTo(map);
map.fitBounds(bounds);

// Example NPCs (customize!)
const npcs = [
  { name: "Baldric the Blacksmith", x: 1200, y: 1300, desc: "Sells weapons and armor." },
  { name: "Elira the Herbalist", x: 800, y: 700, desc: "Gives out potion quests." }
];

npcs.forEach(npc => {
  L.marker([npc.y, npc.x])
    .addTo(map)
    .bindPopup(`<b>${npc.name}</b><br>${npc.desc}`);
});
