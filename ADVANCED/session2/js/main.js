"use strict"
let Validator = function (userData) {
    this.content = document.querySelector("#content");
    this.loginForm = document.querySelector("#login-form");
    const loginBtn = document.querySelector("#login-btn");
    const exitBtn = document.querySelector("#exit-btn");
    const hidePass = document.querySelector(".fa");
    const inpEmail = document.querySelector("#inputEmail");
    const inpPassword = document.querySelector("#inputPassword");
    const outEmail = document.querySelector("#outEmail");
    const outPassword = document.querySelector("#outPassword");
    let errorMessArr = [];
    this.errorMessArr = errorMessArr;

    let checkFields = function () {
        const regEmail = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
        const regPasswd = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]{8,16}$/;
        const inputEmail = inpEmail.value.trim();
        const inputPassword = inpPassword.value.trim();
        let login = userData.login;
        let password = userData.password;
        let valid = false;

        errorMessArr.length = 0;

        function checkFieldsNotEmpty() {
            if (inputEmail === '' || inputPassword === '') {
                errorMessArr.push("Введите Ваш логин и пароль");
                return valid = false;
            }
            return valid = true;
        }

        function checkData() {
            if (inputEmail !== login) {
                errorMessArr.push("Введен неверный Email");
                return valid = false;
            }
            if (inputPassword !== password) {
                errorMessArr.push("Введен неверный пароль");
                return valid = false;
            }
            return valid = true;
        }

        function checkValidPassword() {
            if (!regPasswd.test(inputPassword)) {
                errorMessArr.push("Пароль должен быть от 8 до 15 символов длинной");
                return valid = false;
            }
            return valid = true;
        }

        function checkValidEmail() {
            if (!regEmail.test(inputEmail)) {
                errorMessArr.push("Вы ввели некорректный адрес электронной почты");
                return valid = false;
            }
            return valid = true;
        }
        checkFieldsNotEmpty();
        if (valid) checkValidEmail();
        if (valid) checkValidPassword();
        if (valid) checkData();

        return valid;

    }

    // this.setFormData = function () {
    //     outEmail.value = inpEmail.value;
    //     outPassword.value = inpPassword.value;
    // }
    this.clearData = function () {
        localStorage.clear();
        inpEmail.value = "";
        inpPassword.value = "";
    }
    this.setUserIsAutorized = function () {
        let date = new Date().getTime();
        localStorage.setItem("autorized", date);
    }

    this.getUserIsAutorized = function () {
        return localStorage.getItem("autorized");
    }

    let showMessage = function (arr) {
        const alerts = document.querySelector(".alerts");
        let text = "";
        arr.forEach(item => {
            text += `<p class="text-left">${item}</p><hr>`;
        });
        alerts.innerHTML = text;
        $(".bd-modal-sm").modal("show");
    }

    this.showHideBlock = function (showBlock, hideBlock) {
        showBlock.classList.remove('d-none');
        showBlock.classList.add('d-block');
        hideBlock.classList.remove('d-block');
        hideBlock.classList.add('d-none');
        showExitBtn();
    }

    let showHidePassword = function () {
        if (outPassword.type === "password") {
            outPassword.type = "text";
            hidePass.classList.remove('fa-eye');
            hidePass.classList.add('fa-eye-slash');
        } else {
            outPassword.type = "password";
            hidePass.classList.remove('fa-eye-slash');
            hidePass.classList.add('fa-eye');
        }
    }

    let showExitBtn = function () {
        if (exitBtn.classList.contains("d-none")) {
            exitBtn.classList.remove('d-none');
            exitBtn.classList.add('d-block');
        } else {
            exitBtn.classList.remove('d-block');
            exitBtn.classList.add('d-none');
        }
    }

    this.exitEvent = function () {
        exitBtn.addEventListener("click", () => {
            this.showHideBlock(this.loginForm, this.content);
            this.clearData();
            this.loginEvant();
        });
    }
    this.loginEvant = function () {
        loginBtn.addEventListener("click", () => {
            this.initValidator();
        });
    }

    this.initValidator = function () {
        if (checkFields()) {
            this.setUserIsAutorized();
            this.showHideBlock(this.content, this.loginForm);
            //setFormData();
        } else {
            showMessage(errorMessArr);
        }
    }

    /* hidePass.addEventListener("click", showHidePassword);*/
}


let validatorModule = new Validator(userData);

let galleryModule = new BaseGallery();
//let galleryModule = new ExtendedGallery();

let loginForm = new LoginForm(validatorModule, galleryModule);

loginForm.initComponent();