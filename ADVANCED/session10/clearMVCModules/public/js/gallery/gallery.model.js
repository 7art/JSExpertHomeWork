export default class GalleryModel {
    constructor(utils) {
        this.utils = utils;
        this.carsUrl = "http://localhost:1337/cars";
        this.galleryData = null;
    }

    initGalleryData() {
        return fetch(this.carsUrl).then(responce => responce.json())
            .then(data => {
                return data;
            });
    }
    prepareData(data) {
        return data.map(item => {
            return {
                url: this.utils.addHttp(item.url),
                id: item.id,
                name: this.utils.capitalize(item.name),
                description: this.utils.cutString(item.description),
                date: this.utils.formatDate(item.date)
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
    convertDateToUTC(date){
        let convDateTime = this.utils.formatDateUTC(date);
        return convDateTime.substr(0,16);
    }
}