let Validator = function (userData) {
    this.loginBtn = document.querySelector("#login-btn");
    this.exitBtn = document.querySelector("#exit-btn");
    const hidePass = document.querySelector(".fa");
    this.content = document.querySelector("#content");
    this.loginForm = document.querySelector("#login-form");
    const inpEmail = document.querySelector("#inputEmail");
    const inpPassword = document.querySelector("#inputPassword");
    const outEmail = document.querySelector("#outEmail");
    const outPassword = document.querySelector("#outPassword");
    let errorMessArr = [];
    this.errorMessArr = errorMessArr;

    checkFields = function () {
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

    this.setFormData = function () {
        outEmail.value = inpEmail.value;
        outPassword.value = inpPassword.value;
    }

    this.setUserIsAutorized = function () {
        let date = new Date().getTime();
        localStorage.setItem("autorized", date);
    }

    this.getUserIsAutorized = function () {
        return localStorage.getItem("autorized");
    }

    showMessage = function (arr) {
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

    let showLoginExit = function () {
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

    this.exitEvent = function () {
        this.exitBtn.addEventListener("click", () => {
            this.showHideBlock(this.loginForm, this.content);
            localStorage.clear();
            this.loginEvant();
        });
    }
    this.loginEvant = function () {
        this.loginBtn.addEventListener("click", () => {
            this.initValidator();
        });        
    }

    this.initValidator = function () {
        if (checkFields()) {
            this.setUserIsAutorized();
            this.showHideBlock(this.content, this.loginForm);
            //setFormData();
        } else {
            showMessage(this.errorMessArr);
        }
    }

    /* hidePass.addEventListener("click", showHidePassword);*/
}


let validatorModule = new Validator(userData);

let galleryModule = new BaseGallery();
//let galleryModule = new ExtendedGallery();

let loginForm = new LoginForm(validatorModule, galleryModule);

loginForm.initComponent();