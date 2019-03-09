export default class GalleryView {
    constructor() {
        this.sortTypeByName = document.querySelector("#dropdown-name");
        this.sortTypeByDate = document.querySelector("#dropdown-date");
        this.addItemBtn = document.querySelector("#add-item-btn");
        this.mainDiv = document.getElementById("mainGallery");
        this.saveBtn = document.querySelector("#save-new-item");
        this.editBtn = document.querySelector("#save-edited-item");
        this.viewItemBtn = document.querySelector(".assignmentbtn");
        this.viewItemDiv = document.querySelector("#edit-item-view");
        this.formTitle = document.querySelector("#formtitle");
        this.topMenu = document.querySelector("#topmenu");
        this.galleryData = null;
        this.name = document.getElementById('newname');
        this.description = document.getElementById('newdescript');
        this.imgUrl = document.getElementById('newimgurl');
        

        this.main = document.querySelector("#gallery-view");
        this.edit = document.querySelector("#edit-item-view");
        // this.initEventOnce = true;
        // if (this.initEventOnce) {
        //     console.log(this.initEventOnce);
        //     this.galleryEventHandlers();
        //     this.initEventOnce = !this.initEventOnce;
        // }

    }

    getSortingType(event) {
        event.preventDefault();
        event.currentTarget.querySelector("button").innerHTML = event.target.innerText;
        return event.target.getAttribute("data-type");
    }

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
						<small class="text-muted">${item.date}</small>
					</div>
				</div>
			</div>
		</div>`;
        });
        this.mainDiv.innerHTML = resultHtml;
    };

    viewEmptyForm() {
        this.clearForm();
        this.viewItemBtn.setAttribute("data-assignment", "save-new");
        this.formTitle.innerHTML = "Добавить новый элемент";
    };

    clearForm() {
        this.name.value = "";
        this.description.value = "";
        this.imgUrl.value = "";
    }
}