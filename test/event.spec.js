
const PubSub = require('./../src/event/event');
const expect = require('chai').expect;

let pubsub = null;

describe('订阅发布模式: PubSub', function () {

  beforeEach((done) => {
    pubsub = new PubSub();
    done();
  });

  it('发布 test 事件', function () {
    pubsub.subscribe('test', (name) => {
      if (name === 'test') {
        expect('name').to.be.equal('test');
      }
    });
    pubsub.publish('test');
    // expect(compareVersion('2.0.0', '1.9.99')).to.be.equal(1);
  });
});