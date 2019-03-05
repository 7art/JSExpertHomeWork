class LoginForm {
	constructor(validatorModule, galleryModule, userPageModule) {

		this.loginBtn = document.querySelector("#login-btn");
		this.exitBtn = document.querySelector("#exit-btn");
		this.userInfoDiv = document.querySelector("#userInfo");
		this.galleryDiv = document.querySelector("#gallery");
		this.loginFormDiv = document.querySelector("#loginform");		
		this.topMenu = document.querySelector(".nav-pills");		
		this.validator = validatorModule;
		this.gallery = galleryModule;
		this.userPage = userPageModule;
		this.selectedBlockItem = null;
		this.selectedMenuItem = null;
		this.login = validatorModule.inpEmail;
		this.password = validatorModule.inpPassword;

		this.loginUrl = "http://localhost:3000/login";

		this.initEventOnce = true;
		if (this.initEventOnce) {			
			this.initEvant();
			this.initEventOnce = !this.initEventOnce;
		}
	}
	initEvant() {
		this.loginBtn.addEventListener("click", () => {
			this.initValidator();
		});
		this.topMenu.addEventListener("click", (e) => {
			this.showActiveMenuItem(e.target);
			let target = e.target.getAttribute("data-name");
			this.targetHandler(target);
		});
	};
	initComponent() {
		if (!this.isUserAutorized()) {
			//this.initEvant();
			this.showSelectedBlock(this.loginFormDiv);
		} else {
			//this.initEvant();
			this.showTopMenu();
			this.targetHandler();
		}
	};
	async initValidator() {
		if (this.validator.checkFields()) {
			let userData = {
				login: this.login.value,
				password: this.password.value
			};
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
				this.userPage.setUserIsAutorized();
				this.showTopMenu();
				this.targetHandler();
			} else {
				validatorModule.showMessage(["Введен неверный  логин или пароль!"]);
			}
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
				this.userPage.setUserData(this.login.value, this.password.value);
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
		this.gallery.clearForm();
		this.gallery.initGallery();
	}

}