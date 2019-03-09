import utils from './utils.js';
import Observer from './gallery/observer.js';
import GalleryController from './gallery/gallery.controller.js';
import GalleryModel from './gallery/gallery.model.js';
import GalleryView from './gallery/gallery.view.js';

import LoginController from './login/login.controller.js';
import LoginModel from './login/login.model.js';
import LoginView from './login/login.view.js';

import InfoController from './info/info.controller.js';
import InfoModel from './info/info.model.js';
import InfoView from './info/info.view.js';
import Utils from './utils.js';

let main = document.querySelector("#gallery-view");
let info = document.querySelector("#info-view");
let login = document.querySelector("#login-view");
let edit = document.querySelector("#edit-item-view");
let topMenu = document.querySelector("#topmenu");
let activatedRoutes = {};

let routeConfig = {
    "": {
        show: () => {
            utils.showView(login);
            utils.hideAllView([main, info, edit]);
            utils.hideTopMenu(topMenu); 
        },
        init: () => {
            let model = new LoginModel;
            let view = new LoginView;
            new LoginController(model, view, utils)
        }
    },
    "gallery": {
        show: () => {
            utils.showView(main);
            utils.hideAllView([login, info, edit]);   
            utils.showTopMenu(topMenu, 'a[data-name=gallery]');
           // utils.addClassActive(topMenu, 'a[data-name=gallery]');         
        },
        init: () => {
            let observer = new Observer;
            let model = new GalleryModel(utils);
            let view = new GalleryView;
            new GalleryController(model, view, observer, utils);
        }
    },
    "info": {
        show: () => {
            utils.showView(info);
            utils.hideAllView([main, login, edit]); 
            utils.showTopMenu(topMenu, 'a[data-name=aboutuser]');  
           // utils.addClassActive(topMenu, 'a[data-name=aboutuser]');         
        },
        init: () => {
            let model = new InfoModel;
            let view = new InfoView(utils);
            new InfoController(model, view);
            //implement Controller, View and Model for this Route
        }
    }
}

export function updateRoute() {   
    let routeName = '';
    if (utils.isUserAutorized()) {
       // utils.showTopMenu(topMenu);
        routeName = document.location.hash.replace(/^#/, '');
    }
    if (activatedRoutes[routeName]) {        
        activatedRoutes[routeName]();
    } else {
        let route = routeConfig[routeName];
        if (route) {
            route.init();
            route.show();
            activatedRoutes[routeName] = route.show;
        }

    }
}
// export function loadRoute() {

//     let routeName = '';

//     if (utils.isUserAutorized()) {
//         console.log("isUserAutorized");
//         routeName = 'gallery';
//     } 

//     // if (activatedRoutes[routeName]) {
//     //     activatedRoutes[routeName]();
//     // } //else {
//     let route = routeConfig[routeName];
//     if (route) {
//         route.init();
//         route.show();
//         activatedRoutes[routeName] = route.show;
//     }
//     // }
// }
//console.log(activatedRoutes);