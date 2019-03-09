export default class LoginController {
    constructor(model, view, utils) {
        this.model = model;
        this.view = view;
        this.utils = utils;
        this.loginUrl = "http://localhost:1337/login";
        this.initEvents();
    }

    initEvents() {
        // console.log("loginEvant");
        this.view.loginBtn.addEventListener("click", () => {
            this.authorizeUser();
        });
        this.view.exitBtn.addEventListener("click", () => {
            this.logoutUser();
        });
    }

    logoutUser() {
        // console.log("logout");
        this.model.clearLocalStorageData();
        this.utils.hideTopMenu(this.view.topMenu);
        this.utils.navigateTo("");
    }

    async authorizeUser() {
        let userData = this.view.getEnteredUserData();
        if (this.model.checkFields(userData)) {
            const response = await fetch(this.loginUrl, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });
            const data = await response.json();
            if (data.status === true) {
                this.model.setUserIsAutorized();
                this.utils.showTopMenu(this.view.topMenu);
                this.utils.addClassActive(this.view.topMenu, 'a[data-name=gallery]');
                this.utils.navigateTo("gallery");               
            } else {
                this.utils.showMessage(["Введен неверный  логин или пароль!"]);
            }
        } else {
            this.utils.showMessage(this.model.errorMessArr);
        }
    }

}