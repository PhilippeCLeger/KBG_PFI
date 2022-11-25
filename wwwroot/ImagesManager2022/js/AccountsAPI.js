class AccountsAPI{

    constructor(baseURL){
        this.baseURL = baseURL
    }

    login(email, password, successCallBack, errorCallBack){
        const url = this.baseURL + "/token";
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
            authorization: token,
            success: function (data){ successCallBack(data); },
            error: function (jqXHR){ errorCallBack(jqXHR.status) }
        });
    }

    register(name, email, password, successCallBack, errorCallBack){
        const url = this.baseURL + "/accounts/register";
        $.ajax({
            url: url,
            type: 'POST',
            contentType:'application/jason',
            data: JSON.stringify({Name:name, Email:email, Password:password}),
            success: function (data){ successCallBack(data); },
            error: function (jqXHR){ errorCallBack(jqXHR.status) }
        })
    }

    verifyEmail(userId, code, successCallBack, errorCallBack){
        const url = this.baseURL + `/accounts/verify?id=3&code=123456`
    }

    getByID(userID, token, successCallBack, errorCallBack){
        const url = this.baseURL + "/api/accounts?Id=" + userID
        console.log(token);
        console.log(`allo${token}allo`);
        console.log(url);
        $.ajax({
            url: url,
            type: 'GET',
            headers:{
                authorization: token
            },
            contentType: 'application/json',
            success: function (data){ successCallBack(data); },
            error: function (jqXHR){ errorCallBack(jqXHR.status) }
        });      
    }

    static processToken(baseToken){
        return `Bearer ${baseToken}`
    }
}