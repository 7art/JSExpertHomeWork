export default class Utils {

    static showView(showEl) {
        showEl.classList.add("show");
    }

    static hideAllView(viewsEl) {
        viewsEl.forEach(element => {
            element.classList.remove("show");
        });
    }

}
