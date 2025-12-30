<div align="center">

![banner2](https://github.com/3metaJun/3meta/blob/main/static/banner2.jpg)

# 一套轻量级奇门遁甲排盘工具库

简体中文 / [繁體中文](./README-zh_TW.md) / [English](./README-en_US.md)

</div>

<div align="center">

  [![NPM Version](https://img.shields.io/npm/v/3meta)](https://www.npmjs.com/package/3meta)
  [![License](https://img.shields.io/github/license/3metaJun/3meta)](https://github.com/3metaJun/3meta)
  [![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2F3metaJun%2F3meta.svg?type=shield&issueType=license)](https://app.fossa.com/projects/git%2Bgithub.com%2F3metaJun%2F3meta?ref=badge_shield&issueType=license)
  [![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2F3metaJun%2F3meta.svg?type=shield&issueType=security)](https://app.fossa.com/projects/git%2Bgithub.com%2F3metaJun%2F3meta?ref=badge_shield&issueType=security)
  
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
    - 暗干信息
    - 多语言支持 (zh-CN, zh-TW, en-US)

## 命令行工具 (CLI)

`3meta` 提供了一个方便的命令行工具 `qimen`，支持生成 JSON 格式的排盘数据，并支持多语言输出。

```bash
npm run build
node bin/qimen.js --date 2023-12-01T12:00:00 --lang en-US
```

支持参数：
- `--date`: 日期时间 (ISO)
- `--lang`: 语言 (zh-CN, zh-TW, en-US)
- `--solarTerm`: 指定节气
- 以及更多 (查看 `node bin/qimen.js --help`)

## 快捷跳转

- [教程](https://docs.3meta.pub/)
- [问题](https://github.com/3metaJun/3meta/issues)
- [排盘](https://3meta.pub)

## 直接使用

如果你想要零开发直接查看 `3meta` 的排盘结果，请直接使用 [三元（3meta.pub）](https://3meta.pub) 在线排盘。
- 多盘协同分析
- 支持与 AI 流式交互
- 支持复制为 AI 格式
- 对盘面保存 markdown 笔记
- 支持快捷键操作
- 以及更多

## 在项目中使用

从 npm 安装（推荐）
```bash
npm install 3meta
```

从 GitHub 安装
```bash
npm install git+https://github.com/3metaJun/3meta.git
```

或者本地安装
```bash
npm install /path/to/3meta
```

## 独立 JavaScript 库
假如你使用的是静态 HTML 文件，可以从 [release](https://github.com/3metaJun/3meta/releases) 下载资源文件。

> `v2.0.0+` 版本才提供独立js库。

将 `3meta.min.js` 用 `script` 标签引入 HTML 文件使用。

```html
<script src="3meta.min.js"></script>
<script>
    // 切换为英文
    ThreeMeta.i18n.setLocale('en-US');
    
    const chart = ThreeMeta.QimenChart.byDatetime('2023-12-01 12:00:00');
    
    // 使用格式化工具输出格局描述
    chart.palaces.forEach(p => {
        p.auspiciousPatterns.forEach(pat => {
            console.log(ThreeMeta.formatPattern(pat));
        });
    });
</script>
</html>
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

## 多语言支持 (i18n)

你可以通过 `i18n` 对象轻松切换语言并格式化输出：

```typescript
import { QimenChart, i18n, formatPattern } from '3meta';

// 设置为英文
i18n.setLocale('en-US');

const chart = QimenChart.byDatetime('2023-12-01 12:00:00');

// 格式化格局描述
chart.palaces.forEach(p => {
  p.auspiciousPatterns.forEach(pat => {
    console.log(formatPattern(pat)); // 输出英文描述
  });
});

// 手动翻译特定术语
console.log(i18n.t('stems.甲')); // "Jia"
```

## 总结

使用本程序返回的数据，你可以生成这样一张式盘，本项目为你解决了最繁冗的工作，让你可以把精力更多的放在你所需要关注的事情上面。

<img width="966" alt="image" src="https://github.com/3metaJun/3meta/blob/main/static/charts-2025-12-25T16-34-35.png">

> [!NOTE]
> 请合理使用本开源代码，禁止用于非法目的。