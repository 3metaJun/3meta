#!/usr/bin/env node
/*
 * CLI: qimen
 * Usage:
 *   qimen --date 2008-11-04T12:30:00 [--solarTerm 霜降] [--isYangdun false] [--juNumber 2] [--lang zh-CN|zh-TW|en-US]
 *   qimen --year 2008 --month 11 --day 4 --hour 12 --minute 30 --second 0
 */
const { QimenChart, i18n, formatPattern, formatTenStem, formatMenPo } = require('../lib/index');
const pkg = require('../package.json');

const args = process.argv.slice(2);
const help = () => {
  console.log(`qimen v${pkg.version}
用法:
  qimen --date 2008-11-04T12:30:00 [--solarTerm 霜降] [--isYangdun false] [--juNumber 2] [--lang zh-CN]
  qimen --year 2008 --month 11 --day 4 --hour 12 --minute 30 --second 0 [--solarTerm 霜降] [--isYangdun false] [--juNumber 2]
参数:
  --date        ISO 日期时间 (本地时区) 示例 2024-10-08T12:00:00
  --year        公历年
  --month       公历月 (1-12)
  --day         公历日 (1-31)
  --hour        小时 0-23
  --minute      分钟 0-59 (默认0)
  --second      秒   0-59 (默认0)
  --solarTerm   手工指定节气名，用于覆盖自动判定
  --isYangdun   手工指定阴阳遁 true/false
  --juNumber    手工指定局数 (1-9)
  --yearDivide  年分界 normal|exact (正月初一|立春)，默认 exact
  --lang        语言 zh-CN (默认) | zh-TW | en-US
  --help        显示本帮助
 输出: JSON
`);
};

const parseArgs = () => {
  const map = {};
  for (let i = 0; i < args.length; i += 1) {
    const a = args[i];
    if (!a.startsWith('--')) continue;
    const key = a.slice(2);
    const val = args[i + 1] && !args[i + 1].startsWith('--') ? args[i + 1] : 'true';
    map[key] = val;
    if (val !== 'true') i += 1;
  }
  return map;
};

const localizePatterns = (patterns) => {
  if (!patterns) return;
  patterns.forEach(p => {
    p.description = formatPattern(p);
  });
};

const localizeChart = (chart) => {
  // Palaces
  if (chart.palaces) {
    chart.palaces.forEach(p => {
      localizePatterns(p.auspiciousPatterns);
      localizePatterns(p.inauspiciousPatterns);

      // Ten Stem
      if (p.tenStemResponse) {
        if (p.tenStemResponse.heavenlyToEarthly) p.tenStemResponse.heavenlyToEarthly.description = formatTenStem(p.tenStemResponse.heavenlyToEarthly);
        if (p.tenStemResponse.heavenlyToDay) p.tenStemResponse.heavenlyToDay.description = formatTenStem(p.tenStemResponse.heavenlyToDay);
        if (p.tenStemResponse.timeToDay) p.tenStemResponse.timeToDay.description = formatTenStem(p.tenStemResponse.timeToDay);
      }
    });
  }

  // Special Patterns
  if (chart.specialPatterns) {
    localizePatterns(chart.specialPatterns.auspiciousPatterns);
    localizePatterns(chart.specialPatterns.inauspiciousPatterns);

    if (chart.specialPatterns.menPo) {
      chart.specialPatterns.menPo.forEach(m => {
        m.description = formatMenPo(m);
      });
    }

    if (chart.specialPatterns.wuBuYuShi && chart.specialPatterns.wuBuYuShi.isWuBuYuShi) {
      const found = chart.specialPatterns.inauspiciousPatterns.find(p => p.type === '五不遇时');
      if (found) {
        chart.specialPatterns.wuBuYuShi.description = found.description;
      }
    }
  }
};

const main = () => {
  const opts = parseArgs();
  if (opts.help) {
    help();
    process.exit(0);
  }

  const overrides = {};
  if (opts.solarTerm) overrides.solarTerm = opts.solarTerm;
  if (opts.isYangdun !== undefined) overrides.isYangdun = opts.isYangdun === 'true';
  if (opts.juNumber) overrides.juNumber = Number(opts.juNumber);
  if (opts.yearDivide) overrides.yearDivide = opts.yearDivide === 'normal' ? 'normal' : 'exact';

  // Set Locale
  if (opts.lang) {
    i18n.setLocale(opts.lang);
  }

  let chart;
  try {
    if (opts.date) {
      chart = QimenChart.byDatetime(opts.date, Object.keys(overrides).length ? overrides : undefined);
    } else if (opts.year && opts.month && opts.day) {
      const y = Number(opts.year);
      const m = Number(opts.month);
      const d = Number(opts.day);
      const h = Number(opts.hour || 0);
      const mi = Number(opts.minute || 0);
      const s = Number(opts.second || 0);
      chart = QimenChart.fromSolar(y, m, d, h, mi, s, Object.keys(overrides).length ? overrides : undefined);
    } else {
      console.error('缺少日期参数，使用 --help 查看用法');
      process.exit(1);
    }
  } catch (err) {
    console.error('排盘失败:', err.message || err);
    process.exit(1);
  }

  // Localize the chart description fields
  localizeChart(chart);

  console.log(JSON.stringify(chart, null, 2));
};

main();
