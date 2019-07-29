const urlParams = new URLSearchParams(window.location.search);
const parameterUsername = urlParams.get('id');

// URL must include ?user=XYZ parameter. If not, redirect to homepage.
if (!parameterUsername) {
  window.location.replace('/');
}

function fetchImages() {
  const url = '/images?id=' + parameterUsername;
  fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((images) => {
        const imagesContainer = document.getElementById('comments-container');
        if (images.length == 0) {
          imagesContainer.innerHTML = '<p>This user has no posts yet.</p>';
        } else {
          imagesContainer.innerHTML = '';
        }
        images.forEach((image) => {
          const imageDiv = buildImageDiv(image);
          let userForm = document.createElement("form");
          userForm.setAttribute('method', 'POST');
          userForm.setAttribute('action', '/userCaptions');
          userForm.setAttribute('id', 'userCommentForm');

          let caption = document.createElement("textarea");
          caption.setAttribute('name', 'caption');
          caption.setAttribute('id', 'userInput');

          let id = document.createElement('input');
          id.setAttribute('name', 'imageId');
          id.setAttribute('value', image.id);
          id.setAttribute('class', 'hidden');

          let submit = document.createElement('input');
          submit.type = 'submit';
          submit.value = 'Comment';

          userForm.appendChild(caption);
          userForm.appendChild(id);
          userForm.appendChild(submit);
          imageDiv.appendChild(userForm);

          fetch('/userCaptions').then((response) => {
            return response.json();
          }).then((userCaptions) => {
            userCaptions.forEach((userCaption) => {
              if (userCaption.imageId === image.id) {
                const userDiv = buildUserDiv(userCaption);
                imageDiv.appendChild(userDiv);
              }
            });
          });
          imagesContainer.appendChild(imageDiv);
        });
      });
}

function buildForm(imageDiv) {
  let userForm = document.createElement("form");
  userForm.setAttribute('method', 'POST');
  userForm.setAttribute('action', '/userCaptions');
  userForm.setAttribute('id', 'userCommentForm');

  let caption = document.createElement("textarea");
  caption.setAttribute('name', 'caption');
  caption.setAttribute('id', 'userInput');

  let id = document.createElement('input');
  id.setAttribute('name', 'imageId');
  id.setAttribute('value', image.id);
  id.setAttribute('class', 'hidden');

  let submit = document.createElement('input');
  submit.type = 'submit';
  submit.value = 'Comment';

  userForm.appendChild(caption);
  userForm.appendChild(id);
  userForm.appendChild(submit);
  imageDiv.appendChild(userForm);

  return imageDiv;
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


function buildUserDiv(userCaption) {
  const headerDiv = document.createElement('div')
  headerDiv.classList.add('user-header');
  headerDiv.appendChild(document.createTextNode(userCaption.user));

  const bodyDiv = document.createElement('div');
  bodyDiv.classList.add('user-body');
  bodyDiv.innerHTML = userCaption.text;

  var button = document.createElement('button');
  var counter=0;
  button.innerHTML = 'like: '+counter;
  button.onclick = function(){
    counter+=1;
    button.innerHTML = 'like: '+counter;
  };

  const userDiv = document.createElement('div');
  userDiv.classList.add('user-div');
  userDiv.append(headerDiv);
  userDiv.append(bodyDiv);
  userDiv.append(button);  

  return userDiv;
}
