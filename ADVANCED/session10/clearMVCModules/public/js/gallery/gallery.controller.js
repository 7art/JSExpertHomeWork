export default class GalleryController {
    constructor(model, view, observer, utils) {
        this.model = model;
        this.view = view;
        this.observer = observer;
        this.utils = utils;
        this.init();
    }

    bindEvents() {
        this.view.addItemBtn.addEventListener("click", (e) => {
            this.utils.showView(this.view.edit);
            this.utils.hideAllView([this.view.main]);
            this.view.viewEmptyForm(e);
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
        this.view.buildGallery(this.model.sortData(this.model.galleryData, sortType));
    }
    // sortingHandler(event) {
    //     event.preventDefault();
    //     event.currentTarget.querySelector("button").innerHTML = event.target.innerText;
    //     let sortType = event.target.getAttribute("data-type");
    //     if (sortType) {
    //         let sortedGalleryItems = this.model.sortData(this.model.galleryData, sortType);
    //         this.view.buildGallery(sortedGalleryItems);
    //     }
    // }
    async saveNewItem() {
        let name = this.view.name.value;
        let description = this.view.description.value;
        let imgUrl = this.view.imgUrl.value;
        if (name && description && imgUrl) {
            await this.saveNewItemComp(name, description, imgUrl);
            // loginForm.showSelectedBlock(loginForm.galleryDiv);
            this.utils.showView(this.view.main);
            this.utils.hideAllView([this.view.edit]);
            this.view.clearForm();
            this.gallery(); // this.view.buildGallery(this.model.galleryData);
        } else {
            this.utils.showMessage(["Все поля обязательны для заполнения!"]);
        }
    }
    async saveNewItemComp(name, description, imgUrl) {
        let newdate = new Date();
        let newItem = {
            url: imgUrl,
            name: name,
            description: description,
            date: newdate.getTime()
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
            return this.gallery(); //this.view.buildGallery(this.model.galleryData);
        }
    }
    async viewItemComp(e) {
        const editItemId = +e.target.getAttribute("data-id");
        const response = await fetch(`${this.model.carsUrl}/${editItemId}`);
        return response.json();
    }
    async viewItem(e) {
        const data = await this.viewItemComp(e);
        // loginForm.showSelectedBlock(this.viewItemDiv);
        this.utils.showView(this.view.edit);
        this.utils.hideAllView([this.view.main]);
        this.view.name.value = data.name;
        this.view.description.value = data.description;
        this.view.imgUrl.value = data.url;
        this.view.viewItemBtn.setAttribute("data-assignment", "edit-item");
        this.view.viewItemBtn.setAttribute("data-id", data.id);
        this.view.formTitle.innerHTML = "Редактировать элемент";
    }
    async saveEditedItemComp(e, name, description, imgUrl) {
        let editItem = {
            url: imgUrl,
            name: name,
            description: description
        }
        const editItemId = +e.target.getAttribute("data-id");
        const response = await fetch(`${this.model.carsUrl}/${editItemId}`, {
            method: 'PUT',
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
        if (name && description && imgUrl) {
            await this.saveEditedItemComp(e, name, description, imgUrl);
            //loginForm.showSelectedBlock(loginForm.galleryDiv);
            //this.clearForm();
            //this.initGallery();
            this.gallery();
            this.utils.showView(this.view.main);
            this.utils.hideAllView([this.view.edit]);
            this.utils.showMessage(["Изменения сохранены!"]);
        } else {
            return this.utils.showMessage(["Все поля обязательны для заполнения!"]);
        }
    }
    gallery() {
        this.model.initGallery().then((data) => {
            //console.log(data);
            this.view.buildGallery(data);
            this.model.galleryData = data;
        });
    }

    init() {
        this.bindEvents();
        this.gallery();
        //this.view.buildGallery();
        //this.view.buildGallery(this.model.initGallery());
    }
    // bindEvents() {
    //     this.view.DOMElements.saveBtn.addEventListener("click", () => {
    //         let item = this.view.getItemToSave();
    //         this.model.saveData(item).then(data => this.view.setSavedData(data));
    //     });
    //     this.view.DOMElements.refreshBtn.addEventListener("click", () => {
    //         let count = this.view.counter++;
    //         this.observer.callEvent("update", count);
    //     });
    // }

    // bindSubscribers() {
    //     this.observer.subscribeEvent("update", (count) => {
    //         this.model.updateData(count).then((data) => {
    //             this.view.setUpdatedData(data);
    //         });    
    //     });     
    // }  

    // init() {
    //     this.model.getData().then((data) => {
    //         this.view.init(data)
    //         this.bindSubscribers();
    //         this.bindEvents();
    //     });    
    // }

}