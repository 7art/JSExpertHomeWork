(function () {
    const loginBtn = document.querySelector("#signin");
    const backBtn = document.querySelector("#moveback");
    let errorMessArr = [];

    function showMessage(arr) {
        const alerts = document.querySelector(".alerts");
        let text = "";
        arr.forEach(function (item, index, array) {
            text += `<p class="text-left">${item}</p><hr>`;
        });
        alerts.innerHTML = text;
        $(".bd-modal-sm").modal("show");
    }

    function validate() {
        const regEmail = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
        const regPasswd = /^[a-zA-Z0-9]+$/;
        const inputEmail = document.querySelector("#inputEmail").value;
        const inputPassword = document.querySelector("#inputPassword").value;
        let login = localStorage.getItem("login");
        let password = localStorage.getItem("password");
        let valid = true;

        errorMessArr.length = 0;

        if (inputEmail !== '' && inputPassword !== '') {
            if (regEmail.test(inputEmail) == false) {
                errorMessArr.push("Вы ввели некорректный адрес электронной почты");
                valid = false;
            } else if (regPasswd.test(inputPassword) == false) {
                errorMessArr.push("Пароль должен содержать только латинские буквы и цифры");
                valid = false;
            } else if (inputPassword.length <= 7 || inputPassword.length >= 15) {
                errorMessArr.push("Длинна пароля должна быть от 8 до 15 символов");
                valid = false;
            } else {
                if (inputEmail !== login) {
                    errorMessArr.push("Введен неверный Email");
                    valid = false;
                }
                if (inputPassword !== password) {
                    errorMessArr.push("Введен неверный пароль");
                    valid = false;
                }
            }
        } else {
            errorMessArr.push("Введите Ваш логин и пароль");
            valid = false;
        }
        return valid;
    }

    function moveBack() {
        const content = document.querySelector("#content");
        const loginForm = document.querySelector("#login-form");      
        content.classList.remove('d-block');
        content.classList.add('d-none');
        loginForm.classList.remove('d-none');
        loginForm.classList.add('d-block'); 
    }

    //принимает объект с логином и паролем с которым мы будем сверяться;
    function setLogAndPass() {} {
        if (!localStorage.getItem("login")) {
            localStorage.setItem("login", userData.login);
            localStorage.setItem("password", userData.password);
        }
    }

    //непосредственно запускает приложение
    // function initComponent() {}

    function checkingUserData() {
        setLogAndPass();
        if (validate()) {
            const content = document.querySelector("#content");
            const loginForm = document.querySelector("#login-form");
            content.classList.remove('d-none');
            content.classList.add('d-block');           
            loginForm.classList.remove('d-block');
            loginForm.classList.add('d-none');
        } else {
            showMessage(errorMessArr);
        }
    }

    loginBtn.addEventListener("click", checkingUserData);
    backBtn.addEventListener("click", moveBack);
})()