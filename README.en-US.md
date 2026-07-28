<div align="center">

![banner2](https://github.com/3metaJun/3meta/blob/main/static/banner2.jpg)

# A Lightweight Qi Men Dun Jia Charting Library

Simplified Chinese / [Traditional Chinese](./README-zh_TW.md) / [English](./README-en_US.md)

</div>

<div align="center">

  [![NPM Version](https://img.shields.io/npm/v/3meta)](https://www.npmjs.com/package/3meta)
  [![License](https://img.shields.io/github/license/3metaJun/3meta)](https://github.com/3metaJun/3meta)
  [![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2F3metaJun%2F3meta.svg?type=shield&issueType=license)](https://app.fossa.com/projects/git%2Bgithub.com%2F3metaJun%2F3meta?ref=badge_shield&issueType=license)
  [![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2F3metaJun%2F3meta.svg?type=shield&issueType=security)](https://app.fossa.com/projects/git%2Bgithub.com%2F3metaJun%2F3meta?ref=badge_shield&issueType=security)
  
</div>

## Introduction

An open-source library for Qi Men Dun Jia charting with the following features:

- Input

    - Charting time (supports `Date` objects or date strings)
    - Optional parameters
        - `solarTerm`: Specify the solar term
        - `isYangdun`: Specify Yin or Yang Dun
        - `juNumber`: Specify the Ju number
        - `yearDivide`: Year division method ('normal' | 'exact')

- Functional capabilities:

    - Chart data for the 9 palaces (including Gods, Stars, Doors, Heavenly Stems, Earthly Stems, etc.)
    - Complete time information (Four Pillars, Solar Term, Xun Shou, Kong Wang, etc.)
    - Ju information (Yin/Yang Dun, Ju number, Yuan)
    - Palace analysis (Ji Xing, Men Po, Ru Mu, etc.)
    - Prosperity and decline (Wang Shuai) of Stars and Doors
    - Common auspicious and inauspicious pattern judgments
    - Hidden Stem (An Gan) information
    - Multi-language support (zh-CN, zh-TW, en-US)

## Command Line Interface (CLI)

`3meta` provides a convenient command-line tool `qimen` that supports generating charting data in JSON format with multi-language output.

```bash
npm run build
node bin/qimen.js --date 2023-12-01T12:00:00 --lang en-US
```

Supported parameters:
- `--date`: Date and time (ISO)
- `--lang`: Language (zh-CN, zh-TW, en-US)
- `--solarTerm`: Specify solar term
- And more (see `node bin/qimen.js --help`)

## Quick Links

- [Tutorials](https://docs.3meta.pub/)
- [Issues](https://github.com/3metaJun/3meta/issues)
- [Charting Tool](https://3meta.pub)

## Direct Usage

If you want to view `3meta` charting results without any development, please use the [Sanyuan (3meta.pub)](https://3meta.pub) online charting tool directly.
- Collaborative analysis of multiple charts
- Supports streaming interaction with AI
- Supports copying in AI-friendly formats
- Save markdown notes on charts
- Keyboard shortcut support
- Supports DeepSeek V3, DeepSeek R1, Gemini Fast, Gemini Pro models
- And more

## Integration in Projects

Install via npm (recommended)
```bash
npm install 3meta
```

Install via GitHub
```bash
npm install git+https://github.com/3metaJun/3meta.git
```

Or local installation
```bash
npm install /path/to/3meta
```

## Standalone JavaScript Library
If you are using static HTML files, you can download the resource files from [releases](https://github.com/3metaJun/3meta/releases).

> The standalone JS library is available from version `v2.0.0+`.

Include `3meta.min.js` in your HTML file using a `script` tag.

```html
<script src="3meta.min.js"></script>
<script>
    // Switch to English
    ThreeMeta.i18n.setLocale('en-US');
    
    const chart = ThreeMeta.QimenChart.byDatetime('2023-12-01 12:00:00');
    
    // Use formatting tool to output pattern descriptions
    chart.palaces.forEach(p => {
        p.auspiciousPatterns.forEach(pat => {
            console.log(ThreeMeta.formatPattern(pat));
        });
    });
</script>
</html>
```

## Usage Instructions

Generating a Qi Men Dun Jia chart with `3meta` is very simple. You can obtain all information as follows:

```typescript
import { QimenChart } from '3meta';

// Charting with default configuration
const chart = QimenChart.byDatetime('2023-12-01 12:00:00');

// Or with custom parameters
const customChart = QimenChart.byDatetime('2023-12-01 12:00:00', {
  solarTerm: '冬至',
  isYangdun: true,
  juNumber: 1,
  yearDivide: 'exact'
});

console.log(chart);
```

## Multi-language Support (i18n)

You can easily switch languages and format output via the `i18n` object:

```typescript
import { QimenChart, i18n, formatPattern } from '3meta';

// Set to English
i18n.setLocale('en-US');

const chart = QimenChart.byDatetime('2023-12-01 12:00:00');

// Format pattern descriptions
chart.palaces.forEach(p => {
  p.auspiciousPatterns.forEach(pat => {
    console.log(formatPattern(pat)); // Outputs English description
  });
});

// Manually translate specific terms
console.log(i18n.t('stems.甲')); // "Jia"
```

## Summary

Using the data returned by this program, you can generate a chart like the one below. This project handles the most tedious calculations for you, allowing you to focus your energy on the analysis and insights you need.

<img width="966" alt="image" src="https://github.com/3metaJun/3meta/blob/main/static/charts-2025-12-25T16-34-35.png">


## Copyright

[MIT License](https://github.com/3metaJun/3meta/blob/main/LICENSE)

Copyright © 2025 All Contributors

[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2F3metaJun%2F3meta.svg?type=large&issueType=license)](https://app.fossa.com/projects/git%2Bgithub.com%2F3metaJun%2F3meta?ref=badge_large&issueType=license)

> [!NOTE]
> Please use this open-source code responsibly. Use for illegal purposes is strictly prohibited.
