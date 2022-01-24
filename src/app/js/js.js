var LeafIcon = L.Icon.extend({
  options: {
    iconSize: [38, 38],
    shadowSize: [0, 0],
    iconAnchor: [22, 37],
    shadowAnchor: [0, 0],
    popupAnchor: [-3, -76],
  },
});
var myIcon = L.icon({
  iconUrl: "https://pngtree.com/freepng/round-navigation-icon_4752591.html",
  iconSize: [38, 95],
  iconAnchor: [22, 94],
  popupAnchor: [-3, -76],
  // shadowUrl: 'my-icon-shadow.png',
  shadowSize: [68, 95],
  shadowAnchor: [22, 94],
});
var map;
var mapMarkers = [];
var marker;
function initMap() {
  map = L.map("map").setView([44.787197, 20.457273], 11);
  const tiles = L.tileLayer(
    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }
  );
  tiles.addTo(map);
}

function getPolyLine(historyPolyLine) {
  var polyline = L.polyline(historyPolyLine, { color: "blue" }).addTo(map);
  map.fitBounds(polyline.getBounds());
}

var greenIcon = new LeafIcon({
  iconUrl: "https://img.icons8.com/fluency/50/000000/navigation.png",
  shadowUrl: "http://leafletjs.com/examples/custom-icons/leaf-shadow.png",
});


function getCurrentLocation(currentLocation) {
  // this.markerGroup = L.layerGroup().addTo(map);
  marker = L.marker(currentLocation, { icon: greenIcon }).addTo(map);
  map.setView(currentLocation, 15);
  // centerLeafletMapOnMarker(map, marker)
}
function centerLeafletMapOnMarker(map, marker) {
  var latLngs = [marker.getLatLng()];
  var markerBounds = L.latLngBounds(latLngs);
  map.fitBounds(markerBounds);
}
function clearMarkers() {
  if (marker != undefined) {
    map.removeLayer(marker);
  }
}
function clearMap() {
  if (map) {
    for (i in map._layers) {
      if (map._layers[i]._path != undefined) {
        try {
          map.removeLayer(map._layers[i]);
        } catch (e) {
          console.log("problem with " + e + map._layers[i]);
        }
      }
    }
  }
}
