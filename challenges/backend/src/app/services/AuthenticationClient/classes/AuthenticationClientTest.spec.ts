import 'mocha';
import chai = require('chai');
import axios from 'axios';

var assert = chai.assert;

describe('Authentication tests', 
  () => { 
    it('Should return true', () => {
        const authenticated = true;
        const userId = "salesman@random.com";
        axios.put("https://api-core-dev.caronsale.de/api/v1/authentication/salesman@random.com",
            { "password": "123test", "meta": "string" }).then( (res) => {
                assert(res.data.userId, userId)
                assert.strictEqual(res.status, 201)
                assert.strictEqual(res.data.authenticated, authenticated)
            })        
    });

    it('Should return false', () => {
        axios.put("https://api-core-dev.caronsale.de/api/v1/authentication/salesman@salesman.com",
            { "password": "test", "meta": "string" }).then( (res) => {
                assert.strictEqual(res.status, 201)
            })        
    });
});