export default class LoginView {
    constructor() {
        this.loginBtn = document.querySelector("#login-btn");
        this.loginFormDiv = document.querySelector("#login-wiev");
        this.topMenu = document.querySelector("#topmenu");
        this.inpEmail = document.querySelector("#inputEmail");
        this.inpPassword = document.querySelector("#inputPassword");
        this.exitBtn = document.querySelector("#exit-btn");
        this.selectedMenuItem = null;
    }

    getEnteredUserData() {
        return {
            login: this.inpEmail.value,
            password: this.inpPassword.value
        }
    }
    
    // showMessage(arr) {
    //     const alerts = document.querySelector(".alerts");
    //     let text = "";
    //     arr.forEach((item) => {
    //         text += `<p class="text-left">${item}</p><hr>`;
    //     });
    //     alerts.innerHTML = text;
    //     $(".bd-modal-sm").modal("show");
    // };

}