import {expect} from "chai"
import '@babel/polyfill'

async function test(){
  return new Promise( (resolve,reject)=> {
    setTimeout(() => {
      resolve(1)
    }, 1000);
  } )
}

describe('Test', function () {
    it('async test',async function () {
      let value = await test();
      expect(value).to.equal(1);
    });
  });
