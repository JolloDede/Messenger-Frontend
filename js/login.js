const form = document.querySelector(".form");
const API_URL = "http://localhost:5000/auth/login";

form.addEventListener("submit", (event) => {
  event.preventDefault();
  let registered = false;
  const loginMsg = document.querySelector(".login-message")

  const formData = new FormData(form);
  const username = formData.get("username");
  const password = formData.get("password");

  const auth = {
    username: username,
    password: password
  };

  fetch(API_URL, {
    method: "POST",
    body: JSON.stringify(auth),
    headers: {
      'content-type': 'application/json'
    }
  }).then(response => {
    if (response.ok) {
      return response.json();
    }
    return response.json().then((error) => {
      throw new Error(error.message);
    });
  }).then((result) => {
    localStorage.token = result.token;
    registered = true;
  }).catch((error) => {
    loginMsg.style.display = "initial";
  }).then(() => {
    if (registered) {
      window.location.href = '../index.html';
    }
  });
});