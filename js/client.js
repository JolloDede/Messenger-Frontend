
const form = document.querySelector(".form");
const loadingEle = document.querySelector(".loading");
const messagesElement = document.querySelector(".messages");
const fileInput = document.querySelector("#file-input");
const API_URL = "http://localhost:5000/messages";

let skip = 0;
let limit = 10;

listAllMessages();

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(form);

    form.style.display = "none";
    loadingEle.style.display = "";

    fetch(API_URL, {
        method: "POST",
        headers: {
            'authorization': 'Bearer ' + localStorage.token
        },
        body: formData
    }).then(response => response.json())
        .then(() => {
            document.querySelector(".up-img").src = "";
            form.reset();
            listAllMessages();
            form.style.display = "";
        }).catch((err) => {
            console.log(err);
        });
});

fileInput.addEventListener("change", (e) => {
    if (fileInput.files.length > 0) {
        const image = document.querySelector('.up-img');
        image.src = URL.createObjectURL(fileInput.files[0]);
        image.style.display = "initial";
    }
});

function listAllMessages() {
    messagesElement.innerHTML = '';
    fetch(API_URL, {
        method: "GET",
        headers: {
            'authorization': 'Bearer ' + localStorage.token
        }
    }).then(response => {
        if (response.status === 401) {
            throw new Error(response.status);
        }
        return response.json()
    }).then(res => {
        res.forEach(message => {
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

            const time = document.createElement("p");
            time.classList.add("message-time");
            let date = new Date(message.created);
            let hour = (date.getHours() >= 10) ? date.getHours() : "0"+date.getHours();
            let min = (date.getMinutes() >= 10) ? date.getMinutes() : "0"+date.getMinutes();
            time.textContent = hour+":"+min;

            wrapper.appendChild(div);
            div.appendChild(header);
            div.appendChild(messageEle);
            div.appendChild(time);

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