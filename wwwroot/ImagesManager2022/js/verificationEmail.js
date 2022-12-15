class VerificationDialog{
    constructor (dlg, codeV_input, AccountsAPI, userData){
        this.dlg = dlg;
        this.userId = userId;
        this.codeV_input = codeV_input;
        this.API = AccountsAPI;
        this.__initialize_dialog();
        this.userData = userData;
        this.send = this.verfication();
        verificationDialog.show();
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
                        this.send();
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
        let userId = this.userId.val();
        let code = this.codeV_input.val();

        const successRegisterCallback = (data) => {
            console.log("success: mail envoyez");
            console.log(data);
            this.hide();
        };

        const errorRegisterCallback = (error) => {
            console.log("error");
            console.log(error);
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
        
    }
    
}