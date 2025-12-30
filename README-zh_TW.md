<div align="center">

![banner2](https://github.com/3metaJun/3meta/blob/main/static/banner2.jpg)

# 一套輕量級奇門遁甲排盤工具庫

简体中文 / [繁體中文](./README-zh_TW.md) / [English](./README-en_US.md)

</div>

<div align="center">

  [![NPM Version](https://img.shields.io/npm/v/3meta)](https://www.npmjs.com/package/3meta)
  [![License](https://img.shields.io/github/license/3metaJun/3meta)](https://github.com/3metaJun/3meta)
  [![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2F3metaJun%2F3meta.svg?type=shield&issueType=license)](https://app.fossa.com/projects/git%2Bgithub.com%2F3metaJun%2F3meta?ref=badge_shield&issueType=license)
  [![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2F3metaJun%2F3meta.svg?type=shield&issueType=security)](https://app.fossa.com/projects/git%2Bgithub.com%2F3metaJun%2F3meta?ref=badge_shield&issueType=security)
  
</div>

## 介紹

用於奇門遁甲排盤的開源程式庫，具備以下功能：

*   輸入

    *   排盤時間（支援 `Date` 物件或日期字串）
    *   選用參數
        *   `solarTerm`：指定節氣
        *   `isYangdun`：指定陽遁或陰遁
        *   `juNumber`：指定局數
        *   `yearDivide`：年份分界方式（「normal」｜「exact」）
*   可實現以下功能

    *   奇門九宮的式盤資料（包含神、星、門、天盤干、地盤干等）
    *   完整的時間資訊（四柱、節氣、旬首、空亡等）
    *   局數資訊（陰陽遁、局數、元）
    *   宮位分析（擊刑、門迫、入墓等）
    *   星門旺衰
    *   常用吉凶格局判斷
    *   暗干資訊
    *   多語言支援 (zh-CN, zh-TW, en-US)

## 命令列工具 (CLI)

`3meta` 提供了一個方便的命令列工具 `qimen`，支援生成 JSON 格式的排盤資料，並支援多語言輸出。

```bash
npm run build
node bin/qimen.js --date 2023-12-01T12:00:00 --lang zh-TW
```

支援參數：
- `--date`: 日期時間 (ISO)
- `--lang`: 語言 (zh-CN, zh-TW, en-US)
- `--solarTerm`: 指定節氣
- 以及更多 (查看 `node bin/qimen.js --help`)

## 快速跳轉

*   [教學](https://docs.3meta.pub/)
*   [問題](https://github.com/3metaJun/3meta/issues)
*   [排盤](https://3meta.pub)

## 直接使用

如果你希望無需開發即可直接查看 `3meta` 的奇門遁甲排盤結果，請直接使用 [三元（3meta.pub）](https://3meta.pub) 進行線上排盤。

*   多盤協同分析
*   支援與 AI 流式互動
*   支援複製為 AI 格式
*   可將盤面儲存為 Markdown 筆記
*   支援快捷鍵操作
*   以及其他更多功能

## 於專案中使用

從 npm 安裝（推薦）
```bash
npm install 3meta
```

從 GitHub 安裝

```bash
npm install git+https://github.com/3metaJun/3meta.git
```

或於本機安裝

```bash
npm install /path/to/3meta
```

## 獨立 JavaScript 庫

如果你使用的是靜態 HTML 檔案，可從 [版本發行頁面](https://github.com/3metaJun/3meta/releases) 下載資源檔案。

> `v2.0.0+` 版本才提供獨立 js 庫。

將 `3meta.min.js` 用 `script` 標簽引入 HTML 文件使用。

```html
<script src="3meta.min.js"></script>
<script>
    // 切換為繁體中文
    ThreeMeta.i18n.setLocale('zh-TW');

    const chart = ThreeMeta.QimenChart.byDatetime('2023-12-01 12:00:00');

    // 使用格式化工具輸出格局描述
    chart.palaces.forEach(p => {
        p.auspiciousPatterns.forEach(pat => {
            console.log(ThreeMeta.formatPattern(pat));
        });
    });
</script>
</html>
```

## 使用說明

只要依照以下方式呼叫 `3meta`，即可非常簡單地取得奇門遁甲式盤，並獲得全部相關資訊。

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

## 多語言支援 (i18n)

你可以透過 `i18n` 物件輕鬆切換語言並格式化輸出：

```typescript
import { QimenChart, i18n, formatPattern } from '3meta';

// 設置為繁體中文
i18n.setLocale('zh-TW');

const chart = QimenChart.byDatetime('2023-12-01 12:00:00');

// 格式化格局描述
chart.palaces.forEach(p => {
  p.auspiciousPatterns.forEach(pat => {
    console.log(formatPattern(pat)); // 輸出繁體中文描述
  });
});

// 手動翻譯特定術語
console.log(i18n.t('stems.甲')); // "甲"
```

## 總結

運用本程式所回傳的資料，你就能繪製出這樣一張式盤。本專案已為你處理掉最繁瑣、最耗時的部分，讓你能將更多心力專注於你真正需要關注的事項上。

![image](https://github.com/3metaJun/3meta/blob/main/static/charts-2025-12-25T16-34-35.png)

## 版权

[MIT License](https://github.com/3metaJun/3meta/blob/main/LICENSE)

Copyright © 2025 All Contributors

[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2F3metaJun%2F3meta.svg?type=large&issueType=license)](https://app.fossa.com/projects/git%2Bgithub.com%2F3metaJun%2F3meta?ref=badge_large&issueType=license)

> \[!NOTE\] 請務必合理使用本開源程式碼，嚴禁用於任何非法目的。