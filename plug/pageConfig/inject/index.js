/**
 * @file 通过DOM操作的方式向页面注入的一种JS
 * 该文件原因: content-script有一个很大的“缺陷”，
 * 也就是无法访问页面中的JS，虽然它可以操作DOM，但是DOM却不能调用它，
 * 也就是无法在DOM中通过绑定事件的方式调用content-script中的代码
 * （包括直接写onclick和addEventListener2种方式都不行）
 */
// 向页面注入JS
function injectCustomJs(jsPath) {
    jsPath = jsPath || './test.js';
    var temp = document.createElement('script');
    temp.setAttribute('type', 'text/javascript');
    // 获得的地址类似：chrome-extension://ihcokhadfjfchaeagdoclpnjdiokfakg/js/inject.js
    temp.src = chrome.extension.getURL(jsPath);
    temp.onload = function() {
        // 放在页面不好看，执行完后移除掉
        this.parentNode.removeChild(this);
    };
    document.head.appendChild(temp);
}
/**
 * @function 与content-script通信示例
 * @description 由于2者是共享dom所以可以通过该方法通信
 */
//  window.postMessage({"test": '你好！'}, '*');