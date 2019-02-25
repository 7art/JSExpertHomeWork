class Validator {
    constructor() {
        let errorMessArr = [];
        this.errorMessArr = errorMessArr;
        this.checkFields = function ({ login, password }) {
            const regEmail = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
            const regPasswd = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]{8,16}$/;
            const inputEmail = inpEmail.value.trim();
            const inputPassword = inpPassword.value.trim();
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
            if (valid)
                checkValidEmail();
            if (valid)
                checkValidPassword();
            if (valid)
                checkData();
            return valid;
        };
        this.showMessage = function (arr) {
            const alerts = document.querySelector(".alerts");
            let text = "";
            arr.forEach((item) => {
                text += `<p class="text-left">${item}</p><hr>`;
            });
            alerts.innerHTML = text;
            $(".bd-modal-sm").modal("show");
        };
    }
}

