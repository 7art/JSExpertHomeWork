class BaseGallery {
	constructor() {
		this.sortTypeByName = document.querySelector("#dropdown-name");
		this.sortTypeByDate = document.querySelector("#dropdown-date");
		this.addItemBtn = document.querySelector("#add-item-btn");
		this.mainDiv = document.getElementById("mainGallery");
		this.saveBtn = document.querySelector("#save-new-item");
		this.editBtn = document.querySelector("#save-edited-item");
		this.viewItemBtn = document.querySelector(".assignmentbtn");
		this.viewItemDiv = document.querySelector("#viewitem");
		this.formTitle = document.querySelector("#formtitle");
		this.galleryData = null;
		this.carsUrl = "http://localhost:3000/cars";
	}
	setToggleButton(array) {
		if (this.galleryData.length === array.length) {
			this.addItemBtn.setAttribute("disabled", "");
		} else {
			this.addItemBtn.removeAttribute("disabled");
		}
	};

	initGallery() {
		fetch(this.carsUrl).then(responce => responce.json())
			.then(data => {
				this.galleryData = utilite.prepareData(data);
				this.buildGallery(this.galleryData);
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
						<div class="btn-group">
							<!--<button type="button" class="btn btn-outline-secondary">View</button>-->
							<button type="button" class="btn btn-outline-secondary" id="editbtn" data-open-item="true" data-id="${item.id}">Edit</button>
						</div>
						<button href="#" class="btn btn-danger" data-remove-item="true" data-id="${item.id}">Удалить</button>
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

	sortingHandler(event) {
		event.preventDefault();
		event.currentTarget.querySelector("button").innerHTML = event.target.innerText;
		let sortType = event.target.getAttribute("data-type");
		if (sortType) {
			this.displayedGalleryItems = this.sortData(this.galleryData, sortType);
			this.buildGallery(this.displayedGalleryItems);
		}
	}
}

class ExtendedGallery extends BaseGallery {
	constructor() {
		super();
		this.name = document.getElementById('newname');
		this.description = document.getElementById('newdescript');
		this.imgUrl = document.getElementById('newimgurl');
		this.initEventOnce = true;
		if (this.initEventOnce) {
			console.log(this.initEventOnce);
			this.galleryEventHandlers();
			this.initEventOnce = !this.initEventOnce;
		}

	}
	galleryEventHandlers() {
		console.log("initEvantOnce");
		this.addItemBtn.addEventListener("click", (e) => {
			this.viewEmptyForm(e);
		});
		this.mainDiv.addEventListener("click", (e) => {
			if (e.target.getAttribute("data-open-item")) {
				this.viewItem(e);
			} else if (e.target.getAttribute("data-remove-item")) {
				this.removeItem(e);
			}
		});
		this.viewItemDiv.addEventListener("click", (e) => {
			let assignment = e.target.dataset.assignment;
			if (assignment == "save-new") {
				this.saveNewItem();
			} else if (assignment == "edit-item") {
				this.saveEditedItem(e);
			}
		});
		this.sortTypeByName.addEventListener("click", (e) => {
			this.sortingHandler(e);
		});
		this.sortTypeByDate.addEventListener("click", (e) => {
			this.sortingHandler(e);
		});
	};
	viewEmptyForm() {
		loginForm.showSelectedBlock(this.viewItemDiv);
		this.viewItemBtn.setAttribute("data-assignment", "save-new");
		this.formTitle.innerHTML = "Добавить новый элемент";
	};
	async saveNewItem() {
		let name = this.name.value;
		let description = this.description.value;
		let imgUrl = this.imgUrl.value;
		if (name && description && imgUrl) {
			await this.saveNewItemComp(name, description, imgUrl);
			loginForm.showSelectedBlock(loginForm.galleryDiv);
			this.clearForm();
			super.initGallery();
		} else {
			validatorModule.showMessage(["Все поля обязательны для заполнения!"]);
		}
	};
	async saveNewItemComp(name, description, imgUrl) {
		let newdate = new Date();
		let newItem = {
			url: imgUrl,
			name: name,
			description: description,
			date: newdate.getTime()
		}

		const response = await fetch(this.carsUrl, {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(newItem)
		});
		return response.json();
	};
	async removeItem(e) {
		const movedItemId = +e.target.getAttribute("data-id");
		const response = await fetch(`${this.carsUrl}/${movedItemId}`, {
			method: 'delete'
		});
		//const data = await response.json();
		if (response.status == "200") {
			return super.initGallery();
		}
	};
	async viewItemComp(e) {
		const editItemId = +e.target.getAttribute("data-id");
		const response = await fetch(this.carsUrl + "/" + editItemId);
		return response.json();
	};
	async viewItem(e) {
		const data = await this.viewItemComp(e);
		loginForm.showSelectedBlock(this.viewItemDiv);
		this.name.value = data.name;
		this.description.value = data.description;
		this.imgUrl.value = data.url;
		this.viewItemBtn.setAttribute("data-assignment", "edit-item");
		this.viewItemBtn.setAttribute("data-id", data.id);
		this.formTitle.innerHTML = "Редактировать элемент";
	};
	async saveEditedItemComp(e, name, description, imgUrl) {
		let editItem = {
			url: imgUrl,
			name: name,
			description: description
		}
		const editItemId = +e.target.getAttribute("data-id");
		const response = await fetch(this.carsUrl + "/" + editItemId, {
			method: 'PUT',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(editItem)
		});
		return response.json();
	};
	async saveEditedItem(e) {
		let name = this.name.value;
		let description = this.description.value;
		let imgUrl = this.imgUrl.value;
		if (name && description && imgUrl) {
			await this.saveEditedItemComp(e, name, description, imgUrl);
			//loginForm.showSelectedBlock(loginForm.galleryDiv);
			//this.clearForm();
			//super.initGallery();
			validatorModule.showMessage(["Изменения сохранены!"]);
		} else {
			return validatorModule.showMessage(["Все поля обязательны для заполнения!"]);
		}
	};

	clearForm() {
		this.name.value = "";
		this.description.value = "";
		this.imgUrl.value = "";
	}

}