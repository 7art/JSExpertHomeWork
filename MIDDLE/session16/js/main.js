(function () {
    const btn = document.querySelector("#signin");
    const alertDiv = document.getElementById("alerts");
    let errorMessArr = [];

    function showMessage(arr) {
        let text = "";
        arr.forEach(function (item, index, array) {
            text += `<p>${item}</p>`
        });
        alertDiv.innerHTML = `<div class="alert alert-danger" role="alert">${text}</div>`;
    }

    function validate() {
        const regEmail = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
        const regPaswd = /^((?=.*[a-zA-Z0-9]).{7,16})$/;
        const inputEmail = document.querySelector("#inputEmail");
        const inputPassword = document.querySelector("#inputPassword");  
        errorMessArr.length = 0;    
        
        let valid = true;

        if (inputEmail.value == '') {
            valid = false;
            errorMessArr.push("Поле Email обязательное для заполнения!!!");
        }
        if (inputPassword.value == '') {
            valid = false;
            errorMessArr.push("Поле Password обязательное для заполнения!!!");
        }
        if (inputPassword.value !== '' && inputEmail.value !== '') {
            if (regEmail.test(inputEmail.value) == false) {
                errorMessArr.push("Введите корректный Email");
                valid = false;
            }
            if (regPaswd.test(inputPassword.value) == false) {
                errorMessArr.push("Введите корректный пароль");
                valid = false;
            }
            if (inputPassword.value.length <= 8 && inputPassword.value.length >= 15) {
                errorMessArr.push("Длинна пароля должна быть от 8 до 15 символов");
                valid = false;
            }

        }
        // if (!valid) {
        //     showMessage(errorMessArr);
        // } else {
             return valid;
        // }
        
    }
    //принимает объект с логином и паролем с которым мы будем сверяться;
    function setLogAndPass() {}
    //непосредственно запускает приложение
    function initComponent() {}

    function checkingUserData(e) {

        if (validate()) {
            const content = document.querySelector("#content");
            const loginForm = document.querySelector("#login-form");
            content.classList.add('d-block');
            loginForm.classList.add('d-none');
        } else {
            showMessage(errorMessArr);
        
        }
        setUserData();
        
    }

    btn.addEventListener("click", checkingUserData);
})()