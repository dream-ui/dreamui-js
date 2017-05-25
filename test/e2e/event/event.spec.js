
const PubSub = require('./../../../src/event/event');
const expect = require('chai').expect;

let pubsub = null;

describe('订阅发布模式: PubSub', function () {

  beforeEach(() => {
    pubsub = new PubSub();
  });

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

  it(`发布 test 事件后，触发 test1 事件，test订阅器不执行(1s内未执行)`, function (done) {
    let test = false;
    pubsub.on('test', (name, ...rest) => {
      test = true;
      done(new Error(`test event should don't be triggered. Triggered event-name is ${name}`));
    });
    pubsub.emit('test1', 'a');
    setTimeout(() => {
      done();
    }, 1000);
  });

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