import { BlobToBase64Params } from "./dto/BlobToBase64Params";
import { BlobToBase64Return } from "./dto/BlobToBase64Return";
import { NotBlobError } from "./errors/NotBlobError";
import { NotImageError } from "./errors/NotImageError";

import { Base64ToBlobParams } from "./dto/Base64ToBlobParams";
import { UrlToBase64Params } from "./dto/UrlToBase64Params";
import { ImageTypeError } from "./errors/ImageTypeError";
import { Utils } from "./utils";


class ImageUtils {

    
    /**
     * @function isBlob
     * @description Verify if a type passed is from Blob's instance.
     * @param blob A Blob object or a expected Blob object.
     * @returns boolean;
     */
    static isBlob(blob: Blob){
        return blob instanceof Blob;
    };
     /**
     * @function getTypeFile
     * @description Verify a type of a blob.
     * @param base64 The base64 from file.
     * @returns string Example: "png";
     */
    static getTypeFile(base64:string){
       const [,rest] = base64.split("/");
       const [type, ] = rest.split(";");
       
       return type;
    };
     /**
     * @function isImage
     * @description Verify if a base64 file is from image type.
     * @param base64 The base64 from file.
     * @returns boolean;
     */
    static isImage(base64: string){
        const [data, rest] = base64.split(":")
        const [image, ] = rest.split("/");

        return image === "image"
    };

    /**
     * @function blobToBase64
     * @description Converte a file uploaded image in base64.
     * @param params The param must be a object with a property blob, where must contain the file.
     * It also can contain the types from image accepts as a string[]. But it is optional.
     * Example: {blob: e.target.files[0],
     *          acceptedTypes: ['png', 'jpeg', 'jpg']}.
     * @returns Promise<BlobToBase64Return> Return a promise from BlobToBase64Return interface.
     * Example: 
     * { 
     * base 64:"iVBORw0KGgoAAAANSUhEUgAAAe...", 
     * completeBase64: "data:image/png;base64,iVBO...",
     * fileType: "png"
     * }
     */
    static blobToBase64(params: BlobToBase64Params): Promise<BlobToBase64Return>{

        if(ImageUtils.isBlob(params.blob) === false){
            throw new NotBlobError();
        }

        

        return new Promise((resolve, reject)=>{
            const reader = new FileReader();
            reader.readAsDataURL(params.blob);
            reader.onloadend = function(){

             if(ImageUtils.isImage(reader.result as string)===false){
                reject(new NotImageError())
             }    
             if(params.acceptedTypes?.length){
                const isOk = Utils.verifyTypes(ImageUtils.getTypeFile(reader.result as string) as string,
                            params.acceptedTypes);
                 isOk === false && reject(new ImageTypeError())           
            }  
            const x = {
                base64: Utils.separateBase64(reader.result as string),
                fileType: ImageUtils.getTypeFile(reader.result as string), 
                completeBase64: reader.result as string
            }

            resolve(x);
            }
        })
    }
  /**
     * @function base64ToBlob
     * @description Converte a base64 string in a Blob object.
     * @param params The param must be a object with a property base64, where must contain the file.
     * Example: {base64:"data:image/png;base64,iVBO..."}.
     * @returns Promise<Blob> 
     */
    static async base64ToBlob(params:Base64ToBlobParams){

        const res = await fetch(params.base64)

        return await res.blob()
    }

    /**
     * @function urlToBase64
     * @description Converte a url string, to a base64 string.
     * @param params The param must be a object with a property url, where must contain the image's url.
     * Example: {url: "https://example.com.br/example/Nhu7MAka..."}.
     * @returns Promise<BlobToBase64Return> Return a promise from BlobToBase64Return interface.
     * Example: 
     * { 
     * base 64:"iVBORw0KGgoAAAANSUhEUgAAAe...", 
     * completeBase64: "data:image/png;base64,iVBO...",
     * fileType: "png"
     * }
     */
    static async urlToBase64(params: UrlToBase64Params){

        const res = await fetch(params.url)

        const data = await res.blob();
        return await ImageUtils.blobToBase64({blob: data});
    }


}


export { ImageUtils }
