"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageTypeError = void 0;
class ImageTypeError extends Error {
    constructor() {
        super();
        this.message = "Image type is not accept.";
    }
}
exports.ImageTypeError = ImageTypeError;
