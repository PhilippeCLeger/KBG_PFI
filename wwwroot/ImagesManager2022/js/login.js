class LoginDialog{
    constructor (dlg, emailInput, passwordInput, rememberMeInput, AccountsAPI, UserData){
        this.dlg = dlg;
        this.emailInput = emailInput;
        this.passwordInput = passwordInput;
        this.rememberMeInput = rememberMeInput;
        this.API = AccountsAPI;
        this.UserData = UserData;
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
            if (this.rememberMeInput.val()){
                
            }
            this.hide();
        };

        const errorLoginCallback = (error) => {
            console.log("error");
            console.log(error);
        };

        this.API.login(email, password, successLoginCallback, errorLoginCallback);
    }

    show(){
        this.dlg.dialog('open');
    }

    hide(){
        this.dlg.dialog('close');
    }

    empty(){
        this.emailInput.val("");
        this.passwordInput.val("");
    }
}