function createMap(){
  const map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 36.0296, lng: -118.4145},
    zoom: 7
  });

  addLandmark(map, 37.7459, -119.5332, 'Yosemite National Park',
    'Yosemite National Park is one of the 9 national parks in California' );
  addLandmark(map, 33.8734, -115.9010, 'Joshua Tree National Park',
    'Joshua Tree National Park is one of the 9 national parks in California');
  addLandmark(map, 33.9961, -119.7692, 'Channel Islands National Park',
    'Channel Islands National Park is one of the 9 national parks in California');
  addLandmark(map, 36.0296, -118.4145, 'Sequoia National Park',
    'Sequoia National Park is one of the 9 national parks in California');
}
function addLandmark(map, lat, lng, title, description) {
  const marker = new google.maps.Marker({
    position: {lat: lat, lng: lng},
    map: map,
    title: title,
  });

  const infoWindow = new google.maps.InfoWindow({
    content: description
  });
  
  marker.addListener('click', function() {
    infoWindow.open(map, marker);
  });
}
