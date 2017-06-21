const assert = require('power-assert');
const {
  compareVersion,
  toThousandBit,
  isTrue,
  isFalse,
  isFunction
} = require('./../../../src/base/base');
const expect = require('chai').expect;

/** @test {Base} */
describe('base.js', function () {

  var iInt = 2,
      iObject = {
        func: () => {}
      },
      iFunction = function () {},
      iArrowFunction = () => {},
      iTrue = true,
      iFalse = false,
      iNull = null,
      iUndefined = undefined,
      iArray = [1, 2, 3, 4],
      iEmptyArray = [],
      iString = 'test-string',
      iEmptyString = '',
      iBlankString = ' ';

  /** @test {Base#compareVersion} */
  describe('版本号比较: compareVersion', function () {
    // before('分配资源: ', function () {
    //   console.log('      ----- before -----');
    // });

    // after('回收资源: ', function () {
    //   console.log('      ----- after -----');
    // });

    // beforeEach(function () {
    //   console.log('      ----- beforeEach -----');
    // });

    // afterEach(function () {
    //   console.log('      ----- afterEach -----');
    // });

    it('2.0.0 应该大于 1.9.99', function () {
      // assert(compareVersion('2.0.0', '1.9.99') === 10); // power-assert 示例: 错误信息详细
      expect(compareVersion('2.0.0', '1.9.99')).to.be.equal(1);
    });

    it('2.0.0 应该等于 2.0.0', function () {
      expect(compareVersion('2.0.0', '2.0.0')).to.be.equal(0);
    });
    it('2.0.0 应该等于 2', function () {
      expect(compareVersion('2.0.0', '2')).to.be.equal(0);
    });

    it('2.0.0 应该小于 2.1', function () {
      expect(compareVersion('2.0.0', '2.1')).to.be.equal(-1);
    });
    it('1.6.7 应该小于 1.6.59.78.8', function () {
      expect(compareVersion('2.0.0', '2.1')).to.be.equal(-1);
    });

  });

  /** @test {Base#toThousandBit} */
  describe('千分位转换: toThousandBit', function () {
    it('数字:1234567890 应该转换为 1,234,567,890', function () {
      expect(toThousandBit(1234567890)).to.be.equal('1,234,567,890');
    });
    it('字符串:1234567890 应该转换为 1,234,567,890', function () {
      expect(toThousandBit('1234567890')).to.be.equal('1,234,567,890');
    });
    it('数字:12 应该转换为 11', function () {
      expect(toThousandBit(12)).to.be.equal('12');
    });
    it('字符串:12 应该转换为 11', function () {
      expect(toThousandBit('12')).to.be.equal('12');
    });
  });

  describe('isTrue', function () {
    it(`'${iTrue}' 严格等于 true `, function () {
      expect(isTrue(iTrue)).to.be.equal(true);
    });
    it(`'${iFalse}' 不严格等于 true `, function () {
      expect(isTrue(iFalse)).to.be.equal(false);
    });
    it(`'${iNull}' 不严格等于 true `, function () {
      expect(isTrue(iNull)).to.be.equal(false);
    });
    it(`'${iUndefined}' 不严格等于 true `, function () {
      expect(isTrue(iUndefined)).to.be.equal(false);
    });
  });

  describe('isFalse', function () {
    it(`'${iTrue}' 不严格等于 false `, function () {
      expect(isFalse(iTrue)).to.be.equal(false);
    });
    it(`'${iFalse}' 严格等于 false `, function () {
      expect(isFalse(iFalse)).to.be.equal(true);
    });
    it(`'${iNull}' 不严格等于 false `, function () {
      expect(isFalse(iNull)).to.be.equal(false);
    });
    it(`'${iUndefined}' 不严格等于 false `, function () {
      expect(isFalse(iUndefined)).to.be.equal(false);
    });
  });

  /** @test {isFunction} */
  describe('isFunction', function () {
    it('普通函数是函数', function () {
      expect(isFunction(iFunction)).to.be.equal(true);
    });
    it('箭头函数是函数', function () {
      expect(isFunction(iArrowFunction)).to.be.equal(true);
    });
    it('null 不是函数', function () {
      expect(isFunction(iNull)).to.be.equal(false);
    });
    it('数组不是函数', function () {
      expect(isFunction(iArray)).to.be.equal(false);
    });
  });

});
