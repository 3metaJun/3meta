## qimen.js 使用说明
cd C:\Users\Administrator\Documents\3meta
npm run build

时间上的输入方式：
--date 2008-11-04T12:30:00
或 --year 2008 --month 11 --day 4 --hour 12 --minute 30 --second 0

#### 默认是 exact 表示按立春作为年分界
可选覆盖：--solarTerm 霜降、--isYangdun false、--juNumber 2、--yearDivide normal|exact
输出完整奇门局 JSON。
--help 查看用法。
现有 QimenChart.fromSolar/byDatetime 已完成排盘计算（使用 lunar-typescript）。

##### 查看帮助
node bin/qimen.js --help

##### 最简：全自动推算节气/阴阳遁/局数
node bin/qimen.js --date 2008-11-04T12:30:00

##### 或用分拆年月日时（分秒可省略）
node bin/qimen.js --year 2008 --month 11 --day 4 --hour 12 --minute 30

##### 如需手动覆盖（可选）
node bin/qimen.js --date 2008-11-04T12:30:00 --solarTerm 霜降 --isYangdun false --juNumber 2 --yearDivide normal

---

## get24JieQiByYear.js 使用说明
node bin/get24JieQiByYear.js --year 2026

输出 24 节气精确开始时间（本地时区）。

示例输出：
```
立春 2026-02-04 04:02:08
雨水 2026-02-18 23:51:56
...
大寒 2027-01-20 15:29:50
```
