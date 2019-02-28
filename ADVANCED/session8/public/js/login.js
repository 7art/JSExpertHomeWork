class LoginForm {
	constructor(validatorModule, galleryModule, userPageModule, userData) {
		this.userData = userData;
		this.loginBtn = document.querySelector("#login-btn");
		this.exitBtn = document.querySelector("#exit-btn");
		this.userInfoDiv = document.querySelector("#userInfo");
		this.galleryDiv = document.querySelector("#gallery");
		this.loginFormDiv = document.querySelector("#loginform");
		this.viewItemDiv = document.querySelector("#viewitem");
		this.topMenu = document.querySelector(".nav-pills");
		this.hidePassBtn = document.querySelector(".input-group-addon");
		this.validator = validatorModule;
		this.gallery = galleryModule;
		this.userPage = userPageModule;
		this.selectedBlockItem = null;
		this.selectedMenuItem = null;
	}
	initEvant() {
		this.loginBtn.addEventListener("click", () => {
			this.initValidator();
		});
		this.hidePassBtn.addEventListener("click", () => {
			this.userPage.showHidePassword();
		});
		this.topMenu.addEventListener("click", (e) => {
			this.showActiveMenuItem(e.target);
			let target = e.target.getAttribute("data-name");
			this.targetHandler(target);
		});
		this.gallery.addItemBtn.addEventListener("click", (e) => {
			this.gallery.viewEmptyForm(e);
		});
		this.gallery.mainDiv.addEventListener("click", (e) => {
			if (e.target.getAttribute("data-open-item")) {
				this.gallery.viewItem(e);
			} else if (e.target.getAttribute("data-remove-item")) {
				this.gallery.removeItem(e);
			}
		});
		this.viewItemDiv.addEventListener("click", (e) => {
			let assignment = e.target.dataset.assignment;
			if (assignment == "save-new") {
				this.gallery.saveNewItem();
			} else if (assignment == "edit-item") {
				this.gallery.saveEditedItem(e);
			}
		});
		this.gallery.sortTypeByName.addEventListener("click", (e) => {
			this.gallery.sortingHandler(e);
		});
		this.gallery.sortTypeByDate.addEventListener("click", (e) => {
			this.gallery.sortingHandler(e);
		});
	};
	initComponent() {
		if (!this.isUserAutorized()) {
			this.initEvant();
			this.showSelectedBlock(this.loginFormDiv);
		} else {
			this.initEvant();
			this.showTopMenu();
			this.targetHandler();
		}
	};
	initValidator() {
		if (this.validator.checkFields(this.userData)) {
			this.userPage.setUserIsAutorized();
			this.showTopMenu();
			this.targetHandler();
		} else {
			this.validator.showMessage(this.validator.errorMessArr);
		}
	};
	targetHandler(target = "gallery") {
		switch (target) {
			case "exit":
				this.hideTopMenu();
				this.showSelectedBlock(this.loginFormDiv);
				this.clearLocalStorageData();
				this.userPage.clearFields();
				break;
			case "gallery":
				this.showActiveMenuItem(this.topMenu.querySelector('a[data-name=gallery]'));
				this.showSelectedBlock(this.galleryDiv);				
				this.showGallery();
				break;
			case "aboutuser":
				this.showSelectedBlock(this.userInfoDiv);
				this.userPage.setUserData(this.userData);				
				break;
		}
	};
	showActiveMenuItem(selectedMenuItem) {
		if (this.selectedMenuItem) {
			this.selectedMenuItem.classList.remove('active');
		}
		this.selectedMenuItem = selectedMenuItem;
		this.selectedMenuItem.classList.add('active');
	}
	showSelectedBlock(showBlock) {
		if (this.selectedBlockItem) {
			utilite.switchCssClass(this.selectedBlockItem, "d-block", "d-none");
		}
		this.selectedBlockItem = showBlock;
		utilite.switchCssClass(this.selectedBlockItem, "d-none", "d-block");
	};
	showTopMenu() {
		this.topMenu.classList.remove('d-none');
	};
	hideTopMenu(displayNone) {
		this.topMenu.classList.add('d-none');
	};
	clearLocalStorageData() {
		localStorage.clear();
	};
	isUserAutorized() {
		return !!localStorage.getItem("autorizedID");
	};
	showGallery() {
		this.gallery.initGallery();
	}

}