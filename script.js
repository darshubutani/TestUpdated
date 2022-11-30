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
let data = [{}];


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
  data.push({
    names: nameInput.value || InputNameS.value,
    email: emailInput.value || InputEmailS.value,
    password: pswdInput.value || InputPswdS.value,
  });

  localStorage.setItem("data", JSON.stringify(data));
  console.log(data);
  createTasks();
};

let createTasks = () => {
  tasks.innerHTML = "";
  data.map((x, index) => {
    return (tasks.innerHTML += `
    <div id=${index}>
          <span class="fw-bold">${x.names}</span>
          <span class="small text-secondary">${x.email}</span>
          <p>${x.password}</p>
  
          <span class="options">
            <i onClick= "editTask(this)" data-bs-toggle="modal" data-bs-target="#form" class="fas fa-edit"></i>
            <i onClick ="deleteTask(this);createTasks()" class="fas fa-trash-alt"></i>
          </span>
        </div>
    `);
  });

  resetForm();
};

let deleteTask = (e) => {
  confirm('Are you sure to delete this record ?')
  //e.parentElement.parentElement.remove();
  data.splice(e.parentElement.parentElement.id, 1);
  localStorage.setItem("data", JSON.stringify(data));
  console.log(data);

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
  nameInput.value = "";
  emailInput.value = "";
  pswdInput.value = "";
  InputNameS.value = "";
  InputEmailS.value = "";
  InputPswdS.value= "";
  InputPswdL.value ="";
  InputEmailL.value = "";
};
//IIFE to display data 
(() => {
  data = JSON.parse(localStorage.getItem("data")) || []
  console.log(data);
   
  if(localStorage.login == 1){
    console.log('already Logged in ');
      containerApp.style.opacity = 0;
      containerSignup.style.opacity = 0;
      containerLogin.style.opacity = 0;
      appContainer.style.opacity = 100;
  }
  else{
          console.log("Login first");
  }


  createTasks();
})();


//////
signupBtn.addEventListener('click', (e) => {
  e.preventDefault();
  console.log("Hello signup");
  localStorage.login = 1;
  containerApp.style.opacity = 0;
  appContainer.style.opacity = 100;
  containerSignup.style.opacity = 0;

  acceptData();
});

let temp;
btnlogin.addEventListener('click', function (e) {
  e.preventDefault();

  console.log(localStorage.login);

  if (data.find(acc => acc.email === InputEmailL.value)) {
    temp = data.find(acc => acc.email === InputEmailL.value);
    console.log(temp);
    if ((temp.password) === (InputPswdL.value)) {
      console.log('LogIN');
      localStorage.login = 1;
      containerApp.style.opacity = 0;
      containerSignup.style.opacity = 0;
      containerLogin.style.opacity = 0;
      appContainer.style.opacity = 100;
    }
    else {
      alert("Incorrect password")
    }
  }
  else {
    alert("Account not found");
  }
});

btnlogout.addEventListener('click',function(e){
  e.preventDefault();
     localStorage.login = 0;
     containerApp.style.opacity = 100;
     appContainer.style.opacity = 0;
     containerLogin.style.opacity = 0;
     containerSignup.style.opacity = 100;
     InputNameS.value = "";
     InputEmailS.value = "";
     InputPswdS.value= "";
     InputPswdL.value ="";
     InputEmailL.value = "";
});

btnLogin2.addEventListener('click',function(e){
  e.preventDefault();
  containerApp.style.opacity = 100;
  appContainer.style.opacity = 0;
  containerLogin.style.opacity = 100;
  containerSignup.style.opacity = 0;
});
/////