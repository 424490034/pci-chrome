/**
 * @file event-pages
 * @description  鉴于background生命周期太长，长时间挂载后台可能会影响性能，
 * 所以Google又弄一个event-pages，在配置文件上，
 * 它与background的唯一区别就是多了一个persistent参数
 * 注意事项: 在被需要时加载，在空闲时被关闭，什么叫被需要时呢？
 * 比如第一次安装、插件更新、有content-script向它发送消息，等等。
 * 与background二选一
 */