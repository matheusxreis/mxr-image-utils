"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageUtils = void 0;
const NotBlobError_1 = require("./errors/NotBlobError");
const NotImageError_1 = require("./errors/NotImageError");
const ImageTypeError_1 = require("./errors/ImageTypeError");
function separateBase64(base64) {
    const [, rest] = base64.split(",");
    return rest;
}
;
function verifyTypes(type, types) {
    return types.some(x => type);
}
class ImageUtils {
    /**
     * @function isBlob
     * @description Verify if a type passed is from Blob's instance.
     * @param blob A Blob object or a expected Blob object.
     * @returns boolean;
     */
    static isBlob(blob) {
        return blob instanceof Blob;
    }
    ;
    /**
    * @function getTypeFile
    * @description Verify a type of a blob.
    * @param base64 The base64 from file.
    * @returns string Example: "png";
    */
    static getTypeFile(base64) {
        const [, rest] = base64.split("/");
        const [type,] = rest.split(";");
        return type;
    }
    ;
    /**
    * @function isImage
    * @description Verify if a base64 file is from image type.
    * @param base64 The base64 from file.
    * @returns boolean;
    */
    static isImage(base64) {
        const [data, rest] = base64.split(":");
        const [image,] = rest.split("/");
        return image === "image";
    }
    ;
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
    static blobToBase64(params) {
        if (ImageUtils.isBlob(params.blob) === false) {
            throw new NotBlobError_1.NotBlobError();
        }
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(params.blob);
            reader.onloadend = function () {
                if (ImageUtils.isImage(reader.result) === false) {
                    reject(new NotImageError_1.NotImageError());
                }
                if (params.acceptedTypes) {
                    const isOk = verifyTypes(ImageUtils.getTypeFile(reader.result), params.acceptedTypes);
                    isOk === false && reject(new ImageTypeError_1.ImageTypeError());
                }
                const x = {
                    base64: separateBase64(reader.result),
                    fileType: ImageUtils.getTypeFile(reader.result),
                    completeBase64: reader.result
                };
                resolve(x);
            };
        });
    }
    /**
       * @function base64ToBlob
       * @description Converte a base64 string in a Blob object.
       * @param params The param must be a object with a property base64, where must contain the file.
       * Example: {base64:"data:image/png;base64,iVBO..."}.
       * @returns Promise<Blob>
       */
    static base64ToBlob(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield fetch(params.base64);
            return yield res.blob();
        });
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
    static urlToBase64(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield fetch(params.url);
            const data = yield res.blob();
            return yield ImageUtils.blobToBase64({ blob: data });
        });
    }
}
exports.ImageUtils = ImageUtils;
