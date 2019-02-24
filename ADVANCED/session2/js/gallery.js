let BaseGallery = function () {

	this.sortTypeSelectbox = document.querySelector("#filter");
	this.addBtn = document.querySelector("#additem");
	this.mainDiv = document.getElementById("mainGallery");
	this.hiddenGalleryItems = [];
	this.displayedGalleryItems = [];
	this.sortType = "0";

	this.setToggleButton = function (array) {
		if (galleryData.length === array.length) {
			this.addBtn.setAttribute("disabled", "");
		} else {
			this.addBtn.removeAttribute("disabled");
		}
	}

	this.setSortType = function () {
		let sortTypeFromStorage = localStorage.getItem("sortType");

		if (sortTypeFromStorage) {
			this.sortType = sortTypeFromStorage;
		}
	}

	this.setStorageData = function () {
		localStorage.setItem("hData", JSON.stringify(this.hiddenGalleryItems));
		localStorage.setItem("sData", JSON.stringify(this.displayedGalleryItems));
		localStorage.setItem("sortType", this.sortType);
	}

	this.getStorageData = function () {
		let hDataFromStorage = JSON.parse(localStorage.getItem("hData"));
		let sDataFromStorage = JSON.parse(localStorage.getItem("sData"));
		this.hiddenGalleryItems = !hDataFromStorage ? utilite.prepareData(galleryData) : hDataFromStorage;
		if (sDataFromStorage) {
			this.displayedGalleryItems = sDataFromStorage;
			this.buildGallery(this.displayedGalleryItems);
		}
	}
}

BaseGallery.prototype = {
	initGallery: function () {
		this.getStorageData();
		this.setSortType();
	},
	buildGallery: function (array) {
		let resultHtml = "";
		array.forEach((item) => {
			resultHtml += `<div class="col-md-4">
			<div class="card mb-4 box-shadow">
				<img class="card-img-top" alt="${item.name}" src="${item.url}" data-holder-rendered="true"
					style="height: 225px; width: 100%; display: block;">
				<div class="card-body">
					<h5 class="card-title">${item.name}</h5>
					<p class="card-text">${item.description}</p>
					<div class="d-flex justify-content-between align-items-center">
						<div class="btn-group d-none">
							<button type="button" class="btn btn-outline-secondary">View</button>
							<button type="button" class="btn btn-outline-secondary">Edit</button>
						</div>
						<div href="#" class="btn btn-danger" data-id="${item.id}">Удалить</div>
						<small class="text-muted">${utilite.formatDate(item.date)}</small>
					</div>
				</div>
			</div>
		</div>`;
		});
		this.mainDiv.innerHTML = resultHtml;
	},
	sortData: function (data, value) {
		data = data.sort((a, b) => a.name.localeCompare(b.name));
		switch (+value) {
			case 1:
				return data.reverse();
			case 2:
				return data.sort((a, b) => Number(b.date) - Number(a.date));
			case 3:
				return data.sort((a, b) => Number(a.date) - Number(b.date));
			case 0:
			default:
				return data;
		}
	},
	
	sortItems: function (sortType) {
		this.sortType = sortType;
		this.displayedGalleryItems = this.sortData(this.displayedGalleryItems, sortType);
		console.log(this.displayedGalleryItems);
		this.buildGallery(this.displayedGalleryItems);
	}
}

let ExtendedGallery = function (galleryData) {
	BaseGallery.apply(this);	
}

ExtendedGallery.prototype = {
	addImage: function () {
		console.log("addImage");
		this.displayedGalleryItems = this.displayedGalleryItems.concat(
			this.hiddenGalleryItems.splice(0, 1)
		);
		this.setToggleButton(this.displayedGalleryItems);
		this.buildGallery(this.displayedGalleryItems);
	},
	removeImage: function (e) {
		const movedItemId = +e.target.getAttribute("data-id");
		if (movedItemId) {
			let movedItem = this.displayedGalleryItems.filter(item => {
				return item.id === movedItemId;
			});
			this.hiddenGalleryItems = this.hiddenGalleryItems.concat(movedItem);
			this.displayedGalleryItems = this.displayedGalleryItems.filter(item => {
				return item.id !== movedItemId;
			});
			this.setToggleButton(this.displayedGalleryItems);
			this.buildGallery(this.displayedGalleryItems);
		}
	}
}

const utilite = {
	cutString: function (str) {
		return str.length >= 50 ? str.substring(0, 50) : str;
	},
	addHttp: function (str) {
		return str.startsWith("http://") ? str : "http://" + str;
	},
	formatDate: function (date) {
		return moment(date).format("YYYY/MM/DD HH:mm");
	},
	prepareData: function (data) {
		return data.map(item => {
			return {
				url: utilite.addHttp(item.url),
				id: item.id,
				name: item.name,
				description: utilite.cutString(item.description),
				date: item.date
			};
		});
	},
	inheritance: function (parent, child) {
		let tempChild = child.prototype;
		child.prototype = Object.create(parent.prototype);
		child.prototype.constructor = child;
		for (let key in tempChild) {
			if (tempChild.hasOwnProperty(key)) {
				child.prototype[key] = tempChild[key];
			}
		}
	}
}

utilite.inheritance(BaseGallery, ExtendedGallery);