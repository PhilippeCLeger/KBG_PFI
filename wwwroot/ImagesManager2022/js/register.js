class RegisterDialog{
    constructor (dlg, nameInput,emailInput, passwordInput, AccountsAPI){
        this.dlg = dlg;
        this.nameInput = nameInput;
        this.emailInput = emailInput;
        this.passwordInput = passwordInput;
        this.API = AccountsAPI;
        this.__initialize_dialog();
    }

    __initialize_dialog(){
        this.dlg.dialog({
            title: "S'inscrire",
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
    }
}