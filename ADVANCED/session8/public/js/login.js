class LoginForm {
	constructor(validatorModule, galleryModule, userPageModule, userData) {
		this.userData = userData;
		this.loginBtn = document.querySelector("#login-btn");
		this.exitBtn = document.querySelector("#exit-btn");
		this.userInfoDiv = document.querySelector("#userInfo");
		this.galleryDiv = document.querySelector("#gallery");
		this.loginFormDiv = document.querySelector("#loginform");
		this.addItemDiv = document.querySelector("#addimage");
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
		this.gallery.mainDiv.addEventListener("click", (e) => {
			this.gallery.removeImage(e);
		});
		// this.gallery.addBtn.addEventListener("click", () => {
		// 	this.gallery.addImage();
		// });
		this.gallery.addBtn.addEventListener("click", () => {
			this.showSelectedBlock(this.addItemDiv);
		});
		this.gallery.saveBtn.addEventListener("click", () => {
			this.gallery.addImage();
		});
		this.gallery.sortTypeByName.addEventListener("click", (e) => {
			this.gallery.sortingHandler(e);
		});
		this.gallery.sortTypeByDate.addEventListener("click", (e) => {
			this.gallery.sortingHandler(e);
		});
		window.addEventListener("beforeunload", () => {
			if (this.isUserAutorized()) {
				this.gallery.setStorageData();
			}
		})
	};
	initComponent() {
		if (!this.isUserAutorized()) {
			this.initEvant();
			this.showSelectedBlock(this.loginFormDiv);
		} else {
			this.initEvant();
			this.targetHandler();
		}
	};
	initValidator() {
		if (this.validator.checkFields(this.userData)) {
			this.userPage.setUserIsAutorized();
			this.targetHandler();
		} else {
			this.validator.showMessage(this.validator.errorMessArr);
		}
	};
	targetHandler(target = "gallery") {
		switch (target) {
			case "exit":
				this.showHideTopMenu(true);
				this.showSelectedBlock(this.loginFormDiv);
				this.clearLocalStorageData();
				this.userPage.clearFields();
				break;
			case "gallery":
				this.showActiveMenuItem(this.topMenu.querySelector('a[data-name=gallery]'));
				this.showSelectedBlock(this.galleryDiv);
				this.showHideTopMenu();
				this.showGallery();
				break;
			case "aboutuser":
				this.showSelectedBlock(this.userInfoDiv);
				this.userPage.setUserData(this.userData);
				this.showHideTopMenu();
				this.gallery.setStorageData();
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
	showHideTopMenu(displayNone) {
		if (displayNone) {
			this.topMenu.classList.add('d-none');
		} else {
			this.topMenu.classList.remove('d-none');
		}
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