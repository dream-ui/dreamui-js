const {
  isFunction,
  isEmptyString,
  isTrue,
  isFalse,
  isArray,
  arrayEqual,
  arrayRemoveIndex,
  arrayRemoveObject,
  arrayRemoveRepeat
} = require('./../../../src/types/types');
const expect = require('chai').expect;

/** @test {types} */
describe('types: 数据类型相关函数', function () {

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
  // arrayEqual
  var eArray1 = [1, 2],
      eArray2 = [1, '2'],
      eArray3 = [1, 2],
      eArray4 = [];
  // arrayRemoveIndex、 arrayRemoveObject,
  var dArray = [1, 2, 3, 4, '5', 6, 7, 8, 9, 10],
      dArrayD0 = [2, 3, 4, '5', 6, 7, 8, 9, 10],
      dArrayD9 = [1, 2, 3, 4, '5', 6, 7, 8, 9],
      dArrayD4 = [1, 2, 3, 4, 6, 7, 8, 9, 10],
      dArrayD5 = [1, 2, 3, 4, '5', 7, 8, 9, 10];
  // arrayRemoveRepeat
  var rArray1 = [1, 2, 3, 4],
      rArray2 = [1, 3, 5, 6],
      rArrayResult = [2, 4],
      rArray12MergeResult = [1, 2, 3, 4, 5, 6],
      rArray12UniqResult = [2, 3, 5, 6],
      rArray12IntersectionResult = [1, 3];

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

  describe('isEmptyString', function () {
    it(`'${iEmptyString}' 是空字符串 `, function () {
      expect(isEmptyString(iEmptyString)).to.be.equal(true);
    });
    it(`'${iBlankString}' 是空字符串 `, function () {
      expect(isEmptyString(iBlankString)).to.be.equal(true);
    });
    it('null 不是空字符串', function () {
      expect(isEmptyString(iNull)).to.be.equal(false);
    });
    it('undefined 不是空字符串', function () {
      expect(isEmptyString(iUndefined)).to.be.equal(false);
    });
    it(`'${iString}' 不是空字符串 `, function () {
      expect(isEmptyString(iString)).to.be.equal(false);
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

  describe('isArray', function () {
    it(`'${iArray}' 是数组`, function () {
      expect(isArray(iArray)).to.be.equal(true);
    });
    it(`'${iEmptyArray}' 是数组`, function () {
      expect(isArray(iEmptyArray)).to.be.equal(true);
    });
    // 以下为不是数组的情况
    it(`'${iNull}' 不是数组`, function () {
      expect(isArray(iNull)).to.be.equal(false);
    });
    it(`'${iUndefined}' 不是数组`, function () {
      expect(isArray(iUndefined)).to.be.equal(false);
    });
    it(`'${iString}' 不是数组`, function () {
      expect(isArray(iString)).to.be.equal(false);
    });
    it(`'${iEmptyString}' 不是数组`, function () {
      expect(isArray(iEmptyString)).to.be.equal(false);
    });
  });

  describe('arrayEqual', function () {
    it(`数组 '[${eArray1}]' 与数组 '[${eArray2}]' 内容不一致`, function () {
      expect(arrayEqual(eArray1, eArray2)).to.be.equal(false);
    });
    it(`数组 '[${eArray1}]' 与数组 '[${eArray3}]' 内容一致`, function () {
      expect(arrayEqual(eArray1, eArray3)).to.be.equal(true);
    });
    it(`数组 '[${eArray1}]' 与数组 '[${eArray4}]' 内容不一致`, function () {
      expect(arrayEqual(eArray1, eArray4)).to.be.equal(false);
    });
  });

  describe('依据索引删除数组中的某一项: arrayRemoveIndex', function () {
    it(`'[${dArray}]' 删除第0项结果为 '[${dArrayD0}]'`, function () {
      expect(arrayEqual(arrayRemoveIndex(dArray, 0), dArrayD0)).to.be.equal(true);
    });
    it(`"[${dArray}]" 删除第9项结果为 '[${dArrayD9}]'`, function () {
      expect(arrayEqual(arrayRemoveIndex(dArray, 9), dArrayD9)).to.be.equal(true);
    });
    it(`'[${dArray}]' 删除第4项结果为 '${dArrayD4}'`, function () {
      expect(arrayEqual(arrayRemoveIndex(dArray, 4), dArrayD4)).to.be.equal(true);
    });
    it(`'[${dArray}]' 删除第5项结果为 '${dArrayD5}'`, function () {
      expect(arrayEqual(arrayRemoveIndex(dArray, 5), dArrayD5)).to.be.equal(true);
    });
  });

  describe('依据值删除数组中的某一项: arrayRemoveObject', function () {
    it(`[${dArray}] 删除项 1 结果为 [${dArrayD0}]`, function () {
      expect(arrayEqual(dArrayD0, arrayRemoveObject(dArray, 1))).to.be.equal(true);
    });
    it(`[${dArray}] 删除项 '5' 结果为 [${dArrayD4}]`, function () {
      expect(arrayEqual(dArrayD4, arrayRemoveObject(dArray, '5'))).to.be.equal(true);
    });
    it(`[${dArray}] 删除项 10 结果为 [${dArrayD9}]`, function () {
      expect(arrayEqual(dArrayD9, arrayRemoveObject(dArray, 10))).to.be.equal(true);
    });
    it(`[${dArray}] 删除项 6 结果为 [${dArrayD5}]`, function () {
      expect(arrayEqual(dArrayD5, arrayRemoveObject(dArray, 6))).to.be.equal(true);
    });
  });

  describe('数组差集: arrayRemoveRepeat', function () {
    it(`[${rArray1}] 去除 [${rArray2}] 中包含的元素, 结果为: [${rArrayResult}]`, function () {
      expect(arrayEqual(arrayRemoveRepeat(rArray1, rArray2), rArrayResult)).to.be.equal(true);
    });
  });

  // 实现参考: http://blog.csdn.net/u010571844/article/details/50727714
  describe('双数组去重: arrayUnion', function () {
    it.skip(`[${rArray1}] 与 [${rArray2}] 去重结果为: [${rArray12UniqResult}]`, function () {
      expect(arrayEqual(arrayUnion(rArray1, rArray2), rArray12UniqResult)).to.be.equal(true);
    });
  });

  describe('数组并集合并: arrayMerge', function () {
    it.skip(`[${rArray1}] 与 [${rArray2}] 并集合并结果为: [${rArray12MergeResult}]`, function () {
      expect(arrayEqual(arrayMerge(rArray1, rArray2), rArray12MergeResult)).to.be.equal(true);
    });
  });

  // 两个数组都包含的值
  describe('数组交集: arrayIntersection', function () {
    it.skip(`[${rArray1}] 与 [${rArray2}] 交集为: [${rArray12IntersectionResult}]`, function () {
      expect(arrayEqual(arrayIntersection(rArray1, rArray2), rArray12IntersectionResult)).to.be.equal(true);
    });
  });

});
