import { QimenChart } from '../qimen/QimenChart';

describe('暗干排布算法 (v2.0)', () => {
  // 案例1：普通情况
  // 2008-11-04 10:30:00 (戊子 壬戌 戊申 丁巳)
  // 阴遁2局
  // 值使门：开门(6)，时支巳，飞至3宫
  // 时干：丁，地盘丁在5宫(寄2)，值符飞至2宫
  // 值符(2) != 值使(3)
  // 时干丁 != 甲
  // 普通情况：从值使门(3)开始
  // 阴遁逆排：3, 2, 1, 9, 8, 7, 6, 5, 4
  // 丁, 戊, 己, 庚, 辛, 壬, 癸, 乙, 丙 (注意顺序: 戊, 己, 庚, 辛, 壬, 癸, 丁, 丙, 乙)
  // 序列从丁开始: 丁, 丙, 乙, 戊, 己, 庚, 辛, 壬, 癸
  // 3: 丁
  // 2: 丙
  // 1: 乙
  // 9: 戊
  // 8: 己
  // 7: 庚
  // 6: 辛
  // 5: 壬
  // 4: 癸
  it('普通情况：阴遁2局 丁巳时', () => {
    const chart = QimenChart.byDatetime('2008-11-04 10:30:00');
    const hidden = chart.hiddenStems;

    expect(hidden.get(3)).toBe('丁');
    expect(hidden.get(2)).toBe('丙');
    expect(hidden.get(1)).toBe('乙');
    expect(hidden.get(9)).toBe('戊');
    expect(hidden.get(8)).toBe('己');
    expect(hidden.get(7)).toBe('庚');
    expect(hidden.get(6)).toBe('辛');
    expect(hidden.get(5)).toBe('壬');
    expect(hidden.get(4)).toBe('癸');
  });

  // 案例2：甲时特殊情况
  // 2008-11-04 23:30:00 (戊子 壬戌 戊申 甲子)
  // 强制阴遁2局
  // 地盘：2:戊, 1:己, 9:庚, 8:辛, 7:壬, 6:癸, 5:丁, 4:丙, 3:乙
  // 时干：甲 -> 旬首 甲子戊 -> 戊
  // 中宫地盘：丁
  // 戊 != 丁 -> 从中宫5开始
  // 阴遁逆排：5, 4, 3, 2, 1, 9, 8, 7, 6
  // 戊, 己, 庚, 辛, 壬, 癸, 丁, 丙, 乙
  // 5: 戊
  // 4: 己
  // 3: 庚
  // 2: 辛
  // 1: 壬
  // 9: 癸
  // 8: 丁
  // 7: 丙
  // 6: 乙
  it('特殊情况1：甲时且不与中宫同干', () => {
    const chart = QimenChart.byDatetime('2008-11-04 23:30:00', { juNumber: 2, isYangdun: false });
    const hidden = chart.hiddenStems;

    expect(hidden.get(5)).toBe('戊');
    expect(hidden.get(4)).toBe('己');
    expect(hidden.get(3)).toBe('庚');
    expect(hidden.get(2)).toBe('辛');
    expect(hidden.get(1)).toBe('壬');
    expect(hidden.get(9)).toBe('癸');
    expect(hidden.get(8)).toBe('丁');
    expect(hidden.get(7)).toBe('丙');
    expect(hidden.get(6)).toBe('乙');
  });

  // 案例3：值符值使同宫
  // 强制阳遁1局，甲子时
  // 阳1局：1:戊, 2:己, 3:庚, 4:辛, 5:壬, 6:癸, 7:丁, 8:丙, 9:乙
  // 甲子时 -> 旬首 甲子戊 -> 戊
  // 值符：天蓬 (1宫) -> 飞至戊 (1宫)
  // 值使：休门 (1宫) -> 飞至子 (1宫)
  // 值符值使同宫 (1宫)
  // 时干：甲 -> 戊
  // 中宫地盘：壬
  // 戊 != 壬 -> 甲时规则触发，从中宫5开始
  // 阳遁顺排：5, 6, 7, 8, 9, 1, 2, 3, 4
  // 戊, 己, 庚, 辛, 壬, 癸, 丁, 丙, 乙
  // 5: 戊
  // 6: 己
  // 7: 庚
  // 8: 辛
  // 9: 壬
  // 1: 癸
  // 2: 丁
  // 3: 丙
  // 4: 乙
  it('特殊情况：甲时且值符值使同宫（甲时规则优先）', () => {
    const chart = QimenChart.byDatetime('2023-12-22 00:00:00', { isYangdun: true, juNumber: 1 });
    const hidden = chart.hiddenStems;

    expect(hidden.get(5)).toBe('戊');
    expect(hidden.get(6)).toBe('己');
    expect(hidden.get(7)).toBe('庚');
    expect(hidden.get(8)).toBe('辛');
    expect(hidden.get(9)).toBe('壬');
    expect(hidden.get(1)).toBe('癸');
    expect(hidden.get(2)).toBe('丁');
    expect(hidden.get(3)).toBe('丙');
    expect(hidden.get(4)).toBe('乙');
  });

  // 案例4：非甲时，值符值使同宫
  // 2008-11-04 12:30:00 (戊子 壬戌 戊申 戊午)
  // 阴遁2局
  // 值使门：开门(6)，时支午，飞至2宫
  // 时干：戊，地盘戊在2宫，值符飞至2宫
  // 值符(2) == 值使(2)
  // 时干戊 != 甲
  // 触发值符值使同宫规则，从中宫5开始
  // 阴遁逆排：5, 4, 3, 2, 1, 9, 8, 7, 6
  // 戊, 己, 庚, 辛, 壬, 癸, 丁, 丙, 乙
  // 5: 戊
  // 4: 己
  // 3: 庚
  // 2: 辛
  // 1: 壬
  // 9: 癸
  // 8: 丁
  // 7: 丙
  // 6: 乙
  it('特殊情况2：非甲时且值符值使同宫', () => {
    const chart = QimenChart.byDatetime('2008-11-04 12:30:00');
    const hidden = chart.hiddenStems;

    expect(hidden.get(5)).toBe('戊');
    expect(hidden.get(4)).toBe('己');
    expect(hidden.get(3)).toBe('庚');
    expect(hidden.get(2)).toBe('辛');
    expect(hidden.get(1)).toBe('壬');
    expect(hidden.get(9)).toBe('癸');
    expect(hidden.get(8)).toBe('丁');
    expect(hidden.get(7)).toBe('丙');
    expect(hidden.get(6)).toBe('乙');
  });
});

