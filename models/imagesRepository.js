
const ImageFilesRepository = require('./imageFilesRepository.js');
const UsersRepository = require('./usersRepository');
const ImageModel = require('./image.js');
const CollectionFilter = require("./collectionFilter.js");
const utilities = require("../utilities");
const HttpContext = require('../httpContext').get();

module.exports =
    class ImagesRepository extends require('./repository') {
        constructor() {
            super(new ImageModel(), true /* cached */);
            // this.setBindExtraDataMethod(this.bindImageURL);
            this.setBindExtraDataMethod((image) => {
                let img2 = this.bindImageURL(image);
                return this.bindUserData(img2)
            });
            this.usersRepository = new UsersRepository();
        }
        bindImageURL(image) {
            if (image) {
                let bindedImage = { ...image };
                if (image["GUID"] != "") {
                    bindedImage["OriginalURL"] = HttpContext.host + ImageFilesRepository.getImageFileURL(image["GUID"]);
                    bindedImage["ThumbnailURL"] = HttpContext.host + ImageFilesRepository.getThumbnailFileURL(image["GUID"]);
                } else {
                    bindedImage["OriginalURL"] = "";
                    bindedImage["ThumbnailURL"] = "";
                }
                return bindedImage;
            }
            return null;
        }
        bindUserData(image){
            if(!image) return null;
            if(!image.UserId) return image;
            let bindedImage = {...image};
            // bindedImage.User = {"Allo":"Hey!!!"}
            bindedImage.User = this.usersRepository.get(bindedImage.UserId);

            return bindedImage;
        }
        add(image) {
            if (this.model.valid(image)) {
                image["GUID"] = ImageFilesRepository.storeImageData("", image["ImageData"]);
                delete image["ImageData"];
                return this.bindImageURL(super.add(image));
            }
            return null;
        }
        update(image) {
            if (this.model.valid(image)) {
                image["GUID"] = ImageFilesRepository.storeImageData(image["GUID"], image["ImageData"]);
                delete image["ImageData"];
                return super.update(image);
            }
            return false;
        }
        remove(id) {
            let foundImage = super.get(id);
            if (foundImage) {
                ImageFilesRepository.removeImageFile(foundImage["GUID"]);
                return super.remove(id);
            }
            return false;
        }

        getAll(params = null) {
            let imagesList = this.objects();
            if (this.bindExtraDataMethod != null) {
                imagesList = this.bindExtraData(imagesList);
            }
            if (params) {
                imagesList = this.filterImagesByKeyWords(params, imagesList);
                let collectionFilter = new CollectionFilter(
                    imagesList,
                    params,
                    this.model
                );
                return collectionFilter.get();
            }
            return imagesList;
        }
        
        filterImagesByKeyWords(params, imagesList){
            if(!("keywords" in params)) return imagesList;
            let keywords = params.keywords.toLowerCase().split(" ");
            delete params.keywords;
            return imagesList.filter((image) => {
                return keywords.filter((kw) => {
                    return !image.Title.toLowerCase().includes(kw) && !image.Description.toLowerCase().includes(kw);
                }).length == 0;
            });
        }

    }
