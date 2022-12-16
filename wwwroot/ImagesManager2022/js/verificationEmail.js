class VerificationDialog{
    constructor (dlg, codeV_input, AccountsAPI, userData){
        this.dlg = dlg;
        this.codeV_input = codeV_input;
        this.API = AccountsAPI;
        this.userData = userData;
        this.__initialize_dialog();
        
        //verificationDialog.show();
    }

    __initialize_dialog(){
        this.dlg.dialog({
            title: "Verfiier votre Email",
            autoOpen: false,
            modal: true,
            show: {effect: 'fade', speed: 400},
            hide: {effect: 'fade', speed: 400},
            width: 500, minWidth: 500, maxWidth: 500,
            height: 500, minHeight: 500, maxHeight: 500,
            position: {},
            buttons: [
                {
                    text: "Envoyer",
                    click: (e) => {
                        e.preventDefault();
                        this.verfication();
                        this.empty();
                        this.hide();
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



    verfication(){
        let code = this.codeV_input.val();
        let userId = this.userData.User.Id;
        console.log(code);
        console.log(userId);
        const successRegisterCallback = (data) => {
            console.log("success: mail envoyez");
            console.log(data);
            promptDialog.showPrompt("Courriel vérifié avec succès");
            updateUser(userId);
            this.hide();
        };

        const errorRegisterCallback = (error) => {
            console.log("error");
            console.log(error);
            promptDialog.showPrompt("Une erreur est survenue", "Erreur");
        };

        this.API.verifyEmail(userId, code, successRegisterCallback, errorRegisterCallback);

    }

    show(){
        this.dlg.dialog('open');
    }

    hide(){
        this.dlg.dialog('close');
    }
    
    empty(){
        this.codeV_input = "";
    }


}