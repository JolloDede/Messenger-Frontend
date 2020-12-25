
const form = document.querySelector(".form");
const loadingEle = document.querySelector(".loading");
const messagesElement = document.querySelector(".messages");
const API_URL = "http://localhost:5000/messages"

listAllMessages();

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const name = formData.get("name");
    const message = formData.get("message");

    const message = {
        name: name,
        message: message
    };
    form.style.display = "none";
    loadingEle.style.display = "";

    fetch(API_URL, {
        method: "POST",
        body: JSON.stringify(message),
        headers: {
            'content-type': 'application/json'
        }
    }).then(response => response.json())
        .then(createdMessage => {
            form.reset();
            listAllMessages();
            form.style.display = "";
        });
});

function listAllMessages(){
    messagesElement.innerHTML = '';
    fetch(API_URL)
        .then(response => response.json())
        .then(messages => {
            messages.reverse();
            messages.forEach(message =>{
                const wrapper = document.createElement("div");
                wrapper.classList.add("message");

                const div = document.createElement("div");
                if (message.name.toUpperCase() == "me".toUpperCase()) {
                    div.classList.add("my-message");
                } else {
                    div.classList.add("other-message");
                }

                const header = document.createElement("h3");
                header.textContent = message.name;

                const messageEle = document.createElement("p");
                messageEle.classList.add("message-content");
                messageEle.textContent = message.message;

                wrapper.appendChild(div);
                div.appendChild(header);
                div.appendChild(messageEle);

                messagesElement.appendChild(wrapper);
            })
            loadingEle.style.display = "none";
        });
}