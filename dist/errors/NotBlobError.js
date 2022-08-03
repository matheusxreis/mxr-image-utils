"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotBlobError = void 0;
class NotBlobError extends Error {
    constructor() {
        super();
        this.message = "The file/archive sending is not a instance of Blob.";
    }
}
exports.NotBlobError = NotBlobError;
