let LoginForm = function (validatorModule, galleryModule) {
	this.loginBtn = document.querySelector("#login-btn");
	this.exitBtn = document.querySelector("#exit-btn");
	this.validator = validatorModule;
	this.galleryDiv = validatorModule.galleryDiv;
	this.loginForm = validatorModule.loginForm;
	this.gallery = galleryModule;
}

LoginForm.prototype = {
	loginEvant: function () {
		this.loginBtn.addEventListener("click", () => {
			this.initValidator();
		});
	},
	exitEvent: function () {
		this.exitBtn.addEventListener("click", () => {
			this.validator.showHideBlock(this.loginForm, this.galleryDiv, this.exitBtn);
			this.validator.clearData();
			this.loginEvant();
		});
	},
	initValidator: function () {
		if (this.validator.checkFields()) {
			this.validator.setUserIsAutorized();
			this.showContent();
		} else {
			this.validator.showMessage(this.validator.errorMessArr);
		}
	},
	showContent: function () {
		this.validator.showHideBlock(this.galleryDiv, this.loginForm, this.exitBtn);
		this.setActiveTopMenu();
		this.exitEvent();
	},
	initComponent: function () {
		if (this.validator.getUserIsAutorized()) {
			this.showContent();
		} else {
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

		this.topMenu = document.querySelector(".nav-pills");
		this.topMenu.addEventListener("click", (e) => {
			activeItem(e.target);
		});
	},

	showGallery: function () {
		this.gallery.init();
	}
}