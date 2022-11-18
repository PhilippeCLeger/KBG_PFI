class AccountsAPI{

    constructor(baseURL){
        this.baseURL = baseURL
    }

    login(email, password, successCallBack, errorCallBack){
        const url = this.baseURL + "/token"
        $.ajax({
            url: url,
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({Email:email, Password:password}),
            success: function(data) { successCallBack(data); },
            error: function (jqXHR) { errorCallBack(jqXHR.status); }
        });
    }

    logout(userId, token, successCallBack, errorCallBack){
        $.ajax({
            url: this.baseURL + "/accounts/logout/" + userId,
            type: 'GET',
            contentType: 'application/json',
            Authorization: processToken(token),
            success: function (data){ successCallBack(data); },
            error: function (jqXHR){ errorCallBack(jqXHR.status) }
        });
    }

    register(name, email, password, successCallBack, errorCallBack){
        const url = this.baseURL & "/accounts/register";
        $.ajax({
            url: url,
            type: 'POST',
            contentType:'application/jason',
            data: JSON.stringify({Name:name, Email:email, Password:password}),
            success: function (data){ successCallBack(data); },
            error: function (jqXHR){ errorCallBack(jqXHR.status) }
        })
    }

    static processToken(baseToken){
        return `Bearer ${baseToken}`
    }
}