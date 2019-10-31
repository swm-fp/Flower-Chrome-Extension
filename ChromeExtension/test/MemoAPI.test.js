import MemoAPI from "../src/apis/MemoAPI"
import chai, { expect } from "chai"

const token = "eyJraWQiOiJuWE1ncjRUdXQwMXc4c0lFUkkxRFJZUmQ4bDBrcEhlc2IzVVBBVXhnTEk0PSIsImFsZyI6IlJTMjU2In0.eyJhdF9oYXNoIjoicVlicW5teVBpT05fWDB5OGJYU2I3ZyIsInN1YiI6IjhhYjQ4OTU0LTgyZmQtNDcyNS1iMDRhLWQzNTFkM2RhYzcwZSIsImNvZ25pdG86Z3JvdXBzIjpbImFwLW5vcnRoZWFzdC0yX3FKMkpMU2dyTV9GYWNlYm9vayJdLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAuYXAtbm9ydGhlYXN0LTIuYW1hem9uYXdzLmNvbVwvYXAtbm9ydGhlYXN0LTJfcUoySkxTZ3JNIiwiY29nbml0bzp1c2VybmFtZSI6IkZhY2Vib29rXzIyOTM3Nzk0MjQwMzg0NzQiLCJub25jZSI6ImVOOGNaX3FycFhraGlWYWI2MnNnTFZuOW82b29VNDM5V19OUU9jYjZoOFNDUXMycFRQRTNCaVoxTUZWSlRvaE5JelhJMWhpOG9ITWNnY2dhdWh4aHMybWdIYzJ1TWpSNUlFcGdWbGpEbHM5T1M5WWtOcWFHRU4tcUVHbFRrNHN5WnBMX0hwV3Zva0pqQlUyVWgtRkRITGlzdE1HTGFZcnRVcktOZHpnenRqVSIsImF1ZCI6IjR0amE3ZzFrMTAyYWhlc2dpNzB0NjNpY3EzIiwiaWRlbnRpdGllcyI6W3sidXNlcklkIjoiMjI5Mzc3OTQyNDAzODQ3NCIsInByb3ZpZGVyTmFtZSI6IkZhY2Vib29rIiwicHJvdmlkZXJUeXBlIjoiRmFjZWJvb2siLCJpc3N1ZXIiOm51bGwsInByaW1hcnkiOiJ0cnVlIiwiZGF0ZUNyZWF0ZWQiOiIxNTYyODI3MDg0NjM0In1dLCJ0b2tlbl91c2UiOiJpZCIsImF1dGhfdGltZSI6MTU3MjUxMzQyMiwiZXhwIjoxNTcyNTE3MDIyLCJpYXQiOjE1NzI1MTM0MjIsImVtYWlsIjoiYmh3MTk5NEBnbWFpbC5jb20ifQ.pLf4HMR7kmbTDUGLLvpPJ1brOU7VxElrIfymDak85rNu65OxOEQby6lNUqyxi1pr5minZLXb5bkLfJpmucE5bDIOAFu-_zJlOytdCAnQYB9sJbZ_0HSP0FNX7eN3j9IYR4iOTCxGPN6AP44KPTxswgEt9a-zwcf2Egw5DgxoD57M88ykMi6DDODVSMrmTE0pbghonRIBl_cCKOgc4PpjeQVD3s0dos-oz-xxEsqETfpvVSV48jQyyvBL8xG_n6T03HqCjYK4PPyjXpfnLSQ7XrCYZMWZyGM67H0yEX3Hwr_Xmf0ZnuXnp_cSCb0AznrmadUrlmAkNwAIoFpsjp-Agw";

describe("MemoAPI Test", function () {
    it("should post memos", async function () {
        //given 
        const memoList = [{ content: "memo1", url: "google.com" }, { content: "memo2", url: "google.com" }];
        
        //when
        const response = await MemoAPI.postMemos(token,memoList);

        //then
        const expectedResponse = { status: 200 }
        expect(response).to.contain(expectedResponse);

    });

    it("should get memos", async function () {
        //given 
        
        const requestUrl = "google.com";
        //when
        const response = await MemoAPI.getMemos(token,requestUrl);

        //then
        const expectedResponse = { status: 200 }
        expect(response).to.contain(expectedResponse);

    });

    it("should get all user's memos", async function () {
        
        //when
        const response = await MemoAPI.getMemos(token);

        //then
        const expectedResponse = { status: 200 }
        expect(response).to.contain(expectedResponse);

    });

});
