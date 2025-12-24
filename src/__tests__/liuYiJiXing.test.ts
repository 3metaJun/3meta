import QimenChart from '../qimen/QimenChart';
import { Palace } from '../qimen-types';

describe('六仪击刑测试', () => {
  test('测试六仪击刑的识别', () => {
    // 这里需要构造一个特定的时间，使得值符落在特定宫位并且天盘天干形成六仪击刑
    // 由于需要精确的时间来构造特定的排盘，这里使用一个示例时间
    const chart = QimenChart.fromSolar(2024, 1, 15, 10, 30, 0);

    console.log('排盘结果：');
    console.log('值符：', chart.zhiFu);

    // 检查值符所在宫位的六仪击刑信息
    const zhiFuPalace = chart.palaces.find((p: Palace) => p.position === chart.zhiFu.position);
    if (zhiFuPalace) {
      console.log('值符所在宫位：', zhiFuPalace.position);
      console.log('天盘天干：', zhiFuPalace.heavenlyStem);
      console.log('六仪击刑：', zhiFuPalace.liuYiJiXing);

      if (zhiFuPalace.liuYiJiXing.hasJiXing) {
        console.log('发现六仪击刑！');
        console.log('类型：', zhiFuPalace.liuYiJiXing.type);
        console.log('描述：', zhiFuPalace.liuYiJiXing.description);

        // 检查是否在凶格列表中
        const jiXingPattern = zhiFuPalace.inauspiciousPatterns?.find((p: any) => p.name === '六仪击刑');
        expect(jiXingPattern).toBeDefined();
        expect(jiXingPattern?.type).toBe(zhiFuPalace.liuYiJiXing.type);
      } else {
        console.log('此排盘未发现六仪击刑');
      }
    }

    // 验证其他宫位不应该有六仪击刑
    const otherPalaces = chart.palaces.filter((p: Palace) => p.position !== chart.zhiFu.position);
    otherPalaces.forEach((palace: Palace) => {
      expect(palace.liuYiJiXing.hasJiXing).toBe(false);
    });
  });

  test('测试具体的六仪击刑类型', () => {
    // 测试多个不同时间点，看是否能找到各种类型的六仪击刑
    const testTimes = [
      { year: 2024, month: 1, day: 15, hour: 10 },
      { year: 2024, month: 3, day: 20, hour: 14 },
      { year: 2024, month: 6, day: 10, hour: 8 },
      { year: 2024, month: 9, day: 5, hour: 16 },
      { year: 2024, month: 12, day: 25, hour: 12 },
    ];

    let foundTypes = new Set();

    testTimes.forEach(time => {
      const chart = QimenChart.fromSolar(time.year, time.month, time.day, time.hour, 0, 0);
      const zhiFuPalace = chart.palaces.find((p: Palace) => p.position === chart.zhiFu.position);

      if (zhiFuPalace?.liuYiJiXing.hasJiXing) {
        foundTypes.add(zhiFuPalace.liuYiJiXing.type);
        console.log(`时间: ${time.year}-${time.month}-${time.day} ${time.hour}时`);
        console.log(`值符位置: ${chart.zhiFu.position}宫, 天盘天干: ${zhiFuPalace.heavenlyStem}`);
        console.log(`六仪击刑类型: ${zhiFuPalace.liuYiJiXing.type}`);
        console.log(`描述: ${zhiFuPalace.liuYiJiXing.description}`);
        console.log('---');
      }
    });

    console.log(`在测试中发现的六仪击刑类型：`, Array.from(foundTypes));
  });
});
