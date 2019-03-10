export default class LoginController {
    constructor(model, view, utils) {
        this.model = model;
        this.view = view;
        this.utils = utils;
        this.loginUrl = "http://localhost:1337/login";
        this.initEvents();
    }

    initEvents() {        
        this.view.loginBtn.addEventListener("click", () => {
            this.authorizeUser();
        });
        this.view.exitBtn.addEventListener("click", () => {
            this.logoutUser();
        });
    }

    logoutUser() {        
        this.model.clearLocalStorageData();
        //this.utils.hideTopMenu(this.view.topMenu);
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
                this.utils.navigateTo("gallery");               
            } else {
                this.utils.showMessage(["Введен неверный  логин или пароль!"]);
            }
        } else {
            this.utils.showMessage(this.model.errorMessArr);
        }
    }

}