class BaseGallery {
	constructor() {
		this.sortTypeByName = document.querySelector("#dropdown-name");
		this.sortTypeByDate = document.querySelector("#dropdown-date");
		this.addItemBtn = document.querySelector("#add-item-btn");
		this.mainDiv = document.getElementById("mainGallery");
		this.saveBtn = document.querySelector("#save-new-item");
		this.editBtn = document.querySelector("#save-edited-item");
		this.viewItemBtn = document.querySelector(".assignmentbtn");
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
	}
	viewEmptyForm() {
		loginForm.showSelectedBlock(loginForm.viewItemDiv);
		this.viewItemBtn.setAttribute("data-assignment", "save-new");		
		this.formTitle.innerHTML = "Добавить новый элемент";
	};
	saveNewItem() {
		let name = this.name.value;
		let description = this.description.value;
		let imgUrl = this.imgUrl.value;

		if (name && description && imgUrl) {
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
				.then(() => {
					loginForm.showSelectedBlock(loginForm.galleryDiv);
					this.clearForm();
					super.initGallery();
				});
		} else {
			validatorModule.showMessage(["Все поля обязательны для заполнения!"]);
		}
	};
	removeItem(e) {
		const movedItemId = +e.target.getAttribute("data-id");
		if (movedItemId) {
			fetch(`${this.carsUrl}/${movedItemId}`, {
					method: 'delete'
				}).then(responce => responce.json())
				.then(() => {
					super.initGallery();
				});
		}
	};
	viewItem(e) {
		const editItemId = +e.target.getAttribute("data-id");
		fetch(this.carsUrl + "/" + editItemId).then(responce => responce.json())
			.then(data => {
				loginForm.showSelectedBlock(loginForm.viewItemDiv);
				this.name.value = data.name;
				this.description.value = data.description;
				this.imgUrl.value = data.url;
				this.viewItemBtn.setAttribute("data-assignment", "edit-item");
				this.viewItemBtn.setAttribute("data-id", data.id);
				this.formTitle.innerHTML = "Редактировать элемент";
			});
	};
	saveEditedItem(e) {
		let name = this.name.value;
		let description = this.description.value;
		let imgUrl = this.imgUrl.value;
		if (name && description && imgUrl) {
			let editItem = {
				url: imgUrl,
				name: name,
				description: description
			}
			const editItemId = +e.target.getAttribute("data-id");
			fetch(this.carsUrl + "/" + editItemId, {
					method: 'PUT',
					headers: {
						'Accept': 'application/json',
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(editItem)
				}).then(responce => responce.json())
				.then(() => {
					loginForm.showSelectedBlock(loginForm.galleryDiv);
					this.clearForm();
					super.initGallery();
					validatorModule.showMessage(["Изменения сохранены!"]);
				});
		} else {
			validatorModule.showMessage(["Все поля обязательны для заполнения!"]);
		}
	};
	clearForm() {
		this.name.value = "";
		this.description.value = "";
		this.imgUrl.value = "";
	}

}