export default class InfoView {
    constructor(utils) {     
        this.utils = utils;   
        this.outEmail = document.querySelector("#outEmail");
        this.outPassword = document.querySelector("#outPassword");
        this.inpEmail = document.querySelector("#inputEmail");
        this.inpPassword = document.querySelector("#inputPassword");
        this.hidePass = document.querySelector(".fa");
    }

    showHidePassword() {
        if (this.outPassword.type === "text") {
            this.outPassword.type = "password";
            console.log(this.hidePass);
            this.utils.switchCssClass(this.hidePass, "fa-eye", "fa-eye-slash");
        } else {
            this.outPassword.type = "text";
            this.utils.switchCssClass(this.hidePass, "fa-eye-slash", "fa-eye");
        }
    };
    setUserData() {
        this.outEmail.value = this.inpEmail.value;
        this.outPassword.value = this.inpPassword.value;
    };
    clearFields() {
        this.outEmail.value = this.inputEmail.value = "";
        this.outPassword.value = this.inputPassword.value = "";
    };
}