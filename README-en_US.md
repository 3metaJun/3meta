<div align="center">

![banner2](https://github.com/3metaJun/3meta/blob/main/static/banner2.jpg)

# A Lightweight Qimen Dunjia Chart Generation Library

[简体中文](./README.md) / [繁體中文](./README-zh_TW.md) / English

</div>

## Introduction

An open-source library for generating Qimen Dunjia charts, featuring the following capabilities:

*   Input

    *   Chart Layout Time (supports both `Date` objects and date strings)
    *   Optional Parameters
        *   `solarTerm`: Specifies the solar term
        *   `isYangdun`: Specifies Yang or Yin Dun
        *   `juNumber`: Specifies the Ju number.
        *   `yearDivide`: Year boundary calculation method ('normal' | 'exact')
*   The following features are supported:

    *   Qimen Dunjia’s 9-Palace chart data (including deities, stars, doors, heavenly stems on the movable disc, and earthly stems on the fixed disc)
    *   Complete time information (Four Pillars, solar terms, Xun Shou, Kong Wang, etc.)
    *   Chart information (Yin/Yang Dun, chart number, Yuan)
    *   Palace analysis (Ji Xing, Men Po, Ru Mu, etc.)
    *   Star and Door strength/weakness
    *   Common Auspicious and Inauspicious Pattern Judgments
    *   Hidden Stem Information

## Quick Navigation

*   [Tutorial](https://docs.3meta.pub/en/)
*   [Issues](https://github.com/3metaJun/3meta/issues)
*   [Chart Layout](https://3meta.pub)

## Direct Usage

If you want to view the `3meta` chart layout results with zero development effort, simply use the online chart layout tool: [3meta.pub](https://3meta.pub).

*   Multi-Chart Collaborative Analysis
*   Supports streaming interaction with AI
*   Support copying in AI format
*   Save the chart as a Markdown note
*   Support keyboard shortcuts
*   And more

## Using in Projects

Installing from the Web

```
npm install git+https://github.com/3metaJun/3meta.git
```

Or Installing Locally

```
npm install /path/to/3meta
```

## Standalone JavaScript library

If you are using a static HTML file, you can download library file from the [release](https://github.com/3metaJun/3meta/releases).

> `v2.0.0+` version provide。

usage example:

```html
<script src="3meta.min.js"></script>
<script>
    const chart = ThreeMeta.QimenChart.byDatetime('2023-12-01 12:00:00');
    console.log(chart);
</script>
</html>
```

## Usage Instructions

Calling \``3meta`\` to generate a Qimen Dunjia chart is extremely simple—you’ll obtain all required information with just the steps outlined below.

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

## Summary

Using the data returned by this program, you can generate a complete Qimen Dunjia chart. This project handles the most tedious and time-consuming work for you, allowing you to focus your attention on what truly matters.

![image](https://github.com/3metaJun/3meta/blob/main/static/charts-2025-12-25T16-34-35.png)

> \[!NOTE\] Please use this open-source code responsibly and strictly prohibit its use for any illegal purposes.