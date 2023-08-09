console.log("loaded")

const form = document.getElementById('connexion');
const emailInput = document.getElementById('mail');
const passwordInput = document.getElementById('password');

form.addEventListener("submit", (event) => {
    event.preventDefault()

    let data = {
        email: emailInput.value,
        password: passwordInput.value
    }

    console.log(data)
    fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    }).then((rep) => rep.json())
        .then((data) => {
            const token = data.token;

                localStorage.setItem("token", token);

            window.location.href = "index.html";
        })
});


