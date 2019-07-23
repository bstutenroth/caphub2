let placeSearch;
let autocomplete;

function fetchBlobstoreUrlAndShowForm() {
  fetch('/blobstore-upload-url')
    .then((response) => {
      return response.text();
    })
    .then((imageUploadUrl) => {
      const messageForm = document.getElementById('my-form');
      messageForm.action = imageUploadUrl;
      messageForm.classList.remove('hidden');
    });
}

function initAutocomplete() {
  // Create the autocomplete object, restricting the search predictions to
  // geographical location types.
  autocomplete = new google.maps.places.Autocomplete(
      document.getElementById('autocomplete'), {types: ['geocode']});

  autocomplete.setFields(['address_component']);
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
function readURL(input) {
  if (input.files && input.files[0]) {
    let reader = new FileReader();

    reader.onload = function(e) {
      $('#upload')
        .attr('src', e.target.result)
        .removeClass('hidden')
        .addClass('uploadImage');
    };

    reader.readAsDataURL(input.files[0]);
  }
}
function buildUI() {
  fetchBlobstoreUrlAndShowForm();
  initAutocomplete();
  geolocate();

}
