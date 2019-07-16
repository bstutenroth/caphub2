// Fetch messages and add them to the page.
function fetchMessages() {
  const url = "/feed";
  fetch(url).then((response) => {
    return response.json();
  }).then((messages) => {
    const messageContainer = document.getElementById('message-container');
    if (messages.length == 0) {
      messageContainer.innerHTML = '<p>There are no posts yet.</p>';
    } else {
      messageContainer.innerHTML = '';
    }
    messages.forEach((message) => {
      const messageDiv = buildMessageDiv(message);
      messageContainer.appendChild(messageDiv);
    });
  });
}

function buildMessageDiv(message) {
  const usernameDiv = document.createElement('div');
  usernameDiv.classList.add("left-align");
  usernameDiv.appendChild(document.createTextNode(message.user));

  const timeDiv = document.createElement('div');
  timeDiv.classList.add('right-align');
  timeDiv.appendChild(document.createTextNode(new Date(message.timestamp)));

  const headerDiv = document.createElement('div');
  headerDiv.classList.add('message-header');
  headerDiv.appendChild(usernameDiv);
  headerDiv.appendChild(timeDiv);

  const bodyDiv = document.createElement('div');
  bodyDiv.classList.add('message-body');
  bodyDiv.appendChild(document.createTextNode(message.text));

  const messageDiv = document.createElement('div');
  messageDiv.classList.add("message-div");
  messageDiv.appendChild(headerDiv);
  messageDiv.appendChild(bodyDiv);

  return messageDiv;
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


// Fetch data and populate the UI of the page.
function buildUI() {
  fetchMessages();
  fetchImages();
}
