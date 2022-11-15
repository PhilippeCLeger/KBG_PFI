class UserData{
    static Instance = new UserData();

    constructor(){
        this.token = "";
        this.email = "";
        this.password = "";
    }

    loadLocalStorage(){
        const email = window.localStorage.getItem("appEmail");
        const password = window.localStorage.getItem("appPassword");
        this.email = email ? email : "";
        this.password = password ? password : "";
    }

    saveToLocalStorage(){
        window.localStorage.setItem("appEmail", this.email);
        window.localStorage.removeItem("appPassword", this.password);
    }

    removeLocalStorage(){
        window.localStorage.removeItem("appEmail");
        window.localStorage.removeItem("appPassword");
    }
}