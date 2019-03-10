export default class Observer {
    constructor() {
        this.events = {};
    }

    subscribeEvent(name, func) {
        this.events[name] = func;
    }
    
    callEvent(name, arg) {
        if (this.events[name]) {
            this.events[name](arg);
        }
    }
}
