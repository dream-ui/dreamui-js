require('thunk-mocha')();

it('support sync test', function () {
  // do some test
});

it('support thunk style async test', function (done) {
  // do some test
  done();
});

it('support promise style async test', function () {
  return new Promise(function (resolve, reject) {
    // reject(new Error('e-r'));
    resolve();
  });
});

it('support generator style async test', function * () {
  // do some test
  yield new Promise(function (resolve, reject) {
    resolve();
  });
  // yield thunk
  // yield generator
  // ...
});

it('support async/await style async test', async function () {
  // do some test
  await new Promise(function (resolve, reject) {
    resolve();
  });
});

it.skip('support Rx.Observable style async test', function () {
  // do some test
  // return Rx.Observable.bindNodeCallback(fs.stat)('package.json');
});
