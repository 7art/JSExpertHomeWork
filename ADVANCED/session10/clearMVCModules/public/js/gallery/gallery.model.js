export default class GalleryModel {
    constructor(utils) {
        this.utils = utils;
        this.carsUrl = "http://localhost:1337/cars";
        this.galleryData = null;
    }

    initGallery() {
        return fetch(this.carsUrl).then(responce => responce.json())
            .then(data => {               
                let galleryData = this.prepareData(data);                
                return galleryData;              
            });
    }
    prepareData(data) {
        return data.map(item => {
            return {
                url: this.utils.addHttp(item.url),
                id: item.id,
                name: this.utils.capitalize(item.name),
                description: this.utils.cutString(item.description),
                date: item.date
            };
        });
    }

    sortData(data, value) {
        //console.log(data);
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
    }



    formatDate(date) {
        return moment(date).format("YYYY/MM/DD HH:mm");
    }
    // getData() {
    //     return fetch(this.getUrl).then(responce => responce.json())
    //     .then(data => {
    //         console.log("Initial data is loaded");
    //         return data;
    //     })         
    // }

    // saveData(item) {         
    //     console.log("Saving item... " + item.name);
    //     let iphone = {
    //         "name": "Saved iPhone",
    //         "price": 12458,
    //         "popular": true,
    //         "date": 1467440203
    //     }
    //     return new Promise(
    //         function(resolve, reject) {            
    //             resolve(iphone);          
    //         }
    //     );
    // }

    // updateData(counter) {
    //     console.log("Updating item... " + counter);
    //     let samsung = {
    //         "name": "Saved Samsung",
    //         "price": 12458,
    //         "popular": true,
    //         "date": 1467440203
    //     }
    //     return Promise.resolve(samsung);
    // }



}