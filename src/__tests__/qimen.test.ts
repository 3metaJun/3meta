import { QimenChart } from '../qimen/QimenChart';

describe('QimenChart', () => {
  it('aligns with python verifier example (2008-11-04 12:30 霜降 阴遁2局)', () => {
    const chart = QimenChart.byDatetime('2008-11-04T12:30:00', { solarTerm: '霜降', isYangdun: false, juNumber: 2 });
    expect(chart.ju).toEqual({ type: '阴遁', number: 2 });
    expect(chart.timeInfo.solarTerm).toBe('霜降');
    expect(chart.timeInfo.xunShou).toBe('甲寅');
    expect(chart.zhiFu).toMatchObject({ star: '天心', position: 2, heavenlyStem: '癸' });
    expect(chart.zhiShi).toMatchObject({ gate: '开门', position: 2 });

    const byPos = (pos: number) => chart.palaces.find((p) => p.position === pos)!;
    expect(byPos(2)).toMatchObject({
      heavenlyStem: '癸',
      star: '天心',
      gate: '开门',
      deity: '值符',
    });
    expect(byPos(4)).toMatchObject({ star: ['天芮', '天禽'], heavenlyStem: ['戊', '丁'] });
    expect(byPos(8).earthlyStem).toEqual('辛');
    expect(chart.palaces.find((p) => p.position === 5)?.earthlyStem).toBe('丁');

    // 空亡：旬首甲寅 -> 子丑
    expect(byPos(6).voidness.voidBranches).toEqual(['子', '丑']);
  });
});
