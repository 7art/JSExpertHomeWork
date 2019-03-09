export default class LoginModel {
    constructor() {
        this.errorMessArr = [];
    }

    setUserIsAutorized() {
        let date = new Date().getTime();
        localStorage.setItem("autorizedID", date);
    };

    clearLocalStorageData() {
        localStorage.clear();
    };
    

    checkFields({login, password}) {
        const regEmail = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
        const regPasswd = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]{8,16}$/;
        const inputEmail = login.trim();
        const inputPassword = password.trim();
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

}