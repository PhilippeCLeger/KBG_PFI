const baseURL = "http://localhost:5000"
const userData = new UserData();
const accountsAPI = new AccountsAPI(baseURL);
const btnLogin = $("#btnLogin");
const btnRegister = $("#btnSignup");
const btnProfile = $("#btnProfile");
const btnLogout = $("#btnLogout");
const lblUsername = $("#lblUsername");
const newImageCmd = $("#newImageCmd");

const showLoggedIn = (data) => {
    // console.log(data);
    userData.User = data[0];
    lblUsername.text(userData.User.Name);
    btnLogin.hide();
    btnLogout.show();
    btnRegister.hide();
    btnProfile.show();
    newImageCmd.show();

}

const showLoggedOut = () => {
    userData.User = null;
    userData.Access_token="";
    lblUsername.text("");
    btnLogin.show();
    btnLogout.hide();
    btnRegister.show();
    btnProfile.hide();
    newImageCmd.hide();
}

showLoggedOut();

const loginDialog = new LoginDialog(
    $("#loginDlg"), $("#loginDlg #email_input"), 
    $("#loginDlg #password_input"), $("#loginDlg #remember_input"), 
    accountsAPI, userData, (loginData) => {
        const onSuccess = (data) => {
            showLoggedIn(data);
            getImagesList();
        }
        // console.log(userData);
        accountsAPI.getByID(loginData.UserId, userData.Access_token, onSuccess, (err) => console.log(err));
    });

    const registerDialog = new RegisterDialog(
    $("#registerDlg"),$("#registerDlg #name_input"), $("#registerDlg #email_input"), $("#registerDlg #password_input"), accountsAPI);


btnLogin.click((e) => {
    e.preventDefault();
    loginDialog.show();
})

btnRegister.click((e) => {
    e.preventDefault();
    registerDialog.show();
});

btnLogout.click((e) => {
    e.preventDefault();
    accountsAPI.logout(userData.User.Id, userData.Access_token, () => {
        showLoggedOut();
    }, (err) => console.log(err));
})

const imageDetailsDialog = new ImageDetailsDialog(
    $("#imageDetailsDlg"), $("#imageDescription"), $("#imageImage"), $("#imageDate"), $("#imageUserAvatar"), $("#imageUserName") );