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

/** Fetches messages and add them to the page. */
function fetchImages() {
  const url = '/my-form-handler';
  fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((images) => {
        const imagesContainer = document.getElementById('images-container');
        if (images.length == 0) {
          imagesContainer.innerHTML = '<p>This user has no posts yet.</p>';
        } else {
          imagesContainer.innerHTML = '';
        }
        images.forEach((image) => {
          const imageDiv = buildImageDiv(image);
          imagesContainer.appendChild(imageDiv);
        });
      });
}

/**
 * Builds an element that displays the message.
 * @param {ImageUrl} image
 * @return {Element}
 */
function buildImageDiv(image) {
  const headerDiv = document.createElement('div');
  headerDiv.classList.add('message-header');
  headerDiv.appendChild(document.createTextNode(
      image.user + ' - ' + new Date(image.timestamp)));

  const bodyDiv = document.createElement('div');
  bodyDiv.classList.add('message-body');
  bodyDiv.innerHTML = image.text;

  const locationDiv = document.createElement('div');
  locationDiv.classList.add('location-body');
  locationDiv.innerHTML = image.location;

  const imageDiv = document.createElement("div");
  imageDiv.classList.add('image-body');
  imageDiv.innerHTML = "<img src=\"" + image.url + "\" />";

  const messageDiv = document.createElement('div');
  messageDiv.classList.add('message-div');
  messageDiv.appendChild(headerDiv);
  messageDiv.appendChild(bodyDiv);
  messageDiv.appendChild(locationDiv);
  messageDiv.appendChild(imageDiv);

  return messageDiv;
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

function buildUI() {
  fetchBlobstoreUrlAndShowForm();
  fetchImages();
  initAutocomplete();
  geolocate();

}
