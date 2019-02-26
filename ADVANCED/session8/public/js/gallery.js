class BaseGallery {
	constructor() {
		this.sortTypeByName = document.querySelector("#dropdown-name");
		this.sortTypeByDate = document.querySelector("#dropdown-date");
		this.addBtn = document.querySelector("#additem");
		this.mainDiv = document.getElementById("mainGallery");
		this.saveBtn = document.querySelector("#save");
		this.editBtn = document.querySelector("#save");
		this.galleryData = null;
		this.carsUrl = "http://localhost:3000/cars";
	}
	setToggleButton(array) {
		if (this.galleryData.length === array.length) {
			this.addBtn.setAttribute("disabled", "");
		} else {
			this.addBtn.removeAttribute("disabled");
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
							<button type="button" class="btn btn-outline-secondary" id="editbtn" data-id="${item.id}">Edit</button>
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

	addItem() {
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
				.then(data => {
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
			fetch(this.carsUrl + "/" + movedItemId, {
					method: 'delete'
				}).then(responce => responce.json())
				.then(data => {
					super.initGallery();
				});
		}
	};
	editItem(e) {
		const editItemId = +e.target.getAttribute("data-id");	
		fetch(this.carsUrl + "/" + editItemId).then(responce => responce.json())
			.then(data => {
				console.log(data);
				this.name.value = data.name;
				this.description.value = data.description;
				this.imgUrl.value = data.url;
				loginForm.showSelectedBlock(loginForm.addItemDiv);				
			});		
	};
	clearForm() {
		this.name.value = "";
		this.description.value = "";
		this.imgUrl.value = "";
	}

}