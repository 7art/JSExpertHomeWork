(function () {
    const passwordField = document.querySelector("#inputPassword");
    const logBtn = document.querySelector("#signin");

    let oldValue = "";

    let hidePassChar = function () {
        oldValue += passwordField.value.substring(oldValue.length, passwordField.value.length);
        setTimeout(() => {
            let newValue = "";
            for (let i = 0; i < passwordField.value.length; i++) {
                newValue += "*";
            }
            passwordField.value = newValue;
        }, 1000);
    }

    let setAndClear = function () {
        passwordField.value = oldValue;
        oldValue = "";
    }

    passwordField.addEventListener("input", hidePassChar);
    logBtn.addEventListener("click", setAndClear);
})()