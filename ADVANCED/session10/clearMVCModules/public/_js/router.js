import utils from './utils.js';
import Observer from './gallery/observer.js';
import GalleryController from './gallery/gallery.controller.js';
import GalleryModel from './gallery/gallery.model.js';
import GalleryView from './gallery/gallery.view.js';

import LoginController from './login/login.controller.js';
import LoginModel from './login/login.model.js';
import LoginView from './login/login.view.js';

let main = document.querySelector("#main-view");
let info = document.querySelector("#info-view");
let login = document.querySelector("#login-view");
let activatedRoutes = {};

let routeConfig = {
    "" : {
        show : () => {
            utils.showView(login);
            utils.hideAllView([main, info]);
        },
        init : () => {
            let model = new LoginModel;
            let view = new LoginView;
            new LoginController(model, view)
        }
    },
    "gallery" : {
        show : () => {
            utils.showView(main);
            utils.hideAllView([login, info]);
            console.log("Main route is loaded")
        },
        init : () => {
            let observer = new Observer;
            let model = new GalleryModel;
            let view = new GalleryView;
            new GalleryController(model, view, observer)
        }
    },
    "info" : {
        show : () => {
            utils.showView(info);
            utils.hideAllView([main, login]);
            console.log("Info route is loaded")
        },
        init : () => {
            //implement Controller, View and Model for this Route
        }
    }
}

export function updateRoute() {
    let routeName = document.location.hash.replace(/^#/, '');
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
