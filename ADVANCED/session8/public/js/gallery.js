class BaseGallery {
	constructor() {
		//this.sortTypeSelectbox = document.querySelector("#filter");
		this.sortTypeByName = document.querySelector("#dropdown-name");
		this.sortTypeByDate = document.querySelector("#dropdown-date");
		this.addBtn = document.querySelector("#additem");
		this.mainDiv = document.getElementById("mainGallery");
		this.saveBtn = document.querySelector("#save");
		//	this.hiddenGalleryItems = [];
		//	this.displayedGalleryItems = [];
		this.galleryData = null;
		//	this.sortType = "0";
		this.carsUrl = "http://localhost:3000/cars";
	}
	setToggleButton(array) {
		if (this.galleryData.length === array.length) {
			this.addBtn.setAttribute("disabled", "");
		} else {
			this.addBtn.removeAttribute("disabled");
		}
	};
	setSortType() {
		let sortTypeFromStorage = localStorage.getItem("sortType");
		if (sortTypeFromStorage) {
			this.sortType = sortTypeFromStorage;
		}
	};
	setStorageData() {
		localStorage.setItem("hData", JSON.stringify(this.hiddenGalleryItems));
		localStorage.setItem("sData", JSON.stringify(this.displayedGalleryItems));
		localStorage.setItem("sortType", this.sortType);
	};
	getStorageData(galleryData) {
		//	console.log(galleryData);
		// let hDataFromStorage = JSON.parse(localStorage.getItem("hData"));
		// let sDataFromStorage = JSON.parse(localStorage.getItem("sData"));
		// this.hiddenGalleryItems = !hDataFromStorage ? utilite.prepareData(galleryData) : hDataFromStorage;
		// if (sDataFromStorage) {
		// 	this.displayedGalleryItems = sDataFromStorage;
		// 	this.buildGallery(this.displayedGalleryItems);
		// }

	};
	initGallery() {
		fetch(this.carsUrl).then(responce => responce.json())
			.then(data => {
				this.galleryData = data;
				//this.getStorageData(this.galleryData);
				this.buildGallery(utilite.prepareData(this.galleryData));
				this.setSortType();
			});

	};

	buildGallery(array) {
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
						<div class="btn-group" id="btnview">
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
	};
	sortData(data, value) {

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
	};

	applySortingMethod(sortType) {
		console.log(sortType);
		this.sortType = sortType;
		this.displayedGalleryItems = this.sortData(this.displayedGalleryItems, sortType);
		this.buildGallery(this.displayedGalleryItems);
	}

	sortingHandler(event) {
		event.preventDefault();
		event.currentTarget.querySelector("button").innerHTML = event.target.innerText;
		let sortType = event.target.getAttribute("data-type");
		if (sortType) {
			//this.sortType = sortType;
			this.displayedGalleryItems = this.sortData(utilite.prepareData(this.galleryData), sortType);
			this.buildGallery(this.displayedGalleryItems);
		}
	}


}

class ExtendedGallery extends BaseGallery {
	constructor() {
		super();
	}

	addImage() {
		let name = document.getElementById('newname').value;
		let description = document.getElementById('newdescript').value;
		let imgUrl = document.getElementById('newimgurl').value;
		let newdate = new Date();
		let newItem = {
			url: imgUrl,
			name: name,
			description: description,
			date: newdate.getTime()
		}
		fetch(this.carsUrl, {
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(newItem)
			}).then(responce => responce.json())
			.then(data => {
				loginForm.showSelectedBlock(loginForm.galleryDiv);
				super.initGallery();
			});
	};
	removeImage(e) {
		const movedItemId = +e.target.getAttribute("data-id");
		if (movedItemId) {
			// let movedItem = this.displayedGalleryItems.filter(item => {
			// 	return item.id === movedItemId;
			// });
			// this.hiddenGalleryItems = this.hiddenGalleryItems.concat(movedItem);
			// this.displayedGalleryItems = this.displayedGalleryItems.filter(item => {
			// 	return item.id !== movedItemId;
			// });var myHeaders = new Headers();
			fetch(this.carsUrl + "/" + movedItemId, {
					method: 'delete'
				}).then(responce => responce.json())
				.then(data => {
					super.initGallery();
				});
		}
	}

}