class ImageDetailsDialog{
    constructor(dialog, description, image, date, userAvatar, userName){
        this.dialog = dialog;
        this.description = description;
        this.image = image;
        this.date = date;
        this.userAvatar = userAvatar;
        this.userName = userName;
        this.__initialize_dialog();
    }

    __initialize_dialog(){
        this.dialog.dialog({
            title: "ImageTitle",
            autoOpen: false,
            modal: true,
            show: {effect: 'fade', speed: 400},
            hide: {effect: 'fade', speed: 400},
            width: 500, minWidth: 500, maxWidth: 500,
            height: 500, minHeight: 500, maxHeight: 500,
            position: {},
            buttons: []
        });
    }


    fillDialog(image){
        this.dialog.dialog({title: image.Title});
        // this.title.text(image.Title);
        this.description.text(image.Description);
        this.image.children().css("background-image", `url('${image.ThumbnailURL}')`);
        this.image.prop("href", image.OriginalURL);
        this.date.text(convertToFrenchDate(parseInt(image.Date)));
        this.userAvatar.css("backgroud-image", `url('${!image.User.AvatarURL ? "./images/No_Avatar.png" : image.User.AvatarURL}')`);
        this.userName.text(image.User.Name);
        console.log(image);
    }

    show(){
        this.dialog.dialog("open");
    }

    hide(){
        this.dialog.dialog('close');
    }

    showImage(image, currentUser){
        this.fillDialog(image);
        this.show();
    }
}