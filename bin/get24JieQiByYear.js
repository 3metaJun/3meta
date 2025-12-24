#!/usr/bin/env node
/*
 * CLI: get24JieQiByYear
 * Usage:
 *   node bin/get24JieQiByYear.js --year 2026
 * 输出: 24 节气的本地时间起始点，按立春->大寒顺序
 */

const { Solar } = require('lunar-typescript');

// 以立春为年度起点的常用顺序
const ORDER = [
  '立春', '雨水', '惊蛰', '春分', '清明', '谷雨',
  '立夏', '小满', '芒种', '夏至', '小暑', '大暑',
  '立秋', '处暑', '白露', '秋分', '寒露', '霜降',
  '立冬', '小雪', '大雪', '冬至', '小寒', '大寒',
];

// 下一个回圈的小寒/大寒在表中用拼音 key
const ALIAS = {
  小寒: 'XIAO_HAN',
  大寒: 'DA_HAN',
  冬至: 'DONG_ZHI',
};

const args = process.argv.slice(2);

const help = () => {
  console.log(`get24JieQiByYear
用法:
  node bin/get24JieQiByYear.js --year 2026
参数:
  --year   公历年 (默认当前年份)
  --help   显示本帮助
输出:
  24 节气名称与精确开始时间 (本地时区)
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

const format = (solar) => solar.toYmdHms();

const main = () => {
  const opts = parseArgs();
  if (opts.help) {
    help();
    process.exit(0);
  }

  const year = opts.year ? Number(opts.year) : new Date().getFullYear();
  if (!Number.isInteger(year) || year < 1) {
    console.error('请输入有效年份，例如 --year 2026');
    process.exit(1);
  }

  let table;
  try {
    table = Solar.fromYmd(year, 1, 1).getLunar().getJieQiTable();
  } catch (err) {
    console.error('计算节气失败:', err.message || err);
    process.exit(1);
  }

  const rows = ORDER.map((name) => {
    const key = ALIAS[name] && table[ALIAS[name]] ? ALIAS[name] : name;
    const solar = table[key];
    if (!solar) {
      throw new Error(`未找到节气 ${name}`);
    }
    return { name, solar };
  });

  rows.forEach(({ name, solar }) => {
    console.log(`${name} ${format(solar)}`);
  });
};

main();
