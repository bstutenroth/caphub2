let map;
let editMarker;
let placeSearch;
let autocomplete;

let componentForm = {
  street_number: 'short_name',
  route: 'long_name',
  locality: 'long_name',
  administrative_area_level_1: 'short_name',
  country: 'long_name',
  postal_code: 'short_name'
};

function createMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 36.0296, lng: -118.4145},
    zoom: 4
  });

  // When user clicks in map, shows a marker with editable text box.
  map.addListener('click', (event) => {
    createMarkerForEdit(event.latLng.lat(), event.latLng.lng());
  });
  fetchMarkers();
}

function fetchMarkers() {
  fetch('/markers').then((response) => {
    return response.json();
  }).then((markers) => {
    markers.forEach((marker) => {
      createMarkerForDisplay(marker.lat, marker.lng, marker.content)
    });
  });
}

function createMarkerForDisplay(lat, lng, content) {
  const marker = new google.maps.Marker({
    position: {lat: lat, lng: lng},
    map: map
  });
  let infoWindow = new google.maps.InfoWindow({
    content: content
  });
  marker.addListener('click', () => {
    infoWindow.open(map, marker);
  });
}

function postMarker(lat, lng, content) {
  const params = new URLSearchParams();
  params.append('lat', lat);
  params.append('lng', lng);
  params.append('content', content);
  fetch('/markers', {
    method: 'POST',
    body: params
  });
}

function createMarkerForEdit(lat, lng) {
  if (editMarker) {
    editMarker.setMap(null);
  }
  editMarker = new google.maps.Marker({
    position: {lat: lat, lng: lng},
    map: map
  });
  const infoWindow = new google.maps.InfoWindow({
    content: buildInfoWindowInput(lat, lng)
  });

  google.maps.event.addListener(infoWindow, 'closeclick', () => {
    editMarker.setMap(null);
  });
  infoWindow.open(map, editMarker);
}

function buildInfoWindowInput(lat, lng) {
  const textBox = document.createElement('textarea');
  const button = document.createElement('button');
  button.appendChild(document.createTextNode('Submit'));
  button.onClick = () => {
    postMarker(lat, lng, textBox.value);
    createMarkerForDisplay(lat, lng, textBox.value);
    editMarker.setMap(null);
  };
  const containerDiv = document.createElement('div');
  containerDiv.appendChild(textBox);
  containerDiv.appendChild(document.createElement('br'));
  containerDiv.appendChild(button);
  return containerDiv;
}

function initAutocomplete() {
  // Create the autocomplete object, restricting the search predictions to
  // geographical location types.
  autocomplete = new google.maps.places.Autocomplete(
      document.getElementById('autocomplete'), {types: ['geocode']});

  // Avoid paying for data that you don't need by restricting the set of
  // place fields that are returned to just the address components.
  autocomplete.setFields(['address_component']);

  // When the user selects an address from the drop-down, populate the
  // address fields in the form.
  //autocomplete.addListener('place_changed', fillInAddress);
}

function geolocate() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      let geolocation = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      let circle = new google.maps.Circle(
          {center: geolocation, radius: position.coords.accuracy});
      autocomplete.setBounds(circle.getBounds());
    });
  }
}
