## 1.0.0-alpha.3 (2017-04-26)

* 初始参数event改为clk, 只控制是否统计clk事件
* 新增会话时间session相关属性方法
* 监听visibilitychange事件，根据会话时间是否超时，计入pv(ie8/9不支持)
* 精简jquery
* visibilitychange设置5s延时，精确用户是否浏览