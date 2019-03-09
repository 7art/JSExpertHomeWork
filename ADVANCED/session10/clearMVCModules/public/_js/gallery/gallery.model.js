export default class GalleryModel {
    constructor() {
        this.getUrl = 'https://gist.githubusercontent.com/dreemius/43cdd564d20ddfe27ba4741153c14b00/raw/2dd6313ea3e74672d9d670646a816644188b6351/phones.json';
    }

    getData() {
        return fetch(this.getUrl).then(responce => responce.json())
        .then(data => {
            console.log("Initial data is loaded");
            return data;
        })         
    }
    
    saveData(item) {         
        console.log("Saving item... " + item.name);
        let iphone = {
            "name": "Saved iPhone",
            "price": 12458,
            "popular": true,
            "date": 1467440203
        }
        return new Promise(
            function(resolve, reject) {            
                resolve(iphone);          
            }
        );
    }
    
    updateData(counter) {
        console.log("Updating item... " + counter);
        let samsung = {
            "name": "Saved Samsung",
            "price": 12458,
            "popular": true,
            "date": 1467440203
        }
        return Promise.resolve(samsung);
    }

}
