/**
 * @file 会一直常驻的后台JS或后台页面
 * @description 可以为页面 这里就默认为js了
 * 注意:是一个常驻的页面，它的生命周期是插件中所有类型页面中最长的，
 * 它随着浏览器的打开而打开，随着浏览器的关闭而关闭，
 * 所以通常把需要一直运行的、启动就运行的、全局的代码放在background里面。
 * background的权限非常高，几乎可以调用所有的Chrome扩展API（除了devtools），
 * 而且它可以无限制跨域，也就是可以跨域访问任何网站而无需要求对方设置CORS。
 * 经过测试，其实不止是background，
 * 所有的直接通过chrome-extension://id/xx.html这种方式打开的网页都可以无限制跨域。
 * 与eventPages二选一
 */
// background.js
// import './menus.js'
// import a from './omnibox.js';
/**
 * @function popupHtml 文件夹下的联系方法
 * 
 */
function popopMessage(str) {
    console.log(`接收到信息${str}`)
}

/**
 * @function 监听content-script发来的消息
 * @description 监听到消息做逻辑处理
 */
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    console.log('收到来自content-script的消息：');
    console.log(request, sender, sendResponse);
    sendResponse('我是后台，我已收到你的消息：' + JSON.stringify(request));
});

/**
 * @function 获取当前选项卡ID示例
 */
function getCurrentTabId(callback) {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        if (callback) callback(tabs.length ? tabs[0].id : null);
    });
}
/**
 * @function 获取当前选项卡ID示例2
 */
function getCurrentTabId2() {
    chrome.windows.getCurrent(function(currentWindow) {
        chrome.tabs.query({ active: true, windowId: currentWindow.id }, function(tabs) {
            if (callback) callback(tabs.length ? tabs[0].id : null);
        });
    });
}
/**
 * @function 本地存储-示例
 * @description chrome.storage是针对插件全局的，即使你在background中保存的数据，在content-script也能获取到；
 * chrome.storage.sync可以跟随当前登录用户自动同步，
 * 这台电脑修改的设置会自动同步到其它电脑，很方便，
 * 如果没有登录或者未联网则先保存到本地，等登录了再同步至网络；
 */
/**
 * @function 读取对应数据返回
 */
function getStorage(key, dea, callback) {
    chrome.storage.sync.get(key, function(items) {
        callback(items)
    });
}
/**
 * @function 读取对应数据返回
 */
function setStorage(key, data, callback) {
    chrome.storage.sync.set({
        [key]: data
    }, function() {
        console.log('保存成功！');
        if (callback) { callback() }
    });
}