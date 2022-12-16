class PromptDialog{
    constructor(dialog, message){
        this.dialog = dialog;
        this.message = message;
        this.__initialize_dialog();
    }


    __initialize_dialog(){
        this.dialog.dialog({
            autoOpen: false,
            modal: true,
            show: {effect: 'fade', speed: 400},
            hide: {effect: 'fade', speed: 400},
            width: 400, minWidth: 400, maxWidth: 400,
            height: 300, minHeight: 300, maxHeight: 300,
            position: {},
        });
    }



    showPrompt(message, title= "Message", btnText = "OK", onClick = () => null){
        this.dialog.dialog({
            title: title,
            buttons:[
                {
                    text: btnText,
                    click: () => {
                        onClick();
                        this.hide();
                    }
                }
            ]
        })
        this.message.text(message);
        this.show();
    }

    show(){
        this.dialog.dialog('open');
    }

    hide(){
        this.dialog.dialog('close');
    }
}