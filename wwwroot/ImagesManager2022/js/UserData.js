class UserData{
    // static Instance = new UserData();

    constructor(){
        this.Access_token = "";
        this.User = null;
        this.email = "";
        this.password = "";
        this.rememberMe = false;
        this.loadLocalStorage();
    }

    loadLocalStorage(){
        const email = window.localStorage.getItem("appEmail");
        const password = window.localStorage.getItem("appPassword");
        const rememberMe = window.localStorage.getItem("appRememberMe");
        this.email = email ? email : "";
        this.password = password ? password : "";
        this.rememberMe = rememberMe ? rememberMe : false;
    }

    saveToLocalStorage(){
        window.localStorage.setItem("appEmail", this.email);
        window.localStorage.setItem("appPassword", this.password);
        window.localStorage.setItem("appRememberMe", this.rememberMe);
    }

    removeLocalStorage(){
        window.localStorage.removeItem("appEmail");
        window.localStorage.removeItem("appPassword");
        window.localStorage.removeItem("appRememberMe");
    }

    setAccessToken(token){
        this.Access_token = `Bearer ${token}`;
    }

    // loadSessionStorage(){
    //     if(window.sessionStorage.getItem("UserData")){

    //     }
    // }
}