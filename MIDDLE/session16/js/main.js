const loginBtn = document.querySelector("#signin");

function Signin() {
    const backBtn = document.getElementById("moveback");
    const hidePass = document.querySelector(".fa");
    const content = document.querySelector("#content");
    const loginForm = document.querySelector("#login-form");
    const inpEmail = document.querySelector("#inputEmail");
    const inpPassword = document.querySelector("#inputPassword");
    const outEmail = document.querySelector("#outEmail");
    const outPassword = document.querySelector("#outPassword");
    let errorMessArr = [];

    let checkFields = function () {
        const regEmail = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
        const regPasswd = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]{8,16}$/;
        const inputEmail = inpEmail.value.trim();
        const inputPassword = inpPassword.value.trim();
        let login = localStorage.getItem("login");
        let password = localStorage.getItem("password");
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

    let setFormData = function () {
        outEmail.value = inpEmail.value;
        outPassword.value = inpPassword.value;
    }


    this.setLogAndPass = function ({
        login,
        password
    }) {
        localStorage.setItem("login", login);
        localStorage.setItem("password", password);
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

    let showHideBlock = function (showBlock, hideBlock) {
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

    this.initComponent = function () {
        if (checkFields()) {
            showHideBlock(content, loginForm);
            setFormData();
        } else {
            showMessage(errorMessArr);
        }
    }

    backBtn.addEventListener("click", () => {
        showHideBlock(loginForm, content);
    });

    hidePass.addEventListener("click", showHidePassword);
}

const checkingUserData = new Signin();

checkingUserData.setLogAndPass(userData);

loginBtn.addEventListener("click", () => {
    checkingUserData.initComponent();
});