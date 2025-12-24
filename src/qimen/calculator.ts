import { Deity, Gate, HeavenlyStem, Palace, Position, Star, XunShou, Yuan } from '../qimen-types';
import {
  BRANCH_CONFLICT,
  DIZHI,
  GATE_ORIGINAL_POSITIONS,
  GATE_SEQUENCE,
  GATE_FIVE_ELEMENTS,
  JIAZI,
  LIUJIA_XUN,
  PALACE_BRANCHES,
  PALACE_CLOCKWISE,
  PALACE_COUNTER_CLOCKWISE,
  SANQI_LIUYI,
  STAR_ORIGINAL_POSITIONS,
  STAR_SEQUENCE,
  TIANGAN,
  YANGDUN_JIEQI,
  YINDUN_JIEQI,
  XUN_SHOU_VOIDNESS,
} from '../data/constants';
import { findPalaceByBranch, getClockwisePalaces, getCounterClockwisePalaces, getBranchIndex, fixIndex } from '../utils/palace';

export const getXunShou = (ganzhi: string): XunShou => {
  const idx = JIAZI.indexOf(ganzhi);
  const xunIdx = Math.floor(idx / 10) * 10;
  return JIAZI[xunIdx] as XunShou;
};

export const getYuan = (riGanZhi: string): Yuan => {
  if (['甲子', '乙丑', '丙寅', '丁卯', '戊辰', '己卯', '庚辰', '辛巳', '壬午', '癸未', '甲午', '乙未', '丙申', '丁酉', '戊戌', '己酉', '庚戌', '辛亥', '壬子', '癸丑'].includes(riGanZhi)) return '上元';
  if (['己巳', '庚午', '辛未', '壬申', '癸酉', '甲申', '乙酉', '丙戌', '丁亥', '戊子', '己亥', '庚子', '辛丑', '壬寅', '癸卯', '甲寅', '乙卯', '丙辰', '丁巳', '戊午'].includes(riGanZhi)) return '中元';
  return '下元';
};

export const getJuShu = (jieqi: string, yuan: Yuan, isYangdun: boolean): number => {
  const table = isYangdun ? YANGDUN_JIEQI : YINDUN_JIEQI;
  const row = table[jieqi];
  if (!row) return 0;
  if (yuan === '上元') return row[0];
  if (yuan === '中元') return row[1];
  return row[2];
};

export const arrangeDiPan = (juShu: number, isYangdun: boolean): Map<Position, HeavenlyStem> => {
  const result = new Map<Position, HeavenlyStem>();
  if (isYangdun) {
    SANQI_LIUYI.forEach((stem, i) => {
      const pos = ((juShu - 1 + i) % 9) + 1 as Position;
      result.set(pos, stem);
    });
  } else {
    SANQI_LIUYI.forEach((stem, i) => {
      let pos = juShu - i;
      while (pos < 1) pos += 9;
      result.set(pos as Position, stem);
    });
  }
  return result;
};

export const getZhiFuInfo = (xunShou: XunShou, diPan: Map<Position, HeavenlyStem>) => {
  const zhiFuStem = LIUJIA_XUN[xunShou];
  let position: Position = 5;
  for (const [pos, stem] of diPan.entries()) {
    if (stem === zhiFuStem) {
      position = pos;
      break;
    }
  }
  const star = (Object.keys(STAR_ORIGINAL_POSITIONS) as Star[]).find((s) => STAR_ORIGINAL_POSITIONS[s] === position) as Star;
  return { star, position, heavenlyStem: zhiFuStem };
};

export const getZhiFuLuoGong = (shiGanZhi: string, xunShou: XunShou, diPan: Map<Position, HeavenlyStem>): { position: Position; timeStem: HeavenlyStem } => {
  const timeStemRaw = shiGanZhi[0] as HeavenlyStem;
  const actualTimeStem = timeStemRaw === '甲' ? LIUJIA_XUN[xunShou] : timeStemRaw;
  let position: Position = 5;
  for (const [pos, stem] of diPan.entries()) {
    if (stem === actualTimeStem) {
      position = pos;
      break;
    }
  }
  if (position === 5) position = 2;
  return { position, timeStem: actualTimeStem };
};

export const getZhiShiInfo = (shiZhi: string, zhiFuGong: Position, isYangdun: boolean) => {
  const zhiShiMen = (Object.keys(GATE_ORIGINAL_POSITIONS) as Gate[]).find((g) => GATE_ORIGINAL_POSITIONS[g] === zhiFuGong) as Gate;
  const xunShou = getXunShou(shiZhi);
  const xunBranch = xunShou[1];
  const shiBranch = shiZhi[1];
  const steps = (getBranchIndex(shiBranch as any) - getBranchIndex(xunBranch as any) + 12) % 12;
  let position = GATE_ORIGINAL_POSITIONS[zhiShiMen];
  for (let i = 0; i < steps; i += 1) {
    if (isYangdun) {
      position += 1;
      if (position > 9) position = 1 as Position;
    } else {
      position -= 1;
      if (position < 1) position = 9 as Position;
    }
  }
  const rawPosition = position;
  if (position === 5) position = isYangdun ? 8 : 2;
  return { gate: zhiShiMen, position: position as Position, rawPosition };
};

export const arrangeTianPan = (zhiFuStar: Star, zhiFuLuoGong: Position, diPan: Map<Position, HeavenlyStem>) => {
  const tianPan = new Map<Position, { star: Star; heavenlyStem: HeavenlyStem }>();
  const zhiFuIdx = STAR_SEQUENCE.indexOf(zhiFuStar);
  const startIdx = PALACE_CLOCKWISE.indexOf(zhiFuLuoGong === 5 ? 2 : zhiFuLuoGong);
  for (let i = 0; i < 8; i += 1) {
    const palace = PALACE_CLOCKWISE[(startIdx + i) % 8];
    const star = STAR_SEQUENCE[(zhiFuIdx + i) % 8];
    const originPalace = STAR_ORIGINAL_POSITIONS[star];
    const stem = diPan.get(originPalace)!;
    tianPan.set(palace, { star, heavenlyStem: stem });
  }
  tianPan.set(5, { star: '天禽', heavenlyStem: diPan.get(5)! });
  return tianPan;
};

export const arrangeDeities = (zhiFuLuoGong: Position, isYangdun: boolean) => {
  const deities: Map<Position, Deity> = new Map();
  const seq = isYangdun ? PALACE_CLOCKWISE : PALACE_COUNTER_CLOCKWISE;
  const startIdx = seq.indexOf(zhiFuLuoGong === 5 ? 2 : zhiFuLuoGong);
  ['值符', '腾蛇', '太阴', '六合', '白虎', '玄武', '九地', '九天'].forEach((shen, i) => {
    deities.set(seq[(startIdx + i) % 8], shen as Deity);
  });
  return deities;
};

export const handleMiddlePalace = (isYangdun: boolean, palaces: Palace[]): Palace[] => {
  const result = palaces.map((p) => ({ ...p }));
  const center = result.find((p) => p.position === 5);
  if (!center) return result;
  const targetPos = isYangdun ? 8 : 2;
  const target = result.find((p) => p.position === targetPos);
  if (target) {
    const extra = center.earthlyStem as HeavenlyStem;
    target.isJiGong = { isJi: true, type: isYangdun ? '阳遁寄艮八' : '阴遁寄坤二', extraHeavenlyStem: extra, extraStar: '' };
    const existing = Array.isArray(target.earthlyStem) ? target.earthlyStem : [target.earthlyStem];
    target.earthlyStem = [existing[0], extra];
  }
  const tianRui = result.find((p) => Array.isArray(p.star) ? (p.star as Star[]).includes('天芮') : p.star === '天芮');
  if (tianRui && tianRui.position !== 5) {
    const addStem = center.earthlyStem as HeavenlyStem;
    const stars = Array.isArray(tianRui.star) ? tianRui.star.slice(0, 1) : [tianRui.star as Star];
    tianRui.star = [stars[0], '天禽'];
    const stems = Array.isArray(tianRui.heavenlyStem) ? tianRui.heavenlyStem.slice(0, 1) : [tianRui.heavenlyStem as HeavenlyStem];
    tianRui.heavenlyStem = [stems[0], addStem];
  }
  return result;
};

export const arrangeGates = (zhiShiGong: Position, zhiShiGate: Gate) => {
  const gates: Map<Position, Gate> = new Map();
  const startIdx = PALACE_CLOCKWISE.indexOf(zhiShiGong === 5 ? 2 : zhiShiGong);
  const gateIdx = GATE_SEQUENCE.indexOf(zhiShiGate);
  for (let i = 0; i < 8; i += 1) {
    gates.set(PALACE_CLOCKWISE[(startIdx + i) % 8], GATE_SEQUENCE[(gateIdx + i) % 8]);
  }
  return gates;
};

export const calculateLiuYiJiXing = (position: Position, tianGan: HeavenlyStem): { hasJiXing: boolean; type?: '甲子戊' | '甲戌己' | '甲申庚' | '甲午辛' | '甲辰壬' | '甲寅癸'; description?: string } => {
  // 六仪击刑的判断条件 - 检查指定宫位的天盘天干是否构成击刑
  const liuYiJiXingConditions: Array<{ tianGan: HeavenlyStem; gong: Position; type: '甲子戊' | '甲戌己' | '甲申庚' | '甲午辛' | '甲辰壬' | '甲寅癸'; description: string }> = [
    { tianGan: '戊', gong: 3, type: '甲子戊', description: '甲子戊+震3宫（子刑卯）' },
    { tianGan: '己', gong: 2, type: '甲戌己', description: '甲戌己+坤2宫（戌刑未）' },
    { tianGan: '庚', gong: 8, type: '甲申庚', description: '甲申庚+艮8宫（申刑寅）' },
    { tianGan: '辛', gong: 9, type: '甲午辛', description: '甲午辛+离9宫（午自刑）' },
    { tianGan: '壬', gong: 4, type: '甲辰壬', description: '甲辰壬+巽4宫（辰自刑）' },
    { tianGan: '癸', gong: 4, type: '甲寅癸', description: '甲寅癸+巽4宫（寅刑巳）' }
  ];

  const condition = liuYiJiXingConditions.find(cond =>
    tianGan === cond.tianGan && position === cond.gong
  );

  if (condition) {
    return {
      hasJiXing: true,
      type: condition.type,
      description: condition.description
    };
  }

  return { hasJiXing: false };
};

