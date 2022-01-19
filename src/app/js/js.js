var map;
function initMap() {
   map = L.map("map").setView([44.787197, 20.457273], 11);
 const tiles=  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  });
  tiles.addTo(map)
}

function getPolyLine(historyPolyLine) {
  var polyline = L.polyline(historyPolyLine, { color: "blue" }).addTo(map);
  map.fitBounds(polyline.getBounds());
  
}
function clearMap() {
  for(i in map._layers) {
      if(map._layers[i]._path != undefined) {
          try {
              map.removeLayer(map._layers[i]);
          }
          catch(e) {
              console.log("problem with " + e + map._layers[i]);
          }
      }
  }
}