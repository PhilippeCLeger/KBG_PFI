const baseURL = "http://localhost:5000"
const accountsAPI = new AccountsAPI(baseURL);
const loginDialog = new LoginDialog(
    $("#loginDlg"), $("#email_input"), $("#password_input"), accountsAPI);
loginDialog.show();