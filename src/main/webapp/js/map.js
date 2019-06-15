function createMap() {
  fetch("/map-data").then(function(response) {
    return response.json();
  }).then((mapLocations) => {
    const map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 36.0296, lng: -118.4145},
      zoom: 7
    });

    mapLocations.forEach((mapLocation) => {
      new google.maps.Marker({
        position: {lat: mapLocation.lat, lng: mapLocation.lng},
        map: map
      });
    });
  });
}
