class AboutDialog{
    constructor(dialog){
        this.dialog = dialog;
        
        this.__initialize_dialog();
    }


    __initialize_dialog(){
        this.dialog.dialog({
            title: "A propos",
            autoOpen: false,
            modal: true,
            show: {effect: 'fade', speed: 400},
            hide: {effect: 'fade', speed: 400},
            width: 400, minWidth: 400, maxWidth: 400,
            height: 300, minHeight: 300, maxHeight: 300,
            position: {},
        });
    }


    show(){
        this.dialog.dialog('open');
    }

    hide(){
        this.dialog.dialog('close');
    }
}