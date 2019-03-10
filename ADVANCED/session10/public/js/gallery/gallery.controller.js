export default class GalleryController {
    constructor(model, view) {
        this.model = model;
        this.view = view;       
        // this.utils = utils;
        this.init();
    }

    bindEvents() {
        this.view.addItemBtn.addEventListener("click", () => {
           
           // $(".modal-edit-item").modal("show");
            let convDateTime = new Date();
            convDateTime = this.model.convertDateToUTC(convDateTime);
            this.view.viewEmptyForm(convDateTime);
        });
        this.view.mainDiv.addEventListener("click", (e) => {
            if (e.target.getAttribute("data-open-item")) {
                
                this.viewItem(e);
            } else if (e.target.getAttribute("data-remove-item")) {
                this.removeItem(e);
            }
        });
        this.view.viewItemDiv.addEventListener("click", (e) => {
            let assignment = e.target.dataset.assignment;
            if (assignment == "save-new") {
                this.saveNewItem();
            } else if (assignment == "edit-item") {
                this.saveEditedItem(e);
            }
        });
        this.view.sortTypeByName.addEventListener("click", (e) => {
            this.sortingHandler(e);
        });
        this.view.sortTypeByDate.addEventListener("click", (e) => {
            this.sortingHandler(e);
        });
    }
    sortingHandler(e) {
        let sortType = this.view.getSortingType(e);
        if (sortType) {
            let sortedItems = this.model.sortData(this.model.galleryData, sortType);
            this.model.galleryData = sortedItems;
            sortedItems = this.model.prepareData(sortedItems);
            this.view.buildGallery(sortedItems);
        }
    }
    async saveNewItem() {
        let name = this.view.name.value;
        let description = this.view.description.value;
        let imgUrl = this.view.imgUrl.value;
        let dateTime = this.view.dateTime.value;
        if (name && description && imgUrl) {
            await this.saveNewItemComp(name, description, imgUrl, dateTime);
            this.view.clearForm();
            this.showGallery();
        } else {
            this.model.utils.showMessage(["Все поля обязательны для заполнения!"]);
        }
    }
    async saveNewItemComp(name, description, imgUrl, dateTime) {
        let newdate = dateTime ? this.model.utils.formatDateMilisec(dateTime) : new Date().getTime();
        let newItem = {
            url: imgUrl,
            name: name,
            description: description,
            date: newdate
        }

        const response = await fetch(this.model.carsUrl, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newItem)
        });
        return response.json();
    }
    async removeItem(e) {
        const movedItemId = +e.target.getAttribute("data-id");
        const response = await fetch(`${this.model.carsUrl}/${movedItemId}`, {
            method: 'delete'
        });
        //const data = await response.json();
        if (response.status == "200") {
            return this.showGallery();
        }
    }
    async viewItemComp(e) {
        const editItemId = +e.target.getAttribute("data-id");
        const response = await fetch(`${this.model.carsUrl}/${editItemId}`);
        return response.json();
    }
    async viewItem(e) {
        const data = await this.viewItemComp(e);
        this.view.clearForm();        
        let convDateTime = this.model.convertDateToUTC(data.date);
        this.view.viewCompletedForm(data, convDateTime);

    }
    async saveEditedItemComp(e, name, description, imgUrl, dateTime) {
        let editItem = {
            url: imgUrl,
            name: name,
            description: description,
            date: this.model.utils.formatDateMilisec(dateTime)
        }

        const editItemId = +e.target.getAttribute("data-id");
        const response = await fetch(`${this.model.carsUrl}/${editItemId}`, {
            method: 'PATCH', //PUT
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(editItem)
        });
        return response.json();
    }
    async saveEditedItem(e) {
        let name = this.view.name.value;
        let description = this.view.description.value;
        let imgUrl = this.view.imgUrl.value;
        let dateTime = this.view.dateTime.value;
        if (name && description && imgUrl) {
            await this.saveEditedItemComp(e, name, description, imgUrl, dateTime);
            this.showGallery();
            this.model.utils.showMessage(["Изменения сохранены!"]);
        } else {
            return this.model.utils.showMessage(["Все поля обязательны для заполнения!"]);
        }
    }
    showGallery() {
        this.model.initGalleryData().then((data) => {
            this.model.galleryData = data;
            data = this.model.prepareData(data);
            this.view.buildGallery(data);

        });
    }

    init() {
        this.bindEvents();
        this.showGallery();
    }    
}