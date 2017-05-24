
const PubSub = require('./../src/event/event');
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
});