import {updateRoute} from './router.js'
//import {loadRoute} from './router.js'
window.addEventListener('load', updateRoute);
window.addEventListener('hashchange', updateRoute);

