const ImagesRepository = require('../models/imagesRepository');
const TokenManager = require('../tokenManager');

module.exports =
    class ImagesController extends require('./Controller') {
        constructor(HttpContext) {
            super(HttpContext, new ImagesRepository(), false, true); // todo pas d'acces anonyme
            this.token = TokenManager.getToken(this.HttpContext.req);
        }



        canReadImage(image){
            return image.Shared || this.canWriteImage(image); 
        }

        canWriteImage(image){
            if(!this.token) return false;
            return !!this.token && image.UserId == this.token.UserId;
        }

        canWriteImageById(id){
            if(!isNaN(id)){
                let img = this.repository.get(id);
                return !(!!img && !this.canWriteImage(img))
            }
            return true;
        }
        
        get(id) {
            if (this.readAuthorization()) {
                if (this.repository != null) {
                    if (id !== undefined) {
                        if (!isNaN(id)) {
                            let data = this.repository.get(id);
                            if (data != null){
                                if(this.canReadImage(data))
                                    this.HttpContext.response.JSON(data);
                                else
                                    this.HttpContext.response.unAuthorized();
                            }
                            else
                                this.HttpContext.response.notFound();
                        } else
                            this.HttpContext.response.badRequest();
                    }
                    else{
                        let data = this.repository.getAll(this.HttpContext.path.params)
                        // if(!!this.token)
                        //     this.HttpContext.path.params.token = this.token.Access_token;
                        let dataToSend = data.filter((img) => this.canReadImage(img));
                        this.HttpContext.response.JSON(dataToSend, this.repository.ETag);
                    }
                }
                else
                    this.HttpContext.response.notImplemented();
            } else
                this.HttpContext.response.unAuthorized();
        }
        post(data) {
            if (this.writeAuthorization() && this.canWriteImage(data)) {
                if (this.repository != null) {
                    data = this.repository.add(data);
                    if (data) {
                        if (data.conflict)
                            this.HttpContext.response.conflict();
                        else
                            this.HttpContext.response.created(data);
                    } else
                        this.HttpContext.response.unprocessable();
                } else
                    this.HttpContext.response.notImplemented();
            } else
                this.HttpContext.response.unAuthorized();
        }
        put(data) {
            if (this.writeAuthorization() && this.canWriteImage(data)) {
                if (this.repository != null) {
                    let updateResult = this.repository.update(data);
                    if (updateResult == this.repository.updateResult.ok)
                        this.HttpContext.response.ok();
                    else
                        if (updateResult == this.repository.updateResult.conflict)
                            this.HttpContext.response.conflict();
                        else
                            if (updateResult == this.repository.updateResult.notfound)
                                this.HttpContext.response.notFound();
                            else // this.repository.updateResult.invalid
                                this.HttpContext.response.unprocessable();
                } else
                    this.HttpContext.response.notImplemented();
            } else
                this.HttpContext.response.unAuthorized();
        }
        remove(id) {
            if (this.writeAuthorization() && this.canWriteImageById(id)) {
                if (this.repository != null) {
                    if (this.repository.remove(id))
                        this.HttpContext.response.accepted();
                    else
                        this.HttpContext.response.notFound();
                } else
                    this.HttpContext.response.notImplemented();
            } else
                this.HttpContext.response.unAuthorized();
        }


    }