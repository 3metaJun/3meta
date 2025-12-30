import { BRANCH_FIVE_ELEMENTS, POST_HORSE_MAP, STAR_FIVE_ELEMENTS, XUN_SHOU_VOIDNESS, STEM_FIVE_ELEMENTS, GATE_FIVE_ELEMENTS } from '../data/constants';
import {
  AuspiciousPattern,
  EarthlyBranch,
  FiveElements,
  FourPillars,
  Gate,
  GatePressure,
  HeavenlyStem,
  InauspiciousPattern,
  Palace,
  PostHorse,
  Season,
  Star,
  StarStatus,
  GateStatus,
  TwelveGrowth,
  XunShou,
  Position,
  TenStemResponse,
} from '../qimen-types';
import { findPalaceByBranch } from '../utils/palace';

const BRANCH_ORDER: EarthlyBranch[] = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];

const GROWTH_TABLE: Record<HeavenlyStem, TwelveGrowth[]> = {
  甲: ['沐浴', '冠带', '临官', '帝旺', '衰', '病', '死', '墓', '绝', '胎', '养', '长生'],
  乙: ['病', '衰', '帝旺', '临官', '冠带', '沐浴', '长生', '养', '胎', '绝', '墓', '死'],
  丙: ['胎', '养', '长生', '沐浴', '冠带', '临官', '帝旺', '衰', '病', '死', '墓', '绝'],
  丁: ['绝', '墓', '死', '病', '衰', '帝旺', '临官', '冠带', '沐浴', '长生', '养', '胎'],
  戊: ['胎', '养', '长生', '沐浴', '冠带', '临官', '帝旺', '衰', '病', '死', '墓', '绝'],
  己: ['绝', '墓', '死', '病', '衰', '帝旺', '临官', '冠带', '沐浴', '长生', '养', '胎'],
  庚: ['死', '墓', '绝', '胎', '养', '长生', '沐浴', '冠带', '临官', '帝旺', '衰', '病'],
  辛: ['长生', '养', '胎', '绝', '墓', '死', '病', '衰', '帝旺', '临官', '冠带', '沐浴'],
  壬: ['临官', '帝旺', '衰', '病', '死', '墓', '绝', '胎', '养', '长生', '沐浴', '冠带'],
  癸: ['临官', '冠带', '沐浴', '长生', '养', '胎', '绝', '墓', '死', '病', '衰', '帝旺'],
};

const STAR_STATUS_TABLE: Record<Star, Record<Season, StarStatus>> = {
  天蓬: { 春: '旺', 夏: '休', 秋: '废', 冬: '相', 四季月: '囚' },
  天任: { 春: '囚', 夏: '废', 秋: '旺', 冬: '休', 四季月: '相' },
  天冲: { 春: '相', 夏: '旺', 秋: '囚', 冬: '废', 四季月: '休' },
  天辅: { 春: '相', 夏: '旺', 秋: '囚', 冬: '废', 四季月: '休' },
  天禽: { 春: '囚', 夏: '废', 秋: '旺', 冬: '休', 四季月: '相' },
  天心: { 春: '休', 夏: '囚', 秋: '相', 冬: '旺', 四季月: '废' },
  天柱: { 春: '休', 夏: '囚', 秋: '相', 冬: '旺', 四季月: '废' },
  天芮: { 春: '囚', 夏: '废', 秋: '旺', 冬: '休', 四季月: '相' },
  天英: { 春: '废', 夏: '相', 秋: '休', 冬: '囚', 四季月: '旺' },
};

const GATE_STATUS_TABLE: Record<Gate, Record<Season, GateStatus>> = {
  休门: { 春: '休', 夏: '囚', 秋: '相', 冬: '旺', 四季月: '死' },
  生门: { 春: '死', 夏: '相', 秋: '休', 冬: '囚', 四季月: '旺' },
  伤门: { 春: '旺', 夏: '休', 秋: '死', 冬: '相', 四季月: '囚' },
  杜门: { 春: '旺', 夏: '休', 秋: '死', 冬: '相', 四季月: '囚' },
  景门: { 春: '相', 夏: '旺', 秋: '囚', 冬: '死', 四季月: '休' },
  死门: { 春: '死', 夏: '相', 秋: '休', 冬: '囚', 四季月: '旺' },
  惊门: { 春: '囚', 夏: '死', 秋: '旺', 冬: '休', 四季月: '相' },
  开门: { 春: '囚', 夏: '死', 秋: '旺', 冬: '休', 四季月: '相' },
};

const TOMB_MAP: Record<HeavenlyStem, EarthlyBranch[]> = {
  甲: [],
  乙: ['未', '戌'],
  丙: ['戌'],
  戊: ['戌'],
  癸: ['未'],
  丁: ['丑'],
  己: ['丑'],
  庚: ['丑'],
  辛: ['辰'],
  壬: ['辰'],
};

const GENERATE: Record<FiveElements, FiveElements> = {
  木: '火',
  火: '土',
  土: '金',
  金: '水',
  水: '木',
};
const OVERCOME: Record<FiveElements, FiveElements> = {
  木: '土',
  土: '水',
  水: '火',
  火: '金',
  金: '木',
};

export const getSeasonByMonthBranch = (branch: EarthlyBranch): Season => {
  const monthNo = BRANCH_ORDER.indexOf(branch) + 1;
  if ([1, 2].includes(monthNo)) return '春';
  if ([4, 5].includes(monthNo)) return '夏';
  if ([7, 8].includes(monthNo)) return '秋';
  if ([10, 11].includes(monthNo)) return '冬';
  return '四季月';
};

export const getMonthElementByBranch = (branch: EarthlyBranch): FiveElements => {
  return BRANCH_FIVE_ELEMENTS[branch];
};

export const getInnerOuter = (isYangdun: boolean, position: Position): '内盘' | '外盘' | '无' => {
  if (position === 5) return '无';
  const yangInner: Position[] = [1, 8, 3, 4];
  const yinInner: Position[] = [9, 2, 7, 6];
  const inner = isYangdun ? yangInner : yinInner;
  return inner.includes(position) ? '内盘' : '外盘';
};

export const buildVoidness = (
  xunShou: XunShou,
  palaceBranches: EarthlyBranch | EarthlyBranch[] | '无',
) => {
  const voidBranches = XUN_SHOU_VOIDNESS[xunShou];
  const palaceArr = palaceBranches === '无' ? ['无'] : Array.isArray(palaceBranches) ? palaceBranches : [palaceBranches];
  const voidInPalace = palaceArr.filter((b) => voidBranches.includes(b as EarthlyBranch));
  return {
    voidBranches,
    palaceBranches: palaceArr,
    voidInPalace,
    hasVoidness: voidInPalace.length > 0,
  };
};

export const getPostHorse = (timeBranch: EarthlyBranch): PostHorse => {
  const key = Object.keys(POST_HORSE_MAP).find((k) => k.includes(timeBranch)) || '申子辰';
  const branch = POST_HORSE_MAP[key];
  return {
    branch,
    position: findPalaceByBranch(branch) || 5,
  } as PostHorse;
};

const resolveGrowthForBranch = (stem: HeavenlyStem, branch: EarthlyBranch): TwelveGrowth => {
  const idx = BRANCH_ORDER.indexOf(branch);
  const seq = GROWTH_TABLE[stem];
  if (!seq || idx === -1) return '无' as any;
  return seq[idx] || '无';
};

export const calcGrowth = (
  stems: HeavenlyStem | HeavenlyStem[] | '无',
  palaceBranches: EarthlyBranch | EarthlyBranch[] | '无',
) => {
  if (stems === '无' || palaceBranches === '无') return '无';
  const stemArr = Array.isArray(stems) ? stems : [stems];
  const branches = Array.isArray(palaceBranches) ? palaceBranches : [palaceBranches];
  const res = stemArr.flatMap((s) => branches.map((b) => resolveGrowthForBranch(s, b)));
  return res.length === 1 ? res[0] : res;
};

export const calcTombInfo = (
  heavenlyStems: HeavenlyStem | HeavenlyStem[] | '无',
  earthlyStems: HeavenlyStem | HeavenlyStem[] | '无',
  palaceBranches: EarthlyBranch | EarthlyBranch[] | '无',
  timeStem?: HeavenlyStem,
  dayStem?: HeavenlyStem,
) => {
  const branches = palaceBranches === '无' ? [] : Array.isArray(palaceBranches) ? palaceBranches : [palaceBranches];
  const check = (stem?: HeavenlyStem) => {
    if (!stem) return false;
    const tombBranches = TOMB_MAP[stem];
    if (!tombBranches) return false;
    return branches.some((b) => tombBranches.includes(b));
  };

  const getStemsInTomb = (stems: HeavenlyStem | HeavenlyStem[] | '无') => {
    if (stems === '无') return [];
    const stemArr = Array.isArray(stems) ? stems : [stems];
    return stemArr.filter(s => check(s));
  };

  const heavenlyStemInTomb = getStemsInTomb(heavenlyStems);
  const earthlyStemInTomb = getStemsInTomb(earthlyStems);

  const allStems: HeavenlyStem[] = [];
  if (heavenlyStems !== '无') {
    if (Array.isArray(heavenlyStems)) allStems.push(...heavenlyStems);
    else allStems.push(heavenlyStems);
  }
  if (earthlyStems !== '无') {
    if (Array.isArray(earthlyStems)) allStems.push(...earthlyStems);
    else allStems.push(earthlyStems);
  }
  if (timeStem) allStems.push(timeStem);
  if (dayStem) allStems.push(dayStem);

  return {
    heavenlyStemInTomb,
    earthlyStemInTomb,
    timeStemInTomb: check(timeStem),
    dayStemInTomb: check(dayStem),
    tombBranch: branches.find((b) => allStems.some((s) => (TOMB_MAP[s] || []).includes(b))),
  };
};

const relate = (src: FiveElements, target: FiveElements) => {
  if (src === target) return '比和';
  if (GENERATE[src] === target) return '我生';
  if (GENERATE[target] === src) return '生我';
  if (OVERCOME[src] === target) return '我克';
  if (OVERCOME[target] === src) return '克我';
  return '无';
};

export const calcTenStemResponse = (
  heavenly: HeavenlyStem | HeavenlyStem[] | '无',
  earthly: HeavenlyStem | HeavenlyStem[] | '无',
  timeStem?: HeavenlyStem,
  dayStem?: HeavenlyStem,
): TenStemResponse => {
  const h = heavenly === '无' ? undefined : (Array.isArray(heavenly) ? heavenly[0] : heavenly);
  const e = earthly === '无' ? undefined : (Array.isArray(earthly) ? earthly[0] : earthly);
  const heavenlyToEarthly = (!h || !e)
    ? { relation: '无', description: '无' }
    : (() => {
      const rel = relate(STEM_FIVE_ELEMENTS[h], STEM_FIVE_ELEMENTS[e]);
      return {
        relation: rel as any,
        id: 'patterns.ten_stem.template',
        params: { h, hEle: STEM_FIVE_ELEMENTS[h], rel, e, eEle: STEM_FIVE_ELEMENTS[e] },
        description: `${h}${STEM_FIVE_ELEMENTS[h]}${rel === '比和' ? '比和' : rel === '我生' ? '生' : rel === '生我' ? '被生' : rel === '我克' ? '克' : '被克'}${e}${STEM_FIVE_ELEMENTS[e]}`,
        isAuspicious: ['比和', '生我', '我生'].includes(rel)
      };
    })();
  const build = (src?: HeavenlyStem, target?: HeavenlyStem) => {
    if (!src || !target) return { relation: '无', description: '无' } as const;
    const rel = relate(STEM_FIVE_ELEMENTS[src], STEM_FIVE_ELEMENTS[target]);
    return {
      relation: rel as any,
      id: 'patterns.ten_stem.template',
      params: { h: src, hEle: STEM_FIVE_ELEMENTS[src], rel, e: target, eEle: STEM_FIVE_ELEMENTS[target] },
      description: `${src}${STEM_FIVE_ELEMENTS[src]}${rel === '比和' ? '比和' : rel === '我生' ? '生' : rel === '生我' ? '被生' : rel === '我克' ? '克' : '被克'}${target}${STEM_FIVE_ELEMENTS[target]}`,
      isAuspicious: ['比和', '生我', '我生'].includes(rel)
    };
  };
  return {
    heavenlyToEarthly,
    timeToDay: build(timeStem, dayStem),
    heavenlyToDay: build(h, dayStem),
  } as TenStemResponse;
};

export const calcGatePressure = (gate: Gate | '无门', palaceElement: FiveElements): GatePressure | '无' => {
  if (gate === '无门') return '无';
  const gateEle = GATE_FIVE_ELEMENTS[gate];
  if (OVERCOME[gateEle] === palaceElement) return '迫';
  if (OVERCOME[palaceElement] === gateEle) return '制';
  if (GENERATE[gateEle] === palaceElement) return '和';
  if (GENERATE[palaceElement] === gateEle) return '义';
  return '无';
};

export const calcStatus = (star: Star | Star[] | '天禽' | string, gate: Gate | '无门', season: Season) => {
  const s = Array.isArray(star) ? star[0] : star;
  const starStatus = (s === '天禽' || s === '无' || !STAR_STATUS_TABLE[s as Star]) ? '无' : STAR_STATUS_TABLE[s as Star][season];
  const gateStatus = gate === '无门' ? '无' : GATE_STATUS_TABLE[gate][season];
  return { star: starStatus as StarStatus | '无', gate: gateStatus as GateStatus | '无' };
};

export const detectPatterns = (
  palace: Palace,
  zhiShiGate: Gate,
  fourPillars: FourPillars,
): { auspicious: AuspiciousPattern[]; inauspicious: InauspiciousPattern[] } => {
  const auspicious: AuspiciousPattern[] = [];
  const inauspicious: InauspiciousPattern[] = [];
  const heavenly = Array.isArray(palace.heavenlyStem) ? palace.heavenlyStem : palace.heavenlyStem === '无' ? [] : [palace.heavenlyStem];
  const earthly = Array.isArray(palace.earthlyStem) ? palace.earthlyStem : [palace.earthlyStem];
  const { day, hour, year, month } = fourPillars;
  const dayStem = day.stem;
  const timeStem = hour.stem;

  // 九遁
  const hasSheng = palace.gate === '生门';
  const hasKai = palace.gate === '开门';
  const hasXiu = palace.gate === '休门';
  const hasDu = palace.gate === '杜门';
  const hasJing = palace.gate === '景门';
  const hasShang = palace.gate === '伤门';
  const hasSi = palace.gate === '死门';
  const hasJingMen = palace.gate === '惊门';

  const hasTaiYin = palace.deity === '太阴';
  const hasLiuHe = palace.deity === '六合';
  const hasJiuDi = palace.deity === '九地';
  const hasJiuTian = palace.deity === '九天';
  const hasZhiFu = palace.deity === '值符' || palace.isZhiFu;

  // 天遁：天盘丙+地盘丁+生门
  if (heavenly.includes('丙') && earthly.includes('丁') && hasSheng) {
    auspicious.push({
      id: 'patterns.jiu_dun.tian_dun',
      name: '九遁',
      type: '天遁',
      position: palace.position,
      params: { heaven: '丙', earth: '丁', gate: '生门' },
      description: '天盘丙+地盘丁+生门'
    });
  }
  // 地遁：天盘乙+地盘己+开门
  if (heavenly.includes('乙') && earthly.includes('己') && hasKai) {
    auspicious.push({
      id: 'patterns.jiu_dun.di_dun',
      name: '九遁',
      type: '地遁',
      position: palace.position,
      params: { heaven: '乙', earth: '己', gate: '开门' },
      description: '天盘乙+地盘己+开门'
    });
  }
  // 人遁：天盘丁+休门+太阴
  if (heavenly.includes('丁') && hasXiu && hasTaiYin) {
    auspicious.push({
      id: 'patterns.jiu_dun.ren_dun',
      name: '九遁',
      type: '人遁',
      position: palace.position,
      params: { heaven: '丁', gate: '休门', deity: '太阴' },
      description: '天盘丁+休门+太阴'
    });
  }
  // 风遁：天盘乙+开/休/生门+巽4宫
  if (heavenly.includes('乙') && (hasKai || hasXiu || hasSheng) && palace.position === 4) {
    auspicious.push({
      id: 'patterns.jiu_dun.feng_dun',
      name: '九遁',
      type: '风遁',
      position: palace.position,
      params: { heaven: '乙', gate: palace.gate, palace: '巽4宫' },
      description: '天盘乙+开/休/生门+巽4宫'
    });
  }
  // 云遁：天盘乙+开/休/生门+地盘辛
  if (heavenly.includes('乙') && (hasKai || hasXiu || hasSheng) && earthly.includes('辛')) {
    auspicious.push({
      id: 'patterns.jiu_dun.yun_dun',
      name: '九遁',
      type: '云遁',
      position: palace.position,
      params: { heaven: '乙', gate: palace.gate, earth: '辛' },
      description: '天盘乙+开/休/生门+地盘辛'
    });
  }
  // 龙遁：天盘乙+开/休/生门+坎1宫/地盘癸
  if (heavenly.includes('乙') && (hasKai || hasXiu || hasSheng) && (palace.position === 1 || earthly.includes('癸'))) {
    auspicious.push({
      id: 'patterns.jiu_dun.long_dun',
      name: '九遁',
      type: '龙遁',
      position: palace.position,
      params: { heaven: '乙', gate: palace.gate, condition: palace.position === 1 ? '坎1宫' : '地盘癸' },
      description: '天盘乙+开/休/生门+坎1宫/地盘癸'
    });
  }
  // 虎遁：天盘乙+休/生门+艮8宫/地盘辛 or 天盘庚+开门+兑7宫
  if ((heavenly.includes('乙') && (hasXiu || hasSheng) && (palace.position === 8 || earthly.includes('辛'))) ||
    (heavenly.includes('庚') && hasKai && palace.position === 7)) {
    const isGeng = heavenly.includes('庚');
    auspicious.push({
      id: 'patterns.jiu_dun.hu_dun',
      name: '九遁',
      type: '虎遁',
      position: palace.position,
      params: { condition: isGeng ? '天盘庚+开门+兑7宫' : '天盘乙+休/生门+艮8宫/地盘辛' },
      description: '天盘乙+休/生门+艮8宫/地盘辛 或 天盘庚+开门+兑7宫'
    });
  }
  // 神遁：天盘丙+生门+九天
  if (heavenly.includes('丙') && hasSheng && hasJiuTian) {
    auspicious.push({
      id: 'patterns.jiu_dun.shen_dun',
      name: '九遁',
      type: '神遁',
      position: palace.position,
      params: { heaven: '丙', gate: '生门', deity: '九天' },
      description: '天盘丙+生门+九天'
    });
  }
  // 鬼遁：天盘丁+杜门+九地
  if (heavenly.includes('丁') && hasDu && hasJiuDi) {
    auspicious.push({
      id: 'patterns.jiu_dun.gui_dun',
      name: '九遁',
      type: '鬼遁',
      position: palace.position,
      params: { heaven: '丁', gate: '杜门', deity: '九地' },
      description: '天盘丁+杜门+九地'
    });
  }

  // 三诈五假
  const sanMen = hasKai || hasXiu || hasSheng;
  const diPanYiBingDing = earthly.some(s => ['乙', '丙', '丁'].includes(s));
  const diPanDingJiGui = earthly.some(s => ['丁', '己', '癸'].includes(s));
  const tianPanYiBingDing = heavenly.some(s => ['乙', '丙', '丁'].includes(s));

  // 真诈：开/休/生门+太阴
  if (sanMen && hasTaiYin) {
    auspicious.push({
      id: 'patterns.san_za_wu_jia.zhen_zha',
      name: '三诈五假', type: '真诈', position: palace.position,
      params: { gate: palace.gate, deity: '太阴' },
      description: '开/休/生门+太阴'
    });
  }
  // 休诈：开/休/生门+地盘乙/丙/丁+六合
  if (sanMen && diPanYiBingDing && hasLiuHe) {
    auspicious.push({
      id: 'patterns.san_za_wu_jia.xiu_zha',
      name: '三诈五假', type: '休诈', position: palace.position,
      params: { gate: palace.gate, earth: earthly.find(s => ['乙', '丙', '丁'].includes(s)), deity: '六合' },
      description: '开/休/生门+地盘乙/丙/丁+六合'
    });
  }
  // 重诈：开/休/生门+地盘乙/丙/丁+九地
  if (sanMen && diPanYiBingDing && hasJiuDi) {
    auspicious.push({
      id: 'patterns.san_za_wu_jia.chong_zha',
      name: '三诈五假', type: '重诈', position: palace.position,
      params: { gate: palace.gate, earth: earthly.find(s => ['乙', '丙', '丁'].includes(s)), deity: '九地' },
      description: '开/休/生门+地盘乙/丙/丁+九地'
    });
  }
  // 天假：天盘乙/丙/丁+景门+九天
  if (tianPanYiBingDing && hasJing && hasJiuTian) {
    auspicious.push({
      id: 'patterns.san_za_wu_jia.tian_jia',
      name: '三诈五假', type: '天假', position: palace.position,
      params: { heaven: heavenly.find(s => ['乙', '丙', '丁'].includes(s)), gate: '景门', deity: '九天' },
      description: '天盘乙/丙/丁+景门+九天'
    });
  }
  // 地假：地盘丁/己/癸+杜门+九地/太阴/六合
  if (diPanDingJiGui && hasDu && (hasJiuDi || hasTaiYin || hasLiuHe)) {
    auspicious.push({
      id: 'patterns.san_za_wu_jia.di_jia',
      name: '三诈五假', type: '地假', position: palace.position,
      params: { earth: earthly.find(s => ['丁', '己', '癸'].includes(s)), gate: '杜门', deity: palace.deity },
      description: '地盘丁/己/癸+杜门+九地/太阴/六合'
    });
  }
  // 人假：地盘壬+惊门+九天
  if (earthly.includes('壬') && hasJingMen && hasJiuTian) {
    auspicious.push({
      id: 'patterns.san_za_wu_jia.ren_jia',
      name: '三诈五假', type: '人假', position: palace.position,
      params: { earth: '壬', gate: '惊门', deity: '九天' },
      description: '地盘壬+惊门+九天'
    });
  }
  // 神假：地盘丁/己/癸+伤门+九地
  if (diPanDingJiGui && hasShang && hasJiuDi) {
    auspicious.push({
      id: 'patterns.san_za_wu_jia.shen_jia',
      name: '三诈五假', type: '神假', position: palace.position,
      params: { earth: earthly.find(s => ['丁', '己', '癸'].includes(s)), gate: '伤门', deity: '九地' },
      description: '地盘丁/己/癸+伤门+九地'
    });
  }
  // 鬼假：地盘丁/己/癸+死门+九地
  if (diPanDingJiGui && hasSi && hasJiuDi) {
    auspicious.push({
      id: 'patterns.san_za_wu_jia.gui_jia',
      name: '三诈五假', type: '鬼假', position: palace.position,
      params: { earth: earthly.find(s => ['丁', '己', '癸'].includes(s)), gate: '死门', deity: '九地' },
      description: '地盘丁/己/癸+死门+九地'
    });
  }

  // 三奇之灵：地盘乙/丙/丁+开/休/生门+太阴/六合/九地/九天
  if (diPanYiBingDing && sanMen && (hasTaiYin || hasLiuHe || hasJiuDi || hasJiuTian)) {
    auspicious.push({
      id: 'patterns.common.san_qi_zhi_ling',
      name: '三奇之灵', type: '三奇之灵', position: palace.position,
      params: { earth: earthly.find(s => ['乙', '丙', '丁'].includes(s)), gate: palace.gate, deity: palace.deity },
      description: '地盘乙/丙/丁+开/休/生门+太阴/六合/九地/九天'
    });
  }

  // 奇游禄位
  if (sanMen) {
    if (earthly.includes('乙') && palace.position === 3) auspicious.push({ id: 'patterns.common.qi_you_lu_wei', name: '奇游禄位', type: '奇游禄位', position: palace.position, params: { earth: '乙', palace: '震3宫', gate: palace.gate }, description: '地盘乙+震3宫+开/休/生门' });
    if (earthly.includes('丙') && palace.position === 4) auspicious.push({ id: 'patterns.common.qi_you_lu_wei', name: '奇游禄位', type: '奇游禄位', position: palace.position, params: { earth: '丙', palace: '巽4宫', gate: palace.gate }, description: '地盘丙+巽4宫+开/休/生门' });
    if (earthly.includes('丁') && palace.position === 9) auspicious.push({ id: 'patterns.common.qi_you_lu_wei', name: '奇游禄位', type: '奇游禄位', position: palace.position, params: { earth: '丁', palace: '离9宫', gate: palace.gate }, description: '地盘丁+离9宫+开/休/生门' });
  }

  // 欢怡：地盘乙/丙/丁+值符
  if (diPanYiBingDing && hasZhiFu) {
    auspicious.push({
      id: 'patterns.common.huan_yi',
      name: '欢怡', type: '欢怡', position: palace.position,
      params: { earth: earthly.find(s => ['乙', '丙', '丁'].includes(s)), deity: palace.deity },
      description: '地盘乙/丙/丁+值符'
    });
  }

  // 奇仪相和
  if (sanMen) {
    if ((heavenly.includes('乙') && earthly.includes('庚')) ||
      (heavenly.includes('丙') && earthly.includes('辛')) ||
      (heavenly.includes('丁') && earthly.includes('壬'))) {
      auspicious.push({
        id: 'patterns.common.qi_he',
        name: '奇仪相和', type: '奇和', position: palace.position,
        params: { heaven: heavenly.find(s => ['乙', '丙', '丁'].includes(s)), earth: earthly.find(s => ['庚', '辛', '壬'].includes(s)) },
        description: '奇和：天盘乙+地盘庚 / 天盘丙+地盘辛 / 天盘丁+地盘壬'
      });
    }
    if ((heavenly.includes('戊') && earthly.includes('癸')) ||
      (heavenly.includes('甲') && earthly.includes('己'))) {
      auspicious.push({
        id: 'patterns.common.yi_he',
        name: '奇仪相和', type: '仪和', position: palace.position,
        params: { heaven: heavenly.find(s => ['戊', '甲'].includes(s)), earth: earthly.find(s => ['癸', '己'].includes(s)) },
        description: '仪和：天盘戊+地盘癸 / 天盘甲+地盘己'
      });
    }
  }

  // 门宫和义
  if (palace.gate !== '无门') {
    const gateEle = GATE_FIVE_ELEMENTS[palace.gate as Gate];
    const palaceEle = palace.fiveElements;
    if (GENERATE[gateEle] === palaceEle) {
      auspicious.push({
        id: 'patterns.common.men_gong_sheng',
        name: '门宫和义', type: '门宫和义', position: palace.position,
        params: { gate: palace.gate, palace: palace.position },
        description: `和：门生宫 (${palace.gate}生${palace.position}宫)`
      });
    }
    if (GENERATE[palaceEle] === gateEle) {
      auspicious.push({
        id: 'patterns.common.men_gong_sheng_wo',
        name: '门宫和义', type: '门宫和义', position: palace.position,
        params: { gate: palace.gate, palace: palace.position },
        description: `义：宫生门 (${palace.position}宫生${palace.gate})`
      });
    }
  }

  // 三奇贵人升殿
  if (earthly.includes('乙') && palace.position === 3) {
    auspicious.push({ id: 'patterns.common.san_qi_sheng_dian', name: '三奇贵人升殿', type: '三奇贵人升殿', position: palace.position, params: { earth: '乙', palace: '震三宫' }, description: '地盘乙奇在震三宫，为贵人升殿' });
  }
  if (earthly.includes('丙') && palace.position === 9) {
    auspicious.push({ id: 'patterns.common.san_qi_sheng_dian', name: '三奇贵人升殿', type: '三奇贵人升殿', position: palace.position, params: { earth: '丙', palace: '离九宫' }, description: '地盘丙奇在离九宫，为贵人升殿' });
  }
  if (earthly.includes('丁') && palace.position === 7) {
    auspicious.push({ id: 'patterns.common.san_qi_sheng_dian', name: '三奇贵人升殿', type: '三奇贵人升殿', position: palace.position, params: { earth: '丁', palace: '兑七宫' }, description: '地盘丁奇在兑七宫，为贵人升殿' });
  }

  // 三奇得使 / 玉女守门
  if (palace.gate !== '无门' && palace.gate === zhiShiGate && heavenly.some((h) => ['乙', '丙', '丁'].includes(h))) {
    auspicious.push({ id: 'patterns.common.san_qi_de_shi', name: '三奇得使', type: '三奇得使', position: palace.position, description: '三奇落值使门，事有贵助' });
  }
  if (palace.gate === zhiShiGate && earthly.includes('丁')) {
    auspicious.push({ id: 'patterns.common.yu_nu_shou_men', name: '玉女守门', type: '玉女守门', position: palace.position, params: { earth: '丁' }, description: '地盘丁落值使门，主贵人' });
  }

  // 青龙返首 / 飞鸟跌穴
  if (heavenly.includes('戊') && earthly.includes('丙')) {
    auspicious.push({ id: 'patterns.common.qing_long_fan_shou', name: '青龙返首', type: '青龙返首', position: palace.position, params: { heaven: '戊', earth: '丙' }, description: '天盘戊配地盘丙' });
  }
  if (heavenly.includes('丙') && earthly.includes('戊')) {
    auspicious.push({ id: 'patterns.common.fei_niao_die_xue', name: '飞鸟跌穴', type: '飞鸟跌穴', position: palace.position, params: { heaven: '丙', earth: '戊' }, description: '天盘丙配地盘戊' });
  }

  // 奇格类（天盘庚克地盘乙/丙/丁）
  if (heavenly.includes('庚') && earthly.some((e) => ['乙', '丙', '丁'].includes(e))) {
    inauspicious.push({
      id: 'patterns.bad.qi_ge',
      name: '奇格', type: '奇格', position: palace.position,
      params: { heaven: '庚', earth: earthly.find(e => ['乙', '丙', '丁'].includes(e)) },
      description: '天盘庚克地盘乙/丙/丁'
    });
  }

  // 青龙逃走 / 白虎猖狂 / 荧入太白 等基础克格
  if (heavenly.includes('乙') && earthly.includes('辛')) inauspicious.push({ id: 'patterns.bad.qing_long_tao_zou', name: '青龙逃走', type: '青龙逃走', position: palace.position, params: { heaven: '乙', earth: '辛' }, description: '天盘乙被地盘辛克' });
  if (heavenly.includes('辛') && earthly.includes('乙')) inauspicious.push({ id: 'patterns.bad.bai_hu_chang_kuang', name: '白虎猖狂', type: '白虎猖狂', position: palace.position, params: { heaven: '辛', earth: '乙' }, description: '天盘辛克地盘乙' });
  if (heavenly.includes('丙') && earthly.includes('庚')) inauspicious.push({ id: 'patterns.bad.ying_ru_tai_bai', name: '荧入太白', type: '荧入太白', position: palace.position, params: { heaven: '丙', earth: '庚' }, description: '天盘丙克地盘庚' });
  if (heavenly.includes('庚') && earthly.includes('丙')) inauspicious.push({ id: 'patterns.bad.tai_bai_ru_ying', name: '太白入荧', type: '太白入荧', position: palace.position, params: { heaven: '庚', earth: '丙' }, description: '天盘庚克地盘丙' });

  // 朱雀投江：天盘丁+地盘癸
  if (heavenly.includes('丁') && earthly.includes('癸')) inauspicious.push({ id: 'patterns.bad.zhu_que_tou_jiang', name: '朱雀投江', type: '朱雀投江', position: palace.position, params: { heaven: '丁', earth: '癸' }, description: '天盘丁+地盘癸' });
  // 螣蛇夭矫：天盘癸+地盘丁
  if (heavenly.includes('癸') && earthly.includes('丁')) inauspicious.push({ id: 'patterns.bad.teng_she_yao_jiao', name: '螣蛇夭矫', type: '螣蛇夭矫', position: palace.position, params: { heaven: '癸', earth: '丁' }, description: '天盘癸+地盘丁' });
  // 大格：天盘庚+地盘癸
  if (heavenly.includes('庚') && earthly.includes('癸')) inauspicious.push({ id: 'patterns.bad.da_ge', name: '大格', type: '大格', position: palace.position, params: { heaven: '庚', earth: '癸' }, description: '天盘庚+地盘癸' });
  // 小格：天盘庚+地盘壬
  if (heavenly.includes('庚') && earthly.includes('壬')) inauspicious.push({ id: 'patterns.bad.xiao_ge', name: '小格', type: '小格', position: palace.position, params: { heaven: '庚', earth: '壬' }, description: '天盘庚+地盘壬' });
  // 刑格：天盘庚+地盘己
  if (heavenly.includes('庚') && earthly.includes('己')) inauspicious.push({ id: 'patterns.bad.xing_ge', name: '刑格', type: '刑格', position: palace.position, params: { heaven: '庚', earth: '己' }, description: '天盘庚+地盘己' });
  // 伏宫格：天盘庚+地盘戊
  if (heavenly.includes('庚') && earthly.includes('戊')) inauspicious.push({ id: 'patterns.bad.fu_gong_ge', name: '伏宫格', type: '伏宫格', position: palace.position, params: { heaven: '庚', earth: '戊' }, description: '天盘庚+地盘戊' });
  // 飞宫格：天盘戊+地盘庚
  if (heavenly.includes('戊') && earthly.includes('庚')) inauspicious.push({ id: 'patterns.bad.fei_gong_ge', name: '飞宫格', type: '飞宫格', position: palace.position, params: { heaven: '戊', earth: '庚' }, description: '天盘戊+地盘庚' });
  // 岁格：天盘庚+地盘年干
  if (heavenly.includes('庚') && earthly.includes(year.stem)) inauspicious.push({ id: 'patterns.bad.sui_ge', name: '岁格', type: '岁格', position: palace.position, params: { heaven: '庚', earth: year.stem }, description: '天盘庚+地盘年干' });
  // 月格：天盘庚+地盘月干
  if (heavenly.includes('庚') && earthly.includes(month.stem)) inauspicious.push({ id: 'patterns.bad.yue_ge', name: '月格', type: '月格', position: palace.position, params: { heaven: '庚', earth: month.stem }, description: '天盘庚+地盘月干' });
  // 日格：天盘庚+地盘日干
  if (heavenly.includes('庚') && earthly.includes(day.stem)) {
    inauspicious.push({ id: 'patterns.bad.ri_ge', name: '日格', type: '日格', position: palace.position, params: { heaven: '庚', earth: day.stem }, description: '天盘庚+地盘日干' });
    inauspicious.push({ id: 'patterns.bad.fu_gan_ge', name: '伏干格', type: '伏干格', position: palace.position, params: { heaven: '庚', earth: day.stem }, description: '天盘庚+地盘日干 (伏干格)' });
  }

  // 三奇入墓
  if ((heavenly.includes('乙') && (palace.position === 6 || palace.position === 2)) ||
    (heavenly.includes('丙') && palace.position === 6) ||
    (heavenly.includes('丁') && palace.position === 8)) {
    inauspicious.push({ id: 'patterns.bad.san_qi_ru_mu', name: '三奇入墓', type: '三奇入墓', position: palace.position, description: '三奇入墓' });
  }

  // 三奇受刑
  if ((heavenly.includes('丙') && (palace.position === 1 || earthly.includes('壬') || earthly.includes('癸'))) ||
    (heavenly.includes('丁') && (palace.position === 1 || earthly.includes('壬') || earthly.includes('癸'))) ||
    (heavenly.includes('乙') && (palace.position === 6 || palace.position === 7 || earthly.includes('庚') || earthly.includes('辛')))) {
    inauspicious.push({ id: 'patterns.bad.san_qi_shou_xing', name: '三奇受刑', type: '三奇受刑', position: palace.position, description: '三奇受刑' });
  }

  // 天网四张：天盘癸+地盘癸
  if (heavenly.includes('癸') && earthly.includes('癸')) inauspicious.push({ id: 'patterns.bad.tian_wang_si_zhang', name: '天网四张', type: '天网四张', position: palace.position, params: { heaven: '癸', earth: '癸' }, description: '天盘癸+地盘癸' });

  // 悖格: 天盘丙+值符 or 地盘丙+值符
  if (heavenly.includes('丙') && palace.isZhiFu) inauspicious.push({ id: 'patterns.bad.bei_ge', name: '悖格', type: '悖格', position: palace.position, params: { position: '天盘', heaven: '丙' }, description: '天盘丙加值符' });
  if (earthly.includes('丙') && palace.isZhiFu) inauspicious.push({ id: 'patterns.bad.bei_ge', name: '悖格', type: '悖格', position: palace.position, params: { position: '地盘', heaven: '丙' }, description: '地盘丙加值符' });

  // 时干/日干与宫天干克合的简单提示（小格、大格等简化）
  if (heavenly.includes('庚') && earthly.includes(timeStem)) {
    inauspicious.push({ id: 'patterns.bad.shi_ge', name: '时格', type: '时格', position: palace.position, params: { heaven: '庚' }, description: '天盘庚逢时干' });
  }
  if (heavenly.includes(dayStem) && earthly.includes('庚')) {
    inauspicious.push({ id: 'patterns.bad.fei_gan_ge', name: '飞干格', type: '飞干格', position: palace.position, params: { earth: '庚' }, description: '天盘日干加地盘庚' });
  }

  // 时干入墓
  const timeStemTombBranches = TOMB_MAP[timeStem];
  if (heavenly.includes(timeStem) && timeStemTombBranches && palace.earthBranch !== '无' && (Array.isArray(palace.earthBranch) ? palace.earthBranch : [palace.earthBranch]).some(b => timeStemTombBranches.includes(b))) {
    inauspicious.push({ id: 'patterns.bad.shi_gan_ru_mu', name: '时干入墓', type: '时干入墓', position: palace.position, description: '时干入墓' });
  }

  return { auspicious, inauspicious };
};

export const detectGlobalPatterns = (fourPillars: FourPillars): { auspicious: AuspiciousPattern[]; inauspicious: InauspiciousPattern[] } => {
  const auspicious: AuspiciousPattern[] = [];
  const inauspicious: InauspiciousPattern[] = [];
  const { day, hour } = fourPillars;
  const dayStem = day.stem;
  const timeStem = hour.stem;
  const timeBranch = hour.branch;
  const timeGZ = timeStem + timeBranch;

  // 天显时格
  let isTianXian = false;
  if (['甲', '己'].includes(dayStem) && (timeGZ === '甲子' || timeGZ === '甲戌')) isTianXian = true;
  if (['乙', '庚'].includes(dayStem) && timeGZ === '甲申') isTianXian = true;
  if (['丙', '辛'].includes(dayStem) && timeGZ === '甲午') isTianXian = true;
  if (['丁', '壬'].includes(dayStem) && timeGZ === '甲辰') isTianXian = true;
  if (['戊', '癸'].includes(dayStem) && timeGZ === '甲寅') isTianXian = true;

  if (isTianXian) {
    auspicious.push({
      id: 'patterns.common.tian_xian_shi_ge',
      name: '天显时格',
      type: '天显时格',
      position: 0 as any,
      description: '天显时格：大吉之格，宜行事'
    });
  }

  // 五不遇时
  let isWuBuYuShi = false;
  if (dayStem === '甲' && timeGZ === '庚午') isWuBuYuShi = true;
  if (dayStem === '乙' && timeGZ === '辛巳') isWuBuYuShi = true;
  if (dayStem === '丙' && timeGZ === '壬辰') isWuBuYuShi = true;
  if (dayStem === '丁' && timeGZ === '癸卯') isWuBuYuShi = true;
  if (dayStem === '戊' && timeGZ === '甲寅') isWuBuYuShi = true;
  if (dayStem === '己' && timeGZ === '乙丑') isWuBuYuShi = true;
  if (dayStem === '庚' && timeGZ === '丙子') isWuBuYuShi = true;
  if (dayStem === '辛' && timeGZ === '丁酉') isWuBuYuShi = true;
  if (dayStem === '壬' && timeGZ === '戊申') isWuBuYuShi = true;
  if (dayStem === '癸' && timeGZ === '己未') isWuBuYuShi = true;

  if (isWuBuYuShi) {
    inauspicious.push({
      id: 'patterns.bad.wu_bu_yu_shi',
      name: '五不遇时',
      type: '五不遇时',
      position: 0 as any,
      description: '五不遇时：时干克日干，百事不利'
    });
  }

  return { auspicious, inauspicious };
};

export const calcMenPo = (palace: Palace, gatePressure: GatePressure | '无') => {
  if (gatePressure !== '迫' && gatePressure !== '制') return undefined;
  const isPo = gatePressure === '迫';
  const gate = palace.gate as Gate;
  const palaceEle = palace.fiveElements;
  const gateEle = GATE_FIVE_ELEMENTS[gate];

  return {
    position: palace.position,
    gate: gate,
    gatePressure,
    id: isPo ? 'patterns.bad.men_po' : 'patterns.bad.men_zhi',
    params: {
      gate,
      palace: palace.position,
      gateElement: gateEle,
      palaceElement: palaceEle
    },
    description: isPo
      ? `${gate}迫${palace.position}宫 (${gateEle}克${palaceEle})`
      : `${gate}受制于${palace.position}宫 (${palaceEle}克${gateEle})`,
  };
};
