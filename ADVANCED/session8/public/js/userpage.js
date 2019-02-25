class UserPage {
	constructor() {
		this.outEmail = document.querySelector("#outEmail");
		this.outPassword = document.querySelector("#outPassword");
		this.hidePass = document.querySelector(".fa");
	}

	showHidePassword() {
		if (this.outPassword.type === "text") {
			this.outPassword.type = "password";
			utilite.switchCssClass(this.hidePass, "fa-eye", "fa-eye-slash");
		} else {
			this.outPassword.type = "text";
			utilite.switchCssClass(this.hidePass, "fa-eye-slash", "fa-eye");
		}
	};
	setUserIsAutorized() {
		let date = new Date().getTime();
		localStorage.setItem("autorizedID", date);
	};
	setUserData({
		login,
		password
	}) {
		this.outEmail.value = login;
		this.outPassword.value = password;
	};
	clearFields() {
		this.outEmail.value = inputEmail.value = "";
		this.outPassword.value = inputPassword.value = "";
	};
}

const utilite = {
	cutString: function (str) {
		return str.length >= 50 ? str.substring(0, 50) : str;
	},
	addHttp: function (str) {
		return str.startsWith("http://") ? str : "http://" + str;
	},
	formatDate: function (date) {
		return moment(date).format("YYYY/MM/DD HH:mm");
	},
	prepareData: function (data) {
		return data.map(item => {
			return {
				url: utilite.addHttp(item.url),
				id: item.id,
				name: item.name,
				description: utilite.cutString(item.description),
				date: item.date
			};
		});
	},	
	switchCssClass: function (node, removeClass, addClass) {
		node.classList.remove(removeClass);
		node.classList.add(addClass);
	}

}
