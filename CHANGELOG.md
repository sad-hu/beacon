## 4.0.9 (2017-07-28)
* 恢复uid为uuid, 不采用fingerprint, 重复率太高

## 3.0.0 (2017-07-24)
* 增加编译系统

## 2.0.0 (2017-07-11)

* uid生成改用fingerprint，多站点通浏览器保持一致

## 1.1.0 (2017-05-16)

* 增加evt类型的新上报接口

## 1.0.0 (2017-05-15)

* xpath调整针对id的策略，不反悔id元素的父级path

## 1.0.0-alpha.3 (2017-04-26)

* 初始参数event改为clk, 只控制是否统计clk事件
* 新增会话时间session相关属性方法
* 监听visibilitychange事件，根据会话时间是否超时，计入pv(ie8/9不支持)
* 精简jquery
* visibilitychange设置3s延时，精确用户是否浏览