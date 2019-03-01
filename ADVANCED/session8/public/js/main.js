let validatorModule = new Validator();
let userPageModule = new UserPage();

let galleryModule = new ExtendedGallery();

let loginForm = new LoginForm(validatorModule, galleryModule, userPageModule);

loginForm.initComponent();