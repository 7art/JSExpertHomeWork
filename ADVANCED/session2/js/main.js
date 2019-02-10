"use strict"
let Validator = function (userData) {
    this.content = document.querySelector("#content");
    this.galleryDiv = document.querySelector("#gallery");
    this.loginForm = document.querySelector("#login-form");
    const navPills = document.querySelector(".nav-pills");
    const hidePass = document.querySelector(".fa");
    const inpEmail = document.querySelector("#inputEmail");
    const inpPassword = document.querySelector("#inputPassword");
    const outEmail = document.querySelector("#outEmail");
    const outPassword = document.querySelector("#outPassword");
    let errorMessArr = [];
    this.errorMessArr = errorMessArr;

    this.checkFields = function () {

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
 

    this.setUserIsAutorized = function () {
        let date = new Date().getTime();
        localStorage.setItem("autorizedID", date);
    }

    this.getUserIsAutorized = function () {
        return localStorage.getItem("autorizedID");
    }

    this.showMessage = function (arr) {
        const alerts = document.querySelector(".alerts");
        let text = "";
        arr.forEach(item => {
            text += `<p class="text-left">${item}</p><hr>`;
        });
        alerts.innerHTML = text;
        $(".bd-modal-sm").modal("show");
    }

    this.showHideBlock = function (showBlock, hideBlock, exitBtn) {
        showBlock.classList.toggle('d-none');
        hideBlock.classList.toggle('d-none');
        showTopMenu();
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

    let showTopMenu = function () {
        navPills.classList.toggle('d-none');
    }

    this.clearData = function () {
        localStorage.clear();
        inpEmail.value = "";
        inpPassword.value = "";
    }
    
    // this.loginEvant = function () {
    //     loginBtn.addEventListener("click", () => {
    //         this.initValidator();
    //     });
    // }

    // this.initValidator = function () {
    //     if (checkFields()) {
    //         this.setUserIsAutorized();
    //         this.showHideBlock(this.galleryDiv, this.loginForm);
    //         this.exitEvent();
    //         //setFormData();
    //     } else {
    //         showMessage(errorMessArr);
    //     }
    // }

    /* hidePass.addEventListener("click", showHidePassword);*/
}


let validatorModule = new Validator(userData);

let galleryModule = new BaseGallery();
//let galleryModule = new ExtendedGallery();

let loginForm = new LoginForm(validatorModule, galleryModule);

loginForm.initComponent();