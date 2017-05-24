const assert = require('power-assert');
const { compareVersion, toThousandBit } = require('./../src/base/base');
const expect = require('chai').expect;

// beforeEach(function () {
//   console.log('      ----- global beforeEach -----');
// });

describe('base.js', function () {
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

  describe('#TODO1', function() {
    it('should return -1 when the value is not present');
  });

  describe('#TODO2', function() {
    it.skip('should return -1 when the value is not present', function () {
      this.slow(10000);
    });
    it('#动态判断是否被执行', function() {
      this.skip();
    });
  });

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
});
