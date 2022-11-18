const baseURL = "http://localhost:5000"
const accountsAPI = new AccountsAPI(baseURL);
const UserData = new UserData();
const loginDialog = new LoginDialog(
    $("#loginDlg"), $("#email_input"), $("#password_input"), $("#remember_input"), accountsAPI, UserData);
loginDialog.show();
const registerDialog = new RegisterDialog(
    $("#registerDlg"),$("#name_input"), $("#email_input"), $("#password_input"), accountsAPI);