import { BlobToBase64Params } from "./dto/BlobToBase64Params";
import { BlobToBase64Return } from "./dto/BlobToBase64Return";
import { Base64ToBlobParams } from "./dto/Base64ToBlobParams";
import { UrlToBase64Params } from "./dto/UrlToBase64Params";
declare class ImageUtils {
    /**
     * @function isBlob
     * @description Verify if a type passed is from Blob's instance.
     * @param blob A Blob object or a expected Blob object.
     * @returns boolean;
     */
    static isBlob(blob: Blob): boolean;
    /**
    * @function getTypeFile
    * @description Verify a type of a blob.
    * @param base64 The base64 from file.
    * @returns string Example: "png";
    */
    static getTypeFile(base64: string): string;
    /**
    * @function isImage
    * @description Verify if a base64 file is from image type.
    * @param base64 The base64 from file.
    * @returns boolean;
    */
    static isImage(base64: string): boolean;
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
    static blobToBase64(params: BlobToBase64Params): Promise<BlobToBase64Return>;
    /**
       * @function base64ToBlob
       * @description Converte a base64 string in a Blob object.
       * @param params The param must be a object with a property base64, where must contain the file.
       * Example: {base64:"data:image/png;base64,iVBO..."}.
       * @returns Promise<Blob>
       */
    static base64ToBlob(params: Base64ToBlobParams): Promise<Blob>;
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
    static urlToBase64(params: UrlToBase64Params): Promise<BlobToBase64Return>;
}
export { ImageUtils };
