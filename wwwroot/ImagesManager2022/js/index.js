const baseURL = "http://localhost:5000"
const userData = new UserData();
const accountsAPI = new AccountsAPI(baseURL);
const btnLogin = $("#btnLogin");
const btnRegister = $("#btnSignup");
const btnProfile = $("#btnProfile");
const btnLogout = $("#btnLogout");
const lblUsername = $("#lblUsername");
const btnVerification = $("#btnVerification");
const connectedUserAvatar = $("#connectedUserAvatar");
const btnApropo = $("#apropoBtn");

const newImageCmd = $("#newImageCmd");
const btnSortDateAsc = $("#btnSortDateAsc");
const btnSortDateDesc = $("#btnSortDateDesc");
const btnShowSearch = $("#btnShowSearch");
const btnHideSearch = $("#btnHideSearch");

const filterPanel = $("#filterPanel");
const btnSearch = $("#btnSearch");
const usersSelect = $("#usersSelect");
const keywordsInput = $("#keywordsInput");
const keywordsList = $("#keywordsList");

const promptDlg = $("#promptDialog");
const promptMessage = $("#promptMessage");
const promptDialog = new PromptDialog(promptDlg, promptMessage);

const qsBuilder = new QueryStringBuilder(btnSearch, usersSelect, keywordsInput, keywordsList);

function getAvatarURL(user){
    return !user || !user.AvatarURL ? "./images/No_Avatar.png": user.AvatarURL;
}

const UpdateDisplay = () => {
    if(!userData.User){
        lblUsername.text("");
        connectedUserAvatar.hide();
        connectedUserAvatar.css("background-image", `url('')`);
        btnLogin.show();
        btnLogout.hide();
        btnRegister.show();
        btnProfile.hide();
        newImageCmd.hide();
        btnVerification.hide();
    } else {
        lblUsername.text(userData.User.Name);
        connectedUserAvatar.css("background-image", `url('${getAvatarURL(userData.User)}')`);
        connectedUserAvatar.show();
        btnLogin.hide();
        btnLogout.show();
        btnRegister.hide();
        btnProfile.show();
        newImageCmd.show();
        if(userData.User.VerifyCode == "verified") btnVerification.hide();
        else btnVerification.show();
        console.log(userData.User);
    }
    getImagesList();
}

const loginSuccess = (data) => {
    // console.log(data);
    userData.User = data[0];
    UpdateDisplay();
}

const logoutSuccess = () => {
    userData.User = null;
    userData.Access_token="";
    UpdateDisplay();
}

const updateUser = (userId) => {
    accountsAPI.getByID(userId, userData.Access_token, loginSuccess, (err) => console.log(err) );
}

logoutSuccess();

const loginDialog = new LoginDialog(
$("#loginDlg"), $("#loginDlg #email_input"), 
$("#loginDlg #password_input"), $("#loginDlg #remember_input"), 
accountsAPI, userData, (loginData) => {
    const onSuccess = (data) => {
        loginSuccess(data);
        getImagesList();
    }
    // console.log(userData);
    accountsAPI.getByID(loginData.UserId, userData.Access_token, onSuccess, (err) => console.log(err));
});

const registerDialog = new RegisterDialog(
    $("#registerDlg"), $("#registerForm"),
    $("#registerDlg #name_input"), 
    $("#registerDlg #email_input"), 
    $("#registerDlg #password_input"),
    $("#registerDlg #password2_input"),
    $("#avatar"), $("#r_avatar_GUID"),
    accountsAPI, userData
);

btnLogin.click((e) => {
    e.preventDefault();
    loginDialog.show();
})

btnRegister.click((e) => {
    e.preventDefault();
    registerDialog.addUser();
});

btnLogout.click((e) => {
    e.preventDefault();
    accountsAPI.logout(userData.User.Id, userData.Access_token, () => {
        logoutSuccess();
    }, (err) => console.log(err));
})

btnProfile.click((e) => {
    e.preventDefault();
    registerDialog.editProfile(userData.User);
})
//verification
const verificationDialog = new VerificationDialog( 
    $('#verificationDlg'),
    $("#codeV_input"),
    accountsAPI, 
    userData
);

btnVerification.click((e) => {
    e.preventDefault();
    console.log(userData.User.Id);
    verificationDialog.show();
})

const imageDetailsDialog = new ImageDetailsDialog(
    $("#imageDetailsDlg"), 
    $("#imageDescription"), 
    $("#imageImage"), 
    $("#imageDate"), 
    $("#imageUserAvatar"), 
    $("#imageUserName") );


// Ajout des évènements de classement par dates
btnSortDateDesc.click((e) => {
    e.preventDefault();
    qsBuilder.sortDatesDesc = true;
    btnSortDateAsc.show();
    btnSortDateDesc.hide();
    getImagesList();
});

btnSortDateAsc.click((e) => {
    e.preventDefault();
    qsBuilder.sortDatesDesc = false;
    btnSortDateAsc.hide();
    btnSortDateDesc.show();
    getImagesList();
});
btnSortDateAsc.show();
btnSortDateDesc.hide();



// Ajout des évènements de filtres de recherche
btnShowSearch.click((e) => {
    e.preventDefault();
    btnShowSearch.hide();
    btnHideSearch.show();
    filterPanel.show();
})

btnHideSearch.click((e) => {
    e.preventDefault();
    btnShowSearch.show();
    btnHideSearch.hide();
    filterPanel.hide();
    qsBuilder.emptyParams();
    getImagesList();
})

btnSearch.click((e) => {
    e.preventDefault();
    qsBuilder.getParams();
    qsBuilder.keywordsManager.saveKeywords();
    getImagesList();
})

btnShowSearch.show();
btnHideSearch.hide();
filterPanel.hide();
qsBuilder.emptyParams();

btnApropo.click((e) =>{
    e.preventDefault();
    apropoDialog.show();
})
