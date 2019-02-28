// const inpEmail = document.querySelector("#inputEmail");
// const inpPassword = document.querySelector("#inputPassword");
// let userData = {
//     login: "admin@site.com",
//     password: "admin12345"
// }
let validatorModule = new Validator();
let userPageModule = new UserPage();
//let galleryModule = new BaseGallery(galleryData);
let galleryModule = new ExtendedGallery();

let loginForm = new LoginForm(validatorModule, galleryModule, userPageModule);

loginForm.initComponent();