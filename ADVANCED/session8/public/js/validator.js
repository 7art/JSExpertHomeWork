class Validator {
    constructor() {
        this.errorMessArr = [];
        this.inpEmail = document.querySelector("#inputEmail");
        this.inpPassword = document.querySelector("#inputPassword");
    }
    checkFields() {
        const regEmail = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
        const regPasswd = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]{8,16}$/;
        const inputEmail = this.inpEmail.value.trim();
        const inputPassword = this.inpPassword.value.trim();
        const self = this;
        this.errorMessArr.length = 0;
        let valid = false;

        function checkFieldsNotEmpty() {
            if (inputEmail === '' || inputPassword === '') {
                self.errorMessArr.push("Введите Ваш логин и пароль");
                return valid = false;
            }
            return valid = true;
        }

        function checkValidPassword() {
            if (!regPasswd.test(inputPassword)) {
                self.errorMessArr.push("Пароль должен быть от 8 до 15 символов длинной");
                return valid = false;
            }
            return valid = true;
        }

        function checkValidEmail() {
            if (!regEmail.test(inputEmail)) {
                self.errorMessArr.push("Вы ввели некорректный адрес электронной почты");
                return valid = false;
            }
            return valid = true;
        }
        checkFieldsNotEmpty();
        if (valid)
            checkValidEmail();
        if (valid)
            checkValidPassword();
        return valid;
    };
    showMessage(arr) {
        const alerts = document.querySelector(".alerts");
        let text = "";
        arr.forEach((item) => {
            text += `<p class="text-left">${item}</p><hr>`;
        });
        alerts.innerHTML = text;
        $(".bd-modal-sm").modal("show");
    };

}