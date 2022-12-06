'use strict'
/////
const InputNameS = document.getElementById('signupName');
const InputEmailS = document.getElementById('signupEid');
const InputPswdS = document.getElementById('signupPswd');
const signupBtn = document.querySelector('.submit-btn');
const btnlogin = document.getElementById('btnLogin');
const InputEmailL = document.getElementById('LoginEid');
const InputPswdL = document.getElementById('LoginPswd');
const containerApp = document.querySelector('.form-structor');
const containerLogin = document.querySelector('.center');
const containerSignup = document.querySelector('.signup');
const appContainer = document.querySelector('.app');
appContainer.style.opacity = 0;
containerLogin.style.opacity = 0;
////

let form = document.getElementById("form");
let nameInput = document.getElementById("nameInput");
let emailInput = document.getElementById("emailInput");
let pswdInput = document.getElementById("pswdInput");
let msg = document.getElementById("msg");
let tasks = document.getElementById("tasks");
let add = document.getElementById("add");
let btnlogout = document.getElementById("logout");
let btnLogin2 = document.getElementById("btnLogin2");
//let login;
let currentUser;
//let data = [{}];

let Darshna = {
    name: 'Darshna',
    password: 123,
    data: [{}],
}

let users = [Darshna];

//localStorage.setItem("users",JSON.stringify(users));

form.addEventListener("submit", (e) => {
    e.preventDefault();
    formValidation();
});

let formValidation = () => {
    if (nameInput.value === "") {
        console.log("failure");
        msg.innerHTML = "Task cannot be blank";
    } else {
        console.log("success");
        msg.innerHTML = "";
        acceptData();
        add.setAttribute("data-bs-dismiss", "modal");
        add.click();

        (() => {
            add.setAttribute("data-bs-dismiss", "");
        })();
    }
};

let acceptData = () => {
    currentUser.data.push({
        names: nameInput.value,
        email: emailInput.value,
        password: pswdInput.value,
    });

    localStorage.setItem(`${currentUser.name}`, JSON.stringify(currentUser.data));
    console.log(currentUser.data);
    createTasks();
};

let createTasks = () => {
    tasks.innerHTML = "";
    currentUser.data.filter(acc => acc.names !== undefined && acc.names !== '')
        .map((x, index) => {
            return (tasks.innerHTML += `
    <div id=${index}>
          <p>${x.names}</p>
          <p>${x.email}</p>
          <p>${x.password}</p>
  
          <span class="options">
            <i onClick= "editTask(this)" data-bs-toggle="modal" data-bs-target="#form" class="fas fa-edit"></i>
            <i onClick ="deleteTask(this);createTasks()" class="fas fa-trash-alt"></i>
          </span>
        </div>
    `);

        });

    console.log("Inside login" + currentUser.data);
    resetForm();
};

let deleteTask = (e) => {
    confirm('Are you sure to delete this record ?')
    e.parentElement.parentElement.remove();
    currentUser.data.splice(e.parentElement.parentElement.id, 1);
    localStorage.setItem(`${currentUser.name}`, JSON.stringify(currentUser.data));
    console.log(currentUser.data);

};

let editTask = (e) => {

    let selectedTask = e.parentElement.parentElement;
    nameInput.value = selectedTask.children[0].innerHTML;
    emailInput.value = selectedTask.children[1].innerHTML;
    pswdInput.value = selectedTask.children[2].innerHTML;
    window.confirm = function () { return false; };
    deleteTask(e);
};

let resetForm = () => {
    nameInput.value = emailInput.value = pswdInput.value = InputNameS.value = InputEmailS.value = InputPswdS.value = InputPswdL.value = InputEmailL.value = "";

};

//////
signupBtn.addEventListener('click', (e) => {
    e.preventDefault();
    console.log("Hello signup");
    users = JSON.parse(localStorage.getItem("users"));
    localStorage.login = 1;
    containerApp.style.opacity = 0;
    appContainer.style.opacity = 100;
    containerSignup.style.opacity = 0;
    let user = (InputNameS.value);
    console.log(InputNameS.value);
    users.push(user = {
        name: (InputNameS.value),
        password: (InputPswdS.value),
        data: [{}],
    });
    localStorage.setItem("users", JSON.stringify(users));
    console.log(users);
    currentUser = user;
    acceptData();
});


btnlogin.addEventListener('click', function (e) {
    e.preventDefault();

    console.log(localStorage.login);
    users = JSON.parse(localStorage.getItem("users"));
    if (users.find(acc => acc.name == InputEmailL.value)) {
        currentUser = users.find(acc => acc.name == InputEmailL.value);
        console.log(currentUser);
        if ((currentUser.password) == (InputPswdL.value)) {
            console.log('LogIN');
            localStorage.login = 1;
            containerApp.style.opacity = 0;
            containerSignup.style.opacity = 0;
            containerLogin.style.opacity = 0;
            appContainer.style.opacity = 100;

            (() => {
                currentUser.data = JSON.parse(localStorage.getItem(`${currentUser.name}`)) || []
                console.log(currentUser.data);
                createTasks();
            })();
        }
        else {
            alert("Incorrect password")
        }
    }
    else {
        alert("Account not found");
    }
});

btnlogout.addEventListener('click', function (e) {
    e.preventDefault();
    localStorage.login = 0;
    containerApp.style.opacity = 100;
    appContainer.style.opacity = 0;
    containerLogin.style.opacity = 0;
    containerSignup.style.opacity = 100;
    InputNameS.value = "";
    InputEmailS.value = "";
    InputPswdS.value = "";
    InputPswdL.value = "";
    InputEmailL.value = "";
});

btnLogin2.addEventListener('click', function (e) {
    e.preventDefault();
    containerApp.style.opacity = 100;
    appContainer.style.opacity = 0;
    containerLogin.style.opacity = 100;
    containerSignup.style.opacity = 0;
});
/////

// (() => {
 
//     if (localStorage.login == 1) {
//       console.log('already Logged in ');
//       containerApp.style.opacity = 0;
//       containerSignup.style.opacity = 0;
//       containerLogin.style.opacity = 0;
//       appContainer.style.opacity = 100;
//     }
//     else {
//       console.log("Login first");
//     }
  
//     createTasks();
//   })();
