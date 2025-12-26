<div align="center">

![banner2](https://github.com/3metaJun/3meta/blob/main/static/banner2.jpg)

# 一套轻量级奇门遁甲排盘工具库

</div>

## 介绍

用于奇门遁甲排盘的开源库，有以下功能：

- 输入

    - 排盘时间（支持 `Date` 对象或日期字符串）
    - 可选参数
        - `solarTerm`: 指定节气
        - `isYangdun`: 指定阴阳遁
        - `juNumber`: 指定局数
        - `yearDivide`: 年份分界方式 ('normal' | 'exact')

- 可以实现下列功能

    - 奇门 9 宫的式盘数据（包含神、星、门、天盘干、地盘干等）
    - 完整的时间信息（四柱、节气、旬首、空亡等）
    - 局数信息（阴阳遁、局数、元）
    - 宫位分析（击刑、门迫、入墓等）
    - 星门旺衰
    - 常用吉凶格局判断

## 快捷跳转

- [问题](https://github.com/3metaJun/3meta/issues)
- [排盘](https://3meta.pub)

## 直接使用

如果你想要零开发直接查看 `3meta` 的排盘结果，请直接使用 [三元分析与决策系统](https://3meta.pub) 在线排盘。
- 多盘协同分析
- 支持与 AI 流式交互
- 支持复制为 AI 格式
- 对盘面保存 markdown 笔记
- 支持快捷键操作
- 以及更多

## 在项目中使用


```
npm install git+https://github.com/3metaJun/3meta.git
```

本地安装
```
npm install /path/to/3meta
```

## 使用说明

调用 `3meta` 获取到奇门遁甲式盘非常简单，只需要按照如下方式即可获得全部信息。

```typescript
import { QimenChart } from '3meta';

// 使用默认配置排盘
const chart = QimenChart.byDatetime('2023-12-01 12:00:00');

// 或者自定义参数
const customChart = QimenChart.byDatetime('2023-12-01 12:00:00', {
  solarTerm: '冬至',
  isYangdun: true,
  juNumber: 1,
  yearDivide: 'exact'
});

console.log(chart);
```

## 总结

使用本程序返回的数据，你可以生成这样一张式盘，本项目为你解决了最繁冗的工作，让你可以把精力更多的放在你所需要关注的事情上面。

<img width="966" alt="image" src="https://github.com/3metaJun/3meta/blob/main/static/charts-2025-12-25T16-34-35.png">

> [!NOTE]
> 请合理使用本开源代码，禁止用于非法目的。