// const style = require('./../../src/dom/Style');
const { createDom } = require('./../../..//src/broswer/dom/Dom');
// const classs = require('./../../src/dom/Class');

window.createDom = createDom;
window.classs = require('./../../../src/broswer/dom/Class');

// const ele = createDom('div.c-parent.my-class-name#c-parent{{c-parent}}');

const ele = createDom({
  tag: 'div',
  id: 'createDom-test-one',
  content: '哈哈哈哈哈',
  class: 'p-test-one',
  datas: {
    aa: 'aa',
    ccCC: 'cc',
    bbBBBDef: 'bb'
  },
  attrs: {
    attr1: 'attr-value1',
    attru: 'attr-value2',
    class: 'test-one',
    attr3: ''
  },
  childs: [
    {
      tag: 'div',
      content: 'child-one-div',
      attrs: {
        class: 'child-one-div'
      }
    },
    {
      tag: 'div',
      attrs: {
        class: 'child-two-div'
      },
      childs: [
        {
          tag: 'span',
          content: 'child-of-child2-content',
          attrs: {
            class: 'child-of-child2-content'
          },
        }
      ]
    }
  ]
});
document.body.appendChild(ele);
