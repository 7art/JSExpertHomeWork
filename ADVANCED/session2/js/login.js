let LoginForm = function (validatorModule, galleryModule) {
	this.validator = validatorModule;
	this.gallery = galleryModule;
}

LoginForm.prototype = {

	initComponent: function () {
		if (!this.validator.getUserIsAutorized()) {
			this.validator.loginEvant();
		}else{
			this.validator.showHideBlock(this.validator.content, this.validator.loginForm);			
			this.validator.exitEvent();
		}
	},
	validateUserData: function () {
		this.validator.isValid();
	},

	showGallery: function () {
		this.gallery.init();
	}
}