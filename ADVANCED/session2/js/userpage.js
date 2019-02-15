let UserPage = function(){
    this.outEmail = document.querySelector("#outEmail");
    this.outPassword = document.querySelector("#outPassword");
    this.hidePass = document.querySelector(".fa");
    this.addRemoveDisplayClass = function (node, removeClass, addClass) {
		node.classList.remove(removeClass);
		node.classList.add(addClass);
	}
	this.showHidePassword = function () {
		if (this.outPassword.type === "text") {
			this.outPassword.type = "password";
			this.addRemoveDisplayClass(this.hidePass, "fa-eye", "fa-eye-slash");
		} else {
			this.outPassword.type = "text";
			this.addRemoveDisplayClass(this.hidePass, "fa-eye-slash", "fa-eye");
		}
	}
	this.setUserIsAutorized = function () {
		let date = new Date().getTime();
		localStorage.setItem("autorizedID", date);
	}
	this.setUserData = function ({login,password}) {
		this.outEmail.value = login;
		this.outPassword.value = password;
    }
    this.clearFields = function(){
        this.outEmail.value = inputEmail.value = "";
		this.outPassword.value = inputPassword.value = "";
    }
}