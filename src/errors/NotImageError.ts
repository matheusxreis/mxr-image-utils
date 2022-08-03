export class NotImageError extends Error {

    constructor(){
        
        super();
        this.message = "The file/archive is not a image"
    }    

}