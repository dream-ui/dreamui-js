const path = require('path');
const filename = 'file://' + path.resolve('.', './dist/auto_test.html');

module.exports = {
  'createDom': function (browser) {
    browser
    .url(filename)
    .waitForElementVisible('body', 10000, false, function() {
      this
        .useXpath()
        .assert.cssClassPresent("/html/body/div[@id='app']", "app")
        .assert.cssClassPresent("/html/body/div[@id='createDom-test-one']", "test-one")
        // attrs
        .assert.attributeEquals("/html/body/div[@id='createDom-test-one']", "attr1", "attr-value1")
        .assert.attributeEquals("/html/body/div[@id='createDom-test-one']", "attru", "attr-value2")
        .assert.attributeEquals("/html/body/div[@id='createDom-test-one']", "attr3", '')
        // datas
        .assert.attributeEquals("/html/body/div[@id='createDom-test-one']", "data-aa", "aa")
        .assert.attributeEquals("/html/body/div[@id='createDom-test-one']", "data-bb-bbb-def", "bb")
        .assert.attributeEquals("/html/body/div[@id='createDom-test-one']", "data-cc-cc", "cc")
        // content
        .assert.containsText("/html/body/div[@id='createDom-test-one']", "哈哈哈哈哈")
        // childs
        .assert.containsText("/html/body/div[@id='createDom-test-one']/div[@class='child-one-div']", "child-one-div")
        .assert.elementPresent("/html/body/div[@id='createDom-test-one']/div[@class='child-two-div']")
        .assert.containsText("/html/body/div[@id='createDom-test-one']/div[@class='child-two-div']/span[@class='child-of-child2-content']", "child-of-child2-content")
        .useCss()
        .assert.containsText("body>div#createDom-test-one>.child-two-div>.child-of-child2-content", "child-of-child2-content")

        .end();
    }, 'elemento %s no era visible en %d ms');
  }
};
