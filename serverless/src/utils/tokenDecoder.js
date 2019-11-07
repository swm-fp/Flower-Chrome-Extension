import atob from "atob"
const tokenDecoder = {
    decode: (token) => {
        const decodedToken = [];
        let tokenString;
        let splited = token.split(" ");
        if(splited.length == 2){
            // bearer auto attached
            tokenString = splited[1];
        }
        else{
            //only token
            tokenString = splited[0];
        }
        splited = tokenString.split(".");
        decodedToken[0] = JSON.parse(atob(splited[0]));
        decodedToken[1] = JSON.parse(atob(splited[1]));

        return decodedToken;
    }
}
export default tokenDecoder;