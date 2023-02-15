// sign up vars
var signupContainer = document.querySelector(".signup");
var signupBtn = document.querySelector(".signup .form .signupBtn");
var signupNameInput = document.querySelector(".signup .form .name");
var signupEmailInput = document.querySelector(".signup .form .email");
var signupPassInput = document.querySelector(".signup .form .pass");
var signinLink = document.querySelector(".signup .text a");
var signupForm = document.querySelector(".signup .form");
var signupAlert = document.querySelector(".signup .wrapper .alert");
//

// sign in vars
var signinContainer = document.querySelector(".signin");
var signinBtn = document.querySelector(".signin .form .signinBtn");
var signinEmailInput = document.querySelector(".signin .form .email");
var signinPassInput = document.querySelector(".signin .form .pass");
var signupLink = document.querySelector(".signin .text a");
var signinForm = document.querySelector(".signin .form");
var signinAlert = document.querySelector(".signin .wrapper .alert");

//

// home vars
var homeContainer = document.querySelector(".home");
var logoutBtn = document.querySelector(".home nav .out");
var username = document.querySelector(".home .welcome h2 span");

// local storage sign(in up)
var users = [];
if (JSON.parse(localStorage.getItem("users")) < 1) {
  users = [];
} else {
  users = JSON.parse(localStorage.getItem("users"));
}
// local storage the user
var theUser = {};
if (JSON.parse(localStorage.getItem("theUser"))) {
  theUser = JSON.parse(localStorage.getItem("theUser"));
  username.innerHTML = theUser.username;
} else {
  theUser = {};
}

// local storage active page
var activePage;
if (JSON.parse(localStorage.getItem("activePage")) != null) {
  activePage = JSON.parse(localStorage.getItem("activePage"));
} else {
  activePage = {
    up: true,
    in: false,
    home: false,
  };
}

function signinActive() {
  signupContainer.style.display = "none";
  homeContainer.style.display = "none";
  signinContainer.style.display = "block";
  activePage = {
    up: false,
    in: true,
    home: false,
  };
  localStorage.setItem("activePage", JSON.stringify(activePage));
  signupAlert.classList.remove("active");
  signinAlert.classList.remove("active");
}
function signupActive() {
  signinContainer.style.display = "none";
  homeContainer.style.display = "none";
  signupContainer.style.display = "block";
  activePage = {
    up: true,
    in: false,
    home: false,
  };
  localStorage.setItem("activePage", JSON.stringify(activePage));
  signinAlert.classList.remove("active");
}
function homeActive() {
  homeContainer.style.display = "block";
  signinContainer.style.display = "none";
  signupContainer.style.display = "none";
  activePage = {
    up: false,
    in: false,
    home: true,
  };
  localStorage.setItem("activePage", JSON.stringify(activePage));
}

if (activePage.up) {
  signupActive();
} else if (activePage.in) {
  signinActive();
} else if (activePage.home) {
  homeActive();
}

//
// sign up
function signupHandle(e) {
  event.preventDefault();
  if (
    (signupNameInput.value &&
      signupEmailInput.value &&
      signupPassInput.value) == ""
  ) {
    signupAlert.classList.add("active");
  } else {
    var user = {
      name: signupNameInput.value,
      email: signupEmailInput.value,
      pass: signupPassInput.value,
    };
    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));
    signinActive();
  }
}

signupLink.addEventListener("click", signupActive);
//
// sign in
signinLink.addEventListener("click", signinActive);

function signinHandle(e) {
  event.preventDefault();

  if ((signinEmailInput.value && signinPassInput.value) == "") {
    signinAlert.classList.add("active");
  } else {
    if (users.length == 0) {
      console.log("signup first");
    } else {
      for (i = 0; i < users.length; i++) {
        var userEmail = users[i].email;
        var userPass = users[i].pass;
        if (
          signinEmailInput.value == userEmail &&
          signinPassInput.value == userPass
        ) {
          theUser = {
            username: users[i].name,
            useremail: users[i].email,
            userpass: users[i].pass,
          };
          // welcome
          username.innerHTML = users[i].name;
          // local
          localStorage.setItem("theUser", JSON.stringify(theUser));
          console.log("right");
          homeActive();
          break;
        } else {
          // console.log("wrong");
          signinAlert.classList.add("active");
          signinAlert.innerHTML = "(username | password) not correct";
        }
        break;
      }
    }
  }
}

//
// welcome
//

// log out
logoutBtn.addEventListener("click", () => {
  theUser = {};
  localStorage.removeItem("theUser");
  signinActive();
});
