import 'mocha';
import chai = require('chai');

var assert = chai.assert;

describe('First test', 
  () => { 
    it('should return true', () => { 
      const result = "my test";
      assert(result, "my test"); 
  }); 
});