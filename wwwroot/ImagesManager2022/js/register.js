class RegisterDialog{
    constructor (dlg, nameInput,emailInput, passwordInput, avatarInput, avatarGUID, AccountsAPI, userData){
        this.dlg = dlg;
        this.nameInput = nameInput;
        this.emailInput = emailInput;
        this.passwordInput = passwordInput;
        this.API = AccountsAPI;
        this.__initialize_dialog();
        this.send = this.register;
        this.oldUser = null;
        this.userData = userData;
        this.avatar = avatarInput;
        this.avatarGUID = avatarGUID;
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



    register(){
        let newUser = {};
        newUser.Name = this.nameInput.val();
        newUser.Email = this.emailInput.val();
        newUser.Password = this.passwordInput.val();
        const successRegisterCallback = (data) => {
            console.log("success:");
            console.log(data);
            this.hide();
        };

        const errorRegisterCallback = (error) => {
            console.log("error");
            console.log(error);
        };
        newUser.ImageData = ImageUploader.getImageData(this.avatar.attr("id"));
        newUser.AvatarGUID = this.avatarGUID.val();
        this.API.register(newUser, successRegisterCallback, errorRegisterCallback);
    }

    modify(){
        const newUser = {...this.oldUser};
        newUser.Name = this.nameInput.val();
        newUser.Email = this.emailInput.val();
        newUser.Password = this.passwordInput.val();

        newUser.ImageData = ImageUploader.getImageData(this.avatar.attr("id"))
        newUser.AvatarGUID = this.avatarGUID.val();
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
        ImageUploader.resetImage(this.avatar.attr("id"));
        this.avatarGUID.val("");
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
        this.dlg.dialog({Title: "Modifier son profil"})
        this.oldUser = user;
        this.nameInput.val(user.Name);
        this.emailInput.val(user.Email);
        this.passwordInput.val();
        this.show();
        ImageUploader.setImage(this.avatar.attr("id"), user.AvatarURL);
        this.avatarGUID.val(user.AvatarGUID)
    }
}