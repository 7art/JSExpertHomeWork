export default class Utils {

    static showView(showEl) {
        showEl.classList.add("show");
    }
    static hideAllView(viewsEl) {
        viewsEl.forEach(element => {
            element.classList.remove("show");
        });
    }
    static cutString(str) {
        return str.length >= 50 ? str.substring(0, 50) : str;
    }
    static addHttp(str) {
        const regtpl = /^ht\w{2,4}:\/\//;
        return regtpl.test(str) ? str : "http://" + str;
    }
    static formatDate(date) {
        return moment(date).format("DD.MM.YYYY HH:mm");
    }
    static formatDateUTC(date) {
        return moment(date).format();
    }
    static formatDateMilisec(date) {
        return moment(date).toDate().getTime();
    }
    static capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    }
    static showMessage(arr) {
        const alerts = document.querySelector(".alerts");
        let text = "";
        arr.forEach((item) => {
            text += `<p class="text-left">${item}</p><hr>`;
        });
        alerts.innerHTML = text;
        $(".bd-modal-sm").modal("show");
    }

    static switchCssClass(node, removeClass, addClass) {
        node.classList.remove(removeClass);
        node.classList.add(addClass);
    }

    static isUserAutorized() {
        return !!localStorage.getItem("autorizedID");
    }
    static showTopMenu(topMenu, activeItem) {
        topMenu.classList.remove('d-none');

        let elems = topMenu.querySelectorAll(".btn");
        [].forEach.call(elems, function (el) {
            el.classList.remove("active");
        });
        topMenu.querySelector(activeItem).classList.add('active');
    }
    static hideTopMenu(topMenu) {
        topMenu.classList.add('d-none');
    }
    static navigateTo(routeName) {
        window.location.hash = "#" + routeName;
    }

}