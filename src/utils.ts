

export class Utils {
    
    static separateBase64(base64:string){
        const [, rest] = base64.split(",");
        return rest;
    };
    
    static verifyTypes(type:string, types: string[]){
        return types.some(x=>x===type)
    }
}