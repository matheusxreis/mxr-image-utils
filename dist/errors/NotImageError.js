"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotImageError = void 0;
class NotImageError extends Error {
    constructor() {
        super();
        this.message = "The file/archive is not a image";
    }
}
exports.NotImageError = NotImageError;
