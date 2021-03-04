
const form = document.querySelector(".form");
const loadingEle = document.querySelector(".loading");
const messagesElement = document.querySelector(".messages");
const API_URL = "http://localhost:5000/messages"

listAllMessages();

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const message = formData.get("message");
    const messageOb = {
        message: message.toString()
    };

    form.style.display = "none";
    loadingEle.style.display = "";

    fetch(API_URL, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'authorization': 'Bearer ' + localStorage.token
        },
        body: JSON.stringify(messageOb)
    }).then(response => response.json())
        .then(createdMessage => {
            form.reset();
            listAllMessages();
            form.style.display = "";
        });
});

function listAllMessages() {
    messagesElement.innerHTML = '';
    fetch(API_URL, {
        method: "GET",
        headers: {
            'content-type': 'application/json',
            'authorization': 'Bearer ' + localStorage.token
        }
    }).then(response => response.json())
        .then(messages => {
            messages.reverse();
            messages.forEach(message => {
                const wrapper = document.createElement("div");
                wrapper.classList.add("message");

                const div = document.createElement("div");
                const header = document.createElement("h3");
                if (message.name.toUpperCase() == localStorage.username.toUpperCase()) {
                    div.classList.add("my-message");
                    header.textContent = "Me";
                } else {
                    div.classList.add("other-message");
                    header.textContent = message.name.toString();
                }

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