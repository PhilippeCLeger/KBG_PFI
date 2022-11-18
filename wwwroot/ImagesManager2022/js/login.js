class LoginDialog{
    constructor (dlg, emailInput, passwordInput, rememberMeInput, AccountsAPI, userData, onLoginSuccess = () => {}){
        this.dlg = dlg;
        this.emailInput = emailInput;
        this.passwordInput = passwordInput;
        this.rememberMeInput = rememberMeInput;
        this.API = AccountsAPI;
        this.UserData = userData;
        this.onLoginSuccess = onLoginSuccess;
        this.__initialize_dialog();
    }

    __initialize_dialog(){
        this.dlg.dialog({
            title: "Connexion",
            autoOpen: false,
            modal: true,
            show: {effect: 'fade', speed: 400},
            hide: {effect: 'fade', speed: 400},
            width: 500, minWidth: 500, maxWidth: 500,
            height: 230, minHeight: 230, maxHeight: 230,
            position: {},
            buttons: [
                {
                    text: "Envoyer",
                    click: (e) => {
                        e.preventDefault();
                        this.login();
                    }
                },
                {
                    text: "Annuler",
                    click: () => {
                        this.hide();
                    }
                }
            ]
        });
    }


    login(){
        let email = this.emailInput.val();
        let password = this.passwordInput.val();
        const successLoginCallback = (data) => {
            console.log("success:");
            console.log(data);
            this.UserData.Access_token = data.Access_token;
            this.UserData.UserId = data.UserId;
            console.log(this.rememberMeInput.prop("checked"));
            if (this.rememberMeInput.prop("checked")){
                this.UserData.email = this.emailInput.val();
                this.UserData.password = this.passwordInput.val();
                this.UserData.rememberMe = true;
                this.UserData.saveToLocalStorage();
            } else {
                this.UserData.removeLocalStorage();
                this.UserData.loadLocalStorage();
            }
            this.hide();
            this.onLoginSuccess();
        };

        const errorLoginCallback = (error) => {
            console.log("error");
            console.log(error);
        };

        this.API.login(email, password, successLoginCallback, errorLoginCallback);
    }

    show(){
        if(this.UserData.rememberMe){
            this.emailInput.val(this.UserData.email);
            this.passwordInput.val(this.UserData.password);
            this.rememberMeInput.prop("checked", true);
        } else this.empty();
        this.dlg.dialog('open');
    }

    hide(){
        this.dlg.dialog('close');
    }

    empty(){
        this.emailInput.val("");
        this.passwordInput.val("");
        this.rememberMeInput.prop("checked");
    }
}