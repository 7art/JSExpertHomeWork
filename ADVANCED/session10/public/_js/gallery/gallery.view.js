export default class GalleryView {        
    constructor() {
        this.DOMElements = {
            saveBtn     : document.querySelector("#saveBtn"),
            refreshBtn  : document.querySelector("#refreshBtn")
        };
        
        this.counter = 0;
    }
    init (items) {
        this.items = items;
        this.buildView();
    }
    
    buildView () {
        console.log("View is ready");
        console.log(this.items);
    }

    getItemToSave (){
        let item = this.items[0];
        item.name = "iPhone";
        return item;
    }

    setSavedData (data) {
        console.log("View item is successfully saved!");
        console.table(data);
    }

    setUpdatedData (data) {
        console.log("View item is successfully updated!");
        console.table(data);
    }
}

