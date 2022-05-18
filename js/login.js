const link = "https://db-api-errands.herokuapp.com";

function login(event) {
    event.preventDefault();
    const userLogin = document.getElementById("inputUserLogin");
    const passwordLogin = document.getElementById("inputPasswordLogin");
    const getAlert = document.getElementById("alert");

    axios.post(link + "/login", {
        user: userLogin.value,
        password: passwordLogin.value
    }, {
        header: {
            "Content-type": "application/json"
        }
    }).then((response) => {
        const data = response.data;

        localStorage.setItem("userLogged", data.userAuthenticate.user);  
        localStorage.setItem("userLoggedId", data.userAuthenticate.id);  
        localStorage.setItem("token", data.userAuthenticate.token);
        location.href = "errands.html";  
    }).catch((error) => {
        viewModal = getAlert.setAttribute("style", "display: block");
        getAlert.innerHTML = "<strong>ERRO!</strong> Usuário ou senha incorrétos.";
        userLogin.focus();
        closeAlert(viewModal, getAlert);
    })
}

function closeAlert(viewModal, getAlert) {
    setTimeout(() => {viewModal = getAlert.setAttribute("style", "display: none");}, 2000);
};

function eyeClickLogin() {
    const passwordInputLogin = document.getElementById("inputPasswordLogin");
    const eyeLogin = document.getElementById("eyeLogin");

    if (passwordInputLogin.type == "password") {
        passwordInputLogin.setAttribute("type", "text");
        eyeLogin.classList.remove("fa-eye");
        eyeLogin.classList.add("fa-eye-slash");
    } else {
        passwordInputLogin.setAttribute("type", "password");
        eyeLogin.classList.remove("fa-eye-slash");
        eyeLogin.classList.add("fa-eye");
    }
}