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
	this.outEmail = document.querySelector("#outEmail");
	this.outPassword = document.querySelector("#outPassword");
	this.validator = validatorModule;
	this.gallery = galleryModule;
	this.selectedBlockItem = "";
	this.selectedMenuItem = "";

	this.showActiveMenuItem = function (selectedMenuItem) {
		if (this.selectedMenuItem) {
			this.selectedMenuItem.classList.remove('active');
		}
		this.selectedMenuItem = selectedMenuItem;
		this.selectedMenuItem.classList.add('active');
	}

	let addRemoveDisplayClass = function (node, removeClass, addClass) {
		node.classList.remove(removeClass);
		node.classList.add(addClass);
	}

	this.showHideBlock = function (showBlock) {
		if (this.selectedBlockItem) {
			addRemoveDisplayClass(this.selectedBlockItem, "d-block", "d-none");
		}
		this.selectedBlockItem = showBlock;
		addRemoveDisplayClass(this.selectedBlockItem, "d-none", "d-block");
	}

	this.showHideTopMenu = function (displayNone) {
		if (displayNone) {
			this.topMenu.classList.add('d-none');
		} else {
			this.topMenu.classList.remove('d-none');
		}
	}

	this.showHidePassword = function () {
		if (this.outPassword.type === "text") {
			this.outPassword.type = "password";
			addRemoveDisplayClass(this.hidePass, "fa-eye", "fa-eye-slash");
		} else {
			this.outPassword.type = "text";
			addRemoveDisplayClass(this.hidePass, "fa-eye-slash", "fa-eye");
		}
	}

	this.clearLocalStorageData = function () {
		localStorage.clear();
	}

	this.setUserIsAutorized = function () {
		let date = new Date().getTime();
		localStorage.setItem("autorizedID", date);
	}

	this.setUserData = function ({
		login,
		password
	}) {
		this.outEmail.value = login;
		this.outPassword.value = password;
	}

	this.getUserIsAutorized = function () {
		return localStorage.getItem("autorizedID");
	}

}

LoginForm.prototype = {
	loginEvant: function () {
		this.loginBtn.addEventListener("click", () => {
			this.initValidator();
		});
	},
	passwordHideEvant: function () {
		this.hidePassBtn.addEventListener("click", () => {
			this.showHidePassword();
		});
	},
	activeTopMenuEvant: function () {
		this.topMenu.addEventListener("click", (e) => {
			this.showActiveMenuItem(e.target);
			let target = e.target.getAttribute("data-name");
			this.showContent(target);
		});
	},
	initValidator: function () {
		if (this.validator.checkFields(userData)) {
			this.setUserIsAutorized();
			this.showContent();
		} else {
			this.validator.showMessage(this.validator.errorMessArr);
		}
	},
	showContent: function (target = "gallery") {
		if (target == "exit") {
			this.showHideTopMenu(displayNone = true);
			this.showHideBlock(this.loginFormDiv);
			this.clearLocalStorageData();
			location.reload();
		} else if (target == "gallery") {
			this.showActiveMenuItem(this.topMenu.querySelector('a[data-name=gallery]'));
			this.showHideBlock(this.galleryDiv);
			this.showGallery();
		} else {
			this.showHideBlock(this.userInfoDiv);
			this.setUserData(userData);
			this.passwordHideEvant();
			console.log("userinfo");
		}
		this.showHideTopMenu();
		this.activeTopMenuEvant();
	},
	initComponent: function () {
		if (this.getUserIsAutorized()) {
			this.showContent();
		} else {
			this.showHideBlock(this.loginFormDiv);
			this.loginEvant();
		}
	},
	showGallery: function () {
		this.gallery.initGallery();
	}

}