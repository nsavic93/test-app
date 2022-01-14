



function initMap() {
    let map = L.map('map').setView([44.787197, 20.457273], 11);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);
    return map;
  }


  function getPolyLine() {
    this.polyline = L.polyline(this.historyPolyLine, {
      color: '#006eff',
      smoothFactor: 0,
    }).addTo(this.map);
    this.map.fitBounds(this.polyline.getBounds());
  }