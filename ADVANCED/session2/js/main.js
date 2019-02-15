"use strict"
const inpEmail = document.querySelector("#inputEmail");
const inpPassword = document.querySelector("#inputPassword");

let validatorModule = new Validator();
let userPageModule = new UserPage();
//let galleryModule = new BaseGallery(galleryData);
let galleryModule = new ExtendedGallery(galleryData);

let loginForm = new LoginForm(validatorModule, galleryModule, userPageModule, userData);

loginForm.initComponent();