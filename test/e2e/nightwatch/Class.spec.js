const path = require('path');
const filename = 'file://' + path.resolve('.', './dist/auto_test.html');

module.exports = {
  'Class.js': function (browser) {
    browser
    .url(filename)
    .waitForElementVisible('body', 10000, false, function() {
      browser.assert.elementPresent("div#block-class-test.block-class-test");
      // browser.elementIdElement('#block-class-test', 'block-class-test', 'body', function (ele) {
      //   console.log(ele);
      // });
      // browser.expect.element('#main').to.be.present;
      browser.expect.element('#block-class-test').to.have.attribute('class').contain('block-class-test');
      let hasClass = null;
      browser.execute(function(data) {
        window.classs.addClass(document.querySelector("#block-class-test"), 'abcdefg');
        hasClass = window.classs.hasClass(document.querySelector("#block-class-test"), 'abcdefg');
        return true;
      }, [], function(result) {
        browser.expect.element('#block-class-test').to.have.attribute('class', 'Expected element <#block-class-test> to have attribute "class" contain: "abcdefg" after executed addClass(ele, "abcdefg") mothod.')
          .contain('abcdefg');
        browser.expect.element('#block-class-test').to.have.attribute('class', 'Expected element <#block-class-test> to have attribute "class" contain: "abcdefg" for executed hasClass(ele, "abcdefg") mothod.')
          .contain('abcdefg').to.equal(hasClass);

        browser.execute(function(data) {
          window.classs.removeClass(document.querySelector("#block-class-test"), 'abcdefg');
          hasClass = window.classs.hasClass(document.querySelector("#block-class-test"), 'abcdefg');
          return true;
        }, [], function(result) {
          browser.expect.element('#block-class-test').to.have.attribute('class', 'Expected element <#block-class-test> to have attribute "class" not contain: "abcdefg" after executed removeClass(ele, "abcdefg") mothod.')
            .not.contain('abcdefg');
          browser.expect.element('#block-class-test').to.have.attribute('class', 'Expected element <#block-class-test> to have attribute "class" not contain: "abcdefg" for executed hasClass(ele, "abcdefg") mothod.')
            .not.contain('abcdefg').to.equal(hasClass);
        });

      });
      browser.end();
    }, 'elemento %s no era visible en %d ms');
  }
};
