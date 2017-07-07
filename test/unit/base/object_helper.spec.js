const {
  propertyScanner,
  objectMerge
} = require('./../../../src/base/object_helper');
const expect = require('chai').expect;

/** @test {types} */
describe('Object 相关操作函数', function () {

  var oA = { a: 'a' };
  var oB = { b: 'b' };
  var oC = { c: 'c' };
  var oA2 = { a: 'a2' };
  var result = null;

  describe('objectMerge', function () {
    result = objectMerge(oA, oB, oC, oA2);
    it(` 是空字符串 `, function () {
      expect(result).to.have.property('a', 'a2');
      expect(result).to.have.property('b', 'b');
      expect(result).to.have.property('c', 'c');
    });
  });

  var oPS = {
    a: 1, b: 2, c: 3
  };
  describe('propertyScanner', function () {
    propertyScanner(oPS, function (prop, val, obj) {
      obj[prop]++;
      obj[prop]++;
    });
    it(` propertyScanner `, function () {
      expect(oPS).to.have.property('a', 3);
      expect(oPS).to.have.property('b', 4);
      expect(oPS).to.have.property('c', 5);
    });
  });

});
