const baseURL = "http://localhost:5000"
const accountsAPI = new AccountsAPI(baseURL);
const userData = new UserData();
const loginDialog = new LoginDialog(
    $("#loginDlg"), $("#email_input"), $("#password_input"), $("#remember_input"), accountsAPI, userData);
loginDialog.show();