const link = "http://db-api-errands.herokuapp.com";

function registerAccount(getUser, getPassword, getAlert, viewModal) {   
    axios.post(link + "/user", {
        user: getUser,
        password: getPassword
    }).then((response) => {
        viewModal = getAlert.setAttribute("style", "display: block");
        goLogin(getAlert, viewModal);         
    }).catch((error) => {
        console.log(error);
    });
}

function verifyRecord(event) {
    event.preventDefault();
    const userRegister = document.getElementById("inputUserRegister").value;
    const passwordRegister = document.getElementById("inputPasswordRegister").value;
    const repeatPasswordRegister = document.getElementById("inputRepeatPasswordRegister").value;
    const checkboxRegister = document.getElementById("checkbox");
    const getAlert = document.getElementById("alert");
    let validCheckbox = true;

    axios.get(link + "/user").then((response) => {
        const data = response.data;
        for(const searchUser in data) {
            if (data[searchUser].user === userRegister) {
                viewModal = getAlert.setAttribute("style", "display: block");
                getAlert.innerHTML = "<strong>ERRO!</strong> Usuário ja existe.";
                closeAlert(viewModal, getAlert);  
                return;
            }
        }
        if (userRegister.length < 3) {
            viewModal = getAlert.setAttribute("style", "display: block");
            getAlert.innerHTML = "<strong>ERRO!</strong> Usuário deve conter no mínimo 3 caracteres."; 
            closeAlert(viewModal, getAlert);                          
        } else if (passwordRegister.length < 8) {
            viewModal = getAlert.setAttribute("style", "display: block");
            getAlert.innerHTML = "<strong>ERRO!</strong> Senha deve conter no mínimo 8 caracteres."; 
            closeAlert(viewModal, getAlert);              
        } else if (passwordRegister !== repeatPasswordRegister) {
            viewModal = getAlert.setAttribute("style", "display: block");
            getAlert.innerHTML = "<strong>ERRO!</strong> As senhas devem ser iguais.";
            closeAlert(viewModal, getAlert);                     
        } else if (!checkboxRegister.checked) {
                validCheckbox = false;
                viewModal = getAlert.setAttribute("style", "display: block");
                getAlert.innerHTML = "<strong>ERRO!</strong> Você precisa aceitar os termos.";
                closeAlert(viewModal, getAlert);              
        } else {
            registerAccount(userRegister, passwordRegister, getAlert);
        }
    })
}

function goLogin(getAlert, viewModal) {
    getAlert.classList.remove("alert-danger");
    getAlert.classList.add("alert-success");
    viewModal;
    getAlert.innerHTML = "<strong>EBAA</strong> Cadastrado com sucesso.";
    setTimeout(() => {window.location.href = "index.html"}, 2000);
};

function closeAlert(viewModal, getAlert) {
    setTimeout(() => {viewModal = getAlert.setAttribute("style", "display: none");}, 2000);
};

function eyeClickRegister() {
    const passwordInputRegister = document.getElementById("inputPasswordRegister");
    const passwordRepeatInputRegister = document.getElementById("inputRepeatPasswordRegister");
    const eyeRegister = document.getElementById("eyeRegister");

    if (passwordInputRegister.type == "password") {       
        passwordInputRegister.setAttribute("type", "text");
        passwordRepeatInputRegister.setAttribute("type", "text");
        eyeRegister.classList.remove("fa-eye");
        eyeRegister.classList.add("fa-eye-slash");
    } else {
        passwordInputRegister.setAttribute("type", "password");
        passwordRepeatInputRegister.setAttribute("type", "password");
        eyeRegister.classList.remove("fa-eye-slash");
        eyeRegister.classList.add("fa-eye");
    }
}

function checkTerms() {
    const checkbox = document.getElementById("checkbox");
    checkbox.checked = true;
}