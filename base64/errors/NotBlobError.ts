export class NotBlobError extends Error {

    constructor(){
        super();

        this.message = "The file/archive sending is not a instance of Blob."
    }    

}