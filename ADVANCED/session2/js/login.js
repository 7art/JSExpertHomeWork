let LoginForm = function (validatorModule, galleryModule, userData) {
	this.userData = userData;
	this.loginBtn = document.querySelector("#login-btn");
	this.exitBtn = document.querySelector("#exit-btn");
	this.userInfoDiv = document.querySelector("#userInfo");
	this.galleryDiv = document.querySelector("#gallery");
	this.loginFormDiv = document.querySelector("#login-form");
	this.topMenu = document.querySelector(".nav-pills");
	this.hidePassBtn = document.querySelector(".input-group-addon");
	this.hidePass = document.querySelector(".fa");
	//this.outEmail = validatorModule.outEmail;
    this.outPassword = validatorModule.outPassword;
	//const navPills = document.querySelector(".nav-pills");
	this.validator = validatorModule;
	this.gallery = galleryModule;
	this.selectedItem = "";

	this.showTopMenu = function (dNone) {
		if (dNone) {
			this.topMenu.classList.add('d-none');
		} else {
			this.topMenu.classList.remove('d-none');
		}

	}

	this.showHideBlock = function (showBlock) {

		if (this.selectedItem) {
			this.selectedItem.classList.remove('d-block');
			this.selectedItem.classList.add('d-none');
		}
		this.selectedItem = showBlock;
		this.selectedItem.classList.add('d-block');
		this.selectedItem.classList.remove('d-none');
	}

	this.showHidePassword = function () {
        if (this.outPassword.type === "text") {
            this.outPassword.type = "password";
            this.hidePass.classList.remove('fa-eye');
            this.hidePass.classList.add('fa-eye-slash');
        } else {
            this.outPassword.type = "text";
            this.hidePass.classList.remove('fa-eye-slash');
            this.hidePass.classList.add('fa-eye');
        }
    }

	this.clearData = function () {
		localStorage.clear();
		// inpEmail.value = "";
		// inpPassword.value = "";
	}

}

LoginForm.prototype = {
	loginEvant: function () {
		this.loginBtn.addEventListener("click", () => {
			this.initValidator();
		});
	},
	exitEvent: function () {
		this.exitBtn.addEventListener("click", (e) => {
			e.stopPropagation();
			this.showHideBlock(this.loginFormDiv);
			this.showTopMenu(dNone = true);
			this.clearData();
			this.loginEvant();
		});
	},
	passwordEvant: function () {		
		this.hidePassBtn.addEventListener("click", (e) => {			
			this.showHidePassword();			
		});
	},
	initValidator: function () {
		if (this.validator.checkFields(userData)) {
			this.validator.setUserIsAutorized();
			this.showContent();
		} else {
			this.validator.showMessage(this.validator.errorMessArr);
		}
	},
	showContent: function () {
		this.showHideBlock(this.galleryDiv);
		this.showTopMenu();
		this.setActiveTopMenu();
		this.passwordEvant();
		this.exitEvent();
	},
	initComponent: function () {
		if (this.validator.getUserIsAutorized()) {
			this.showContent();
		} else {
			this.showHideBlock(this.loginFormDiv);
			this.loginEvant();
		}
	},
	setActiveTopMenu: function () {
		let selectedItem = "";

		function activeItem(node) {
			if (selectedItem) {
				selectedItem.classList.remove('active');
			}
			selectedItem = node;
			selectedItem.classList.add('active');
		}
		activeItem(this.topMenu.querySelector(".gallery"));
		this.topMenu.addEventListener("click", (e) => {
			//e.stopPropagation();
			activeItem(e.target);
			if (e.target.classList.contains("aboutuser")) {
				this.showHideBlock(this.userInfoDiv);
				this.validator.setUserData(userData);				
			} else {
				this.showHideBlock(this.galleryDiv);
			}
		});		
	},
	showGallery: function () {
		this.gallery.init();
	}

}