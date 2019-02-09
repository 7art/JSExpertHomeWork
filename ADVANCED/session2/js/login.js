/* 
*  Схематическое изображение класса Логин формы
*/

let LoginForm = function (validatorModule, galleryModule) {	
	this.validator = validatorModule;
	this.gallery = galleryModule;
}

LoginForm.prototype = {

	initComponent : function (){
		// code
	},
	validateUserData : function (){
		this.validator.isValid();
	},

	showGallery: function(){
		this.gallery.init();
	}
}
