
const form = document.querySelector(".form");
const loadingEle = document.querySelector(".loading");
const messagesElement = document.querySelector(".messages");
const clipBtn = document.querySelector("#clip-btn");
const fileInput = document.querySelector("#file-input");
const fileDialog = document.querySelector(".file-open-dialog");
const imgForm = document.querySelector(".img-form");
const API_URL = "http://localhost:5000/messages";
const API_UPLOAD = "http://localhost:5000/upload";

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

imgForm.addEventListener("submit", (e) => {
    e.preventDefault();
    
    const formData = new FormData(imgForm);
    const img = formData.get("file-input");
    const image = document.querySelector("#file-input");
    const imgOb = {
        src: image.files[0],
    };
    fetch(API_UPLOAD, {
        method: "POST",
        headers: {
            // 'Content-Type': 'multipart/form-data',
            'authorization': 'Bearer ' + localStorage.token
        },
        body: image.files[0]
    }).then(response => response.json())
    .then((res) => {
        console.log(res);
        document.querySelector(".dialog-background").style.display = "none";
    })
});

clipBtn.addEventListener("click", (e) => {
    e.preventDefault();
    document.querySelector(".dialog-background").style.display = "block";
});

fileInput.addEventListener("change", (e) => {
    if (fileInput.files.length > 0) {
        const image = document.createElement('img');
        image.src = URL.createObjectURL(fileInput.files[0]);
        document.querySelector(".file-open-dialog").appendChild(image);
    }
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