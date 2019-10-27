import chai, { expect } from "chai"
import "@babel/polyfill"
import tokenDecoder from "../../src/utils/tokenDecoder"

describe("Token Decoder Test", function () {

    it("should decode accessToken", function () {
        //given 
        const accessToken = "eyJraWQiOiJuWE1ncjRUdXQwMXc4c0lFUkkxRFJZUmQ4bDBrcEhlc2IzVVBBVXhnTEk0PSIsImFsZyI6IlJTMjU2In0.eyJhdF9oYXNoIjoiRXRvQmI2Um5ubTN1S1lnZjg2Y0RYZyIsInN1YiI6IjhhYjQ4OTU0LTgyZmQtNDcyNS1iMDRhLWQzNTFkM2RhYzcwZSIsImNvZ25pdG86Z3JvdXBzIjpbImFwLW5vcnRoZWFzdC0yX3FKMkpMU2dyTV9GYWNlYm9vayJdLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAuYXAtbm9ydGhlYXN0LTIuYW1hem9uYXdzLmNvbVwvYXAtbm9ydGhlYXN0LTJfcUoySkxTZ3JNIiwiY29nbml0bzp1c2VybmFtZSI6IkZhY2Vib29rXzIyOTM3Nzk0MjQwMzg0NzQiLCJub25jZSI6IllZSGZxUzlkSEVrcVAxbkhfTUhKUUhCN3dyZkhjM1pBZDQtblJJaTRGb0hlOWFPMzJ3V0l1cXVWNnlDVlJqNjdMdmVqMk13NEQ0V1RiTG5MeTd6QVVJcWp3c2VQT29GSVZmWnNXSE9jeHcyWDhNVmx5VUFvLVNoT0p2d1ZHY1Zja1pRMlBVa0VyaEZNUU1WMkdwOFd4czBBOS1yZGxyYmlsUHY4STJOOGVxUSIsImF1ZCI6IjR0amE3ZzFrMTAyYWhlc2dpNzB0NjNpY3EzIiwiaWRlbnRpdGllcyI6W3sidXNlcklkIjoiMjI5Mzc3OTQyNDAzODQ3NCIsInByb3ZpZGVyTmFtZSI6IkZhY2Vib29rIiwicHJvdmlkZXJUeXBlIjoiRmFjZWJvb2siLCJpc3N1ZXIiOm51bGwsInByaW1hcnkiOiJ0cnVlIiwiZGF0ZUNyZWF0ZWQiOiIxNTYyODI3MDg0NjM0In1dLCJ0b2tlbl91c2UiOiJpZCIsImF1dGhfdGltZSI6MTU3MjE1MzA0NywiZXhwIjoxNTcyMTU2NjQ3LCJpYXQiOjE1NzIxNTMwNDcsImVtYWlsIjoiYmh3MTk5NEBnbWFpbC5jb20ifQ.JVv78fZpAgVAFiRa3kmFTpysiURYl8gwaBEqsoMmqbezW7O1ujD6xlOCHo8ZK5jsTQBi4E5jMOh6NVpcRYtbHl0mMT9GDCZmnCWXhs6vepVXS5q4cNNtRLIbJLzhuMi_Seim_A-IUQ63x-jJBfUvWZbKi4KFoVBFl-a3N8lVesO-C8PmC91GqZ_woQcDnagtZULIRDyrTgtF4oEfBPNn7ATNrlHrXLK6dnOPxK9EJKFbPyeI9U8cw93ENuWUlQIZgkSqeYWDOPSxWH43hoQ0mwGQq016OzabCF_jAlk4uk98--7rh9VmjxV4bGoL3kixoIkKTO7sVvaCUHyrLUNqvg";

        //when
        const token = tokenDecoder.decode(accessToken);
        const header = token[0];
        const payload = token[1];
        const signiture = token[2];

        //then
        const expectedHeader = {
            "kid": "nXMgr4Tut01w8sIERI1DRYRd8l0kpHesb3UPAUxgLI4=",
            "alg": "RS256"
        };

        const expectedPayload = {
            "at_hash": "EtoBb6Rnnm3uKYgf86cDXg",
            "sub": "8ab48954-82fd-4725-b04a-d351d3dac70e",
            "cognito:groups": [
                "ap-northeast-2_qJ2JLSgrM_Facebook"
            ],
            "iss": "https://cognito-idp.ap-northeast-2.amazonaws.com/ap-northeast-2_qJ2JLSgrM",
            "cognito:username": "Facebook_2293779424038474",
            "nonce": "YYHfqS9dHEkqP1nH_MHJQHB7wrfHc3ZAd4-nRIi4FoHe9aO32wWIuquV6yCVRj67Lvej2Mw4D4WTbLnLy7zAUIqjwsePOoFIVfZsWHOcxw2X8MVlyUAo-ShOJvwVGcVckZQ2PUkErhFMQMV2Gp8Wxs0A9-rdlrbilPv8I2N8eqQ",
            "aud": "4tja7g1k102ahesgi70t63icq3",
            "identities": [
                {
                    "userId": "2293779424038474",
                    "providerName": "Facebook",
                    "providerType": "Facebook",
                    "issuer": null,
                    "primary": "true",
                    "dateCreated": "1562827084634"
                }
            ],
            "token_use": "id",
            "auth_time": 1572153047,
            "exp": 1572156647,
            "iat": 1572153047,
            "email": "bhw1994@gmail.com"
        };
        expect(header).to.eql(expectedHeader);
        expect(payload).to.eql(expectedPayload);
    });
});
