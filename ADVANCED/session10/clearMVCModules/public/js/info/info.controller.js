export default class InfoController {
    constructor(model, view) {
        this.model = model;
        this.view = view;        
        this.hidePassBtn = document.querySelector("#switcheye");
        this.init();
    }
    bindEvents() {
        this.hidePassBtn.addEventListener("click", () => {
            this.view.showHidePassword();                
        });
    };

    init() {
        this.bindEvents(); 
        this.view.setUserData();             
    }

}