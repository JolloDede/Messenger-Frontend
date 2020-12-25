const form = document.querySelector(".form");
const API_URL = "http://localhost:5000/auth/login";

form.addEventListener("submit", (event) => {
  event.preventDefault();
  console.log("Hallo");

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
    console.log("Hallo");
    console.log(response);
    // Todo Write response into cache
  });
  window.location.href = '../index.html';
});