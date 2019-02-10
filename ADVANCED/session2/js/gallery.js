/* 
*  Схематическое изображение класса Галереи
*/

let BaseGallery = function () {	
    // code
}

BaseGallery.prototype = {
	initComponent : function (){
		// code
	}
}


let ExtendedGallery = function() {
	BaseGallery.apply(this);
	this.property = {};
}
ExtendedGallery.prototype = {

	initListeners : function (){
		BaseGallery.prototype.initListeners.apply(this);
    },

    addImage: function (){
	    // новый метод которо нет у родителя
    }
}

// код функции наследования можно найти архиве, который содержится 
// в материалах к сессии 29 (практический пример)
//service.inheritance(BaseGallery, ExtendedGallery);