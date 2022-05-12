/**
 * @file 这里是需要注入到页面的js文件
 * @description 注意事项
 * content-scripts和原始页面共享DOM，但是不共享JS，如要访问页面JS（例如某个JS变量），只能通过injected js来实现。content-scripts不能访问绝大部分chrome.xxx.api，除了下面这4种：
 *  chrome.extension(getURL , inIncognitoContext , lastError , onRequest , sendRequest)
 *  chrome.i18n
 *  chrome.runtime(connect , getManifest , getURL , id , onConnect , onMessage , sendMessage)
 *  chrome.storage
 */
window.onload = () => {
        // console.log('我胡汉三成功侵入代码,我又回来了')
        // console.log(window)
    }
    /**
     * @function 接收popup消息示例
     * @description 双方通信直接发送的都是JSON对象，不是JSON字符串，所以无需解析，很方便（当然也可以直接发送字符串）。
     */
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    // console.log(sender.tab ?"from a content script:" + sender.tab.url :"from the extension");
    if (request.cmd == 'test') alert(request.value);
    sendResponse('我收到了你的消息！');
});
/**
 * @function 主动发消息通知后台示例
 * @description 该示例为主动操作 所以根据实际情况进行使用
 */
//  chrome.runtime.sendMessage({greeting: '你好，我是content-script呀，我主动发消息给后台！'}, function(response) {
// 	console.log('收到来自后台的回复：' + response);
// });

/**
 * @function 监听inject发来的信息
 */
window.addEventListener("message", function(e) {
    // console.log(e.data);
}, false);
/**
 * @function 监听长链接
 */
chrome.runtime.onConnect.addListener(function(port) {
    // console.log(port);
    if (port.name == 'test-connect') {
        port.onMessage.addListener(function(msg) {
            // console.log('收到长连接消息：', msg);
            if (msg.question == '你是谁啊？') port.postMessage({ answer: '我是你爸！' });
        });
    }
});
/**
 * @function 动态注入css,js示例
 */
// 动态执行JS代码
// chrome.tabs.executeScript(tabId, {code: 'document.body.style.backgroundColor="red"'});
// 动态执行JS文件
// chrome.tabs.executeScript(tabId, { file: 'some-script.js' });
// 动态执行CSS代码，TODO，这里有待验证
// chrome.tabs.insertCSS(tabId, {code: 'xxx'});
// 动态执行CSS文件
// chrome.tabs.insertCSS(tabId, {file: 'some-style.css'});
/**
 * @function 获取当前窗口ID示例
 */
//  chrome.windows.getCurrent(function(currentWindow)
//  {
//      console.log('当前窗口ID：' + currentWindow.id);
//  });