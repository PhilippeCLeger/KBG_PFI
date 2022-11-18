const baseURL = "http://localhost:5000"
const accountsAPI = new AccountsAPI(baseURL);
const userData = new UserData();
const loginDialog = new LoginDialog(
    $("#loginDlg"), $("#email_input"), $("#password_input"), $("#remember_input"), accountsAPI, userData);
const registerDialog = new RegisterDialog(
    $("#registerDlg"),$("#name_input"), $("#email_input"), $("#password_input"), accountsAPI);

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

