class QueryStringBuilder{
    constructor(btnSearch, usersSelect, keywordsInput, keywordsList){
        this.sortDatesDesc = true;
        this.btnSearch = btnSearch;
        this.usersSelect = usersSelect;
        this.keywordsManager = new KeywordsManager(keywordsInput, keywordsList);
        this.params = [];
        this.users = [];
        this.selectedUser = -1;
    }
    
    getSortParam(){
        return `sort=Date${this.sortDatesDesc ? ",desc" : ""}`;
    }

    getKeywordsParam(){
        const keywords = this.keywordsManager.getKeywords().join(" ");
        if(keywords.length > 0)
            return `keywords=${keywords}`;
        return null;
    }

    getUserIdParam(){
        let selectedUserId = this.usersSelect.val();
        this.selectedUser = selectedUserId;
        if(!!selectedUserId && selectedUserId != -1)
            return `UserId=${selectedUserId}`;
        return null;
    }

    getParams(){
        this.params = [];
        const keywordsParam = this.getKeywordsParam();
        if(!!keywordsParam) this.params.push(keywordsParam);
        const userIdParam = this.getUserIdParam();
        if(!!userIdParam) this.params.push(userIdParam);
    }

    emptyParams(){
        this.params = [];
    }
    
    getQueryString(previousQueryString = ""){
        let params = [this.getSortParam(), ...(this.params)];
        if (previousQueryString.length > 0) params.push(previousQueryString);
        return `?${params.join("&")}`;
    }
    
    fillUsers(images){
        this.usersSelect.empty();
        this.users = [];
        this.addUser("Tous les utilisateurs", -1);
        if(userData.User) this.addUser("Mes images", userData.User.Id);
        for(let img of images){
            this.addUser(img.User.Name, img.User.Id);
        }
        if(this.users.includes(this.selectedUser)) this.usersSelect.val(this.selectedUser);
    }
    
    addUser(name, userId){
        if(!this.users.includes(userId)){
            this.usersSelect.append($(`<option value="${userId}">${name}</option>`));
            this.users.push(userId);
        }
    }
    
}

class KeywordsManager{
    
    constructor(keywordsInput, keywordsList){
        this.keywordsInput = keywordsInput;
        this.keywordsList = keywordsList;
        this.keywords = [];
        this.loadKeywords();
    }

    getKeywords(){
        return this.keywordsInput.val().split(" ");
    }

    setKeywords(keywords = []){
        this.keywordsInput.val(keywords.join(" "));
    }

    loadKeywords(){
        this.keywords = JSON.parse(window.localStorage.getItem("appKeywords"));
        this.keywordsList.empty();
        if(!!this.keywords){
            this.keywords.forEach((kw) => {
                this.keywordsList.append($(`<option value="${kw}">`));
            })
        }
    }

    saveKeywords(){
        window.localStorage.setItem("appKeywords", JSON.stringify(this.keywords));
    }

    addKeywords(newKeywords = []){
        this.keywords.push(...newKeywords);
        this.saveKeywords();
    }
}