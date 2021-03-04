
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
        .then(() => {
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
    }).then(response => {
        if (response.status === 401) {
            throw new Error(response.status);
        }
        return response.json()
    }).then(messages => {
        messages.forEach(message => {
            const wrapper = document.createElement("div");
            wrapper.classList.add("message");

<<<<<<< HEAD
            const div = document.createElement("div");
            if (message.name.toUpperCase() == localStorage.username.toUpperCase()) {
                div.classList.add("my-message");
            } else {
                div.classList.add("other-message");
            }

            const header = document.createElement("h3");
            header.textContent = "Me";

            const messageEle = document.createElement("p");
            messageEle.classList.add("message-content");
            messageEle.textContent = message.message;
=======
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
>>>>>>> 89db32d4d10421bc90102372706251d7dbd9f062

            wrapper.appendChild(div);
            div.appendChild(header);
            div.appendChild(messageEle);

            messagesElement.appendChild(wrapper);
        })
        loadingEle.style.display = "none";
    }).catch(err => {
        if (err.message == 401) {
            localStorage.removeItem("token");
            window.location.href = "./pages/login.html";
        }
    });
}