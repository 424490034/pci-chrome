/**
 * @file 鼠标右键菜单
 */

let menus = [{
        id: 'main',
        title: '测试右键菜单',
        contexts: ['page', 'selection'],
    },
    {
        id: 'sub1',
        title: '百度搜索: %s',
        parentId: "main",
        contexts: ['page', 'selection'],
        onclick: function(params) {
            chrome.tabs.create({ url: 'https://www.baidu.com/s?ie=utf-8&wd=' + encodeURI(params.selectionText) });
        }
    }
]

function createMenu() {
    menus.map((item) => {
        chrome.contextMenus.create(item);
    })
}
createMenu()