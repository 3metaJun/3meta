import dayjs from 'dayjs';
import { Solar } from 'lunar-typescript';
import { QimenChart as IQimenChart, Palace, FourPillars, TimeInfo, Yuan, JuType, Trigram, Position, EarthlyBranch, Gate, HeavenlyStem } from '../qimen-types';
import { getXunShou, getYuan, getJuShu, arrangeDiPan, getZhiFuInfo, getZhiShiInfo, arrangeTianPan, arrangeDeities, arrangeGates, handleMiddlePalace, getZhiFuLuoGong, calculateLiuYiJiXing, calculateHiddenStems } from './calculator';
import { PALACE_BRANCHES, PALACE_FIVE_ELEMENTS, PALACE_POSITIONS, XUN_SHOU_VOIDNESS, GATE_FIVE_ELEMENTS } from '../data/constants';

import { getInnerOuter, buildVoidness, getPostHorse, calcGrowth, calcTombInfo, calcTenStemResponse, calcGatePressure, calcStatus, detectPatterns, calcMenPo, detectGlobalPatterns } from '../analysis';

const VERSION = '2.0.0';

/**
 * 版权信息接口
 */
export interface CopyrightInfo {
  library: string;
  version: string;
  author: string;
  license: string;
  repository: string;
  homepage: string;
  generatedAt: string;
}

const TIME_NAME: Record<EarthlyBranch, string> = { 子: '子时', 丑: '丑时', 寅: '寅时', 卯: '卯时', 辰: '辰时', 巳: '巳时', 午: '午时', 未: '未时', 申: '申时', 酉: '酉时', 戌: '戌时', 亥: '亥时' };

export class QimenChart implements IQimenChart {
  /**
   * 版权信息（静态）
   */
  private static readonly COPYRIGHT: Omit<CopyrightInfo, 'generatedAt'> = {
    library: '3meta',
    version: VERSION,
    author: '3metaJun',
    license: 'MIT',
    repository: 'https://github.com/3metaJun/3meta',
    homepage: 'https://3meta.pub'
  };

  version = VERSION;
  timeInfo!: TimeInfo;
  fourPillars!: FourPillars;
  ju!: JuType;
  yuan!: Yuan;
  season: any = '冬';
  monthElement: any = '水';
  zhiFu!: { star: any; position: any; heavenlyStem: any };
  zhiShi!: { gate: any; position: any };
  postHorse: any;
  palaces: Palace[] = [];
  specialPatterns: any = {};
  hiddenStems: Map<Position, HeavenlyStem> = new Map();

  static byDatetime(datetime: string | Date, opts?: { solarTerm?: string; isYangdun?: boolean; juNumber?: number; yearDivide?: 'normal' | 'exact' }) {
    const d = dayjs(datetime);
    const dateStr = d.format('YYYY-MM-DD');
    const solar = Solar.fromYmdHms(d.year(), d.month() + 1, d.date(), d.hour(), d.minute(), d.second());
    const lunar = solar.getLunar();
    const yearDivide = opts?.yearDivide === 'normal' ? 'normal' : 'exact';
    const getYearByLiChun = lunar.getYearInGanZhiByLiChun?.bind(lunar);
    const yearGZ = yearDivide === 'exact'
      ? (getYearByLiChun ? getYearByLiChun() : lunar.getYearInGanZhiExact())
      : lunar.getYearInGanZhi();
    const monthGZ = lunar.getMonthInGanZhiExact();
    const dayGZ = lunar.getDayInGanZhiExact();
    const hourGZ = lunar.getTimeInGanZhi();
    const split = (gz: string) => ({ stem: gz[0] as any, branch: gz[1] as any });
    const fourPillars: FourPillars = {
      year: split(yearGZ),
      month: split(monthGZ),
      day: split(dayGZ),
      hour: split(hourGZ),
    };
    const xunShou = getXunShou(hourGZ);
    const yuan = getYuan(dayGZ);
    const detectedSolarTerm = lunar.getPrevJieQi(false)?.getName?.() || '';
    const solarTerm = opts?.solarTerm || detectedSolarTerm;
    const isYangdun = opts?.isYangdun !== undefined
      ? opts.isYangdun
      : ['冬至', '小寒', '大寒', '立春', '雨水', '惊蛰', '春分', '清明', '谷雨', '立夏', '小满', '芒种'].includes(solarTerm);
    const juNumRaw = opts?.juNumber || getJuShu(solarTerm, yuan, isYangdun);
    const juNum = juNumRaw === 0 ? getJuShu(lunar.getPrevJieQi(true)?.getName?.() || solarTerm, yuan, isYangdun) || 1 : juNumRaw;
    const ju: JuType = { type: isYangdun ? '阳遁' : '阴遁', number: juNum as any };
    const solarMonth = d.month() + 1;
    const seasonBySolar = (() => {
      if ([1, 2].includes(solarMonth)) return '春';
      if ([4, 5].includes(solarMonth)) return '夏';
      if ([7, 8].includes(solarMonth)) return '秋';
      if ([10, 11].includes(solarMonth)) return '冬';
      return '四季月';
    })();
    const monthElementBySolar = (() => {
      if (seasonBySolar === '春') return '木';
      if (seasonBySolar === '夏') return '火';
      if (seasonBySolar === '秋') return '金';
      if (seasonBySolar === '冬') return '水';
      return '土';
    })();
    const season = seasonBySolar;
    const monthElement = monthElementBySolar;

    const diPan = arrangeDiPan(ju.number, isYangdun);
    const zhiFuInfo = getZhiFuInfo(xunShou, diPan);
    const { position: zhiFuLuoGong, timeStem: actualTimeStem } = getZhiFuLuoGong(hourGZ, xunShou, diPan);
    const zhiShi = getZhiShiInfo(hourGZ, zhiFuInfo.position, isYangdun);
    const tianPan = arrangeTianPan(zhiFuInfo.star, zhiFuLuoGong, diPan);
    const deities = arrangeDeities(zhiFuLuoGong, isYangdun);
    const gates = arrangeGates(zhiShi.position, zhiShi.gate);

    // 计算暗干排布
    const hiddenStems = calculateHiddenStems(
      zhiShi.position,
      actualTimeStem,
      isYangdun,
      hourGZ[0] as HeavenlyStem,
      zhiFuLuoGong,
      diPan
    );

    const palaces: Palace[] = [];
    (Object.keys(PALACE_POSITIONS) as Trigram[]).forEach((tri) => {
      const pos = PALACE_POSITIONS[tri] as Position;
      const earthBranch = PALACE_BRANCHES[pos] as EarthlyBranch[];
      const tian = tianPan.get(pos);
      const di = diPan.get(pos)!;
      palaces.push({
        position: pos,
        trigram: tri,
        gate: gates.get(pos) || '无门',
        star: tian ? tian.star : (pos === 5 ? '天禽' : '无' as any),
        deity: deities.get(pos) || '无神',
        heavenlyStem: tian ? tian.heavenlyStem : '无',
        earthlyStem: di as any,
        earthBranch: earthBranch.length === 0 ? '无' as any : (earthBranch.length === 1 ? earthBranch[0] : (earthBranch as any)),
        isZhiFu: pos === zhiFuLuoGong,
        isZhiShi: pos === zhiShi.position,
        voidness: { voidBranches: XUN_SHOU_VOIDNESS[xunShou], palaceBranches: earthBranch.length === 0 ? ['无'] as any : earthBranch as any, voidInPalace: [], hasVoidness: false },
        fiveElements: PALACE_FIVE_ELEMENTS[tri],
        status: { star: '无', gate: '无' } as any,
        innerOuter: pos === 5 ? '无' : (pos % 2 === 0 ? '内盘' : '外盘'),
        gatePressure: '无',
        growthInfo: { heavenlyStem: '无', earthlyStem: '无', timeStem: '无', dayStem: '无' } as any,
        liuYiJiXing: { hasJiXing: false },
        tombInfo: { heavenlyStemInTomb: [], earthlyStemInTomb: [] },
        tenStemResponse: { heavenlyToEarthly: { relation: '无', description: '无' } },
        isPostHorse: false,
        auspiciousPatterns: [],
        inauspiciousPatterns: [],
      });
    });

    const handled = handleMiddlePalace(isYangdun, palaces);

    const timeInfo: TimeInfo = {
      solarDate: dateStr,
      lunarDate: lunar.toString(),
      chineseYear: yearGZ,
      chineseMonth: monthGZ,
      chineseDay: dayGZ,
      chineseTime: hourGZ,
      timeEarthlyBranch: hourGZ[1] as any,
      timeName: TIME_NAME[hourGZ[1] as EarthlyBranch],
      solarTerm,
      xunShou,
      voidness: XUN_SHOU_VOIDNESS[xunShou],
    } as any;

    const chart = new QimenChart();
    chart.timeInfo = timeInfo;
    chart.fourPillars = fourPillars;
    chart.ju = ju;
    chart.yuan = yuan;
    chart.season = season;
    chart.monthElement = monthElement;
    chart.zhiFu = { star: zhiFuInfo.star, position: zhiFuLuoGong, heavenlyStem: zhiFuInfo.heavenlyStem } as any;
    chart.zhiShi = { gate: zhiShi.gate, position: zhiShi.position } as any;
    chart.postHorse = getPostHorse(hourGZ[1] as any);
    chart.hiddenStems = hiddenStems;

    const menPo: any[] = [];

    chart.palaces = handled.map((p) => {
      const innerOuter = getInnerOuter(isYangdun, p.position);
      const voidness = buildVoidness(xunShou, p.earthBranch);
      const growthInfo = {
        heavenlyStem: calcGrowth(p.heavenlyStem as any, p.earthBranch),
        earthlyStem: calcGrowth(p.earthlyStem as any, p.earthBranch),
        timeStem: calcGrowth(actualTimeStem as any, p.earthBranch),
        dayStem: calcGrowth(dayGZ[0] as any, p.earthBranch),
      } as any;
      const tombInfo = calcTombInfo(p.heavenlyStem as any, p.earthlyStem as any, p.earthBranch, hourGZ[0] as any, dayGZ[0] as any);
      const tenStemResponse = calcTenStemResponse(p.heavenlyStem as any, p.earthlyStem as any, actualTimeStem as any, dayGZ[0] as any);
      const gatePressure = calcGatePressure(p.gate as any, p.fiveElements);
      const status = calcStatus(p.star as any, p.gate as any, season);
      const patterns = detectPatterns(p as any, zhiShi.gate, fourPillars);
      const isPostHorse = chart.postHorse.position === p.position;
      const menPoItem = calcMenPo(p, gatePressure);
      if (menPoItem) menPo.push(menPoItem);

      // 为每个宫位计算六仪击刑
      const liuYiJiXing = calculateLiuYiJiXing(p.position, p.heavenlyStem as any);

      const extraInauspicious = gatePressure === '制' && p.gate !== '无门'
        ? [{ name: '门受制', type: '门受制', position: p.position, description: `宫(${p.fiveElements})克${p.gate}(${GATE_FIVE_ELEMENTS[p.gate as Gate]})` }]
        : [];

      const menPoInauspicious = gatePressure === '迫' && p.gate !== '无门'
        ? [{ name: '门迫', type: '门迫', position: p.position, description: `门迫：${p.gate}克宫` }]
        : [];

      // 如果有六仪击刑，添加到凶格中
      const liuYiJiXingInauspicious = liuYiJiXing.hasJiXing ?
        [{ name: '六仪击刑', type: liuYiJiXing.type!, position: p.position, description: liuYiJiXing.description! }] : [];

      return {
        ...p,
        innerOuter,
        voidness,
        growthInfo,
        liuYiJiXing,
        tombInfo,
        tenStemResponse,
        gatePressure,
        status,
        isPostHorse,
        auspiciousPatterns: patterns.auspicious,
        inauspiciousPatterns: [...patterns.inauspicious, ...extraInauspicious, ...menPoInauspicious, ...liuYiJiXingInauspicious],
      } as Palace;
    });

    const globalPatterns = detectGlobalPatterns(fourPillars);
    const allAuspicious = [...chart.palaces.flatMap((p) => p.auspiciousPatterns || []), ...globalPatterns.auspicious];
    const allInauspicious = [...chart.palaces.flatMap((p) => p.inauspiciousPatterns || []), ...globalPatterns.inauspicious];

    const wuBuYuShiPattern = globalPatterns.inauspicious.find(p => p.type === '五不遇时');
    const wuBuYuShi = {
        isWuBuYuShi: !!wuBuYuShiPattern,
        description: wuBuYuShiPattern?.description
    };

    chart.specialPatterns = { menPo, auspiciousPatterns: allAuspicious, inauspiciousPatterns: allInauspicious, wuBuYuShi } as any;
    return chart;
  }

  /**
   * 快捷方法：直接用公历年月日时分秒生成排盘
   */
  static fromSolar(yyyy: number, MM: number, dd: number, hh = 0, mm = 0, ss = 0, opts?: { solarTerm?: string; isYangdun?: boolean; juNumber?: number; yearDivide?: 'normal' | 'exact' }) {
    const iso = `${yyyy.toString().padStart(4, '0')}-${MM.toString().padStart(2, '0')}-${dd.toString().padStart(2, '0')}T${hh.toString().padStart(2, '0')}:${mm.toString().padStart(2, '0')}:${ss.toString().padStart(2, '0')}`;
    return QimenChart.byDatetime(iso, opts);
  }

  /**
   * 获取版权信息
   */
  static getCopyright(): CopyrightInfo {
    return {
      ...QimenChart.COPYRIGHT,
      generatedAt: new Date().toISOString()
    };
  }

  /**
   * 转换为 JSON 对象（包含版权信息和暗干）
   */
  toJSON(): any {
    return {
      version: this.version,
      timeInfo: this.timeInfo,
      fourPillars: this.fourPillars,
      ju: this.ju,
      yuan: this.yuan,
      season: this.season,
      monthElement: this.monthElement,
      zhiFu: this.zhiFu,
      zhiShi: this.zhiShi,
      postHorse: this.postHorse,
      palaces: this.palaces,
      hiddenStems: Object.fromEntries(this.hiddenStems),
      specialPatterns: this.specialPatterns,
      copyright: QimenChart.getCopyright()
    };
  }
}

export default QimenChart;
