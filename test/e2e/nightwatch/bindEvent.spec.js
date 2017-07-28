const path = require('path');
const filename = 'file://' + path.resolve('.', './dist/auto_test.html');

module.exports = {
  'bindEvent': function (browser) {
    browser
    .url(filename)
    .waitForElementVisible('body', 10000, false, function() {
      browser.assert.elementPresent("div#block-class-test.block-class-test")
              .click('div#transition-end-test button.start-btn')
              .pause(400)
              .assert.containsText('div#transition-end-test div.result-tip', 'ok')
              .end();
    }, 'elemento %s no era visible en %d ms');
  }
};
