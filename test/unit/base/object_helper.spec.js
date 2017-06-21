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
      expect(result.a).to.be.equal('a2');
      expect(result.b).to.be.equal('b');
      expect(result.c).to.be.equal('c');
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
      expect(oPS.a).to.be.equal(3);
      expect(oPS.b).to.be.equal(4);
      expect(oPS.c).to.be.equal(5);
    });
  });

});
