const baseURL = "http://localhost:5000"
const accountsAPI = new AccountsAPI(baseURL);
const userData = new UserData();
const loginDialog = new LoginDialog(
    $("#loginDlg"), $("#loginDlg #email_input"), $("#loginDlg #password_input"), $("#loginDlg #remember_input"), accountsAPI, userData);
const registerDialog = new RegisterDialog(
    $("#registerDlg"),$("#registerDlg #name_input"), $("#registerDlg #email_input"), $("#registerDlg #password_input"), accountsAPI);

const btnLogin = $("#btnLogin");
const btnRegister = $("#btnSignup");
const btnProfile = $("#btnProfile");


btnLogin.click((e) => {
    e.preventDefault();
    loginDialog.show();
})

btnRegister.click((e) => {
    e.preventDefault();
    registerDialog.show();
});