
import {
  getParam,
  hasParam,
  addParams,
  addParam
} from './../../../src/broswer/Url.js';

describe('Url.js', function() {

  const url1 = 'http://www.xueboren.com/index.html?key1=v1&key2#end';

  describe('getParam', function() {
    it(`参数 key1 的值为 'v1'`, function () {
      expect(getParam(url, 'key1')).to.be.equal('v1');
    });
  });

  describe('hasParam', function() {
    it.skip('有参数 key1、key2, 没有参数 key3', function () {

    });
  });

  describe('addParams', function() {
    it.skip('添加参数 key3、key4, 并验证', function () {

    });
  });

  describe('addParam', function() {
    it.skip('添加参数 key3, 并验证', function () {

    });
  });

});


