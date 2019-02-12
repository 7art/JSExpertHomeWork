/* 
 *  Схематическое изображение класса Галереи
 */

let BaseGallery = function (galleryData) {

	//   sortTypeSelectbox = document.getElementById("sort-type")	
	this.mainDiv = document.getElementById("mainGallery");
	//let hiddenGalleryItems = [];

	this.cutString = function (str) {
		return str.length >= 50 ? str.substring(0, 50) : str;
	}

	this.addHttp = function (str) {
		return str.startsWith("http://") ? str : "http://" + str;
	}

	this.formatDate = function (date) {
		return moment(date).format("YYYY/MM/DD HH:mm");
	}

	this.prepareData = function (data) {
		return data.map(item => {
			return {
				url: this.addHttp(item.url),
				id: item.id,
				name: item.name,
				description: this.cutString(item.description),
				date: item.date
			};
		});
	}

	this.displayedGalleryItems = this.prepareData(galleryData);
}

BaseGallery.prototype = {
	initGallery: function () {
		this.buildGallery(this.prepareData(this.displayedGalleryItems));
		this.deleteItemEvant();
	},
	buildGallery: function (array) {
		let resultHtml = "";
		array.forEach(item => {
			resultHtml += `<div class="col-md-4">
			<div class="card mb-4 box-shadow">
				<img class="card-img-top" alt="${item.name}" src="${item.url}" data-holder-rendered="true"
					style="height: 225px; width: 100%; display: block;">
				<div class="card-body">
					<h5 class="card-title">${item.name}</h5>
					<p class="card-text">${item.description}</p>
					<div class="d-flex justify-content-between align-items-center">
						<div class="btn-group">
							<button type="button" class="btn btn-outline-secondary">View</button>
							<button type="button" class="btn btn-outline-secondary">Edit</button>
						</div>
						<div href="#" class="btn btn-danger" data-id="${item.id}">Удалить</div>
						<small class="text-muted">${this.formatDate(item.date)}</small>
					</div>
				</div>
			</div>
		</div>`;
		});
		this.mainDiv.innerHTML = resultHtml;
	},
	deleteItemEvant: function () {
		this.mainDiv.addEventListener("click", (e) => {
			this.removeOneItem(e);
		});
	},
	removeOneItem: function (e) {
		const movedItemId = +e.target.getAttribute("data-id");
		if (movedItemId) {
			//   let movedItem = displayedGalleryItems.filter(item => {
			// 	return item.id === movedItemId;
			//   });
			// hiddenGalleryItems = hiddenGalleryItems.concat(movedItem);
			this.displayedGalleryItems = this.displayedGalleryItems.filter(item => {
				return item.id !== movedItemId;
			});
			//  setToggleButton(displayedGalleryItems);
			//  buildGallery(displayedGalleryItems);
			this.buildGallery(this.displayedGalleryItems);
		}
	}

}


let ExtendedGallery = function () {
	BaseGallery.apply(this);
	this.property = {};
}
ExtendedGallery.prototype = {

	initListeners: function () {
		BaseGallery.prototype.initListeners.apply(this);
	},

	addImage: function () {
		// новый метод которо нет у родителя
	}
}

// код функции наследования можно найти архиве, который содержится 
// в материалах к сессии 29 (практический пример)
//service.inheritance(BaseGallery, ExtendedGallery);