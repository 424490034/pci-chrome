`popup`是点击`browser_action`或者`page_action`图标时打开的一个小窗口网页，焦点离开网页就立即关闭，一般用来做一些临时性的交互。

`popup`可以包含任意你想要的 HTML 内容，并且会自适应大小。可以通过`default_popup`字段来指定 popup 页面，也可以调用`setPopup()`方法。

需要特别注意的是，由于单击图标打开 popup，焦点离开又立即关闭，所以 popup 页面的生命周期一般很短，需要长时间运行的代码千万不要写在 popup 里面。

在权限上，它和 background 非常类似，它们之间最大的不同是生命周期的不同，popup 中可以直接通过`chrome.extension.getBackgroundPage()`获取 background 的 window 对象。

## 与 background 通信示例

```js
// popup.js
var bg = chrome.extension.getBackgroundPage();
bg.popopMessage("消息"); // 访问bg的函数
```

## popup 或者 bg 向 content 主动发送消息示例

background.js 或者 popup.js：

```js
function sendMessageToContentScript(message, callback) {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, message, function (response) {
      if (callback) callback(response);
    });
  });
}
sendMessageToContentScript(
  { cmd: "test", value: "你好，我是popup！" },
  function (response) {
    console.log("来自content的回复：" + response);
  }
);
```

## popup 监听content-script的消息示例

```js
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse)
{
	console.log('收到来自content-script的消息：');
	console.log(request, sender, sendResponse);
	sendResponse('我是后台，我已收到你的消息：' + JSON.stringify(request));
});
/**
* content_scripts向popup主动发消息的前提是popup必须打开！否则需要利用background作中转；
如果background和popup同时监听，那么它们都可以同时收到消息，但是只有一个可以sendResponse，一个先发送了，那么另外一个再发送就无效；
*/
```

## popup长连接示例

```js
getCurrentTabId((tabId) => {
	var port = chrome.tabs.connect(tabId, {name: 'test-connect'});
	port.postMessage({question: '你是谁啊？'});
	port.onMessage.addListener(function(msg) {
		alert('收到消息：'+msg.answer);
		if(msg.answer && msg.answer.startsWith('我是'))
		{
			port.postMessage({question: '哦，原来是你啊！'});
		}
	});
});
```

