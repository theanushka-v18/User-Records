const addUser = document.getElementById("addUser");
const btnText = addUser.innerHTML;
const usernameTextField = document.getElementById("username");
const recordsDisplay = document.getElementById("records");
recordsDisplay.setAttribute("class", "text-white");

let userArray = [];
let editId = null;

let objStr = localStorage.getItem("users");
if (objStr != null) {
    userArray = JSON.parse(objStr);
}
displayInfo();

function clicked() {
    if (usernameTextField.value != "") {
        const name = usernameTextField.value;
        if (editId != null) {
        userArray.splice(editId, 1, { name: name });
        editId = null;
        } else {
        userArray.push({ name: name });
        }
        saveInfo(userArray);
        usernameTextField.value = "";
        addUser.innerHTML = btnText;
    }
}

usernameTextField.addEventListener("keyup", function (e) {
    if (e.keyCode === 13) {
        window.location.reload();
        clicked();
    }
});

addUser.addEventListener("click", function () {
    window.location.reload();
    clicked();
});

function saveInfo(userArray) {
    localStorage.setItem("users", JSON.stringify(userArray));
    displayInfo();
}

function displayInfo() {
    let statement = "";
    userArray.forEach((user, index) => {
        statement += ` <tr>
            <th scope="row">${index + 1}</th>
            <td>${user.name}</td>
            <td><i class="fa-regular fa-pen-to-square btn btn-info text-white mx-2" onclick="editInfo(${index})"></i><i class="ml-5 fa-solid fa-trash btn btn-danger" onclick="deleteInfo(${index})"></i></td>
        </tr>`;
    });
    recordsDisplay.innerHTML = statement;
}

function editInfo(id) {
    editId = id;
    usernameTextField.value = userArray[id].name;
    addUser.innerHTML = "Save Changes";
}

function deleteInfo(id) {
    userArray.splice(id, 1);
    saveInfo(userArray);
}

// search feature
const allTr = document.querySelectorAll("#records tr");
const searchInputField = document.getElementById("search");
searchInputField.addEventListener("input", function(e) {
    const searchStr = e.target.value.toLowerCase();
    recordsDisplay.innerHTML = "";
    allTr.forEach((tr) => {
        const tdInStr = tr.querySelectorAll("td");
        if(tdInStr[0].innerText.toLowerCase().indexOf(searchStr) > -1) {
            recordsDisplay.appendChild(tr);
        }
    })
})
