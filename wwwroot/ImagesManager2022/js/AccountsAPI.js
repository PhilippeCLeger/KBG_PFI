
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

    register(newUser, successCallBack, errorCallBack){
        const url = this.baseURL + "/accounts/register";
        $.ajax({
            url: url,
            type: 'POST',
            contentType:'application/json',
            data: JSON.stringify({...newUser, Id:-1}),
            success: function (data){ successCallBack(data); },
            error: function (jqXHR){ errorCallBack(jqXHR.status) }
        })
    }


    modify(newUser, token, successCallBack, errorCallBack){
        const url = `${this.baseURL}/accounts/modify`;
        $.ajax({
            url: url,
            type: 'PUT',
            headers:{
                authorization: token
            },
            contentType:'application/json',
            data: JSON.stringify(newUser),
            success: function (data){ successCallBack(data); },
            error: function (jqXHR){ errorCallBack(jqXHR.status) }
        })
    }

    verifyEmail(userId, code, successCallBack, errorCallBack){
        const url = this.baseURL + `/accounts/verify?id=${userId}&code=${code}`;
        $.ajax({
            url: url,
            type: 'GET',
            contentType: 'application/json',
            success: (data) => successCallBack(data),
            error: (jqXHR) => errorCallBack(jqXHR.status)
        });
    }
    remove(userId, token, successCallBack, errorCallBack) {
        const url = this.baseURL + `/accounts/remove/${userId}`
        $.ajax({
            url: url,
            type: 'GET',
            contentType:'application/json',
            headers:{
                authorization: token
            },
            // data: JSON.stringify({id: [userId]}),
            success: (data) => { successCallBack(data) },
            error: (jqXHR) => errorCallBack(jqXHR.status)
        });
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