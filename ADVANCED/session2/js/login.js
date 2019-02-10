let LoginForm = function (validatorModule, galleryModule) {
	this.validator = validatorModule;
	this.galleryDiv = validatorModule.galleryDiv;
	this.loginForm = validatorModule.loginForm;
	this.gallery = galleryModule;
}

LoginForm.prototype = {

	initComponent: function () {
		if (!this.validator.getUserIsAutorized()) {
			this.validator.loginEvant();
		}else{
			this.validator.showHideBlock(this.galleryDiv, this.loginForm);			
			this.validator.exitEvent();
		}
	},
	setUserTopMenu: function () {
		//this.validator.isValid();
		this.topMenu = document.querySelector(".nav-pills");
		this.topMenu.addEventListener("click", (e) => {
           console.log(e);
        });
	},

	showGallery: function () {
		this.gallery.init();
	}
}