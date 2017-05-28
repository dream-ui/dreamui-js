
const PubSub = require('./../../../src/event/event');
const expect = require('chai').expect;

let pubsub = null;

/** @test {PubSub} */
describe('订阅发布模式: PubSub', function () {

  beforeEach(() => {
    pubsub = new PubSub();
  });

  /** @test {PubSub#emit} */
  describe('发布事件: emit', function () {
    it(`发布 test 事件后，触发 test 事件订阅器，并且参数为 'a'`, function (done) {
      pubsub.on('test', (name, ...rest) => {
        if (name === 'test') {
          if (rest[0] === 'a') {
            done();
          } else {
            done(new Error(`params should contain the string 'a'`));
          }
        } else {
          done(new Error(`event-name should be the stirng 'test'`));
        }
      });
      pubsub.emit('test', 'a');
    });
  });

  /** @test {PubSub#on} */
  describe('订阅事件: on', function () {
    it(`发布 test 事件后，触发 两次test 事件,参数分为为 'a'、'b'，订阅器执行两次`, function (done) {
      let a = false, b = false;
      function ensureDone () {
        if (a && b) done();
      }
      pubsub.on('test', (name, ...rest) => {
        if (name === 'test') {
          if (rest[0] === 'a') {
            a = true;
            ensureDone();
          } else if (rest[0] === 'b') {
            b = true;
            ensureDone();
          } else {
            done(new Error(`params should contain the string 'a' or 'b'`));
          }
        } else {
          done(new Error(`event-name should be the stirng 'test'`));
        }
      });
      pubsub.emit('test', 'a');
      pubsub.emit('test', 'b');
    });
  });

  /** @test {PubSub#unOn} */
  describe('取消订阅事件: unOn', function () {
    it(`订阅 test 事件 --> 发布 test 事件(参数: 'a') --> 取消订阅 test 事件 ---> 发布 test 事件(参数: 'b')`, function (done) {
      let a = false, b = false;
      function ensureDone () {
        setTimeout(() => {
          if (a && !b) done();
        }, 1000);
      }
      const callback = (name, ...rest) => {
        if (name === 'test') {
          if (rest[0] === 'a') {
            a = true;
          } else if (rest[0] === 'b') {
            b = true;
          } else {
            done(new Error(`params should contain the string 'a' or 'b'`));
          }
        } else {
          done(new Error(`event-name should be the stirng 'test'`));
        }
      };

      pubsub.on('test', callback);
      pubsub.emit('test', 'a');

      pubsub.unOn('test', callback);
      pubsub.emit('test', 'b');
      ensureDone();
    });
  });

  /** @test {PubSub#all} */
  describe('全局订阅事件: all', function () {
    it.skip(`pubsub.all()`, function (done) {
      let test1 = false, test2 = false;
      function ensureDone () {
        test1 && test2 && done();
      }
      pubsub.all(function (name) {
        if (name === 'test1') {
          test1 = true;
        } else if (name === 'test2') {
          test1 = false;
          ensureDone();
        } else {
          done(new Error(`Triggered event name should be 'test1' or 'test2'`));
        }
      });
      pubsub.emit('test1');
      pubsub.emit('test2');
    });
  });

  /** @test {PubSub#unAll} */
  describe('全局订阅事件: unAll', function () {
    it.skip(`pubsub.unAll()`, function (done) {
      let test1 = false, test2 = false;
      function ensureDone () {
        setTimeout(() => {
          test1 && !test2 && done();
        }, 1000);
      }
      const allCallback = function (name) {
        if (name === 'test1') {
          test1 = true;
        } else if (name === 'test2') {
          test1 = false;
          ensureDone();
        } else {
          done(new Error(`Triggered event name should be 'test1' or 'test2'`));
        }
      };

      pubsub.all(allCallback);
      pubsub.emit('test1');
      pubsub.unAll(allCallback);
      pubsub.emit('test2');
    });
  });

  /** @test {PubSub} */
  describe('综合测试1: on emit', function () {
    it(`订阅 test 事件 --> 发布 test1 事件，test订阅事件1s内不执行`, function (done) {
      const test = false;
      pubsub.on('test', (name, ...rest) => {
        test = true;
        done(new Error(`test event should don't be triggered. Triggered event-name is ${name}`));
      });
      pubsub.emit('test1', 'a');
      setTimeout(() => {
        done();
      }, 1000);
    });
  });

});