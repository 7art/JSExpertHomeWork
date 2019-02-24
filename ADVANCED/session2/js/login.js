let LoginForm = function (validatorModule, galleryModule, userPageModule, userData) {
	this.userData = userData;
	this.loginBtn = document.querySelector("#login-btn");
	this.exitBtn = document.querySelector("#exit-btn");
	this.userInfoDiv = document.querySelector("#userInfo");
	this.galleryDiv = document.querySelector("#gallery");
	this.loginFormDiv = document.querySelector("#login-form");
	this.topMenu = document.querySelector(".nav-pills");
	this.hidePassBtn = document.querySelector(".input-group-addon");
	this.validator = validatorModule;
	this.gallery = galleryModule;
	this.userPage = userPageModule;
	this.selectedBlockItem = null;
	this.selectedMenuItem = null;

	this.showActiveMenuItem = function (selectedMenuItem) {
		if (this.selectedMenuItem) {
			this.selectedMenuItem.classList.remove('active');
		}
		this.selectedMenuItem = selectedMenuItem;
		this.selectedMenuItem.classList.add('active');
	}

	this.showHideBlock = function (showBlock) {
		if (this.selectedBlockItem) {
			this.userPage.addRemoveDisplayClass(this.selectedBlockItem, "d-block", "d-none");
		}
		this.selectedBlockItem = showBlock;
		this.userPage.addRemoveDisplayClass(this.selectedBlockItem, "d-none", "d-block");
	}

	this.showHideTopMenu = function (displayNone) {
		if (displayNone) {
			this.topMenu.classList.add('d-none');
		} else {
			this.topMenu.classList.remove('d-none');
		}
	}

	this.clearLocalStorageData = function () {
		localStorage.clear();
	}

	this.getUserIsAutorized = function () {
		return !!localStorage.getItem("autorizedID");
	}

}

LoginForm.prototype = {
	initEvant: function () {
		this.loginBtn.addEventListener("click", () => {
			this.initValidator();
		});
		this.hidePassBtn.addEventListener("click", () => {
			this.userPage.showHidePassword();
		});
		this.topMenu.addEventListener("click", (e) => {
			this.showActiveMenuItem(e.target);
			let target = e.target.getAttribute("data-name");
			this.showContent(target);
		});
		this.gallery.mainDiv.addEventListener("click", (e) => {
			this.gallery.removeImage(e);
		});
		this.gallery.addBtn.addEventListener("click", () => {
			this.gallery.addImage();
		});
		this.gallery.sortTypeSelectbox.addEventListener("click", (e) => {
			if (e.target.dataset.type) {
				this.gallery.sortItems(e.target.dataset.type);
			}
		});
		window.addEventListener("beforeunload", () => {
			if (this.getUserIsAutorized()) {
				this.gallery.setStorageData();
			}
		})

	},
	initValidator: function () {
		if (this.validator.checkFields(this.userData)) {
			this.userPage.setUserIsAutorized();
			this.showContent();
		} else {
			this.validator.showMessage(this.validator.errorMessArr);
		}
	},
	showContent: function (target = "gallery") {
		// if (target == "exit") {
		// 	this.showHideTopMenu(displayNone = true);
		// 	this.showHideBlock(this.loginFormDiv);
		// 	this.clearLocalStorageData();
		// 	this.userPage.clearFields();			
		// } else if (target == "gallery") {
		// 	this.showActiveMenuItem(this.topMenu.querySelector('a[data-name=gallery]'));
		// 	this.showHideBlock(this.galleryDiv);
		// 	this.showHideTopMenu();
		// 	this.showGallery();
		// } else {
		// 	this.showHideBlock(this.userInfoDiv);
		// 	this.userPage.setUserData(this.userData);
		// 	this.showHideTopMenu();
		// 	this.gallery.setStorageData();
		// }

		switch (target) {
			case "exit":
				this.showHideTopMenu(displayNone = true);
				this.showHideBlock(this.loginFormDiv);
				this.clearLocalStorageData();
				this.userPage.clearFields();
				break;
			case "gallery":
				this.showActiveMenuItem(this.topMenu.querySelector('a[data-name=gallery]'));
				this.showHideBlock(this.galleryDiv);
				this.showHideTopMenu();
				this.showGallery();
				break;
			case "aboutuser":
				this.showHideBlock(this.userInfoDiv);
				this.userPage.setUserData(this.userData);
				this.showHideTopMenu();
				this.gallery.setStorageData();
				break;
		}
	},
	initComponent: function () {
		if (!this.getUserIsAutorized()) {
			this.initEvant();
			this.showHideBlock(this.loginFormDiv);
		} else {
			this.initEvant();
			this.showContent();
		}

	},
	showGallery: function () {
		this.gallery.initGallery();
	}

}