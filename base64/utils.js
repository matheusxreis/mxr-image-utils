"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Utils = void 0;
class Utils {
    static separateBase64(base64) {
        const [, rest] = base64.split(",");
        return rest;
    }
    ;
    static verifyTypes(type, types) {
        return types.some(x => x === type);
    }
}
exports.Utils = Utils;
