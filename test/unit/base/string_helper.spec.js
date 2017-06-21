const {
  isEmptyString,
  stringSplit,
  pascalToCamel,
  camelToPascal,
  camelPascalToHyphe,
  hypheToPascal,
  hypheToCamel
} = require('./../../../src/base/string_helper');
const expect = require('chai').expect;

/** @test {types} */
describe('字符串相关函数', function () {

  var iNull = null,
      iUndefined = undefined,
      iString = 'test-string',
      iEmptyString = '',
      iBlankString = ' ';

  describe('isEmptyString', function () {
    it(`'${iEmptyString}' 是空字符串(strict model)`, function () {
      expect(isEmptyString(iEmptyString, true)).to.be.equal(true);
    });
    it(`'${iBlankString}' 是空字符串(strict model)`, function () {
      expect(isEmptyString(iBlankString, true)).to.be.equal(true);
    });
    it('null 不是空字符串(strict model)', function () {
      expect(isEmptyString(iNull, true)).to.be.equal(false);
    });
    it('undefined 不是空字符串(strict model)', function () {
      expect(isEmptyString(iUndefined, true)).to.be.equal(false);
    });
    it(`'${iString}' 不是空字符串(strict model)`, function () {
      expect(isEmptyString(iString, true)).to.be.equal(false);
    });

    it(`'${iEmptyString}' 是空字符串(not-strict model)`, function () {
      expect(isEmptyString(iEmptyString)).to.be.equal(true);
    });
    it(`'${iBlankString}' 是空字符串(not-strict model)`, function () {
      expect(isEmptyString(iBlankString)).to.be.equal(true);
    });
    it('null 是空字符串(not-strict model)', function () {
      expect(isEmptyString(iNull)).to.be.equal(true);
    });
    it('undefined 是空字符串(not-strict model)', function () {
      expect(isEmptyString(iUndefined)).to.be.equal(true);
    });
    it(`'${iString}' 不是空字符串(not-strict model)`, function () {
      expect(isEmptyString(iString)).to.be.equal(false);
    });
  });

  var iStringSplit = '2014-01/10 20:45:00';
  describe('stringSplit', function () {
    it(`'${iStringSplit}' stringSplit 结果应该为: [2014, 01, 10, 10, 45, 00]`);
  });


  describe('命名规则转换', function () {

    describe('pascalToCamel', function () {
      it(`IsMobile --> isMobile`, function () {
        expect(pascalToCamel('IsMobile')).to.be.equal('isMobile');
      });
    });

    describe('camelToPascal', function () {
      it(`isMobile --> IsMobile`, function () {
        expect(camelToPascal('isMobile')).to.be.equal('IsMobile');
      });
    });

    describe('camelPascalToHyphe', function () {
      it(`isMobile --> is-mobile`, function () {
        expect(camelPascalToHyphe('isMobile')).to.be.equal('is-mobile');
      });
      it(`IsMobile --> is-mobile`, function () {
        expect(camelPascalToHyphe('IsMobile')).to.be.equal('is-mobile');
      });
    });

    describe('hypheToPascal', function () {
      it(`is-mobile --> IsMobile`, function () {
        expect(hypheToPascal('is-mobile')).to.be.equal('IsMobile');
      });
    });

    describe('hypheToCamel', function () {
      it(`is-mobile --> isMobile`, function () {
        expect(hypheToCamel('is-mobile')).to.be.equal('isMobile');
      });
    });

  });

});
