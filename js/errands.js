window.addEventListener("load", () => {
        viewName();
        viewTable(userId);
})

const userId = localStorage.getItem("userLoggedId");
const token = localStorage.getItem("token");
const link = "http://db-api-errands.herokuapp.com";

function viewName() {
    const getUser = localStorage.getItem("userLogged");
    const buttonOffcanvas = document.getElementById("btnOffcanvas");

    buttonOffcanvas.innerHTML = getUser;
}

function logout() {
    localStorage.removeItem("userLoggedId");
    localStorage.removeItem("userLogged");
    localStorage.removeItem("token");
    location.href = './index.html';
}

function verifyToken(error) {
    const errorString = JSON.stringify(error)
    const errorObject = JSON.parse(errorString)
    if(errorObject.status === 401) {
        alert("Você não esta autenticado! Faça login novamente");
        location.href = "./index.html";
    } else {
        console.log(error);
    }
}

function viewTable(userId) {
    const token = localStorage.getItem("token");
    const getTable = document.getElementById('tableBody');
    axios.get(link + "/user/" + userId, {
        headers: {
            "Content-type": "application/json",
            "x-access-token": token
        }
    }).then((response) => {
        const data = response.data;

        for (const searchErrand in data.errands) {
            const date = data.errands[searchErrand].date;
            const separeTimestamp = date.split("T");
            const separeDate = separeTimestamp[0].split("-");
            const newDate = `${separeDate[2]}/${separeDate[1]}/${separeDate[0]}`
            getTable.innerHTML +=
            `
                <tr>
                    <td><input name="checkboxErrand" type="checkbox"></td>
                    <td>${newDate}</td>
                    <td id="titleText">${data.errands[searchErrand].title}</td>
                    <td id="descriptionText">${data.errands[searchErrand].description}</td>
                    <td>
                        <i class="fas fa-pen" onclick="getIdErrand(${parseInt(data.errands[searchErrand].id)})" data-bs-toggle="modal" data-bs-target="#staticBackdrop"></i>
                        <i class="fas fa-trash" onclick="deleteErrand(${parseInt(data.errands[searchErrand].id)})"></i>
                    </td>
                </tr>
            `;
        }
    }).catch((error) => {
        verifyToken(error)
    })
}

function addErrand() {
    const getTitle = document.getElementById('inputTitle').value;
    const getDescription = document.getElementById('inputDescription').value;
    const getDate = document.getElementById('inputDate').value;

    axios.post(link + "/errands", {
        date: getDate,
        title: getTitle,
        description: getDescription,
        userId: userId,
    }, {
        headers: {
            "Content-type": "application/json",
            "x-access-token": token
        }
    }).then((response) => {
        location.reload();
    }).catch((error) => {
        console.log(error);
    }) 
}

function deleteErrand(errandId) {
    axios.delete(link + "/errands/" + errandId, {
        headers: {
            "Content-type": "application/json",
            "x-access-token": token
        }
    }).then((response) => {
        location.reload();
    }).catch((error) => {
        console.log(error);
    })
}

function editErrand() {
    const getTitle = document.getElementById('inputTitleEdit').value;
    const getDescription = document.getElementById('inputDescriptionEdit').value;
    const errandId = parseInt(localStorage.getItem("idErrand"));

    axios.put(link + "/errands/" + errandId, {
        title: getTitle,
        description: getDescription
    }, {
        headers: {
            "Content-type": "application/json",
            "x-access-token": token
        }
    }).then((response) => {
        location.reload();
    }).catch((error) => {
        console.log(error);
    }) 
}

function getIdErrand(errandId) {
    axios.get(link + "/errands/" + errandId, {
        headers: {
            "Content-type": "application/json",
            "x-access-token": token
        }
    }).then((response) => {
        document.getElementById('inputTitleEdit').value = response.data.title;
        document.getElementById('inputDescriptionEdit').value = response.data.description;
    })
    
   localStorage.setItem("idErrand",  JSON.stringify(errandId));
}