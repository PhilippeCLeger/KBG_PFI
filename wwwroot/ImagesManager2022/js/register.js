class RegisterDialog{
    constructor (dlg, nameInput,emailInput, passwordInput, AccountsAPI, userData){
        this.dlg = dlg;
        this.nameInput = nameInput;
        this.emailInput = emailInput;
        this.passwordInput = passwordInput;
        this.API = AccountsAPI;
        this.__initialize_dialog();
        this.send = this.register;
        this.oldUser = null;
        this.userData = userData;
    }

    __initialize_dialog(){
        this.dlg.dialog({
            title: "S'inscrire",
            autoOpen: false,
            modal: true,
            show: {effect: 'fade', speed: 400},
            hide: {effect: 'fade', speed: 400},
            width: 500, minWidth: 500, maxWidth: 500,
            height: 600, minHeight: 600, maxHeight: 600,
            position: {},
            buttons: [
                {
                    text: "Envoyer",
                    click: (e) => {
                        e.preventDefault();
                        this.register();
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



    register(){
        let name = this.nameInput.val();
        let email = this.emailInput.val();
        let password = this.passwordInput.val();
        const successRegisterCallback = (data) => {
            console.log("success:");
            console.log(data);
            this.hide();
        };

        const errorRegisterCallback = (error) => {
            console.log("error");
            console.log(error);
        };

        this.API.register(name, email, password, successRegisterCallback, errorRegisterCallback);
    }

    modify(){
        let name = this.nameInput.val();
        let email = this.emailInput.val();
        let password = this.passwordInput.val();
        const newUser = {...this.oldUser};
        newUser.Name = name;
        newUser.Email = email;
        if(!!password) newUser.Password = Password;

        const successModifyCallback = (data) => {
            console.log("success:");
            console.log(data);
            this.hide();
        };

        const errorModifyCallback = (error) => {
            console.log("error");
            console.log(error);
        };
        this.API.modify(newUser, this.userData.Access_token, successModifyCallback, errorModifyCallback);
    }

    show(){
        this.dlg.dialog('open');
    }

    hide(){
        this.dlg.dialog('close');
    }

    empty(){
        this.nameInput.val("");
        this.emailInput.val("");
        this.passwordInput.val("");
        this.oldUser = null;
    }

    addUser(){
        this.empty;
        this.send = this.register;
        this.show();
    }

    editProfile(user){
        this.empty();
        this.send = this.modify;
        this.oldUser = user;
        this.nameInput.val(user.Name);
        this.emailInput.val(user.Email);
        this.passwordInput.val("");
        this.show();
    }
}