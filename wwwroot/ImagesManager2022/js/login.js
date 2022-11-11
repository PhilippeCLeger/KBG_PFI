class LoginDialog{
    constructor (form, emailInput, passwordInput, sendButton, AccountsAPI){
        this.form = form;
        this.emailInput = emailInput;
        this.passwordInput = passwordInput;
        this.sendButton = sendButton;
        this.API = API;

        this.sendButton.click((e) => {
            e.preventDefault();
            this.login();
        })
    }


    login(){
        let email = this.emailInput.val();
        let password = this.passwordInput.val();
        this.API.login(email, password, () => console.log("success"), () => console.log("error"))
    }
}