import atob from "atob"
const tokenDecoder = {
    decode: (token) => {
        const decodedToken = []
        //seperate infomation part
        const splited = token.split(".");
        decodedToken[0] = JSON.parse(atob(splited[0]));
        decodedToken[1] = JSON.parse(atob(splited[1]));
        return decodedToken;
    }
}
export default tokenDecoder;